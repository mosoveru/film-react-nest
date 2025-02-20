FROM node:alpine AS builder

ARG VITE_API_URL
ARG VITE_CDN_URL

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY vite.config.ts tsconfig*.json index.html ./

COPY bin ./bin

COPY public ./public

COPY src ./src

RUN VITE_API_URL=${VITE_API_URL} VITE_CDN_URL=${VITE_CDN_URL} npm run build

FROM node:alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./

CMD ["echo", "Frontend build complete. Files are in /app/dist"]