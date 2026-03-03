import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ask-questions.css";
import { Title } from "../join/title";
import { Footer } from "../join/shared-footer";

const questions = [
  "Who do you aspire to be like?",
  "What is your greatest fear?",
  "What is something that is difficult for you to remember?",
  "What do you think everyone should learn?",
];

export function AskQuestions() {
  const go = useNavigate();
  const [quesIndex, setQuesIndex] = useState(0);

  function handleNext(e) {
    e.preventDefault();
    if (quesIndex < questions.length - 1) {
      setQuesIndex(quesIndex + 1);
    } else {
      go("/guess-answers");
    }
  }

  return (
    <>
      <header>
        <Title />
      </header>
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
      <footer>
        <Footer />
      </footer>
    </>
  );
}
