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

const players = {};

module.exports = router;
