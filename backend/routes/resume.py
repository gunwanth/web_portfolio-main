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
        logger.info(f"Resume download requested - checking path: {RESUME_FILE}")
        
        if not RESUME_FILE.exists():
            logger.error(f"Resume file not found at {RESUME_FILE}")
            raise HTTPException(status_code=404, detail="Resume file not found")
        
        logger.info(f"Resume file found, size: {RESUME_FILE.stat().st_size} bytes")
        
        return FileResponse(
            path=str(RESUME_FILE),
            media_type="application/pdf",
            filename="Gunvanth_Madabattula_Resume.pdf",
            headers={
                "Content-Disposition": "attachment; filename=Gunvanth_Madabattula_Resume.pdf",
                "Content-Type": "application/pdf",
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error downloading resume: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to download resume"
        )

@router.get("/resume/debug")
async def debug_resume():
    """Debug endpoint to verify resume file status"""
    try:
        return {
            "file_path": str(RESUME_FILE),
            "absolute_path": str(RESUME_FILE.absolute()),
            "exists": RESUME_FILE.exists(),
            "is_file": RESUME_FILE.is_file() if RESUME_FILE.exists() else False,
            "size": RESUME_FILE.stat().st_size if RESUME_FILE.exists() else 0,
            "readable": os.access(RESUME_FILE, os.R_OK) if RESUME_FILE.exists() else False
        }
    except Exception as e:
        return {"error": str(e)}

