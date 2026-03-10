import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ask-questions.css";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";
import { getQuestions } from "../apis/question-api";

export function AskQuestions() {
  const go = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [quesIndex, setQuesIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getQuestions().then(setQuestions);
  }, []);

  function handleNext(e) {
    e.preventDefault();
    setAnswer("");
    if (quesIndex < questions.length - 1) {
      setQuesIndex((prev) => prev + 1);
    } else {
      go("/waiting");
    }
  }

  return (
    <>
      <header>
        <Title />
      </header>
      <main>
        <div className="container">
          <h2 className="basic-font">Your Questions</h2>
          <h1>{questions[quesIndex]}</h1>
          <form onSubmit={handleNext}>
            <textarea
              placeholder="Enter your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
            <div>
              Q: {quesIndex + 1}/{questions.length}
            </div>
            <div className="button-container">
              <button type="submit">Next →</button>
            </div>
          </form>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
