from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import logging
from pathlib import Path
import mimetypes

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["resume"])

# Get the path to the resume file
RESUME_DIR = Path(__file__).parent.parent / "static" / "resume"
RESUME_FILE = RESUME_DIR / "gunvanth_madabattula_resume.pdf"

logger.info(f"Resume module loaded - RESUME_FILE: {RESUME_FILE}")

@router.get("/resume/debug")
async def debug_resume():
    """Debug endpoint to check resume file status"""
    try:
        stat_info = RESUME_FILE.stat() if RESUME_FILE.exists() else None
        return {
            "resume_dir": str(RESUME_DIR),
            "resume_file": str(RESUME_FILE),
            "exists": RESUME_FILE.exists(),
            "is_file": RESUME_FILE.is_file() if RESUME_FILE.exists() else False,
            "size": stat_info.st_size if stat_info else 0,
            "absolute_path": str(RESUME_FILE.absolute()),
            "readable": RESUME_FILE.exists() and RESUME_FILE.is_file(),
            "mimetype": mimetypes.guess_type(str(RESUME_FILE))[0]
        }
    except Exception as e:
        logger.error(f"Debug endpoint error: {str(e)}", exc_info=True)
        return {"error": str(e)}

@router.get("/resume/download")
async def download_resume():
    """
    Download resume PDF file.
    """
    logger.info(f"Resume download endpoint called")
    logger.info(f"Checking file: {RESUME_FILE}")
    
    try:
        # Validate file exists
        if not RESUME_FILE.exists():
            logger.error(f"Resume file not found at {RESUME_FILE}")
            raise HTTPException(status_code=404, detail=f"Resume file not found at {RESUME_FILE}")
        
        logger.info(f"File exists, checking if it's a file...")
        
        # Validate it's actually a file
        if not RESUME_FILE.is_file():
            logger.error(f"Resume path exists but is not a file: {RESUME_FILE}")
            raise HTTPException(status_code=500, detail="Resume is not a valid file")
        
        file_size = RESUME_FILE.stat().st_size
        logger.info(f"Resume download requested - serving: {RESUME_FILE} (size: {file_size})")
        
        # Use FileResponse for better compatibility
        return FileResponse(
            path=RESUME_FILE,
            media_type="application/pdf",
            filename="Gunvanth_Madabattula_Resume.pdf",
            headers={
                "Content-Disposition": "attachment; filename=Gunvanth_Madabattula_Resume.pdf",
                "Content-Type": "application/pdf",
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
