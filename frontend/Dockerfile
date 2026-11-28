FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .

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

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
