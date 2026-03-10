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

router.post("/create", requireSession, (req, res) => {
  if (!req.session.username) {
    res.status(401).send({ msg: "Unauthorized" });
    return;
  }
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

function leaveGame(game, token, session, res) {
  game.removePlayer(session.name);
  if (session.username) {
    session.name = null;
  } else {
    delete tokens[token];
    if (res) res.clearCookie("token");
  }
}

router.delete("/:code", requireSession, (req, res) => {
  if (!req.session.username) {
    res.status(401).send({ msg: "Unauthorized" });
    return;
  }
  const game = games[req.params.code];
  if (!game) {
    res.status(404).send({ msg: "Game not found" });
    return;
  }
  for (const [token, session] of Object.entries(tokens)) {
    if (session.name && game.players[session.name]) {
      leaveGame(game, token, session, null);
    }
  }
  delete games[req.params.code];
  res.send({});
});

router.delete("/leave", requireSession, (req, res) => {
  const game = games[req.query.gameCode];
  if (!game) {
    res.status(404).send({ msg: "Game not found" });
    return;
  }
  leaveGame(game, req.cookies["token"], req.session, res);
  res.send({});
});

module.exports = router;
