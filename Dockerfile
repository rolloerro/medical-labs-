# Stage 1: build (not necessary here but kept for pattern)
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3010
CMD ["node", "src/app.js"]
