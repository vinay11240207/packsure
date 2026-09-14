import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Set UTF-8 encoding for Windows terminal
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

print("=" * 60)
print("PackSure AI - Database Connection Test")
print("=" * 60)

if not DATABASE_URL or "sqlite" in DATABASE_URL:
    print("Current DATABASE_URL is using SQLite fallback:")
    print(f"   {DATABASE_URL}")
else:
    # Mask password for display
    display_url = DATABASE_URL
    if "@" in display_url and ":" in display_url:
        prefix, rest = display_url.split("@", 1)
        user_part = prefix.split("://")[1]
        if ":" in user_part:
            user = user_part.split(":")[0]
            display_url = f"mysql+pymysql://{user}:****@{rest}"
    
    print(f"Connecting to: {display_url} ...")

    try:
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT DATABASE(), VERSION(), NOW();")).fetchone()
            print("\n[SUCCESS] Connected to Hostinger MySQL Database!")
            print(f"   Database Name : {result[0]}")
            print(f"   MySQL Version : {result[1]}")
            print(f"   Server Time   : {result[2]}")
            
            # Check if tables exist
            tables = conn.execute(text("SHOW TABLES;")).fetchall()
            print(f"\nFound {len(tables)} table(s) in database:")
            for t in tables:
                print(f"   - {t[0]}")
                
            # Query regulations count
            try:
                reg_count = conn.execute(text("SELECT COUNT(*) FROM regulations;")).scalar()
                print(f"\nRegulatory Rules loaded: {reg_count} rules active in DB.")
            except Exception:
                pass

    except Exception as e:
        print("\n[CONNECTION FAILED]")
        print(f"Error details: {e}")

print("=" * 60)
