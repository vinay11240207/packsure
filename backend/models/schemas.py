from typing import Literal, Optional, List, Dict, Any
from pydantic import BaseModel, Field

ScanStatus = Literal['PASS', 'NEEDS_REVIEW', 'POTENTIAL_ISSUE']

class OcrResult(BaseModel):
    text: str
    confidence: float
    bbox: List[int] = Field(..., description="[x1, y1, x2, y2] bounding box coordinates")

class ComplianceResult(BaseModel):
    requirementId: str
    label: str
    status: ScanStatus
    confidence: float
    detected: Optional[str] = None
    reason: str
    evidence: Optional[str] = None
    source: str
    sourceSection: str
    bbox: Optional[List[int]] = None

class ScanResponse(BaseModel):
    id: str
    productName: str
    category: str
    score: int
    status: ScanStatus
    imageUrl: str
    imageWidth: int = 400
    imageHeight: int = 600
    createdAt: str
    extractedData: Dict[str, Any] = {}
    ocrResults: List[OcrResult] = []
    complianceResults: List[ComplianceResult] = []

class ScanSummary(BaseModel):
    id: str
    productName: str
    category: str
    score: int
    status: ScanStatus
    createdAt: str
    thumb: str

class MonthScanStat(BaseModel):
    month: str
    scans: int
    passed: int
    issues: int

class CommonIssueStat(BaseModel):
    label: str
    percentage: int
    count: int

class CategoryStat(BaseModel):
    category: str
    percentage: int

class AnalyticsData(BaseModel):
    totalScans: int
    passRate: int
    avgScore: int
    issueRate: int
    scansOverTime: List[MonthScanStat]
    commonIssues: List[CommonIssueStat]
    categoryBreakdown: List[CategoryStat]
