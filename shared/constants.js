export const QUESTIONS_PER_PLAYER = 4;
export const CHOICES_PER_QUESTION = 4;
export const PLAYERS_PER_GUESSER = 4;

export const GamePhase = Object.freeze({
  LOBBY: 'lobby',
  ANSWERING: 'answering',
  GUESSING: 'guessing',
  WINNER: 'winner',
});
