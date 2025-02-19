FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY vite.config.ts tsconfig*.json index.html ./

COPY bin ./bin

COPY public ./public

COPY src ./src

RUN npm run build

FROM node:alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./

CMD ["echo", "Frontend build complete. Files are in /app/dist"]