import { createServer } from "http";
import express from "express";
import cookieParser from "cookie-parser";
import "./database.js";
import { startWebSocket } from "./websocket.js";
import authService from "./auth-service.js";
import gameService from "./game-service.js";
import questionService from "./question-service.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authService);
app.use("/game", gameService);
app.use("/question", questionService);

app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const httpServer = createServer(app);
startWebSocket(httpServer);
httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
