from typing import List, Optional
from models.schemas import (
    ScanResponse,
    ScanSummary,
    OcrResult,
    ComplianceResult,
    AnalyticsData,
    MonthScanStat,
    CommonIssueStat,
    CategoryStat,
)

MOCK_DEMO_SCAN = ScanResponse(
    id="demo",
    productName="Terra Snacks Original",
    category="Packaged Food",
    score=74,
    status="POTENTIAL_ISSUE",
    imageUrl="/demo/product-label.svg",
    imageWidth=400,
    imageHeight=600,
    createdAt="Sep 14, 2026, 11:30 PM",
    extractedData={
        "product_name": "Terra Snacks Original Crunchy Tortilla Crisps",
        "mrp": "₹ 40.00",
        "net_quantity": "52 g",
        "country_of_origin": "India",
        "best_before": "6 months from packaging",
        "manufacturer": "ABC Foods India Pvt. Ltd., Plot 14, MIDC Industrial Area, Andheri (E), Mumbai 400072",
        "consumer_care": "NOT DETECTED",
    },
    ocrResults=[
        OcrResult(text="TERRA SNACKS", confidence=0.99, bbox=[35, 55, 365, 130]),
        OcrResult(text="Country of Origin: India", confidence=0.92, bbox=[30, 333, 235, 358]),
        OcrResult(text="MAX RETAIL PRICE ₹ 40.00", confidence=0.97, bbox=[240, 326, 393, 380]),
        OcrResult(text="Best Before: 6 months from packaging", confidence=0.81, bbox=[30, 363, 360, 390]),
        OcrResult(text="Net Qty: 52 g", confidence=0.95, bbox=[242, 386, 315, 410]),
        OcrResult(text="MANUFACTURED & MARKETED BY: ABC Foods India Pvt. Ltd.", confidence=0.93, bbox=[30, 449, 360, 492]),
    ],
    complianceResults=[
        ComplianceResult(
            requirementId="mrp",
            label="Maximum Retail Price (MRP)",
            status="PASS",
            confidence=0.97,
            detected="₹ 40.00 (inclusive of all taxes)",
            reason="MRP declaration clearly detected in bold type with high OCR confidence (97%). Complies with Rule 6(1)(f).",
            evidence='Detected text "MAX RETAIL PRICE ₹ 40.00" at coordinates [240, 326, 393, 380].',
            source="Legal Metrology (Packaged Commodities) Rules, 2011",
            sourceSection="Rule 6(1)(f) — Retail sale price of the package",
            bbox=[240, 326, 393, 380],
        ),
        ComplianceResult(
            requirementId="net_qty",
            label="Net Quantity Declaration",
            status="PASS",
            confidence=0.95,
            detected="52 g",
            reason="Net weight declared in standard metric units (grams). Positioned prominently and legible.",
            evidence='Detected text "Net Qty: 52 g" at coordinates [242, 386, 315, 410].',
            source="Legal Metrology (Packaged Commodities) Rules, 2011",
            sourceSection="Rule 6(1)(b) — Net quantity in standard units of weight/measure",
            bbox=[242, 386, 315, 410],
        ),
        ComplianceResult(
            requirementId="country_of_origin",
            label="Country of Origin",
            status="PASS",
            confidence=0.92,
            detected="India",
            reason="Country of origin is explicitly mentioned on the principal display panel.",
            evidence='Detected text "Country of Origin: India" at coordinates [30, 333, 235, 358].',
            source="Legal Metrology (Packaged Commodities) Amendment Rules, 2017",
            sourceSection="Rule 6(1)(k) — Country of origin or manufacture",
            bbox=[30, 333, 235, 358],
        ),
        ComplianceResult(
            requirementId="best_before",
            label="Date of Manufacture / Expiry",
            status="NEEDS_REVIEW",
            confidence=0.76,
            detected="6 months from packaging",
            reason='Relative best-before duration declared ("6 months from packaging") without a specific packaging month/year detected on label artwork. Requires human verification.',
            evidence='Detected text "Best Before: 6 months from packaging" at coordinates [30, 363, 360, 390]. Specific packing date stamp missing from printed mockup.',
            source="Legal Metrology (Packaged Commodities) Rules, 2011",
            sourceSection="Rule 6(1)(c) — Month and year in which commodity is manufactured or pre-packed",
            bbox=[30, 363, 360, 390],
        ),
        ComplianceResult(
            requirementId="manufacturer",
            label="Name and Complete Address of Manufacturer",
            status="PASS",
            confidence=0.93,
            detected="ABC Foods India Pvt. Ltd., Plot 14, MIDC Industrial Area, Andheri (E), Mumbai 400072",
            reason="Manufacturer entity and geographic address with postal PIN code (400072) successfully identified.",
            evidence="Detected full manufacturer block at coordinates [30, 449, 360, 492].",
            source="Legal Metrology (Packaged Commodities) Rules, 2011",
            sourceSection="Rule 6(1)(a) — Name and complete address of the manufacturer",
            bbox=[30, 449, 360, 492],
        ),
        ComplianceResult(
            requirementId="consumer_care",
            label="Consumer Care Helpline Details",
            status="POTENTIAL_ISSUE",
            confidence=0.89,
            detected=None,
            reason="Mandatory consumer contact details (telephone number, email address, or designated postal address for consumer complaints) were NOT detected on the package.",
            evidence="No consumer care phone number, email ID, or complaint address identified across all OCR text segments.",
            source="Legal Metrology (Packaged Commodities) Rules, 2011",
            sourceSection="Rule 6(1)(h) — Name, address, telephone number, and email of person or office for consumer complaints",
            bbox=None,
        ),
    ],
)

