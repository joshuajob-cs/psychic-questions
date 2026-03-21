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
    return game;
  }
}

const games = {};

import { gameCollection } from "./database/database.js";

async function saveGame(game) {
  await gameCollection.replaceOne({ gameCode: game.gameCode }, game, {
    upsert: true,
  });
}

async function loadGame(gameCode) {
  const data = await gameCollection.findOne({ gameCode });
  if (!data) return null;
  const game = Game.fromMongo(data);
  games[gameCode] = game;
  return game;
}

async function deleteGame(gameCode) {
  await gameCollection.deleteOne({ gameCode });
}

export { games, Game, saveGame, loadGame, deleteGame };
