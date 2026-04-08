import { GamePhase } from './constants.js';

class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.assignedQuestions = [];
    this.answers = [];
    this.doneGuessing = false;
  }

  addAnswer(answer) {
    this.answers.push(answer);
  }

  static fromMongo(data) {
    const player = new Player(data.name);
    player.points = data.points;
    player.assignedQuestions = data.assignedQuestions ?? [];
    player.answers = data.answers ?? [];
    player.doneGuessing = data.doneGuessing ?? false;
    return player;
  }
}

class Game {
  constructor(gameCode) {
    this.gameCode = gameCode;
    this.players = {};
    this.phase = GamePhase.LOBBY;
    this.questionAnswerMap = {};
  }

  addPlayer(name) {
    if (this.players[name]) return false;
    this.players[name] = new Player(name);
    return true;
  }

  removePlayer(name) {
    delete this.players[name];
  }

  getWinner() {
    const players = Object.values(this.players);
    if (players.length === 0) return null;
    return players.reduce((a, b) => (a.points >= b.points ? a : b));
  }

  static fromMongo(data) {
    const game = new Game(data.gameCode);
    for (const [name, p] of Object.entries(data.players)) {
      game.players[name] = Player.fromMongo(p);
    }
    game.phase = data.phase ?? GamePhase.LOBBY;
    game.questionAnswerMap = data.questionAnswerMap ?? {};
    return game;
  }
}

const games = {};

export { games, Game, GamePhase };
