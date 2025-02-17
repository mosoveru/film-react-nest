FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run build

FROM node:alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN yarn --prod

COPY --from=builder /app/dist ./

CMD ["echo", "Frontend build complete. Files are in /app/dist"]