import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";
import { getRandomPoem } from "../apis/outsource-api";
import { usePhaseChange } from "../hooks/usePhaseChange";
import { advancePhase, getPhase } from "../apis/game-api";
import { Context } from "../context";
import "./waiting.css";

export function Waiting() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [poem, setPoem] = useState(null);
  const [phase, setPhase] = useState(null);

  async function handleSkip() {
    if (phase === "answering") {
      await advancePhase(user.gameCode, "guessing");
      navigate("/guess-answers");
    } else if (phase === "guessing") {
      await advancePhase(user.gameCode, "winner");
      navigate("/winner");
    }
  }

  useEffect(() => {
    getRandomPoem().then(setPoem);
    getPhase(user.gameCode).then(setPhase);

  }, []);

  usePhaseChange((phase) => {
    if (phase === "guessing") navigate("/guess-answers");
    else if (phase === "winner") navigate("/winner");
  });

  return (
    <>
      <header>
        <div className="screen-rotater header-rotater">
          <Title />
          {user?.isHost && (
            <nav>
              <button className="btn btn-outline-primary" onClick={handleSkip}>
                Skip
              </button>
            </nav>
          )}
        </div>
      </header>
      <main>
        <h1 id="waiting-title">Waiting...</h1>
        <div className="screen-rotater" id="waiting-rotater">
          <img
            src="MysteriousWalking.jpg"
            width="400"
            alt="A person walking into a foggy, mysterious mist"
          />
          {poem && (
            <details className="poem-box">
              <summary><strong><em>{poem.title}</em></strong> — {poem.author}</summary>
              <p className="poem-lines">{poem.lines.join("\n")}</p>
            </details>
          )}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
