# Portfolio App - Troubleshooting & Resolution Guide

## Overview
This document outlines all issues encountered during development and the solutions applied to get the portfolio app fully functional.

---

## Issue 1: Blank White Screen on Initial Load

### Error
```
Uncaught ReferenceError: import.meta.env is not defined
```

### Root Cause
The frontend was built using Create React App (CRA) with craco, but the code used Vite-specific `import.meta.env` syntax to access environment variables. This is incompatible with CRA, which uses `process.env` instead.

### Files Affected
- `frontend/src/components/Header.jsx`

### Solution
Replaced Vite-specific environment variable access with CRA-compatible approach:

**Before:**
```javascript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";
```

**After:**
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
```

### Key Changes
1. Changed from `import.meta.env.VITE_*` to `process.env.REACT_APP_*`
2. Default to empty string instead of hardcoded localhost URL
3. Allows frontend to work with different backend URLs via `.env` file

---

## Issue 2: CORS (Cross-Origin Resource Sharing) Errors

### Errors
```
Access to XMLHttpRequest at 'https://career-profile-317.preview.emergentagent.com/api/contact' 
from origin 'http://localhost:3000' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

### Root Cause
Browser security prevents frontend at `http://localhost:3000` from making requests to a different origin (`https://career-profile-317.preview.emergentagent.com`) unless the server explicitly allows it with CORS headers. The external API did not include these headers for the localhost origin.

### Files Affected
- `backend/server.py`
- `backend/routes/contact.py`
- `frontend/src/components/Contact.jsx`

### Solutions Applied

#### Solution A: Configure Backend CORS (Primary)
Updated `backend/server.py` to:
1. Read CORS origins from environment variable
2. Include localhost:3000 and localhost:3001 in allowed origins
3. Set proper CORS response headers

**Changes:**
```python
cors_origins_env = os.environ.get(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:3001,https://career-profile-317.preview.emergentagent.com",
)
cors_origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Solution B: Add Backend Proxy Endpoint
Created `/api/external-contact` endpoint in `backend/routes/contact.py` that:
- Accepts contact submissions from the frontend
- Forwards them server-side to external API (avoiding browser CORS entirely)
- Returns response to frontend

**Code:**
```python
@router.post("/external-contact", response_model=ContactResponse)
async def forward_to_external_api(contact: ContactSubmissionCreate):
    external_url = os.environ.get(
        "EXTERNAL_CONTACT_URL",
        "https://career-profile-317.preview.emergentagent.com/api/contact",
    )
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(external_url, json=contact.model_dump())
        if resp.status_code >= 200 and resp.status_code < 300:
            return ContactResponse(success=True, message="Message forwarded to external service.")
    except httpx.RequestError as e:
        logger.error(f"Error contacting external API: {str(e)}")
        raise HTTPException(status_code=502, detail="Failed to contact external service")
```

#### Solution C: Use Relative API Paths
Updated `frontend/src/components/Contact.jsx` to use relative paths instead of absolute URLs, allowing the dev server proxy to handle routing.

**Before:**
```javascript
const BACKEND_URL = "https://career-profile-317.preview.emergentagent.com";
const API = `${BACKEND_URL}/api`;
```

**After:**
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";
```

---

## Issue 3: Connection Refused (ERR_CONNECTION_REFUSED)

### Error
```
Failed to load resource: net::ERR_CONNECTION_REFUSED
POST http://127.0.0.1:8001/api/contact net::ERR_FAILED
```

### Root Cause
The frontend tried to make direct HTTP calls to `http://127.0.0.1:8001`, but either:
1. The backend wasn't running
2. The frontend and backend weren't properly configured to communicate
3. No dev-server proxy was configured to forward requests

### Files Affected
- `frontend/.env`
- `frontend/package.json`
- `backend/server.py`

### Solutions Applied

#### Solution 1: Configure Dev Server Proxy
Added proxy configuration to `frontend/package.json`:
```json
"proxy": "http://127.0.0.1:8001"
```

This tells the CRA dev server to forward any request that doesn't match a static file to the backend.

#### Solution 2: Set Backend URL in Frontend .env
Created `frontend/.env` with:
```
REACT_APP_BACKEND_URL=http://127.0.0.1:8001
```

This allows the frontend code to reference the backend URL when needed.

#### Solution 3: Ensure Backend is Running
Backend must be running on port 8001 (was using 8000 which was occupied):
```bash
cd backend
python -m uvicorn server:app --reload --host 127.0.0.1 --port 8001
```

#### Solution 4: Use Relative Paths in Frontend
Updated frontend components to use `/api` paths when `REACT_APP_BACKEND_URL` is not set:
```javascript
const submitUrl = `${API}/contact`;  // resolves to /api/contact
```

---

## Issue 4: Contact Form Not Sending Messages

### Errors
```
AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK'}
```

### Root Cause
Multiple issues combined:
1. Frontend was calling external API directly (CORS blocked)
2. Backend wasn't configured to accept requests from frontend origin
3. No proxy to handle cross-origin requests

