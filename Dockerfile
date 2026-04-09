#build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#prod
FROM node:24-alpine

RUN apk add --no-cache curl

RUN addgroup -S appgroup && \
    adduser -G appgroup -D -S appuser

WORKDIR /app

ENV NODE_ENV=production

COPY --chown=appuser:appgroup package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

ENV PORT=4000

EXPOSE 4000

CMD [ "node", "dist/main.js" ]
