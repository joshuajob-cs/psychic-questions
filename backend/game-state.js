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

  removePlayer(name) {
    delete this.players[name];
  }

  adjustPoints(name, delta) {
    if (!this.players[name]) return false;
    this.players[name].points += delta;
    return true;
  }

  getWinner() {
    const players = Object.values(this.players);
    if (players.length === 0) return null;
    return players.reduce((a, b) => (a.points >= b.points ? a : b));
  }
}

const games = {};

module.exports = { games, Game, Player };
