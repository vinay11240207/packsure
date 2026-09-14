from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.scan import router as scan_router
from routers.auth import router as auth_router
from routers.analytics import router as analytics_router

app = FastAPI(
    title="PackSure AI — Packaging Compliance Screening API",
    description="Backend API powering OCR packaging extraction, Legal Metrology compliance evaluation, and bounding box heatmap overlays.",
    version="1.0.0",
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://packsure.vercel.app",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount feature routers
app.include_router(scan_router)
app.include_router(auth_router)
app.include_router(analytics_router)

@app.get("/")
async def root():
    return {
        "service": "PackSure AI Backend",
        "status": "operational",
        "version": "1.0.0",
        "docs": "/docs",
        "legal_scope": "Legal Metrology (Packaged Commodities) Rules, 2011",
    }
