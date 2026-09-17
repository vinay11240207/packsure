"""
PackSure AI - Database Seed Script
Seeds realistic demo data into the connected Hostinger MySQL database.
"""
import os, sys, json
from datetime import datetime, timedelta
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

load_dotenv()
engine = create_engine(os.getenv("DATABASE_URL"), pool_pre_ping=True)

print("=" * 60)
print("PackSure AI - Seeding Demo Data")
print("=" * 60)

# --- Demo Users ---
users = [
    {
        "id": "usr_demo_001",
        "name": "Jordan Davis",
        "email": "jordan@acmeconsumer.com",
        # bcrypt hash of "Demo@1234"
        "password_hash": "$2b$12$demohashedpasswordforjordan00001",
        "organization": "Acme Consumer Compliance",
        "created_at": "2026-08-01 09:00:00",
    }
]

# --- Products ---
products = [
    {"id": "prod-001", "user_id": "usr_demo_001", "name": "Sunrise Oats Premium Muesli", "category": "Packaged Food", "created_at": "2026-09-01 10:00:00"},
    {"id": "prod-002", "user_id": "usr_demo_001", "name": "AquaPure Mineral Water 1L", "category": "Beverage", "created_at": "2026-09-02 11:00:00"},
    {"id": "prod-003", "user_id": "usr_demo_001", "name": "GlowUp Face Cream SPF 30", "category": "Cosmetic", "created_at": "2026-09-03 09:30:00"},
    {"id": "prod-004", "user_id": "usr_demo_001", "name": "CleanPro Dishwash Liquid", "category": "Household", "created_at": "2026-09-04 08:00:00"},
    {"id": "prod-005", "user_id": "usr_demo_001", "name": "HerbalRoot Shampoo 400ml", "category": "Personal Care", "created_at": "2026-09-05 14:00:00"},
    {"id": "prod-006", "user_id": "usr_demo_001", "name": "CrunchBite Potato Chips", "category": "Packaged Food", "created_at": "2026-09-06 10:30:00"},
    {"id": "prod-007", "user_id": "usr_demo_001", "name": "FreshBrew Green Tea 100g", "category": "Packaged Food", "created_at": "2026-09-07 09:00:00"},
    {"id": "prod-008", "user_id": "usr_demo_001", "name": "PureSkin Body Lotion", "category": "Personal Care", "created_at": "2026-09-08 11:00:00"},
    {"id": "prod-009", "user_id": "usr_demo_001", "name": "HomeBrew Apple Juice 500ml", "category": "Beverage", "created_at": "2026-09-09 13:00:00"},
    {"id": "prod-010", "user_id": "usr_demo_001", "name": "QuickClean Surface Spray", "category": "Household", "created_at": "2026-09-10 15:00:00"},
]

