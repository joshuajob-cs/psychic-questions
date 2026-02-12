import React from "react";
import "./ask-questions.css";

export function AskQuestions() {
  return (
    <main>
      <div className="container">
        <h2 className="basic-font">Your Questions</h2>
        <h1>Who do you aspire to be like?</h1>
        <form action="/guess-answers">
          <textarea placeholder="Enter your answer here..."></textarea>
          <div>Q: 1/4</div>
          <div className="button-container">
            <button>Next →</button>
          </div>
        </form>
      </div>
    </main>
  );
}