### Solution
Combined all fixes from Issues 1-3:
1. Fixed environment variable access (Issue 1)
2. Configured CORS on backend (Issue 2)
3. Set up dev-server proxy (Issue 3)
4. Used relative API paths in frontend

### Verification
Successfully tested with:
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8001/api/contact -Method Post `
  -ContentType 'application/json' `
  -Body (ConvertTo-Json @{
    name='Test User'
    email='test@example.com'
    subject='Hello'
    message='This is a test'
  })
```

Response:
```json
{
  "success": true,
  "message": "Your message has been received. I'll get back to you soon."
}
```

---

## Setup & Running Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### 1. Install Backend Dependencies
```bash
cd backend
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

#### Backend (`backend/.env`)
```dotenv
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="http://localhost:3000,http://localhost:3001,https://career-profile-317.preview.emergentagent.com"
```

#### Frontend (`frontend/.env`)
```dotenv
REACT_APP_BACKEND_URL=http://127.0.0.1:8001
WDS_SOCKET_PORT=443
```

### 4. Start the Backend
Open a terminal and run:
```bash
cd backend
python -m uvicorn server:app --reload --host 127.0.0.1 --port 8001
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8001 (Press CTRL+C to quit)
INFO:     Application startup complete.
```

### 5. Start the Frontend
Open a new terminal and run:
```bash
cd frontend
npm start
```

Expected output:
```
You can now view web_portfolio-main in the browser.
Local:            http://localhost:3000
```

### 6. Test the Application
1. Open http://localhost:3000 in your browser
2. Click the "Download Resume" button in the header (should download PDF)
3. Scroll to "Get In Touch" section
4. Fill out the contact form
5. Click "Send Message"
6. Verify success toast appears and backend logs show the submission

---

## Technical Details

### API Endpoints

#### Contact Submission
- **URL:** `/api/contact`
- **Method:** POST
- **Body:**
```json
{
  "name": "string",
  "email": "email@example.com",
  "subject": "string",
  "message": "string"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Your message has been received. I'll get back to you soon."
}
```

#### External API Proxy (Alternative)
- **URL:** `/api/external-contact`
- **Method:** POST
- **Purpose:** Forwards contact submissions to external preview API server-side

#### Resume Download
- **URL:** `/api/resume/download`
- **Method:** GET
- **Response:** PDF file

#### Health Check
- **URL:** `/api/`
- **Method:** GET
- **Response:**
```json
{
  "message": "Portfolio API is running"
}
```

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000` (frontend dev server)
- `http://localhost:3001` (alternate frontend port)
- `https://career-profile-317.preview.emergentagent.com` (external preview)

Allowed methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`
Allowed headers: All (`*`)

### Dev Server Proxy
The frontend dev server (CRA) is configured with:
```json
"proxy": "http://127.0.0.1:8001"
```

This means:
- Requests to `/api/*` are forwarded to `http://127.0.0.1:8001/api/*`
- Requests to static assets remain local
- Avoids CORS issues during development

---

## Common Issues & Quick Fixes

### Backend Returns 422 Unprocessable Entity
**Cause:** Invalid JSON in request body
**Fix:** Ensure all fields match the schema:
- `name`, `email`, `subject`, `message` are required
- Email must be valid format

### Frontend Shows "Failed to send message"
**Cause:** Backend not running or proxy misconfigured
**Fix:**
1. Check backend is running: `netstat -ano | findstr :8001`
2. Verify backend logs for errors
3. Restart frontend after backend starts

### "Cannot find ESLint loader" Warning
**Cause:** Missing eslint-loader dependency (does not prevent app from running)
**Fix:** Optional - run `npm install eslint-loader` in frontend folder

### Port 8001 Already in Use
**Cause:** Another process is using the port
**Fix:**
```bash
# Find process using port 8001
netstat -ano | findstr :8001
# Kill process (replace PID)
taskkill /PID <PID> /F
```

Or use a different port:
```bash
python -m uvicorn server:app --host 127.0.0.1 --port 8002
```

---

## Commits Made

1. **Initial Fix:** `chore: commit local changes — add proxy and CORS fixes; point frontend to local backend`
   - Added `/api/external-contact` proxy endpoint
   - Fixed Header.jsx environment variable access
   - Updated CORS configuration in backend

2. **Final Fix:** `fix(frontend): use relative /api and add dev proxy to avoid connection errors`
   - Updated Contact.jsx to use relative `/api` paths
   - Added `"proxy": "http://127.0.0.1:8001"` to package.json

---

## Summary

All issues have been resolved:
- ✅ Blank white screen fixed (environment variable compatibility)
- ✅ CORS errors resolved (backend CORS config + dev proxy)
- ✅ Connection refused fixed (dev server proxy + proper backend URL)
- ✅ Contact form working (all components integrated)
- ✅ Resume download working (Header component fixed)

The application is now fully functional with proper error handling and development workflow.
