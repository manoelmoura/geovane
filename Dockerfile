FROM node:22-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
RUN npm prune --omit=dev

EXPOSE 3000
CMD ["npm", "run", "start"]
