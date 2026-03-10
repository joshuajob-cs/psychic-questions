import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";
import { getRandomFact } from "../apis/outsource-api";

export function Waiting() {
  const navigate = useNavigate();
  const [fact, setFact] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => navigate("/guess-answers"), 5000);
    getRandomFact().then(setFact);
    return () => clearTimeout(timer);
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
