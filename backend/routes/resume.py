from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["resume"])

# Get the path to the resume file
RESUME_DIR = Path(__file__).parent.parent / "static" / "resume"
RESUME_FILE = RESUME_DIR / "gunvanth_madabattula_resume.pdf"

@router.get("/resume/debug")
async def debug_resume():
    """Debug endpoint to check resume file status"""
    return {
        "resume_dir": str(RESUME_DIR),
        "resume_file": str(RESUME_FILE),
        "exists": RESUME_FILE.exists(),
        "is_file": RESUME_FILE.is_file() if RESUME_FILE.exists() else False,
        "size": RESUME_FILE.stat().st_size if RESUME_FILE.exists() else 0,
        "absolute_path": str(RESUME_FILE.absolute())
    }

@router.get("/resume/download")
async def download_resume():
    """
    Download resume PDF file.
    Streams the file content directly for better mobile compatibility.
    """
    try:
        # Validate file exists
        if not RESUME_FILE.exists():
            logger.error(f"Resume file not found at {RESUME_FILE}")
            logger.error(f"Expected path: {RESUME_FILE.absolute()}")
            raise HTTPException(status_code=404, detail="Resume file not found")
        
        # Validate it's actually a file
        if not RESUME_FILE.is_file():
            logger.error(f"Resume path exists but is not a file: {RESUME_FILE}")
            raise HTTPException(status_code=500, detail="Resume is not a valid file")
        
        logger.info(f"Resume download requested - serving: {RESUME_FILE}")
        
        # Read file and stream it
        with open(RESUME_FILE, 'rb') as f:
            file_content = f.read()
        
        return StreamingResponse(
            iter([file_content]),
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=Gunvanth_Madabattula_Resume.pdf",
                "Content-Type": "application/pdf",
                "Content-Length": str(len(file_content)),
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
