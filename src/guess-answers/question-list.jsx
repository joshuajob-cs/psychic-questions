import { useState, useContext } from "react";
import { Context } from "../context";
import { addPoints } from "../apis/game-api";
import { AnswerChoices } from "./answer-choices";

export const questions = [
  "Who do you aspire to be like?",
  "What is your greatest fear?",
  "What is something that is difficult for you to remember?",
  "What do you think everyone should learn?",
];

const pointValues = [5, 10, 25, 50];

export function QuestionList({ onComplete, allAnswers, currentPlayer }) {
  const [quesIndex, setQuesIndex] = useState(1);
  const [selected, setSelected] = useState(null);
  const { user, setUser } = useContext(Context);

  const correctIndex = allAnswers.findIndex(
    (p) => p.playerName === currentPlayer,
  );

  function checkAnswer(i) {
    if (selected === correctIndex) {
      const delta = pointValues[i];
      setUser({ ...user, score: user.score + delta });
      addPoints(user.gameCode, user.name, delta);
    }
  }

  function handleNext() {
    checkAnswer(quesIndex - 1);
    setSelected(null);
    if (quesIndex < questions.length) {
      setQuesIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  }

  return questions.slice(0, quesIndex).map((question, i) => {
    const choices = allAnswers.map((p) => p.answers[i]);
    const correctAnswerText = allAnswers[correctIndex]?.answers[i];
    return (
      <div className="question" key={i}>
        <div className="fancy-font">{question}</div>
        {i < quesIndex - 1 ? (
          <div className="answer">Answer: {correctAnswerText}</div>
        ) : (
          <AnswerChoices
            choices={choices}
            onSelect={setSelected}
            onSubmit={handleNext}
          />
        )}
      </div>
    );
  });
}
