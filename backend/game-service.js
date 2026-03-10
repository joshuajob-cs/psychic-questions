const express = require("express");
const router = express.Router();
const { games, Game } = require("./game-state");
const { tokens, setSessionCookie, requireSession } = require("./session-state");

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

router.delete("/leave", requireSession, (req, res) => {
  const game = games[req.query.gameCode];
  if (!game) {
    res.status(404).send({ msg: "Game not found" });
    return;
  }
  game.removePlayer(req.session.name);
  if (req.session.username) {
    req.session.name = null;
  } else {
    delete tokens[req.cookies["token"]];
    res.clearCookie("token");
  }
  res.send({});
});

module.exports = router;
