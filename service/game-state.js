const GamePhase = Object.freeze({
  LOBBY: 'lobby',
  ANSWERING: 'answering',
  GUESSING: 'guessing',
  WINNER: 'winner',
});

class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.answers = [];
  }

  addAnswer(answer) {
    this.answers.push(answer);
  }

  static fromMongo(data) {
    const player = new Player(data.name);
    player.points = data.points;
    player.answers = data.answers;
    return player;
  }
}

class Game {
  constructor(gameCode) {
    this.gameCode = gameCode;
    this.players = {};
    this.phase = GamePhase.LOBBY;
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

  static fromMongo(data) {
    const game = new Game(data.gameCode);
    for (const [name, p] of Object.entries(data.players)) {
      game.players[name] = Player.fromMongo(p);
    }
    game.phase = data.phase ?? GamePhase.LOBBY;
    return game;
  }
}

const games = {};

export { games, Game, GamePhase };
