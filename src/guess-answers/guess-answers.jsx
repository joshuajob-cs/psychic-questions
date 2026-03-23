import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/shared-footer";
import { QuestionList } from "./question-list";
import { PointHeader } from "./point-header";
import { getAnswers, getQuestions } from "../apis/question-api";
import { Context } from "../context";
import "./guess-answers.css";

export function GuessAnswers() {
  const [playerIndex, setPlayerIndex] = useState(0);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { user } = useContext(Context);
  const go = useNavigate();

  useEffect(() => {
    Promise.all([getAnswers(user.gameCode), getQuestions()]).then(
      ([answersData, questionsData]) => {
        setAllAnswers(answersData.allAnswers);
        const others = answersData.allAnswers
          .map((p) => p.playerName)
          .filter((name) => name !== user.name);
        setOtherPlayers(others);
        setQuestions(questionsData);
        if (others.length === 0) go("/winner");
      },
    );
  }, []);

  function handleRoundComplete() {
    if (playerIndex < otherPlayers.length - 1) {
      setPlayerIndex((prev) => prev + 1);
    } else {
      go("/winner");
    }
  }

  const currentPlayer = otherPlayers[playerIndex] ?? "...";
  const totalRounds = otherPlayers.length;

  return (
    <>
      <PointHeader />
      <main className="uncenter">
        <h2 className="heavy-basic">
          {currentPlayer}'s Questions ({playerIndex + 1}/{totalRounds})
        </h2>
        {allAnswers.length > 0 &&
          questions.length > 0 &&
          otherPlayers.length > 0 && (
            <QuestionList
              key={playerIndex}
              onComplete={handleRoundComplete}
              allAnswers={allAnswers.filter(
                (player) => player.playerName !== user.name,
              )}
              currentPlayer={currentPlayer}
              questions={questions}
            />
          )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
