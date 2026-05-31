import { createServer } from "http";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import "./database.js";
import { startWebSocket } from "./websocket.js";
import authService from "./auth-service.js";
import gameService from "./game-service.js";
import questionService from "./question-service.js";

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authService);
app.use("/game", gameService);
app.use("/question", questionService);

app.use((_req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const httpServer = createServer(app);
startWebSocket(httpServer);
httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
