import { Footer } from "../components/shared-footer";
import { QuestionList } from "./question-list";
import { PointHeader } from "./point-header";
import "./guess-answers.css";

export function GuessAnswers() {
  return (
    <>
      <PointHeader />
      <main>
        <h2 className="heavy-basic">Lily's Questions</h2>
        <QuestionList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
