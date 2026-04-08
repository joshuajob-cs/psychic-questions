import { useState, useEffect, useContext } from "react";
import { usePhaseChange } from "../hooks/usePhaseChange";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/shared-footer";
import { QuestionList } from "./question-list";
import { PointHeader } from "./point-header";
import { getAnswers, getQuestions, doneGuessing } from "../apis/question-api";
import { getPlayers } from "../apis/game-api";
import { Context } from "../context";
import "./guess-answers.css";

export function GuessAnswers() {
  const [playerIndex, setPlayerIndex] = useState(-1);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { user } = useContext(Context);
  const go = useNavigate();

  usePhaseChange(() => go("/winner"));

  // Run once per mount
  useEffect(() => {
    getPlayers(user.gameCode).then((players) => {
      const others = players.filter((name) => name !== user.name);
      if (others.length === 0) {
        doneGuessing(user.gameCode, user.name).catch(() => {});
        go("/winner");
      } else {
        setOtherPlayers(others);
        setPlayerIndex(0);
      }
    });
  }, []);

  // Run whenever playerIndex changes
  useEffect(() => {
    if (playerIndex < 0) return;
    const currentName = otherPlayers[playerIndex];
    Promise.all([
      getAnswers(user.gameCode, currentName),
      getQuestions(user.gameCode, currentName),
    ]).then(([answersData, questionsData]) => {
      setAllAnswers(answersData.allAnswers);
      setQuestions(questionsData);
    });
  }, [playerIndex]);

  async function handleRoundComplete() {
    if (playerIndex < otherPlayers.length - 1) {
      setPlayerIndex((prev) => prev + 1);
    } else {
      const { guessingDone } = await doneGuessing(user.gameCode, user.name);
      go(guessingDone ? "/winner" : "/waiting");
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
              allAnswers={allAnswers}
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
