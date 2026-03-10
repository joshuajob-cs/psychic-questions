class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.questions = [];
  }

  addQuestion(question, answer) {
    this.questions.push({ question, answer });
  }
}

class Game {
  constructor(gameCode) {
    this.gameCode = gameCode;
    this.players = {};
  }

  addPlayer(name) {
    if (this.players[name]) return false;
    this.players[name] = new Player(name);
    return true;
  }
}

const games = {};

module.exports = { games, Game, Player };
