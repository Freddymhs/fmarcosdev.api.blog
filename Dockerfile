# ========== DESARROLLO ==========
FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY config ./config

RUN npm ci

# Compile TypeScript config files to JavaScript
RUN npx tsc

RUN mkdir -p .tmp public/uploads

EXPOSE 1337

CMD ["npm", "run", "dev"]

# ========== PRODUCCIÓN ==========
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

RUN mkdir -p .tmp public/uploads

EXPOSE 1337

CMD ["npm", "start"]
