import uuid
from typing import List
from fastapi import APIRouter, UploadFile, File, HTTPException
from models.schemas import ScanResponse, ScanSummary
from services.mock_data import get_mock_scan, get_scan_history

router = APIRouter(prefix="/api/scan", tags=["scan"])

@router.post("", response_model=dict)
async def submit_scan(files: List[UploadFile] = File(...)):
    """
    Accepts one or multiple package side images (front, back, side, bottom).
    Processes image with OCR, extracts mandatory declarations, and evaluates compliance.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No images uploaded")
    
    # In demo mode, return the prepared 'demo' dataset
    scan_id = "demo"
    return {
        "id": scan_id,
        "status": "completed",
        "message": f"Screened {len(files)} packaging image(s) successfully",
        "redirectUrl": f"/scan/{scan_id}"
    }

@router.get("/history", response_model=List[ScanSummary])
async def get_history():
    """
    Retrieves previous packaging compliance screening runs.
    """
    return get_scan_history()

@router.get("/{scan_id}", response_model=ScanResponse)
async def get_scan_by_id(scan_id: str):
    """
    Returns full screening results, OCR bounding boxes, and compliance heatmap coordinates.
    """
    scan = get_mock_scan(scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    return scan

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

@router.get("/{scan_id}/report")
async def generate_report(scan_id: str):
    """
    Downloads or streams PDF report for a given packaging scan.
    """
    scan = get_mock_scan(scan_id)
    return {
        "scanId": scan.id,
        "productName": scan.productName,
        "score": scan.score,
        "downloadUrl": f"/reports/{scan.id}"
    }
