FROM node:20 AS deps
WORKDIR /app
COPY package.json ./
COPY client/package.json ./client/
COPY service/package.json ./service/
RUN npm install

FROM deps AS build-frontend
WORKDIR /app
COPY client ./client
COPY shared ./shared
RUN npm --workspace=client run build

FROM node:20 AS runtime
WORKDIR /app
COPY service/package-lock.json ./service/
COPY service/package.json ./service/
WORKDIR /app/service
RUN npm ci --production
COPY service ./service
COPY --from=build-frontend /app/client/dist ./service/public
ENV PORT=8080
EXPOSE 8080
CMD ["node","service/index.js"]