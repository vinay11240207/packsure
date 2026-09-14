import uuid
from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/api/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    organization: str = ""

@router.post("/login")
async def login(request: LoginRequest):
    """
    Authenticates user and issues access token.
    Pre-configured for demo.
    """
    return {
        "access_token": f"packsure_token_{uuid.uuid4().hex[:12]}",
        "token_type": "bearer",
        "user": {
            "id": "usr_001",
            "name": "Jordan Davis",
            "email": request.email,
            "organization": "Acme Consumer Compliance",
        },
    }

@router.post("/register")
async def register(request: RegisterRequest):
    """
    Registers a new company compliance workspace.
    """
    return {
        "access_token": f"packsure_token_{uuid.uuid4().hex[:12]}",
        "token_type": "bearer",
        "user": {
            "id": f"usr_{uuid.uuid4().hex[:8]}",
            "name": request.name,
            "email": request.email,
            "organization": request.organization,
        },
    }

@router.post("/logout")
async def logout():
    return {"message": "Logged out successfully"}
