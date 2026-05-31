# ---- Build frontend ----
FROM node:20 AS frontend

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build


# ---- Build backend ----
FROM node:20

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install

COPY server ./server

# move frontend build into Express public folder
COPY --from=frontend /app/client/dist ./server/public

WORKDIR /app/server

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "index.js"]
