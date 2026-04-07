import express from "express";
import { games, Game, GamePhase } from "./game-state.js";
import { loadGame, saveGame, deleteGame } from "./game-db.js";
import { broadcastToGame } from "./websocket.js";
import {
  tokens,
  setSessionCookie,
  requireSession,
  requireLogin,
} from "./session-state.js";

const router = express.Router();

async function getGame(gameCode) {
  return games[gameCode] ?? (await loadGame(gameCode));
}

async function getPlayer(gameCode, name) {
  const game = await getGame(gameCode);
  return { game, player: game?.players[name] ?? null };
}

router.get("/winner", requireSession, async (req, res) => {
  const game = await getGame(req.query.gameCode);
  if (!game) return res.status(404).send({ msg: "Game not found" });
  const winner = game.getWinner();
  if (!winner) return res.status(404).send({ msg: "No players" });
  res.send({ winner: winner.name, points: winner.points });
});

router.get("/players", requireSession, async (req, res) => {
  const game = await getGame(req.query.gameCode);
  if (!game) return res.status(404).send({ msg: "Game not found" });
  res.send({ players: Object.keys(game.players) });
});

// Checks if game exists without returning game data (for guests Start-Game -> Join-Game flow)
router.get("/:code", async (req, res) => {
  const game = await getGame(req.params.code);
  if (game) {
    res.send({});
  } else {
    res.status(404).send({ msg: "Game not found" });
  }
});

router.post("/create", requireLogin, async (_req, res) => {
  let gameCode;
  do {
    gameCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  } while (games[gameCode]);
  const game = new Game(gameCode);
  games[gameCode] = game;
  await saveGame(game);
  res.send({ gameCode });
});

router.post("/start", requireLogin, async (req, res) => {
  const { gameCode } = req.body;
  const game = await getGame(gameCode);
  if (!game) return res.status(404).send({ msg: "Game not found" });
  game.phase = GamePhase.ANSWERING;
  await saveGame(game);
  broadcastToGame(gameCode, { type: "phase_change", phase: GamePhase.ANSWERING });
  res.send({});
});

router.post("/join", async (req, res) => {
  const { gameCode, name } = req.body;
  const game = await getGame(gameCode);
  if (!game) {
    res.status(404).send({ msg: "Game not found" });
    return;
  }
  if (!game.addPlayer(name)) {
    res.status(409).send({ msg: "Name already taken in this game" });
    return;
  }
  clearTimeout(game._saveTimer);
  game._saveTimer = setTimeout(() => saveGame(game), 10_000);
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

router.post("/done-guessing", requireSession, async (req, res) => {
  const { gameCode, name } = req.body;
  const { game, player } = await getPlayer(gameCode, name);
  if (!game) return res.status(404).send({ msg: "Game not found" });
  if (!player) return res.status(404).send({ msg: "Player not found" });

  player.doneGuessing = true;
  await saveGame(game);

  const guessingDone = Object.values(game.players).every((p) => p.doneGuessing);
  if (guessingDone) {
    game.phase = GamePhase.WINNER;
    await saveGame(game);
    broadcastToGame(gameCode, { type: "phase_change", phase: GamePhase.WINNER });
  }

  res.send({ guessingDone });
});

router.patch("/points", requireSession, async (req, res) => {
  const { gameCode, name, delta } = req.body;
  if (typeof delta !== "number") return res.status(400).send({ msg: "delta must be a number" });
  const { game, player } = await getPlayer(gameCode, name);
  if (!game) return res.status(404).send({ msg: "Game not found" });
  if (!player) return res.status(404).send({ msg: "Player not found" });
  player.points += delta;
  clearTimeout(game._saveTimer);
  game._saveTimer = setTimeout(() => saveGame(game), 10_000);
  res.send({ points: player.points });
});

router.delete("/leave", requireSession, async (req, res) => {
  const game = await getGame(req.query.gameCode);
  if (!game) {
    res.status(404).send({ msg: "Game not found" });
    return;
  }
  leaveGame(game, req.cookies["token"], req.session, res);
  clearTimeout(game._saveTimer);
  game._saveTimer = setTimeout(() => saveGame(game), 10_000);
  res.send({});
});

router.delete("/:code", requireLogin, async (req, res) => {
  const game = await getGame(req.params.code);
  if (!game) {
    res.status(404).send({ msg: "Game not found" });
    return;
  }
  for (const [token, session] of Object.entries(tokens)) {
    if (session.name && game.players[session.name]) {
      leaveGame(game, token, session, null);
    }
  }
  clearTimeout(game._saveTimer);
  delete games[req.params.code];
  await deleteGame(req.params.code);
  res.send({});
});

export default router;
