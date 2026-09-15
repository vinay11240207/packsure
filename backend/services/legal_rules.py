"""
PackSure AI - Legal Metrology Regulatory Knowledge Base
Codifies the Legal Metrology (Packaged Commodities) Rules, 2011
and Amendments from 2011 to 2026 as published in The Gazette of India.
"""

from typing import Dict, Any, List

LEGAL_METROLOGY_REGULATIONS: Dict[str, Dict[str, Any]] = {
    "mrp": {
        "ruleId": "LM_RULE_6_1_E",
        "label": "Maximum Retail Price (MRP)",
        "section": "Rule 6(1)(e) & Rule 18",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011 (amended 2017 & 2021)",
        "description": "Retail sale price of the package shall clearly indicate that it is the maximum retail price inclusive of all taxes in Indian currency (₹ or Rs.). Must be rounded off to the nearest rupee or 50 paise.",
        "valid_formats": [
            "MRP Rs. XX.XX (incl. of all taxes)",
            "Maximum Retail Price ₹ XX.XX (inclusive of all taxes)",
            "MRP ₹ XX.XX incl. of all taxes"
        ],
        "mandatory": True
    },
    "unit_sale_price": {
        "ruleId": "LM_RULE_6_11",
        "label": "Unit Sale Price (USP)",
        "section": "Rule 6(11) (2021 Amendment G.S.R. 779(E) & 2022 G.S.R. 226(E))",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011",
        "description": "Unit sale price in rupees rounded to 2 decimal places: per g (if < 1kg) or per kg (if >= 1kg); per ml (if < 1L) or per litre (if >= 1L); per cm (if < 1m) or per metre (if >= 1m); or per number/unit. Exempt if retail price equals unit price or for combo/group/multi-piece packages (2023 Amendment).",
        "mandatory": True
    },
    "net_quantity": {
        "ruleId": "LM_RULE_6_1_C",
        "label": "Net Quantity Declaration",
        "section": "Rule 6(1)(c) & Rules 11, 12, 13",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011",
        "description": "Net quantity in standard SI metric units (g, kg, ml, l, cm, m) or number. Must NOT contain deceptive words like 'approx', 'minimum', 'when packed', or exaggerated terms (Rule 12(6)).",
        "mandatory": True
    },
    "manufacturer_address": {
        "ruleId": "LM_RULE_6_1_A",
        "label": "Manufacturer / Packer / Importer Details",
        "section": "Rule 6(1)(a) & Rule 10",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011 (amended 2017)",
        "description": "Name and complete address of manufacturer, packer, or importer. Complete address MUST include premises/street, city, state, and Postal Index Number (PIN) Code.",
        "mandatory": True
    },
    "country_of_origin": {
        "ruleId": "LM_RULE_6_1_AA",
        "label": "Country of Origin",
        "section": "Rule 6(1)(aa)",
        "source": "Legal Metrology (Packaged Commodities) Amendment Rules, 2017 (G.S.R. 629(E))",
        "description": "Mandatory declaration of country of origin or manufacture or assembly, particularly required for imported products.",
        "mandatory": True
    },
    "commodity_name": {
        "ruleId": "LM_RULE_6_1_B",
        "label": "Generic or Common Commodity Name",
        "section": "Rule 6(1)(b)",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011",
        "description": "The common or generic names of the commodity contained in the package. If containing more than one product, the name and number or quantity of each must be listed.",
        "mandatory": True
    },
    "date_of_manufacture": {
        "ruleId": "LM_RULE_6_1_D",
        "label": "Date of Manufacture / Packing",
        "section": "Rule 6(1)(d)",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011 (amended 2021)",
        "description": "The month and year in which the commodity is manufactured or pre-packed. Electronic spare parts must have visible and legible month/year on retail package (2023 Amendment).",
        "mandatory": True
    },
    "expiry_best_before": {
        "ruleId": "LM_RULE_6_1_DA",
        "label": "Best Before / Expiry Date",
        "section": "Rule 6(1)(da)",
        "source": "Legal Metrology (Packaged Commodities) Amendment Rules, 2017 (G.S.R. 629(E))",
        "description": "If commodity may become unfit for human consumption after a period of time, 'Best before or use by the date, month and year' must be explicitly stated.",
        "mandatory": False
    },
    "consumer_care": {
        "ruleId": "LM_RULE_6_2",
        "label": "Consumer Care Helpline & Contacts",
        "section": "Rule 6(2)",
        "source": "Legal Metrology (Packaged Commodities) Rules, 2011 (amended 2015 & 2017)",
        "description": "Name, address, telephone number, and email address of the person or office that can be contacted in case of consumer complaints.",
        "mandatory": True
    },
    "veg_nonveg_symbol": {
        "ruleId": "LM_RULE_6_8",
        "label": "Vegetarian / Non-Vegetarian Origin Indicator",
        "section": "Rule 6(8) (2014 Amendment G.S.R. 137)",
        "source": "Legal Metrology (Packaged Commodities) (Amendment) Rules, 2014",
        "description": "Every package containing soap, shampoos, tooth pastes and other cosmetics and toiletries shall bear at the top of its principal display panel a red/brown dot for non-vegetarian origin and green dot for vegetarian origin.",
        "mandatory": False
    },
    "font_height_pdp": {
        "ruleId": "LM_RULE_7_TABLE_I",
        "label": "Letter & Numeral Font Height (PDP)",
        "section": "Rule 7 & Table-I",
        "source": "Legal Metrology (Packaged Commodities) Amendment Rules, 2017 (G.S.R. 629(E))",
        "description": "Minimum height of numerals/letters on Principal Display Panel: Area < 50 cm²: min 1.0mm; 50-100 cm²: 1.5mm; 100-500 cm²: 2.5mm; 500-2500 cm²: 4.0mm; >2500 cm²: 6.0mm. Width must not be less than 1/3rd of height (except for '1', 'i', 'I', 'l').",
        "mandatory": True
    },
    "electronic_qr_code": {
        "ruleId": "LM_RULE_6_ELEC_QR",
        "label": "Electronic Goods QR Code Declarations",
        "section": "Rule 6 Provisos (2022 G.S.R. 577(E) & 2023 G.S.R. 456(E))",
        "source": "Legal Metrology (Packaged Commodities) (Amendment) Rules, 2023",
        "description": "Electronic products may declare manufacturer address, generic name, size and dimensions through a scannable QR code, PROVIDED the manufacturer name, MRP, customer care phone and email are physically printed on the package.",
        "mandatory": False
    }
}

