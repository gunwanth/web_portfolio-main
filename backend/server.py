from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from database import close_database, get_database, init_database

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
client, db = init_database()

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

FRONTEND_BUILD_DIR = ROOT_DIR.parent / "frontend" / "build"
FRONTEND_FAVICON_PATH = ROOT_DIR.parent / "frontend" / "public" / "favicon.ico"
SERVE_STATIC_FRONTEND = os.environ.get("SERVE_STATIC_FRONTEND", "").lower() in ("1", "true", "yes")
STATIC_FRONTEND_READY = SERVE_STATIC_FRONTEND and (FRONTEND_BUILD_DIR / "index.html").exists()

if not STATIC_FRONTEND_READY:
    @app.get("/")
    async def home():
        return {
            "status": "ok",
            "message": "Gunvanth Portfolio API is running"
        }

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    for candidate in (FRONTEND_BUILD_DIR / "favicon.ico", FRONTEND_FAVICON_PATH):
        if candidate.exists():
            return FileResponse(path=str(candidate), media_type="image/x-icon")
    return Response(status_code=204)

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
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database is not configured")

    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database is not configured")

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

if STATIC_FRONTEND_READY:
    static_dir = FRONTEND_BUILD_DIR / "static"
    if static_dir.exists():
        app.mount("/static", StaticFiles(directory=str(static_dir)), name="frontend-static")

    build_root = FRONTEND_BUILD_DIR.resolve()
    index_html = build_root / "index.html"

    @app.get("/", include_in_schema=False)
    async def serve_spa_root():
        return FileResponse(path=str(index_html))

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa_paths(full_path: str):
        if full_path == "api" or full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="Not Found")

        candidate = (build_root / full_path).resolve()
        try:
            candidate.relative_to(build_root)
            is_within_build = True
        except ValueError:
            is_within_build = False

        if is_within_build and candidate.is_file():
            return FileResponse(path=str(candidate))
        return FileResponse(path=str(index_html))

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
    close_database()
