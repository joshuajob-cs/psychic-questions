import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const questions = [
  "Who do you aspire to be like?",
  "What is your greatest fear?",
  "What is something that is difficult for you to remember?",
  "What do you think everyone should learn?",
];

export const correctAnswers = [0, 0, 0, 0];

export const possibleAnswers = [
  ["My Mom", "My Dad", "A Celebrity", "Nobody"],
  ["Sandwiches", "Heights", "Spiders", "The Dark"],
  ["Math", "Names", "Passwords", "Dates"],
  ["How to Swim", "Be a Good Person", "Nothing", "Pay Attention and Listen"],
];

export function QuestionList() {
  const [quesIndex, setQuesIndex] = useState(1);
  const go = useNavigate();

  function handleNext() {
    if (quesIndex < questions.length) {
      setQuesIndex(quesIndex + 1);
    } else {
      go("/winner");
    }
  }
  return questions.slice(0, quesIndex).map((question, i) => (
    <div className="question" key={i}>
      <div className="fancy-font">{question}</div>
      {i < quesIndex - 1 ? (
        <div className="answer">
          Answer: {possibleAnswers[i][correctAnswers[i]]}
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          <div className="answer-choices">
            {possibleAnswers[i].map((choice, j) => (
              <div className="choice" key={j}>
                <input
                  type="radio"
                  id={`q${i}-a${j}`}
                  name={`question-${i}`}
                  required
                />
                <label htmlFor={`q${i}-a${j}`}>{choice}</label>
              </div>
            ))}
          </div>
          {<button type="submit">Next</button>}
        </form>
      )}
    </div>
  ));
}