MOCK_HISTORY: List[ScanSummary] = [
    ScanSummary(id="scan-001", productName="Organic Oat Milk", category="Beverage carton", score=96, status="PASS", createdAt="Today, 10:42 AM", thumb="OM"),
    ScanSummary(id="scan-002", productName="PureGlow Serum", category="Cosmetic bottle", score=82, status="NEEDS_REVIEW", createdAt="Yesterday, 4:18 PM", thumb="PG"),
    ScanSummary(id="demo", productName="Terra Snacks Original", category="Flexible pouch", score=74, status="POTENTIAL_ISSUE", createdAt="Sep 14, 2026", thumb="TS"),
    ScanSummary(id="scan-004", productName="ABC Basmati Rice 5kg", category="Grains & Pulses", score=88, status="PASS", createdAt="Sep 10, 2026", thumb="BR"),
    ScanSummary(id="scan-005", productName="XYZ Herbal Shampoo", category="Personal Care", score=64, status="POTENTIAL_ISSUE", createdAt="Sep 08, 2026", thumb="HS"),
    ScanSummary(id="scan-006", productName="NutriBar Almond Plus", category="Packaged Food", score=91, status="PASS", createdAt="Sep 04, 2026", thumb="NB"),
]

MOCK_ANALYTICS = AnalyticsData(
    totalScans=248,
    passRate=75,
    avgScore=83,
    issueRate=8,
    scansOverTime=[
        MonthScanStat(month="Apr", scans=18, passed=14, issues=1),
        MonthScanStat(month="May", scans=24, passed=19, issues=2),
        MonthScanStat(month="Jun", scans=32, passed=26, issues=3),
        MonthScanStat(month="Jul", scans=45, passed=35, issues=4),
        MonthScanStat(month="Aug", scans=61, passed=48, issues=5),
        MonthScanStat(month="Sep", scans=68, passed=52, issues=5),
    ],
    commonIssues=[
        CommonIssueStat(label="Missing Consumer Care Helpline (Rule 6.1.h)", percentage=42, count=28),
        CommonIssueStat(label="Unreadable or Faint MRP Font (Rule 6.1.f)", percentage=21, count=14),
        CommonIssueStat(label="Relative Date without Packing Month/Year (Rule 6.1.c)", percentage=19, count=13),
        CommonIssueStat(label="Incomplete Manufacturer Address or PIN (Rule 6.1.a)", percentage=12, count=8),
        CommonIssueStat(label="Non-Standard Units of Weight/Measure (Rule 6.1.b)", percentage=6, count=4),
    ],
    categoryBreakdown=[
        CategoryStat(category="Packaged Food", percentage=44),
        CategoryStat(category="Beverages", percentage=24),
        CategoryStat(category="Cosmetics & Personal Care", percentage=18),
        CategoryStat(category="Household Commodities", percentage=14),
    ],
)

def get_mock_scan(scan_id: str) -> ScanResponse:
    return MOCK_DEMO_SCAN

def get_scan_history() -> List[ScanSummary]:
    return MOCK_HISTORY

def get_analytics() -> AnalyticsData:
    return MOCK_ANALYTICS
