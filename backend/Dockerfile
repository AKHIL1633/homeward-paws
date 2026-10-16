FROM node:24-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS development
EXPOSE 5000
CMD ["npm", "run", "dev"]

FROM node:24-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S appuser -G nodejs
COPY package*.json ./
RUN npm install --omit=dev
COPY --chown=appuser:nodejs src ./src
RUN mkdir -p uploads && chown appuser:nodejs uploads
USER appuser
EXPOSE 5000
CMD ["node", "src/server.js"]
