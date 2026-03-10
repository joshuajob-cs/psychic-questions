const express = require("express");
const cookieParser = require("cookie-parser");

const authService = require("./auth-service");
const gameService = require("./game-service");
const questionService = require("./question-service");

const app = express();

app.use(express.static("../dist"));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authService);
app.use("/game", gameService);
app.use("/question", questionService);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
