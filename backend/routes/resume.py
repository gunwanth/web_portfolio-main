from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, Response
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
    Download resume PDF file.
    Returns proper PDF headers and file content.
    """
    try:
        # Validate file exists
        if not RESUME_FILE.exists():
            logger.error(f"Resume file not found at {RESUME_FILE}")
            logger.error(f"Expected path: {RESUME_FILE.absolute()}")
            logger.error(f"Directory contents: {list(RESUME_DIR.glob('*'))}")
            raise HTTPException(status_code=404, detail="Resume file not found")
        
        # Validate it's actually a file
        if not RESUME_FILE.is_file():
            logger.error(f"Resume path exists but is not a file: {RESUME_FILE}")
            raise HTTPException(status_code=500, detail="Resume is not a valid file")
        
        logger.info(f"Resume download requested - serving: {RESUME_FILE}")
        
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
            detail=f"Failed to download resume: {str(e)}"
        )
