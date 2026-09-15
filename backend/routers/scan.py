import os
import uuid
from typing import List, Optional, Dict
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.db_models import ScanModel, OcrResultModel, ComplianceResultModel
from models.schemas import ScanResponse, ScanSummary
from services.gemini_analyzer import analyze_packaging_with_gemini

router = APIRouter(prefix="/api/scan", tags=["scan"])

# In-memory storage cache for live scans
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
def scan_to_response(scan: ScanModel) -> ScanResponse:
    return ScanResponse(
        id=scan.id,
        productName=scan.product_name,
        category=scan.category,
        score=scan.score,
        status=scan.status,
        imageUrl=scan.image_url,
        imageWidth=scan.image_width or 400,
        imageHeight=scan.image_height or 600,
        createdAt=scan.created_at.isoformat() if scan.created_at else "",
        extractedData=scan.extracted_data or {},
        ocrResults=[{"text": item.text, "confidence": item.confidence, "bbox": item.bbox} for item in scan.ocr_results],
        complianceResults=[{
            "requirementId": item.requirement_id,
            "label": item.label,
            "status": item.status,
            "confidence": item.confidence,
            "detected": item.detected,
            "reason": item.reason,
            "evidence": item.evidence,
            "source": item.source,
            "sourceSection": item.source_section,
            "bbox": item.bbox,
        } for item in scan.compliance_results],
    )

@router.post("", response_model=dict)
async def submit_scan(
    files: List[UploadFile] = File(...),
    category: Optional[str] = Form("Packaged Food"),
    productName: Optional[str] = Form(None),
    db: Session = Depends(get_db),
):
    """
    Accepts package image(s) or PDF artwork.
    Evaluates packaging against Government Legal Metrology Rules using Gemini LLM.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No images or files uploaded")
    
    file_bytes_list = []
    for f in files:
        content = await f.read()
        file_bytes_list.append((f.filename or "upload.jpg", content))

    scan_id = f"scan_{uuid.uuid4().hex[:8]}"

    # Run LLM evaluation with Gemini
    result = await analyze_packaging_with_gemini(
        file_bytes_list=file_bytes_list,
        category=category or "Packaged Food",
        product_name_hint=productName
    )

    # Save primary image to uploads directory
    image_filename = f"{scan_id}.png"
    image_path = os.path.join(UPLOAD_DIR, image_filename)
    if result.get("primaryImageBytes"):
        with open(image_path, "wb") as img_file:
            img_file.write(result["primaryImageBytes"])
        image_url = f"/uploads/{image_filename}"
    else:
        # Fallback to demo mockup if no image was extracted
        image_url = "/demo/product-label.svg"

    # Construct ScanResponse
    scan_obj = ScanResponse(
        id=scan_id,
        productName=result.get("productName", "Screened Package"),
        category=result.get("category", category or "Packaged Commodity"),
        score=result.get("score", 75),
        status=result.get("status", "NEEDS_REVIEW"),
        imageUrl=image_url,
        imageWidth=result.get("imageWidth", 400),
        imageHeight=result.get("imageHeight", 600),
        createdAt="Just now",
        extractedData=result.get("extractedData", {}),
        ocrResults=result.get("ocrResults", []),
        complianceResults=result.get("complianceResults", [])
    )

    db_scan = ScanModel(
        id=scan_id,
        product_name=scan_obj.productName,
        category=scan_obj.category,
        score=scan_obj.score,
        status=scan_obj.status,
        image_url=scan_obj.imageUrl,
        image_width=scan_obj.imageWidth,
        image_height=scan_obj.imageHeight,
        extracted_data=scan_obj.extractedData,
    )
    db_scan.ocr_results = [OcrResultModel(text=item.text, confidence=item.confidence, bbox=item.bbox) for item in scan_obj.ocrResults]
    db_scan.compliance_results = [ComplianceResultModel(
        requirement_id=item.requirementId,
        label=item.label,
        status=item.status,
        confidence=item.confidence,
        detected=item.detected,
        reason=item.reason,
        evidence=item.evidence,
        source=item.source,
        source_section=item.sourceSection,
        bbox=item.bbox,
    ) for item in scan_obj.complianceResults]
    db.add(db_scan)
    db.commit()

    return {
        "id": scan_id,
        "status": "completed",
        "productName": scan_obj.productName,
        "score": scan_obj.score,
        "category": scan_obj.category,
        "message": f"Screened {len(files)} file(s) with Gemini AI successfully",
        "redirectUrl": f"/scan/{scan_id}"
    }

@router.get("/history", response_model=List[ScanSummary])
async def get_history(db: Session = Depends(get_db)):
    """
    Retrieves previous packaging compliance screening runs.
    """
    scans = db.query(ScanModel).order_by(ScanModel.created_at.desc()).all()
    return [ScanSummary(
        id=scan.id,
        productName=scan.product_name,
        category=scan.category,
        score=scan.score,
        status=scan.status,
        createdAt=scan.created_at.isoformat() if scan.created_at else "",
        thumb=scan.image_url,
    ) for scan in scans]

@router.get("/regulations")
async def get_regulations():
    """
    Retrieves live regulatory rules directly from your Hostinger MySQL database.
    """
    try:
        from database import SessionLocal
        from sqlalchemy import text
        with SessionLocal() as db:
            rows = db.execute(text("SELECT rule_id, title, category, requirement, section, source FROM regulations")).fetchall()
            return [
                {
                    "rule_id": r[0],
                    "title": r[1],
                    "category": r[2],
                    "requirement": r[3],
                    "section": r[4],
                    "source": r[5],
                }
                for r in rows
            ]
    except Exception as e:
        return {"error": str(e), "fallback": "Using mock rules"}

@router.get("/{scan_id}", response_model=ScanResponse)
async def get_scan_by_id(scan_id: str, db: Session = Depends(get_db)):
    """
    Returns full screening results, OCR bounding boxes, and compliance heatmap coordinates.
    """
    scan = db.query(ScanModel).filter(ScanModel.id == scan_id).first()
    if scan is None:
        raise HTTPException(status_code=404, detail="Scan not found")
    return scan_to_response(scan)

@router.get("/{scan_id}/report")
async def generate_report(scan_id: str, db: Session = Depends(get_db)):
    """
    Downloads or streams PDF report for a given packaging scan.
    """
    scan = db.query(ScanModel).filter(ScanModel.id == scan_id).first()
    if scan is None:
        raise HTTPException(status_code=404, detail="Scan not found")
    return {
        "scanId": scan.id,
        "productName": scan.product_name,
        "score": scan.score,
        "downloadUrl": f"/reports/{scan.id}",
    }
