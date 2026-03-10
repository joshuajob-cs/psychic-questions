import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/shared-footer";
import { PointHeader } from "../guess-answers/point-header";
import { Context } from "../context";
import { getWinner } from "../storage-api/game-api";

export function Winner() {
  const { user } = useContext(Context);
  const [winnerName, setWinnerName] = useState(null);
  const [winnerPoints, setWinnerPoints] = useState(null);

  useEffect(() => {
    getWinner(user.gameCode).then((data) => {
      setWinnerName(data.winner);
      setWinnerPoints(data.points);
    });
  }, [user.gameCode]);

  return (
    <>
      <PointHeader />
      <main>
        <h1>The winner is {winnerName}!</h1>
        <h2>With {winnerPoints} points</h2>
        <img
          src="Elephant.png"
          width="300"
          alt="An adorable elephant celebrates your victory"
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
