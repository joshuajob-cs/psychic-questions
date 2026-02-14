import React from "react";
import { Title } from "../join/title";
import { Footer } from "../join/shared-footer";
import "./guess-answers.css";
import "../start-game/between-header.css";

export function GuessAnswers() {
  return (
    <>
      <header className="screen-rotater between-header">
        <Title />
        <div id="points-container">
          <div id="player-name">Jake</div>
          <div id="points">
            <div id="points-label">Points</div>
            <div id="points-value">35</div>
          </div>
        </div>
      </header>
      <main>
        <h2 className="heavy-basic">Lily's Questions</h2>
        <h3 className="basic-font">You are 50% alike</h3>
        <div className="question">
          <div className="fancy-font">What is your greatest fear?</div>
          <div className="answer">Answer: Sandwiches</div>
        </div>
        <div className="question">
          <div className="fancy-font">
            What is something that is difficult for you to remember?
          </div>
          <div className="answer">Answer: Math</div>
        </div>
        <form action="/winner">
          <div className="question">
            <div className="fancy-font">
              What do you think everyone should learn?
            </div>
            <div className="answer-choices">
              <div className="choice">
                <input type="radio" id="answer-a" name="question-3" />
                <label for="answer-a">How to swim</label>
              </div>
              <div className="choice">
                <input type="radio" id="answer-b" name="question-3" />
                <label for="answer-b">Be a good person</label>
              </div>
              <div className="choice">
                <input type="radio" id="answer-c" name="question-3" />
                <label for="answer-c">Nothing</label>
              </div>
              <div className="choice">
                <input type="radio" id="answer-d" name="question-3" />
                <label for="answer-d">Pay attention and listen</label>
              </div>
            </div>
          </div>
          <button type="submit">Next</button>
        </form>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
