import React from "react";
import "./guess-answers.css";
import { Title } from "../join/title";
import { Footer } from "../join/shared-footer";

export function GuessAnswers() {
  return (
    <>
      <header>
        <Title />
      </header>
      <main>
        <h2 class="heavy-basic">Lily's Questions</h2>
        <h3 class="basic-font">You are 50% alike</h3>
        <div class="question">
          <div class="light-fancy">What is your greatest fear?</div>
          <div class="answer">Answer: Sandwiches</div>
        </div>
        <div class="question">
          <div class="light-fancy">
            What is something that is difficult for you to remember?
          </div>
          <div class="answer">Answer: Math</div>
        </div>
        <form action="/winner">
          <div class="question">
            <div class="light-fancy">
              What do you think everyone should learn?
            </div>
            <div class="answer-choices">
              <div class="choice">
                <input type="radio" id="answer-a" name="question-3" />
                <label for="answer-a">How to swim</label>
              </div>
              <div class="choice">
                <input type="radio" id="answer-b" name="question-3" />
                <label for="answer-b">Be a good person</label>
              </div>
              <div class="choice">
                <input type="radio" id="answer-c" name="question-3" />
                <label for="answer-c">Nothing</label>
              </div>
              <div class="choice">
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
