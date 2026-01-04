from fastapi import APIRouter, HTTPException, Request
from models.contact import ContactSubmissionCreate, ContactResponse, ContactSubmission
from services.email_service import email_service
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from datetime import datetime, timedelta
from collections import defaultdict
from dotenv import load_dotenv
from pathlib import Path
import httpx

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["contact"])

# Simple rate limiting: IP -> list of submission timestamps
rate_limit_store = defaultdict(list)
MAX_SUBMISSIONS_PER_HOUR = 5

# Get database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

def check_rate_limit(ip_address: str) -> bool:
    """
    Check if the IP has exceeded the rate limit
    """
    now = datetime.utcnow()
    one_hour_ago = now - timedelta(hours=1)
    
    # Clean up old timestamps
    rate_limit_store[ip_address] = [
        ts for ts in rate_limit_store[ip_address]
        if ts > one_hour_ago
    ]
    
    # Check if limit exceeded
    if len(rate_limit_store[ip_address]) >= MAX_SUBMISSIONS_PER_HOUR:
        return False
    
    # Add current timestamp
    rate_limit_store[ip_address].append(now)
    return True

@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact: ContactSubmissionCreate, request: Request):
    """
    Handle contact form submission
    - Validates input
    - Sends email notification
    - Stores submission in database
    - Implements rate limiting
    """
    try:
        # Get client IP for rate limiting
        client_ip = request.client.host
        
        # Check rate limit
        if not check_rate_limit(client_ip):
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please try again later."
            )
        
        # Create submission object
        submission = ContactSubmission(
            name=contact.name,
            email=contact.email,
            subject=contact.subject,
            message=contact.message
        )
        
        # Store in database
        try:
            await db.contact_submissions.insert_one(submission.dict())
            logger.info(f"Contact submission stored in database from {contact.email}")
        except Exception as e:
            logger.error(f"Failed to store contact submission: {str(e)}")
            # Continue even if database storage fails
        
        # Send email notification
        email_sent = email_service.send_contact_email(
            name=contact.name,
            email=contact.email,
            subject=contact.subject,
            message=contact.message
        )
        
        if email_sent:
            return ContactResponse(
                success=True,
                message="Thank you for reaching out! I'll get back to you soon."
            )
        else:
            # Email failed but submission was stored
            return ContactResponse(
                success=True,
                message="Your message has been received. I'll get back to you soon."
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to process contact form. Please try again later."
        )


@router.post("/external-contact", response_model=ContactResponse)
async def forward_to_external_api(contact: ContactSubmissionCreate):
    """
    Proxy endpoint to forward contact submissions to an external API.
    Useful when the external API doesn't allow browser CORS but can accept
    server-side requests.
    """
    external_url = os.environ.get(
        "EXTERNAL_CONTACT_URL",
        "https://career-profile-317.preview.emergentagent.com/api/contact",
    )

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(external_url, json=contact.model_dump())

        if resp.status_code >= 200 and resp.status_code < 300:
            return ContactResponse(success=True, message="Message forwarded to external service.")
        else:
            logger.error(f"External API returned {resp.status_code}: {resp.text}")
            raise HTTPException(status_code=502, detail="External service error")

    except httpx.RequestError as e:
        logger.error(f"Error contacting external API: {str(e)}")
        raise HTTPException(status_code=502, detail="Failed to contact external service")
