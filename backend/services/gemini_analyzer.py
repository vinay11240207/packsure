"""
PackSure AI - Gemini LLM Compliance Analyzer
Uses Google Gemini (gemini-2.5-flash) to perform multi-modal compliance evaluation
against the Legal Metrology (Packaged Commodities) Rules, 2011 (amended 2011-2026).
"""

import os
import io
import json
import base64
import logging
from typing import List, Dict, Any, Optional, Tuple
from PIL import Image
import requests
from dotenv import load_dotenv

from services.legal_rules import get_compliance_prompt, LEGAL_METROLOGY_REGULATIONS
from models.schemas import ScanResponse, ComplianceResult, OcrResult

# Load environment variables
load_dotenv()

logger = logging.getLogger("packsure.gemini")
logger.setLevel(logging.INFO)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_AI_API_KEY", "")

CANDIDATE_MODELS = [
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.6-flash"
]

def pdf_to_image(pdf_bytes: bytes) -> Tuple[bytes, int, int]:
    """
    Renders the first page of a packaging PDF as a PNG image for visual inspection and heatmap.
    Returns (png_bytes, width, height).
    """
    try:
        import pymupdf as fitz  # PyMuPDF
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        if len(doc) == 0:
            raise ValueError("PDF has no pages")
        page = doc[0]
        pix = page.get_pixmap(dpi=150)
        img_bytes = pix.tobytes("png")
        return img_bytes, pix.width, pix.height
    except Exception as e:
        logger.warning(f"Failed to render PDF using PyMuPDF: {e}")
        img = Image.new("RGB", (600, 800), color=(245, 247, 250))
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        return buf.getvalue(), 600, 800

