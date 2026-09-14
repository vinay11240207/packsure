from fastapi import APIRouter
from models.schemas import AnalyticsData
from services.mock_data import get_analytics

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

@router.get("", response_model=AnalyticsData)
async def fetch_analytics():
    """
    Returns platform compliance analytics, frequent violations, and scan volume trends.
    """
    return get_analytics()
