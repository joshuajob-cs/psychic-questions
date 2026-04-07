import express from "express";
import { games } from "./game-state.js";
import { loadGame, saveGame } from "./game-db.js";
import { requireSession } from "./session-state.js";
import { broadcastToGame } from "./websocket.js";

async function getGame(gameCode) {
  return games[gameCode] ?? (await loadGame(gameCode));
}

const router = express.Router();

const questions = [
  "Who do you aspire to be like?",
  "What is your greatest fear?",
  "What is something that is difficult for you to remember?",
  "What do you think everyone should learn?",
];

router.get("/", requireSession, (_req, res) => {
  res.json({ questions });
});

router.post("/answer", requireSession, async (req, res) => {
  const { gameCode, playerName, answer } = req.body;
  const game = await getGame(gameCode);
  if (!game) return res.status(404).json({ error: "Game not found" });

  const player = game.players[playerName];
  if (!player) return res.status(404).json({ error: "Player not found" });

  player.addAnswer(answer);
  await saveGame(game);

  const askingDone = Object.values(game.players).every(
    (p) => p.answers.length >= questions.length
  );
  if (askingDone) {
    broadcastToGame(game.gameCode, { type: "phase_change", phase: "guessing" });
  }

  res.json({ askingDone });
});

router.get("/answers", requireSession, async (req, res) => {
  const { gameCode, playerName } = req.query;
  const game = await getGame(gameCode);
  if (!game) return res.status(404).json({ error: "Game not found" });

  if (playerName) {
    const player = game.players[playerName];
    if (!player) return res.status(404).json({ error: "Player not found" });
    return res.json({ playerName, answers: player.answers });
  }

  const allAnswers = Object.values(game.players).map((p) => ({
    playerName: p.name,
    answers: p.answers,
  }));
  res.json({ allAnswers });
});

export default router;
