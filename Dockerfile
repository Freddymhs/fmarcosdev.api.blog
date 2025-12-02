FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN mkdir -p .tmp public/uploads

EXPOSE 1337

CMD ["npm", "start"]
