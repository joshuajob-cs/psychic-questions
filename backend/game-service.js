const express = require("express");
const router = express.Router();
const { games, Game } = require("./game-state");
const { tokens, setSessionCookie } = require("./session-state");

router.get("/:code", (req, res) => {
  const game = games[req.params.code];
  if (game) {
    res.send({});
  } else {
    res.status(404).send({ msg: "Game not found" });
  }
});

router.post("/create", (_req, res) => {
  let gameCode;
  do {
    gameCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  } while (games[gameCode]);
  games[gameCode] = new Game(gameCode);
  res.send({ gameCode });
});

router.post("/join", (req, res) => {
  const { gameCode, name } = req.body;
  const game = games[gameCode];
  if (!game) {
    res.status(404).send({ msg: "Game not found" });
    return;
  }
  if (!game.addPlayer(name)) {
    res.status(409).send({ msg: "Name already taken in this game" });
    return;
  }
  const session = tokens[req.cookies["token"]];
  if (session) {
    session.name = name;
  } else {
    setSessionCookie(res, { username: null, name });
  }
  res.send({ name });
});

module.exports = router;
