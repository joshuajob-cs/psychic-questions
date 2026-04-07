import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";
import { getRandomPoem } from "../apis/outsource-api";
import { namesClient } from "../apis/websocket";
import "./waiting.css";

export function Waiting() {
  const navigate = useNavigate();
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    getRandomPoem().then(setPoem);

    const observer = ({ event, name: phase }) => {
      if (event === "phase_change") {
        if (phase === "guessing") navigate("/guess-answers");
        else if (phase === "winner") navigate("/winner");
      }
    };
    namesClient.addObserver(observer);

    return () => {
      namesClient.observers = namesClient.observers.filter(
        (o) => o !== observer,
      );
    };
  }, []);

  return (
    <>
      <header>
        <Title />
      </header>
      <main>
        <h1>Waiting...</h1>
        <img
          src="MysteriousWalking.jpg"
          width="400"
          alt="A person walking into a foggy, mysterious mist"
        />
        {poem && (
          <details>
            <summary><em>{poem.title}</em> — {poem.author}</summary>
            <p className="poem-lines">{poem.lines.join("\n")}</p>
          </details>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
