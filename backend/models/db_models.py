# MySQL-ready SQLAlchemy models
# Connect directly to your Hostinger MySQL database by specifying DATABASE_URL in .env:
# mysql+pymysql://username:password@hostname:3306/dbname

import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    organization = Column(String(150), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    scans = relationship("ScanModel", back_populates="user")

class ScanModel(Base):
    __tablename__ = "scans"

    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    product_name = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    score = Column(Integer, nullable=False)
    status = Column(String(30), nullable=False) # PASS, NEEDS_REVIEW, POTENTIAL_ISSUE
    image_url = Column(String(500), nullable=False)
    image_width = Column(Integer, default=400)
    image_height = Column(Integer, default=600)
    extracted_data = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="scans")
    ocr_results = relationship("OcrResultModel", back_populates="scan", cascade="all, delete-orphan")
    compliance_results = relationship("ComplianceResultModel", back_populates="scan", cascade="all, delete-orphan")

class OcrResultModel(Base):
    __tablename__ = "ocr_results"

    id = Column(Integer, primary_key=True, autoincrement=True)
    scan_id = Column(String(36), ForeignKey("scans.id"), nullable=False, index=True)
    text = Column(Text, nullable=False)
    confidence = Column(Float, nullable=False)
    bbox = Column(JSON, nullable=False) # [x1, y1, x2, y2]

    scan = relationship("ScanModel", back_populates="ocr_results")

class ComplianceResultModel(Base):
    __tablename__ = "compliance_results"

    id = Column(Integer, primary_key=True, autoincrement=True)
    scan_id = Column(String(36), ForeignKey("scans.id"), nullable=False, index=True)
    requirement_id = Column(String(50), nullable=False)
    label = Column(String(200), nullable=False)
    status = Column(String(30), nullable=False)
    confidence = Column(Float, nullable=False)
    detected = Column(Text, nullable=True)
    reason = Column(Text, nullable=False)
    evidence = Column(Text, nullable=True)
    source = Column(String(255), nullable=False)
    source_section = Column(String(255), nullable=False)
    bbox = Column(JSON, nullable=True)

    scan = relationship("ScanModel", back_populates="compliance_results")
