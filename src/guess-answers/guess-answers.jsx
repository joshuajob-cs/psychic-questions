import React, { useState } from "react";
import { Title } from "../join/title";
import { Footer } from "../join/shared-footer";
import { useContext } from "react";
import { Context } from "../context";
import "./guess-answers.css";

const questions = [
  "Who do you aspire to be like?",
  "What is your greatest fear?",
  "What is something that is difficult for you to remember?",
  "What do you think everyone should learn?",
];

const correctAnswers = [0, 0, 0, 0];

const possibleAnswers = [
  ["My Mom", "My Dad", "A Celebrity", "Nobody"],
  ["Sandwiches", "Heights", "Spiders", "The Dark"],
  ["Math", "Names", "Passwords", "Dates"],
  ["How to Swim", "Be a Good Person", "Nothing", "Pay Attention and Listen"],
];

export function GuessAnswers() {
  const { user } = useContext(Context);
  const [quesIndex, setQuesIndex] = useState(1);

  function handleNext() {
    if (quesIndex < questions.length) {
      setQuesIndex(quesIndex + 1);
    }
  }

  return (
    <>
      <header id="between-header">
        <Title />
        <div id="points-container">
          <div id="player-name">{user.name}</div>
          <div id="points">
            <div id="points-label">Points</div>
            <div id="points-value">{user.score}</div>
          </div>
        </div>
      </header>
      <main>
        <h2 className="heavy-basic">Lily's Questions</h2>
        <h3 className="basic-font">You are 50% alike</h3>
        {questions.slice(0, quesIndex).map((question, i) => (
          <div className="question" key={i}>
            <div className="fancy-font">{question}</div>
            {i < quesIndex - 1 ? (
              <div className="answer">
                Answer: {possibleAnswers[i][correctAnswers[i]]}
              </div>
            ) : (
              <div className="answer-choices">
                {possibleAnswers[i].map((choice, j) => (
                  <div className="choice" key={j}>
                    <input
                      type="radio"
                      id={`q${i}-a${j}`}
                      name={`question-${i}`}
                    />
                    <label htmlFor={`q${i}-a${j}`}>{choice}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {quesIndex < questions.length && (
          <button onClick={handleNext}>Next</button>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
