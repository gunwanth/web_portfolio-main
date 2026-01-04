from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse, Response
import logging
from pathlib import Path
import io

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["resume"])

# Get the path to the resume file
RESUME_DIR = Path(__file__).parent.parent / "static" / "resume"
RESUME_FILE = RESUME_DIR / "gunvanth_madabattula_resume.pdf"

@router.get("/resume/download", response_class=Response)
async def download_resume():
    """
    Download resume PDF file.
    Returns the PDF bytes directly.
    """
    try:
        logger.info(f"Resume download requested")
        logger.info(f"Looking for file at: {RESUME_FILE}")
        logger.info(f"Absolute path: {RESUME_FILE.absolute()}")
        
        # Validate file exists
        if not RESUME_FILE.exists():
            logger.error(f"Resume file not found at {RESUME_FILE}")
            logger.error(f"Directory listing: {list(RESUME_DIR.glob('*'))}")
            # Return a 404 response with JSON error  
            return Response(
                content=b'{"error": "Resume file not found"}',
                status_code=404,
                media_type="application/json"
            )
        
        logger.info(f"File found, reading...")
        
        # Read the file
        with open(RESUME_FILE, 'rb') as f:
            pdf_bytes = f.read()
        
        logger.info(f"File read successfully, size: {len(pdf_bytes)} bytes")
        
        # Return the PDF as a response
        return Response(
            content=pdf_bytes,
            status_code=200,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=Gunvanth_Madabattula_Resume.pdf",
                "Content-Length": str(len(pdf_bytes)),
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache"
            }
        )
        
    except Exception as e:
        logger.error(f"Error in download_resume: {str(e)}", exc_info=True)
        return Response(
            content=f'{{"error": "{str(e)}"}}',
            status_code=500,
            media_type="application/json"
        )

@router.get("/resume/debug")
async def debug_resume():
    """Debug endpoint to check resume file status"""
    try:
        logger.info("Debug endpoint called")
        return {
            "resume_dir": str(RESUME_DIR),
            "resume_file": str(RESUME_FILE),
            "absolute_path": str(RESUME_FILE.absolute()),
            "exists": RESUME_FILE.exists(),
            "is_file": RESUME_FILE.is_file() if RESUME_FILE.exists() else False,
            "size": RESUME_FILE.stat().st_size if RESUME_FILE.exists() else None,
            "cwd": str(Path.cwd())
        }
    except Exception as e:
        logger.error(f"Debug endpoint error: {str(e)}", exc_info=True)
        return {"error": str(e)}

