# Stage 1: Build React Frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY frontend/ ./

ARG REACT_APP_BACKEND_URL=""
ARG REACT_APP_ENABLE_VISUAL_EDITS="false"
ARG ENABLE_HEALTH_CHECK="false"
ARG REACT_APP_GTM_ID=""
ARG REACT_APP_SITE_URL="https://gunvanth.dev"

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL \
    REACT_APP_ENABLE_VISUAL_EDITS=$REACT_APP_ENABLE_VISUAL_EDITS \
    ENABLE_HEALTH_CHECK=$ENABLE_HEALTH_CHECK \
    REACT_APP_GTM_ID=$REACT_APP_GTM_ID \
    REACT_APP_SITE_URL=$REACT_APP_SITE_URL

RUN npm run build

# Stage 2: FastAPI Backend + Built Static Frontend
FROM python:3.11-slim

WORKDIR /app/backend

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    SERVE_STATIC_FRONTEND=true \
    PORT=8000

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./
COPY --from=frontend-build /app/frontend/build /app/frontend/build

EXPOSE 8000

CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}"]
