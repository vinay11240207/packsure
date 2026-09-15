from typing import List, Tuple, Dict, Any
from models.schemas import ComplianceResult, OcrResult

# Legal Metrology (Packaged Commodities) Rules, 2011 mandatory declaration definitions
LEGAL_METROLOGY_RULES = {
    "mrp": {
        "label": "Maximum Retail Price (MRP)",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011",
        "section": "Rule 6(1)(f) — Retail sale price inclusive of all taxes",
    },
    "net_quantity": {
        "label": "Net Quantity Declaration",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011",
        "section": "Rule 6(1)(b) — Net quantity in standard units of weight/measure",
    },
    "manufacturer": {
        "label": "Name & Address of Manufacturer/Packer",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011",
        "section": "Rule 6(1)(a) — Name and complete address of the manufacturer",
    },
    "best_before": {
        "label": "Date of Manufacture / Expiry",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011",
        "section": "Rule 6(1)(c) — Month and year of manufacture or pre-packing",
    },
    "consumer_care": {
        "label": "Consumer Care Helpline",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011",
        "section": "Rule 6(1)(h) — Name, address, telephone number, email for complaints",
    },
    "country_of_origin": {
        "label": "Country of Origin",
        "source": "Legal Metrology (Packaged Commodities) Amendment Rules, 2017",
        "section": "Rule 6(1)(k) — Country of origin or manufacture",
    },
}

def evaluate_compliance(extracted_data: Dict[str, Any], ocr_results: List[OcrResult]) -> Tuple[List[ComplianceResult], int]:
    """
    Evaluates extracted packaging declarations deterministically.
    Returns evaluated compliance results and overall 0-100 score.
    """
    results = []
    for requirement_id, rule in LEGAL_METROLOGY_RULES.items():
        value = extracted_data.get(requirement_id)
        detected = str(value) if value else None
        results.append(ComplianceResult(
            requirementId=requirement_id,
            label=rule["label"],
            status="PASS" if detected else "POTENTIAL_ISSUE",
            confidence=0.9 if detected else 0.2,
            detected=detected,
            reason="Declaration detected in analyzed package data." if detected else "Mandatory declaration was not detected.",
            evidence=next((item.text for item in ocr_results if requirement_id.replace("_", " ") in item.text.lower()), None),
            source=rule["source"],
            sourceSection=rule["section"],
        ))
    return results, calculate_score(results)

def calculate_score(results: List[ComplianceResult]) -> int:
    if not results:
        return 0
    total = len(results)
    points = sum(
        20 if r.status == "PASS" else 10 if r.status == "NEEDS_REVIEW" else 0
        for r in results
    )
    return int((points / (total * 20)) * 100)
