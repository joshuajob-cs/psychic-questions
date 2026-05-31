# ---- Build React frontend (Vite) ----
FROM node:20 AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# builds from /src → /dist
RUN npm run build


# ---- Backend runtime ----
FROM node:20

WORKDIR /app

# install backend deps
COPY package*.json ./
RUN npm install

# copy backend code
COPY service ./service

# copy built frontend into express public folder
COPY --from=frontend /app/dist ./public

ENV PORT=8080
EXPOSE 8080

CMD ["node", "service/index.js"]