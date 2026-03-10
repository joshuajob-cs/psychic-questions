import express from "express";
import { games } from "./game-state.js";

const router = express.Router();

const questions = [
  "Who do you aspire to be like?",
  "What is your greatest fear?",
  "What is something that is difficult for you to remember?",
  "What do you think everyone should learn?",
];

router.get("/", (_req, res) => {
  res.json({ questions });
});

export default router;
