import { useState, useContext, useMemo } from "react";
import { Context } from "../context";
import { addPoints } from "../apis/game-api";
import { AnswerChoices } from "./answer-choices";

const pointValues = [5, 10, 25, 50];

function selectRandomAnswers(allAnswers, correctPlayerIndex, questionIndex) {
  const correctAnswer = allAnswers[correctPlayerIndex].answers[questionIndex];
  const others = allAnswers
    .filter((_, i) => i !== correctPlayerIndex)
    .map((p) => p.answers[questionIndex])
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const pool = [...others, correctAnswer].sort(() => Math.random() - 0.5);
  return { choices: pool, correctChoiceIndex: pool.indexOf(correctAnswer) };
}

export function QuestionList({
  onComplete,
  allAnswers,
  currentPlayer,
  questions,
}) {
  const [quesIndex, setQuesIndex] = useState(1);
  const [selected, setSelected] = useState(null);
  const { user, setUser } = useContext(Context);

  const correctIndex = allAnswers.findIndex(
    (player) => player.playerName === currentPlayer,
  );

  const shuffledQuestions = useMemo(
    () =>
      questions.map((_, i) => selectRandomAnswers(allAnswers, correctIndex, i)),
    [allAnswers, correctIndex, questions],
  );

  async function checkAnswer(i) {
    if (selected === shuffledQuestions[i].correctChoiceIndex) {
      const delta = pointValues[i];
      const data = await addPoints(user.gameCode, user.name, delta);
      setUser({ ...user, score: data.points });
    }
  }

  async function handleNext() {
    await checkAnswer(quesIndex - 1);
    setSelected(null);
    if (quesIndex < questions.length) {
      setQuesIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  }

  return questions.slice(0, quesIndex).map((question, i) => {
    const { choices, correctChoiceIndex } = shuffledQuestions[i];
    const correctAnswerText = choices[correctChoiceIndex];
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
