# Web Portfolio (Full Stack)

Overview
--------
Monorepo for Gunvanth's portfolio with a Python FastAPI backend and a React frontend (CRACO + Tailwind). The repo contains endpoints for resume download and contact submission, plus local dev tooling for visual edits and health checks.

Project layout
--------------
- [backend/server.py](backend/server.py) — FastAPI backend (API routes, static resume serving).
- [backend/routes/contact.py](backend/routes/contact.py) — Contact POST endpoint.
- [backend/routes/resume.py](backend/routes/resume.py) — Resume download endpoint.
- [backend/services/email_service.py](backend/services/email_service.py) — Email sending logic used by contact.
- [backend/.env](backend/.env) — Backend environment variables.
- [frontend/src/App.js](frontend/src/App.js) — React app root; page composition.
- [frontend/package.json](frontend/package.json) — Frontend scripts (start, build).
- [frontend/craco.config.js](frontend/craco.config.js) — CRA/CRACO config, visual edits and health check plugins.
- [frontend/plugins/visual-edits/dev-server-setup.js](frontend/plugins/visual-edits/dev-server-setup.js) — Dev-only visual editing middleware.
- [frontend/plugins/health-check/health-endpoints.js](frontend/plugins/health-check/health-endpoints.js) — Dev health endpoints.
- [tests/](tests/) and [backend_test.py](backend_test.py) — Tests.

Quick prerequisites
-------------------
- Node.js (14+) + npm or yarn
- Python 3.8+ and pip
- Optional: `uvicorn` for running FastAPI (pip install uvicorn) and `serve` for static hosting (npm i -g serve)

Run locally (development)
-------------------------
1. Backend API
   - Install Python deps:
     ```sh
     cd backend
     python -m venv .venv
     source .venv/bin/activate   # Windows: .venv\Scripts\activate
     pip install -r requirements.txt
     ```
   - Configure [.env](http://_vscodecontentref_/0) (SMTP vars, other settings).
   - Start the backend (one of these):
     - Run directly:
       ```sh
       python server.py
       ```
     - Or with uvicorn:
       ```sh
       uvicorn server:app --reload --host 127.0.0.1 --port 8000
       ```
   - Backend routes:
     - Resume download: GET `/api/resume/download` — see [resume.py](http://_vscodecontentref_/1).
     - Contact form POST: POST `/api/contact` — see [contact.py](http://_vscodecontentref_/2); mail logic is in [EmailService](http://_vscodecontentref_/3).

2. Frontend (React)
   - Install Node deps:
     ```sh
     cd frontend
     npm install
     ```
   - Configure [.env](http://_vscodecontentref_/4) (e.g. [REACT_APP_ENABLE_VISUAL_EDITS](http://_vscodecontentref_/5), [ENABLE_HEALTH_CHECK](http://_vscodecontentref_/6), [DISABLE_HOT_RELOAD](http://_vscodecontentref_/7)).
   - Start dev server:
     ```sh
     npm start
     ```
   - The app entry is [App.js](http://_vscodecontentref_/8). By default it runs on http://localhost:3000.

Which file should be run to view the website?
---------------------------------------------
- Frontend (dev UI): Run [npm start](http://_vscodecontentref_/9) in the [frontend] directory. The primary React entry is [App.js](http://_vscodecontentref_/10).
- To enable API features (resume download, contact submissions) run the backend server: run [server.py](http://_vscodecontentref_/11) (or `uvicorn server:app --reload`).

Production build / host static app
---------------------------------
- Build the frontend:
  ```sh
  cd frontend
  npm run build
  ```

Docker Deployment (No Vercel)
-----------------------------
You can run the full stack in Docker without Vercel using either the multi-container Compose stack or the unified single-container image.

### Option A: Full Stack with Docker Compose (Recommended)
Runs three containers:
- **frontend** (`nginx:alpine` on port `3000`): serves the production React build and proxies `/api/*` requests to `backend`.
- **backend** (FastAPI on port `8000`): handles contact submissions, email notifications, and resume downloads.
- **mongo** (`mongo:7`): persists contact submissions in the `mongo_data` volume.

1. Ensure `backend/.env` is configured (see `backend/.env.example`) for SMTP credentials if you want email notifications. Docker Compose automatically sets `MONGO_URL` to `mongodb://mongo:27017` inside the container network.
2. Build and start all services:
   ```sh
   docker compose up --build -d
   ```
3. Open `http://localhost:3000` in your browser (or check API health at `http://localhost:3000/api/`).
4. Stop the stack when finished:
   ```sh
   docker compose down
   ```

### Option B: Unified Single-Container Build
Ideal for single-container hosts (Railway, Render, Fly.io, Cloud Run, Coolify, or standalone `docker run`). The root `Dockerfile` builds the React app and serves both the static frontend and `/api/*` endpoints from FastAPI (`SERVE_STATIC_FRONTEND=true`).

```sh
docker build -t web-portfolio .
docker run -d -p 8000:8000 --env-file backend/.env --name web-portfolio web-portfolio
```

Then open `http://localhost:8000`. Note: if you are not running a separate MongoDB instance, pass `MONGO_URL` pointing to your MongoDB URI (or leave it unset to run without database persistence).
