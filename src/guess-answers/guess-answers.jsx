import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/shared-footer";
import { QuestionList } from "./question-list";
import { PointHeader } from "./point-header";
import "./guess-answers.css";

const TOTAL_ROUNDS = 3;

export function GuessAnswers() {
  const [round, setRound] = useState(1);
  const go = useNavigate();

  function handleRoundComplete() {
    if (round < TOTAL_ROUNDS) {
      setRound((prev) => prev + 1);
    } else {
      go("/winner");
    }
  }

  return (
    <>
      <PointHeader />
      <main className="uncenter">
        <h2 className="heavy-basic">Lily's Questions ({round}/{TOTAL_ROUNDS})</h2>
        <QuestionList key={round} onComplete={handleRoundComplete} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
