FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
