import questions from "./questions.js";
import { QUESTIONS_PER_PLAYER, CHOICES_PER_QUESTION } from "../shared/constants.js";

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Each question is mapped to a dict of playerName -> answer
export function buildQuestionAnswerMap(players) {
  const map = {};
  for (const p of Object.values(players)) {
    for (let i = 0; i < p.assignedQuestions.length; i++) {
      const qi = p.assignedQuestions[i];
      if (!map[qi]) map[qi] = {};
      map[qi][p.name] = p.answers[i];
    }
  }
  return map;
}

export function assignQuestionsToPlayers(players) {
  const playerList = Object.values(players);
  const numPlayers = playerList.length;
  const numQuestions =
    numPlayers <= CHOICES_PER_QUESTION
      ? QUESTIONS_PER_PLAYER
      : Math.floor(
          (numPlayers * QUESTIONS_PER_PLAYER) / (CHOICES_PER_QUESTION + 1),
        );

  const allIndices = shuffle(
    Array.from({ length: questions.length }, (_, i) => i),
  );
  const selected = allIndices.slice(0, numQuestions);

  if (numPlayers <= QUESTIONS_PER_PLAYER) {
    // All players get the same questions
    for (const player of playerList) {
      player.assignedQuestions = [...selected];
    }
  } else {
    // Cyclic assignment: player i gets QUESTIONS_PER_PLAYER consecutive questions
    // (wrapping around numQuestions)
    shuffle(selected);
    for (let i = 0; i < numPlayers; i++) {
      playerList[i].assignedQuestions = Array.from(
        { length: QUESTIONS_PER_PLAYER },
        (_, k) => selected[(i + k) % numQuestions],
      );
    }
  }
}
