from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models.db_models import ScanModel, ComplianceResultModel
from models.schemas import AnalyticsData

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

@router.get("", response_model=AnalyticsData)
async def fetch_analytics(db: Session = Depends(get_db)):
    """
    Returns platform compliance analytics, frequent violations, and scan volume trends.
    """
    scans = db.query(ScanModel).all()
    total = len(scans)
    passed = sum(scan.status == "PASS" for scan in scans)
    issues = sum(scan.status == "POTENTIAL_ISSUE" for scan in scans)
    average = round(sum(scan.score for scan in scans) / total) if total else 0
    issue_rows = db.query(ComplianceResultModel.label, func.count(ComplianceResultModel.id)).filter(
        ComplianceResultModel.status == "POTENTIAL_ISSUE"
    ).group_by(ComplianceResultModel.label).order_by(func.count(ComplianceResultModel.id).desc()).limit(5).all()
    return AnalyticsData(
        totalScans=total,
        passRate=round(passed / total * 100) if total else 0,
        avgScore=average,
        issueRate=round(issues / total * 100) if total else 0,
        scansOverTime=[],
        commonIssues=[{"label": label, "percentage": round(count / max(total, 1) * 100), "count": count} for label, count in issue_rows],
        categoryBreakdown=[],
    )
