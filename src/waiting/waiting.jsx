import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";
import { getRandomFact } from "../apis/outsource-api";
import { namesClient } from "../apis/websocket";

export function Waiting() {
  const navigate = useNavigate();
  const [fact, setFact] = useState(null);

  useEffect(() => {
    getRandomFact().then(setFact);

    const observer = ({ event, name: phase }) => {
      if (event === "phase_change") {
        if (phase === "guessing") navigate("/guess-answers");
        else if (phase === "winner") navigate("/winner");
      }
    };
    namesClient.addObserver(observer);

    return () => {
      namesClient.observers = namesClient.observers.filter((o) => o !== observer);
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
        {fact && <p>🔎 {fact} 🧠</p>}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
