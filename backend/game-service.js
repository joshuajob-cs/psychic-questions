const express = require("express");
const router = express.Router();
const { games, Game } = require("./game-state");
const { tokens, setSessionCookie } = require("./session-store");

router.get("/check-code", (req, res) => {
  const game = games[req.params.code];
  if (game) {
    res.send({});
  } else {
    res.status(404).send({ msg: "Game not found" });
  }
});

router.post("/join", (req, res) => {
  const { gameCode, name } = req.body;
  const game = games[gameCode];
  if (!game) {
    res.status(404).send({ msg: "Game not found" });
  } else if (!game.addPlayer(name)) {
    res.status(409).send({ msg: "Name already taken in this game" });
  } else {
    setSessionCookie(res, { username: null, name });
    res.send({ name });
  }
});

module.exports = router;
