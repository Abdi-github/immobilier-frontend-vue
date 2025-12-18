# =============================================
# DOCKERFILE — Immobilier Frontend (Vue 3)
# Multi-stage build: development + production
# =============================================

# ─── Stage 1: DEVELOPMENT ─────────────────────
FROM node:22-alpine AS development

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json pnpm-lock.yaml* ./
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# ─── Stage 2: BUILDER ─────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json pnpm-lock.yaml* ./
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

COPY . .

ARG VITE_API_BASE_URL
ARG VITE_APP_NAME
ARG VITE_APP_VERSION
ARG VITE_DEFAULT_LANGUAGE
ARG VITE_CLOUDINARY_CLOUD_NAME

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL:-https://api.immobilier.ch/api/v1}
ENV VITE_APP_NAME=${VITE_APP_NAME:-Immobilier.ch}
ENV VITE_APP_VERSION=${VITE_APP_VERSION:-1.0.0}
ENV VITE_DEFAULT_LANGUAGE=${VITE_DEFAULT_LANGUAGE:-en}
ENV VITE_CLOUDINARY_CLOUD_NAME=${VITE_CLOUDINARY_CLOUD_NAME:-dzyyygr1x}

RUN npm run build

# ─── Stage 3: PRODUCTION ──────────────────────
FROM nginx:1.27-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
