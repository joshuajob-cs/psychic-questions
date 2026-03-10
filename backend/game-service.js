const express = require("express");
const router = express.Router();

class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.questions = [];
  }

  addQuestion(text, answer) {
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

const players = {};

module.exports = router;
