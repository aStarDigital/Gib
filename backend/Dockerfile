FROM node:17.4.0-alpine as base

WORKDIR /app

COPY package.json package-lock.json ./

RUN rm -rf node_modules && npm install

COPY . .

CMD ["node", "./server.js"]
