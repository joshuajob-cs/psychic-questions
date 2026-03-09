import React from "react";
import { useContext } from "react";
import { Footer } from "../components/shared-footer";
import { PointHeader } from "../guess-answers/point-header";
import { Context } from "../context";

export function Winner() {
  const { user } = useContext(Context);
  const isWinner = user.score > 70;
  const winnerName = isWinner ? user.name : "Jenny";
  const winnerPoints = isWinner ? user.score : 70;

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