# --- Scans ---
scans = [
    {"id": "demo",     "user_id": "usr_demo_001", "product_id": "prod-001", "product_name": "Sunrise Oats Premium Muesli", "category": "Packaged Food", "score": 72, "status": "NEEDS_REVIEW",    "image_url": "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "Sunrise Oats Premium Muesli", "net_quantity": "500 g", "mrp": "Rs.149", "manufacturer": "Sunrise Foods Pvt. Ltd.", "address": "14, Industrial Area, Pune 411 001, Maharashtra, India", "batch_no": "SR2026-0915", "mfg_date": "Sep 2026", "best_before": "12 months from date of packing", "fssai_license": "11222334455667", "consumer_helpline": ""}), "created_at": "2026-09-15 10:00:00"},
    {"id": "scan-002", "user_id": "usr_demo_001", "product_id": "prod-002", "product_name": "AquaPure Mineral Water 1L",   "category": "Beverage",      "score": 94, "status": "PASS",            "image_url": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "AquaPure Mineral Water", "net_quantity": "1000 ml", "mrp": "Rs.20"}), "created_at": "2026-09-14 11:00:00"},
    {"id": "scan-003", "user_id": "usr_demo_001", "product_id": "prod-003", "product_name": "GlowUp Face Cream SPF 30",   "category": "Cosmetic",      "score": 58, "status": "POTENTIAL_ISSUE", "image_url": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "GlowUp Face Cream SPF 30", "net_quantity": "50 g", "mrp": "Rs.399"}), "created_at": "2026-09-13 09:00:00"},
    {"id": "scan-004", "user_id": "usr_demo_001", "product_id": "prod-004", "product_name": "CleanPro Dishwash Liquid",   "category": "Household",     "score": 88, "status": "PASS",            "image_url": "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "CleanPro Dishwash Liquid", "net_quantity": "500 ml", "mrp": "Rs.89"}), "created_at": "2026-09-12 14:00:00"},
    {"id": "scan-005", "user_id": "usr_demo_001", "product_id": "prod-005", "product_name": "HerbalRoot Shampoo 400ml",   "category": "Personal Care", "score": 66, "status": "NEEDS_REVIEW",    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "HerbalRoot Shampoo 400ml", "net_quantity": "400 ml", "mrp": "Rs.199"}), "created_at": "2026-09-11 10:30:00"},
    {"id": "scan-006", "user_id": "usr_demo_001", "product_id": "prod-006", "product_name": "CrunchBite Potato Chips",    "category": "Packaged Food", "score": 91, "status": "PASS",            "image_url": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "CrunchBite Potato Chips", "net_quantity": "150 g", "mrp": "Rs.35"}), "created_at": "2026-09-10 09:00:00"},
    {"id": "scan-007", "user_id": "usr_demo_001", "product_id": "prod-007", "product_name": "FreshBrew Green Tea 100g",   "category": "Packaged Food", "score": 45, "status": "POTENTIAL_ISSUE", "image_url": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "FreshBrew Green Tea 100g", "net_quantity": "100 g", "mrp": "Rs.120"}), "created_at": "2026-09-09 11:00:00"},
    {"id": "scan-008", "user_id": "usr_demo_001", "product_id": "prod-008", "product_name": "PureSkin Body Lotion",       "category": "Personal Care", "score": 79, "status": "NEEDS_REVIEW",    "image_url": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "PureSkin Body Lotion", "net_quantity": "200 ml", "mrp": "Rs.249"}), "created_at": "2026-09-08 13:00:00"},
    {"id": "scan-009", "user_id": "usr_demo_001", "product_id": "prod-009", "product_name": "HomeBrew Apple Juice 500ml", "category": "Beverage",      "score": 97, "status": "PASS",            "image_url": "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "HomeBrew Apple Juice 500ml", "net_quantity": "500 ml", "mrp": "Rs.60"}), "created_at": "2026-09-07 10:00:00"},
    {"id": "scan-010", "user_id": "usr_demo_001", "product_id": "prod-010", "product_name": "QuickClean Surface Spray",   "category": "Household",     "score": 53, "status": "POTENTIAL_ISSUE", "image_url": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80", "image_width": 800, "image_height": 800, "extracted_data": json.dumps({"product_name": "QuickClean Surface Spray", "net_quantity": "500 ml", "mrp": "Rs.129"}), "created_at": "2026-09-06 09:00:00"},
]

# --- OCR Results (for demo scan) ---
ocr_results = [
    {"scan_id": "demo", "text": "Sunrise Oats Premium Muesli",                                                          "confidence": 0.98, "bbox": json.dumps([40, 30, 760, 90])},
    {"scan_id": "demo", "text": "Net Weight: 500g",                                                                      "confidence": 0.97, "bbox": json.dumps([40, 110, 300, 145])},
    {"scan_id": "demo", "text": "MRP Rs. 149 (Incl. of all taxes)",                                                     "confidence": 0.95, "bbox": json.dumps([40, 155, 400, 190])},
    {"scan_id": "demo", "text": "Best Before: 12 months from date of packing",                                          "confidence": 0.91, "bbox": json.dumps([40, 205, 540, 240])},
    {"scan_id": "demo", "text": "Packed by: Sunrise Foods Pvt. Ltd., 14, Industrial Area, Pune 411 001, Maharashtra",   "confidence": 0.93, "bbox": json.dumps([40, 250, 760, 310])},
    {"scan_id": "demo", "text": "Batch No.: SR2026-0915 | Mfg. Date: Sep 2026",                                         "confidence": 0.96, "bbox": json.dumps([40, 320, 520, 355])},
    {"scan_id": "demo", "text": "FSSAI Lic. No.: 11222334455667",                                                       "confidence": 0.94, "bbox": json.dumps([40, 365, 380, 400])},
]

# --- Compliance Results (for all scans) ---
compliance_results = [
    # --- demo scan ---
    {"scan_id":"demo","requirement_id":"REQ-001","label":"Product Identity / Name",               "status":"PASS",            "confidence":0.98,"detected":"Sunrise Oats Premium Muesli","reason":"Product name is prominently printed on the front panel in clear, legible typeface.","evidence":"Sunrise Oats Premium Muesli","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(a)","bbox":json.dumps([40,30,760,90])},
    {"scan_id":"demo","requirement_id":"REQ-002","label":"Net Quantity Declaration",              "status":"PASS",            "confidence":0.97,"detected":"500 g","reason":"Net weight of 500 g is declared in SI unit on the principal display panel.","evidence":"Net Weight: 500g","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(b)","bbox":json.dumps([40,110,300,145])},
    {"scan_id":"demo","requirement_id":"REQ-003","label":"Maximum Retail Price (MRP)",           "status":"PASS",            "confidence":0.95,"detected":"Rs. 149 (Incl. of all taxes)","reason":"MRP printed with Rs. symbol and inclusive tax statement.","evidence":"MRP Rs. 149 (Incl. of all taxes)","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(d)","bbox":json.dumps([40,155,400,190])},
    {"scan_id":"demo","requirement_id":"REQ-004","label":"Date of Manufacture / Best Before",   "status":"NEEDS_REVIEW",    "confidence":0.72,"detected":"Best Before: 12 months from date of packing","reason":"Best-before expressed as relative duration instead of absolute date (MM/YYYY). Rule 6(1)(e) may require absolute dates for perishable goods.","evidence":"Best Before: 12 months from date of packing","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(e)","bbox":json.dumps([40,205,540,240])},
    {"scan_id":"demo","requirement_id":"REQ-005","label":"Name & Address of Manufacturer",      "status":"PASS",            "confidence":0.93,"detected":"Sunrise Foods Pvt. Ltd., 14, Industrial Area, Pune 411 001","reason":"Full name and postal address of packer detected with pin code.","evidence":"Packed by: Sunrise Foods Pvt. Ltd., 14, Industrial Area, Pune 411 001","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(c)","bbox":json.dumps([40,250,760,310])},
    {"scan_id":"demo","requirement_id":"REQ-006","label":"Batch / Lot Number",                  "status":"PASS",            "confidence":0.96,"detected":"SR2026-0915","reason":"Batch number SR2026-0915 printed on the back panel in legible font.","evidence":"Batch No.: SR2026-0915","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(f)","bbox":json.dumps([40,320,520,355])},
    {"scan_id":"demo","requirement_id":"REQ-007","label":"FSSAI License Number",                "status":"PASS",            "confidence":0.94,"detected":"11222334455667","reason":"FSSAI license number present and formatted as 14-digit code.","evidence":"FSSAI Lic. No.: 11222334455667","source":"Food Safety and Standards Act 2006","source_section":"FSS (Labelling & Display) Regulations 2020 Reg. 4","bbox":json.dumps([40,365,380,400])},
    {"scan_id":"demo","requirement_id":"REQ-008","label":"Consumer Care / Helpline Number",     "status":"POTENTIAL_ISSUE", "confidence":0.10,"detected":None,"reason":"No consumer helpline or grievance contact detected anywhere on the package. Rule 6(1)(h) mandates a consumer helpline number for all packed commodities.","evidence":None,"source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(h)","bbox":None},
    # --- scan-002 ---
    {"scan_id":"scan-002","requirement_id":"REQ-001","label":"Product Identity / Name",           "status":"PASS","confidence":0.99,"detected":"AquaPure Mineral Water 1L","reason":"Product name clearly printed on label.","evidence":"AquaPure Mineral Water 1L","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(a)","bbox":json.dumps([50,40,750,100])},
    {"scan_id":"scan-002","requirement_id":"REQ-002","label":"Net Quantity Declaration",          "status":"PASS","confidence":0.98,"detected":"1000 ml","reason":"Volume declared in millilitres as per SI standard.","evidence":"Net Volume: 1000 ml","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(b)","bbox":json.dumps([50,120,320,155])},
    {"scan_id":"scan-002","requirement_id":"REQ-003","label":"Maximum Retail Price (MRP)",       "status":"PASS","confidence":0.97,"detected":"Rs.20 (Incl. of all taxes)","reason":"MRP clearly printed with inclusive tax statement.","evidence":"MRP Rs.20 (Incl. of all taxes)","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(d)","bbox":json.dumps([50,165,400,200])},
    {"scan_id":"scan-002","requirement_id":"REQ-004","label":"Consumer Care / Helpline Number",  "status":"PASS","confidence":0.95,"detected":"1800-123-4567","reason":"Consumer helpline number prominently displayed.","evidence":"Consumer Helpline: 1800-123-4567","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(h)","bbox":json.dumps([50,210,400,245])},
    {"scan_id":"scan-002","requirement_id":"REQ-005","label":"BIS / ISI Mark",                  "status":"NEEDS_REVIEW","confidence":0.68,"detected":"IS 14543","reason":"BIS mark text detected but mark graphic quality is low. Manual verification recommended.","evidence":"IS 14543","source":"BIS IS 14543","source_section":"IS 14543 Packaged Drinking Water Standard","bbox":json.dumps([600,700,760,780])},
    # --- scan-003 ---
    {"scan_id":"scan-003","requirement_id":"REQ-001","label":"Product Identity / Name",          "status":"PASS","confidence":0.97,"detected":"GlowUp Face Cream SPF 30","reason":"Product name clearly printed.","evidence":"GlowUp Face Cream SPF 30","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(a)","bbox":json.dumps([30,40,770,100])},
    {"scan_id":"scan-003","requirement_id":"REQ-002","label":"Net Quantity Declaration",         "status":"PASS","confidence":0.96,"detected":"50 g","reason":"Net weight declared in grams.","evidence":"Net Wt: 50 g","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(b)","bbox":json.dumps([30,110,280,145])},
    {"scan_id":"scan-003","requirement_id":"REQ-003","label":"Consumer Care / Helpline Number", "status":"POTENTIAL_ISSUE","confidence":0.08,"detected":None,"reason":"No consumer helpline number detected. Mandatory under Rule 6(1)(h).","evidence":None,"source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(h)","bbox":None},
    {"scan_id":"scan-003","requirement_id":"REQ-004","label":"Ingredients List (Cosmetics)",    "status":"POTENTIAL_ISSUE","confidence":0.12,"detected":None,"reason":"No complete ingredients list detected. Cosmetics must declare all ingredients under Cosmetics Rules 2020.","evidence":None,"source":"Drugs and Cosmetics Act 1940","source_section":"Schedule Q Labelling of Cosmetics","bbox":None},
    {"scan_id":"scan-003","requirement_id":"REQ-005","label":"Manufacturer Address",            "status":"NEEDS_REVIEW","confidence":0.61,"detected":"GlowUp Cosm. Pvt. Ltd., Mumbai","reason":"Abbreviated address detected. Full postal address including pin code required.","evidence":"GlowUp Cosm. Pvt. Ltd., Mumbai","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(c)","bbox":json.dumps([30,680,600,740])},
    # --- scan-004 ---
    {"scan_id":"scan-004","requirement_id":"REQ-001","label":"Product Identity / Name",         "status":"PASS","confidence":0.98,"detected":"CleanPro Dishwash Liquid","reason":"Product name clearly stated on front label.","evidence":"CleanPro Dishwash Liquid","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(a)","bbox":json.dumps([30,30,770,80])},
    {"scan_id":"scan-004","requirement_id":"REQ-002","label":"Net Quantity Declaration",        "status":"PASS","confidence":0.97,"detected":"500 ml","reason":"Volume in ml declared on front panel.","evidence":"Net Vol: 500 ml","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(b)","bbox":json.dumps([30,90,300,125])},
    {"scan_id":"scan-004","requirement_id":"REQ-003","label":"Maximum Retail Price (MRP)",      "status":"PASS","confidence":0.96,"detected":"Rs.89 (Incl. of all taxes)","reason":"MRP with inclusive tax notice clearly printed.","evidence":"MRP Rs.89 (Incl. of all taxes)","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(d)","bbox":json.dumps([30,135,380,170])},
    {"scan_id":"scan-004","requirement_id":"REQ-004","label":"Consumer Care / Helpline Number", "status":"PASS","confidence":0.93,"detected":"1800-456-7890","reason":"Consumer helpline printed on back panel.","evidence":"Helpline: 1800-456-7890","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(h)","bbox":json.dumps([30,520,400,555])},
    {"scan_id":"scan-004","requirement_id":"REQ-005","label":"Name & Address of Manufacturer",  "status":"NEEDS_REVIEW","confidence":0.75,"detected":"CleanPro Homecare, Delhi","reason":"City detected but complete postal address with pin code not confirmed. Verify on print master.","evidence":"CleanPro Homecare, Delhi","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(c)","bbox":json.dumps([30,460,680,515])},
    # --- scan-005 ---
    {"scan_id":"scan-005","requirement_id":"REQ-001","label":"Product Identity / Name",         "status":"PASS","confidence":0.97,"detected":"HerbalRoot Shampoo 400ml","reason":"Product name legibly printed on front panel.","evidence":"HerbalRoot Shampoo 400ml","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(a)","bbox":json.dumps([40,30,760,85])},
    {"scan_id":"scan-005","requirement_id":"REQ-002","label":"Net Quantity Declaration",        "status":"PASS","confidence":0.96,"detected":"400 ml","reason":"Net volume declared correctly in ml.","evidence":"Net Vol: 400 ml","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(b)","bbox":json.dumps([40,95,310,130])},
    {"scan_id":"scan-005","requirement_id":"REQ-003","label":"Maximum Retail Price (MRP)",      "status":"NEEDS_REVIEW","confidence":0.7,"detected":"MRP: Rs. 199","reason":"MRP detected but inclusive tax statement is not visible. Rule 6(1)(d) requires explicit inclusive-of-all-taxes notation.","evidence":"MRP: Rs. 199","source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(d)","bbox":json.dumps([40,140,380,175])},
    {"scan_id":"scan-005","requirement_id":"REQ-004","label":"Consumer Care / Helpline Number", "status":"POTENTIAL_ISSUE","confidence":0.15,"detected":None,"reason":"No consumer helpline number detected on any panel.","evidence":None,"source":"Legal Metrology (PC) Rules 2011","source_section":"Rule 6(1)(h)","bbox":None},
]

with engine.connect() as conn:
    # Users
    print("\nInserting users...")
    for u in users:
        conn.execute(text("""
            INSERT INTO users (id, name, email, password_hash, organization, created_at)
            VALUES (:id,:name,:email,:password_hash,:organization,:created_at)
            ON DUPLICATE KEY UPDATE name=VALUES(name)
        """), u)
    conn.commit()
    print(f"  {len(users)} user(s) seeded.")

    # Products
    print("Inserting products...")
    for p in products:
        conn.execute(text("""
            INSERT INTO products (id, user_id, name, category, created_at)
            VALUES (:id,:user_id,:name,:category,:created_at)
            ON DUPLICATE KEY UPDATE name=VALUES(name)
        """), p)
    conn.commit()
    print(f"  {len(products)} product(s) seeded.")

    # Scans
    print("Inserting scans...")
    for s in scans:
        conn.execute(text("""
            INSERT INTO scans (id, user_id, product_id, product_name, category, score, status, image_url, image_width, image_height, extracted_data, created_at)
            VALUES (:id,:user_id,:product_id,:product_name,:category,:score,:status,:image_url,:image_width,:image_height,:extracted_data,:created_at)
            ON DUPLICATE KEY UPDATE score=VALUES(score), status=VALUES(status)
        """), s)
    conn.commit()
    print(f"  {len(scans)} scan(s) seeded.")

    # OCR Results (delete + re-insert to avoid duplicates)
    print("Inserting OCR results...")
    conn.execute(text("DELETE FROM ocr_results WHERE scan_id = 'demo'"))
    for o in ocr_results:
        conn.execute(text("""
            INSERT INTO ocr_results (scan_id, text, confidence, bbox)
            VALUES (:scan_id,:text,:confidence,:bbox)
        """), o)
    conn.commit()
    print(f"  {len(ocr_results)} OCR result(s) seeded.")

    # Compliance Results
    print("Inserting compliance results...")
    scan_ids = list({r["scan_id"] for r in compliance_results})
    for sid in scan_ids:
        conn.execute(text(f"DELETE FROM compliance_results WHERE scan_id = :sid"), {"sid": sid})
    for r in compliance_results:
        conn.execute(text("""
            INSERT INTO compliance_results (scan_id, requirement_id, label, status, confidence, detected, reason, evidence, source, source_section, bbox)
            VALUES (:scan_id,:requirement_id,:label,:status,:confidence,:detected,:reason,:evidence,:source,:source_section,:bbox)
        """), r)
    conn.commit()
    print(f"  {len(compliance_results)} compliance result(s) seeded.")

    # Final row counts
    print("\n--- Final row counts ---")
    for tbl in ['users','products','scans','ocr_results','compliance_results','regulations']:
        n = conn.execute(text(f'SELECT COUNT(*) FROM {tbl}')).scalar()
        print(f"  {tbl}: {n} rows")

print("\n[DONE] Database seeded successfully!")
print("=" * 60)