def get_compliance_prompt(product_category: str = "Packaged Commodity") -> str:
    """
    Returns the comprehensive Legal Metrology prompt for Gemini LLM evaluation.
    """
    rules_text = ""
    for key, rule in LEGAL_METROLOGY_REGULATIONS.items():
        rules_text += f"""
- [{rule['ruleId']}] {rule['label']}
  Section: {rule['section']}
  Statutory Requirement: {rule['description']}
"""

    prompt = f"""You are PackSure AI, an expert statutory legal metrology compliance auditor specializing in the Indian Legal Metrology (Packaged Commodities) Rules, 2011 and all subsequent government gazette amendments through 2026.

Analyze the provided packaging image(s) or artwork for a product in category: "{product_category}".

Examine every side and text element visible on the packaging against these official Government of India regulations:
{rules_text}

For each statutory requirement, thoroughly verify compliance:
1. Maximum Retail Price (Rule 6(1)(e)):
   - Check if currency is ₹ or Rs.
   - Check if phrase "inclusive of all taxes" or "incl. of all taxes" is present.
   - Check if properly rounded.
2. Unit Sale Price (Rule 6(11)):
   - Check if declared (e.g. ₹ 0.45 per g, ₹ 45.00 per 100g/kg, ₹ 1.20 per ml).
3. Net Quantity (Rule 6(1)(c), Rules 11-13):
   - Check standard metric unit (g, kg, ml, l, cm, m, N).
   - Verify absence of non-compliant terms like 'approx', 'when packed'.
4. Manufacturer / Packer Details (Rule 6(1)(a) & Rule 10):
   - Complete legal name and full address.
   - Must include PIN Code. If PIN code is missing, mark as NEEDS_REVIEW or POTENTIAL_ISSUE.
5. Country of Origin (Rule 6(1)(aa)):
   - Check if 'Made in India' or 'Country of Origin: [Country]' is declared.
6. Date of Manufacture / Expiry (Rule 6(1)(d) & 6(1)(da)):
   - Month & Year of manufacture.
   - Best before / Expiry date if perishable or cosmetics.
7. Consumer Care (Rule 6(2)):
   - Name/Designation, postal address, customer care telephone/mobile, and email address.
8. Generic Name (Rule 6(1)(b)):
   - Common name of commodity prominently declared.
9. Veg / Non-Veg Logo (Rule 6(8)) if food, cosmetic, soap, toothpaste:
   - Green or brown dot inside square.

You MUST respond strictly with a valid JSON object following this exact JSON schema:
{{
  "productName": "Extracted or inferred product name",
  "category": "{product_category}",
  "overallScore": 85,
  "overallStatus": "PASS" | "NEEDS_REVIEW" | "POTENTIAL_ISSUE",
  "summary": "2-3 sentence executive compliance summary citing strengths and gaps.",
  "extractedData": {{
    "mrp": "...",
    "unitSalePrice": "...",
    "netQuantity": "...",
    "manufacturer": "...",
    "countryOfOrigin": "...",
    "commodityName": "...",
    "dateOfManufacture": "...",
    "expiryDate": "...",
    "consumerCare": "..."
  }},
  "ocrResults": [
    {{
      "text": "Exact text line detected",
      "confidence": 0.95,
      "bbox": [ymin, xmin, ymax, xmax]
    }}
  ],
  "complianceResults": [
    {{
      "requirementId": "LM_RULE_6_1_E",
      "label": "Maximum Retail Price (MRP)",
      "status": "PASS" | "NEEDS_REVIEW" | "POTENTIAL_ISSUE",
      "confidence": 0.95,
      "detected": "MRP ₹ 45.00 (inclusive of all taxes)",
      "reason": "Clear explanation citing the rule and why it passed or failed.",
      "evidence": "Exact detected text or visual finding",
      "source": "Legal Metrology (Packaged Commodities) Rules, 2011",
      "sourceSection": "Rule 6(1)(e)",
      "bbox": [ymin, xmin, ymax, xmax]
    }}
  ]
}}

Ensure all bounding boxes use normalized coordinates [ymin, xmin, ymax, xmax] from 0 to 1000 relative to the image height and width.
Only output valid JSON, without markdown blocks or preamble.
"""
    return prompt
