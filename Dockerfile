FROM node:20 AS deps
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY client/package.json ./client/
COPY service/package.json ./service/
RUN npm ci

FROM deps AS build-frontend
WORKDIR /app
COPY client ./client
COPY shared ./shared
COPY Drawings ./Drawings

RUN npm --workspace=client run build

FROM node:20 AS runtime
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY service ./service
COPY --from=build-frontend /app/client/dist ./service/public

WORKDIR /app/service
ENV PORT=8080
EXPOSE 8080
CMD ["node","service/index.js"]