def get_image_dimensions(image_bytes: bytes) -> Tuple[int, int]:
    """
    Returns (width, height) of an image.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
        return img.width, img.height
    except Exception:
        return 400, 600

def call_gemini_vision(images_b64: List[Tuple[str, str]], prompt_text: str) -> Dict[str, Any]:
    """
    Calls Google Gemini via REST API with inline image data and structured JSON response.
    Cascades through available models for maximum uptime and reliability.
    """
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not configured in backend/.env")

    parts: List[Dict[str, Any]] = []
    for mime_type, b64_data in images_b64:
        parts.append({
            "inline_data": {
                "mime_type": mime_type,
                "data": b64_data
            }
        })
    parts.append({"text": prompt_text})

    payload = {
        "contents": [
            {
                "parts": parts
            }
        ],
        "generationConfig": {
            "temperature": 0.1,
            "response_mime_type": "application/json"
        }
    }

    last_err = None
    for model_name in CANDIDATE_MODELS:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
        try:
            response = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=40)
            if response.status_code == 200:
                resp_json = response.json()
                candidates = resp_json.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        raw_text = parts[0].get("text", "{}")
                        logger.info(f"Gemini evaluation succeeded using {model_name}")
                        return json.loads(raw_text)
            else:
                last_err = f"{model_name} returned {response.status_code}: {response.text[:200]}"
                logger.warning(f"Model {model_name} failed: {last_err}, trying next...")
        except Exception as e:
            last_err = str(e)
            logger.warning(f"Model {model_name} error: {e}, trying next...")

    raise RuntimeError(f"All Gemini models failed. Last error: {last_err}")

async def analyze_packaging_with_gemini(
    file_bytes_list: List[Tuple[str, bytes]],
    category: str = "Packaged Food",
    product_name_hint: Optional[str] = None
) -> Dict[str, Any]:
    """
    Primary analysis entry point. Accepts uploaded files (images or PDFs),
    prepares them for Gemini, evaluates against Legal Metrology rules, and standardizes output.
    """
    images_to_send: List[Tuple[str, str]] = []
    primary_image_bytes = None
    primary_width, primary_height = 400, 600

    for idx, (filename, file_bytes) in enumerate(file_bytes_list):
        mime = "image/jpeg"
        lower_name = filename.lower()
        if lower_name.endswith(".pdf"):
            # Convert PDF first page to PNG
            rendered_bytes, w, h = pdf_to_image(file_bytes)
            if idx == 0:
                primary_image_bytes = rendered_bytes
                primary_width, primary_height = w, h
            b64_str = base64.b64encode(rendered_bytes).decode("utf-8")
            images_to_send.append(("image/png", b64_str))
        else:
            if lower_name.endswith(".png"):
                mime = "image/png"
            elif lower_name.endswith(".webp"):
                mime = "image/webp"

            if idx == 0:
                primary_image_bytes = file_bytes
                primary_width, primary_height = get_image_dimensions(file_bytes)

            b64_str = base64.b64encode(file_bytes).decode("utf-8")
            images_to_send.append((mime, b64_str))

    prompt = get_compliance_prompt(product_category=category)
    if product_name_hint:
        prompt += f"\nProduct Name Hint provided: {product_name_hint}"

    try:
        gemini_result = call_gemini_vision(images_to_send, prompt)
    except Exception as e:
        logger.error(f"Gemini call failed: {e}. Generating fallback evaluation.")
        return fallback_evaluation(category, primary_width, primary_height, product_name_hint)

    # Transform normalized bounding boxes [ymin, xmin, ymax, xmax] (0-1000) to pixel [x1, y1, x2, y2]
    converted_ocr: List[Dict[str, Any]] = []
    for item in gemini_result.get("ocrResults", []):
        raw_bbox = item.get("bbox")
        pixel_bbox = [0, 0, 100, 30]
        if raw_bbox and len(raw_bbox) == 4:
            ymin, xmin, ymax, xmax = raw_bbox
            pixel_bbox = [
                int((xmin / 1000.0) * primary_width),
                int((ymin / 1000.0) * primary_height),
                int((xmax / 1000.0) * primary_width),
                int((ymax / 1000.0) * primary_height)
            ]
        converted_ocr.append({
            "text": item.get("text", ""),
            "confidence": float(item.get("confidence", 0.9)),
            "bbox": pixel_bbox
        })

    converted_compliance: List[Dict[str, Any]] = []
    for comp in gemini_result.get("complianceResults", []):
        raw_bbox = comp.get("bbox")
        pixel_bbox = None
        if raw_bbox and len(raw_bbox) == 4:
            ymin, xmin, ymax, xmax = raw_bbox
            pixel_bbox = [
                int((xmin / 1000.0) * primary_width),
                int((ymin / 1000.0) * primary_height),
                int((xmax / 1000.0) * primary_width),
                int((ymax / 1000.0) * primary_height)
            ]
        converted_compliance.append({
            "requirementId": comp.get("requirementId", "LM_RULE_UNKNOWN"),
            "label": comp.get("label", "Packaging Requirement"),
            "status": comp.get("status", "NEEDS_REVIEW"),
            "confidence": float(comp.get("confidence", 0.9)),
            "detected": comp.get("detected"),
            "reason": comp.get("reason", ""),
            "evidence": comp.get("evidence"),
            "source": comp.get("source", "Legal Metrology (Packaged Commodities) Rules, 2011"),
            "sourceSection": comp.get("sourceSection", "Rule 6"),
            "bbox": pixel_bbox
        })

    # Calculate deterministic overall score if missing
    score = gemini_result.get("overallScore")
    if score is None:
        passed = sum(1 for c in converted_compliance if c["status"] == "PASS")
        total = max(len(converted_compliance), 1)
        score = int((passed / total) * 100)

    overall_status = "PASS" if score >= 90 else "NEEDS_REVIEW" if score >= 70 else "POTENTIAL_ISSUE"

    return {
        "productName": gemini_result.get("productName", "Packaged Product"),
        "category": gemini_result.get("category", category),
        "score": score,
        "status": overall_status,
        "imageWidth": primary_width,
        "imageHeight": primary_height,
        "primaryImageBytes": primary_image_bytes,
        "extractedData": gemini_result.get("extractedData", {}),
        "ocrResults": converted_ocr,
        "complianceResults": converted_compliance,
        "summary": gemini_result.get("summary", "")
    }

def fallback_evaluation(category: str, width: int, height: int, product_name_hint: Optional[str] = None) -> Dict[str, Any]:
    """
    Fallback method in case of internet or quota interruption.
    Returns an honest unavailable result when the external analyzer cannot be reached.
    """
    return {
        "productName": product_name_hint or "Analyzed Package",
        "category": category,
        "score": 0,
        "status": "POTENTIAL_ISSUE",
        "imageWidth": width,
        "imageHeight": height,
        "primaryImageBytes": None,
        "extractedData": {},
        "ocrResults": [],
        "complianceResults": [],
        "summary": "External compliance analysis was unavailable; no declarations were verified."
    }
