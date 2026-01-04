from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["resume"])

# Get the path to the resume file
RESUME_DIR = Path(__file__).parent.parent / "static" / "resume"
RESUME_FILE = RESUME_DIR / "gunvanth_madabattula_resume.pdf"

@router.get("/resume/download")
async def download_resume():
    """
    Download resume PDF file
    """
    try:
        if not RESUME_FILE.exists():
            logger.error(f"Resume file not found at {RESUME_FILE}")
            raise HTTPException(status_code=404, detail="Resume file not found")
        
        logger.info("Resume download requested")
        return FileResponse(
            path=str(RESUME_FILE),
            media_type="application/pdf",
            filename="Gunvanth_Madabattula_Resume.pdf",
            headers={
                "Content-Disposition": "attachment; filename=Gunvanth_Madabattula_Resume.pdf",
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        )
    
    except Exception as e:
        logger.error(f"Error downloading resume: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to download resume"
        )
