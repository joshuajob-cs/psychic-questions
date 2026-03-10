import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";

export function Waiting() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/guess-answers"), 10000);
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
          width="500"
          alt="A person walking into a foggy, mysterious mist"
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
