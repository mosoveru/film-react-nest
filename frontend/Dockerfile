FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY vite.config.ts tsconfig*.json index.html ./

COPY bin ./bin

COPY public ./public

COPY src ./src

RUN yarn run build

FROM node:alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN yarn --prod

COPY --from=builder /app/dist ./

CMD ["echo", "Frontend build complete. Files are in /app/dist"]