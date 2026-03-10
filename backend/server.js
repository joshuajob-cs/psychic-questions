const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authService = require("./auth-service");
const gameService = require("./game-service");
const questionService = require("./question-service");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authService);
app.use("/game", gameService);
app.use("/question", questionService);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
