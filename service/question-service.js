import express from "express";
import { GamePhase } from "./game-state.js";
import { saveGame, getGame } from "./game-db.js";
import { requireSession } from "./session-state.js";

import { advancePhase } from "./game-service.js";


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

// When posting an answer, check if all players have submitted answers
router.post("/answer", requireSession, async (req, res) => {
  const { gameCode, playerName, answer } = req.body;
  const game = await getGame(gameCode);
  if (!game) return res.status(404).json({ error: "Game not found" });

  const player = game.players[playerName];
  if (!player) return res.status(404).json({ error: "Player not found" });

  player.addAnswer(answer);
  await saveGame(game);

  const askingDone = Object.values(game.players).every(
    (p) => p.answers.length >= questions.length,
  );
  if (askingDone) {
    await advancePhase(game, GamePhase.GUESSING);
  }

  res.json({ askingDone });
});

// When one player is done guessing, check if all players are done guessing
router.post("/done-guessing", requireSession, async (req, res) => {
  const { gameCode, name } = req.body;
  const game = await getGame(gameCode);
  if (!game) return res.status(404).json({ error: "Game not found" });

  const player = game.players[name];
  if (!player) return res.status(404).json({ error: "Player not found" });

  player.doneGuessing = true;
  await saveGame(game);

  const guessingDone = Object.values(game.players).every((p) => p.doneGuessing);
  if (guessingDone) {
    await advancePhase(game, GamePhase.WINNER);
  }

  res.json({ guessingDone });
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
