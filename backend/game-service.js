const express = require("express");
const router = express.Router();

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

  addPlayer(username, name) {
    this.players[username] = new Player(name);
  }
}

const games = {};

module.exports = router;
