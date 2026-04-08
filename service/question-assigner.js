import questions from "./questions.js";

const QUESTIONS_PER_PLAYER = 5;

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
  const numQuestions = Math.max(QUESTIONS_PER_PLAYER, numPlayers);

  const allIndices = shuffle(
    Array.from({ length: questions.length }, (_, i) => i),
  );
  const selected = allIndices.slice(0, numQuestions);

  if (numPlayers <= QUESTIONS_PER_PLAYER) {
    // All players get the same 4 questions
    for (const player of playerList) {
      player.assignedQuestions = [...selected];
    }
  } else {
    // Cyclic assignment: player i gets 4 consecutive questions (wrapping around)
    // so each question is asked to exactly 4 players
    shuffle(selected);
    for (let i = 0; i < numPlayers; i++) {
      playerList[i].assignedQuestions = Array.from(
        { length: QUESTIONS_PER_PLAYER },
        (_, k) => selected[(i + k) % numPlayers],
      );
    }
  }
}
