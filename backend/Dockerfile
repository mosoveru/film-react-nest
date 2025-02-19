FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY nest-cli.json tsconfig*.json ./

COPY public ./public

COPY src ./src

RUN npm run build

FROM node:alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./

COPY --from=builder /app/public ./public

CMD ["node", "main.js"]