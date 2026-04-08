import express from "express";
import { GamePhase } from "./game-state.js";
import { saveGame, getGame } from "./game-db.js";
import { requireSession } from "./session-state.js";
import { advancePhase } from "./game-service.js";
import questions from "./questions.js";

const router = express.Router();

router.get("/", requireSession, async (req, res) => {
  const { gameCode, playerName } = req.query;
  const game = await getGame(gameCode);
  if (!game) return res.status(404).json({ error: "Game not found" });

  const player = game.players[playerName];
  if (!player) return res.status(404).json({ error: "Player not found" });

  res.json({ questions: player.assignedQuestions.map((i) => questions[i]) });
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
    (p) => p.answers.length >= p.assignedQuestions.length,
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

  const player = game.players[playerName];
  if (!player) return res.status(404).json({ error: "Player not found" });

  const allAnswers = player.assignedQuestions.map(
    (qi) => game.questionAnswerMap[qi] ?? {},
  );
  res.json({ allAnswers });
});

export default router;
