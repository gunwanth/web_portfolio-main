# Change Log (Session Summary)

Date: 2026-02-25
Project: `D:\web_portfolio-main`

## 1. Resume Download/Open Behavior

### Backend
- Updated resume endpoint behavior in `backend/routes/resume.py`.
- Final state:
  - Route: `GET /api/resume/download`
  - Behavior: **forced download** (`Content-Disposition: attachment`)
  - File served: `backend/static/resume/gunvanth_madabattula_resume.pdf`

### Frontend
- Updated resume button logic in `frontend/src/components/Header.jsx`.
- Final state:
  - Uses relative API call: `fetch('/api/resume/download')`
  - Creates blob URL and triggers download via `<a download=...>`

### Resume File Replacement
- Replaced backend resume PDF with user-provided file:
  - Source: `C:\Users\gunva\Downloads\Gunvanth_resume (5).pdf`
  - Destination: `backend/static/resume/gunvanth_madabattula_resume.pdf`

## 2. Backend Startup via npm

- Updated `backend/package.json` scripts.
- Added:
  - `npm start` -> `python -m uvicorn server:app --host 0.0.0.0 --port 8000`
  - `npm run dev` -> same with `--reload`

## 3. Frontend/Backend Local Routing and Proxy

- Removed Render dependency from runtime flow.
- Final frontend API usage is relative (`/api`) for local development.
- `frontend/package.json` proxy is set to:
  - `"proxy": "http://127.0.0.1:8000"`

## 4. Contact Form + Email Notifier Fixes

### Contact API Response Semantics
- Updated model in `backend/models/contact.py`:
  - Added `email_sent: Optional[bool]`

- Updated route in `backend/routes/contact.py`:
  - `POST /api/contact` now returns `email_sent=true/false`
  - If DB save succeeds but email fails, returns:
    - `success: true`
    - `email_sent: false`
    - clear message about email not being configured/sent

### Frontend Contact UI State
- Updated `frontend/src/components/Contact.jsx`:
  - Toast now reflects actual result:
    - `Message Sent!` when `email_sent !== false`
    - `Message Saved` when `email_sent === false`

### Email Service Env Loading Bug
- Root issue fixed in `backend/services/email_service.py`:
  - Previously SMTP config was read at import-time only.
  - Now `.env` is loaded and SMTP config is refreshed at send-time (`_load_config()` call in `send_contact_email`).

## 5. Environment Configuration Changes

### backend/.env
- Cleaned and fixed format to valid dotenv syntax.
- Final keys:
  - `MONGO_URL`
  - `DB_NAME`
  - `CORS_ORIGINS`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASSWORD`
  - `RECIPIENT_EMAIL`

### Key parsing fix
- Resolved dotenv warning:
  - `Python-dotenv could not parse statement starting at line 8`
- Cause was malformed `SMTP_PASSWORD` line with literal `` `r`n `` text.
- Rewrote `backend/.env` cleanly.

## 6. Clarifications Observed During Debugging

- `GET /api/contact` -> `405 Method Not Allowed` is expected (endpoint is POST-only).
- `GET /favicon.ico` -> `405` is harmless noise unless a favicon route/file is added.
- CORS was not the blocker for email delivery in this session.
- Main mail blocker was SMTP auth/config setup.

## 7. Current Expected Run Flow

1. Start backend:
   - `cd backend`
   - `npm start`
2. Start frontend:
   - `cd frontend`
   - `npm start`
3. Test:
   - Resume button should download PDF
   - Contact form should return toast based on `email_sent`

## 8. Security Note

- Credentials were shared during troubleshooting.
- Recommended:
  - Rotate Google app password after validation.
  - Never commit real credentials to git.
