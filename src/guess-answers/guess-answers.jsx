import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/shared-footer";
import { QuestionList } from "./question-list";
import { PointHeader } from "./point-header";
import { getAnswers } from "../apis/question-api";
import { Context } from "../context";
import "./guess-answers.css";

export function GuessAnswers() {
  const [playerIndex, setPlayerIndex] = useState(0);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const { user } = useContext(Context);
  const go = useNavigate();

  useEffect(() => {
    getAnswers(user.gameCode).then((data) => {
      const others = data.allAnswers
        .map((p) => p.playerName)
        .filter((name) => name !== user.name);
      setOtherPlayers(others);
    });
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
        <QuestionList key={playerIndex} onComplete={handleRoundComplete} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
