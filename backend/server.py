from fastapi import FastAPI, APIRouter, Request, Response
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

# Import routers
from routes.contact import router as contact_router
from routes.resume import router as resume_router

# --------------------------------------------------
# Load environment variables
# --------------------------------------------------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# --------------------------------------------------
# Database setup
# --------------------------------------------------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# --------------------------------------------------
# App initialization
# --------------------------------------------------
app = FastAPI(
    title="Gunvanth's Portfolio API",
    version="1.0.0"
)

# --------------------------------------------------
# ✅ CORS MUST COME FIRST
# --------------------------------------------------
# Configure CORS origins from environment (comma-separated). If set to '*',
# we allow all origins but disable credentials (required by Starlette/FASTAPI).
cors_origins_env = os.environ.get(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:3001,https://career-profile-317.preview.emergentagent.com",
)
cors_origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]
allow_credentials = True
if len(cors_origins) == 1 and cors_origins[0] == "*":
    # When allowing all origins, credentials cannot be True.
    allow_credentials = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# ✅ GLOBAL OPTIONS HANDLER (CRITICAL FIX)
# --------------------------------------------------
@app.options("/{full_path:path}")
async def preflight_handler(full_path: str, request: Request):
    """
    Handles all CORS preflight (OPTIONS) requests.
    Required for Axios POST requests from browser.
    """
    return Response(status_code=200)

# --------------------------------------------------
# API Router
# --------------------------------------------------
api_router = APIRouter(prefix="/api")

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        check["timestamp"] = datetime.fromisoformat(check["timestamp"])
    return status_checks

# --------------------------------------------------
# ✅ INCLUDE ROUTERS AFTER CORS
# --------------------------------------------------
app.include_router(api_router)
app.include_router(contact_router)
app.include_router(resume_router)

# --------------------------------------------------
# Logging
# --------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# --------------------------------------------------
# Shutdown event
# --------------------------------------------------
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()