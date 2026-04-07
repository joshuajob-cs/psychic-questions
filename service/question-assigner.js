import questions from "./questions.js";

const QUESTIONS_PER_PLAYER = 4;

export function assignQuestionsToPlayers(players) {
  const indices = Array.from({ length: questions.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const assigned = indices.slice(0, QUESTIONS_PER_PLAYER);
  for (const player of Object.values(players)) {
    player.assignedQuestions = assigned;
  }
}
