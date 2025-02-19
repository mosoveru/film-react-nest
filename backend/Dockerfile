FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY nest-cli.json tsconfig*.json ./

COPY public ./public

COPY src ./src

RUN yarn run build

FROM node:alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN yarn --prod

COPY --from=builder /app/dist ./

COPY --from=builder /app/public ./public

CMD ["node", "main.js"]