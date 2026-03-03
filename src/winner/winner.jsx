import React from "react";
import { Footer } from "../join/shared-footer";
import { PointHeader } from "../guess-answers/point-header";

export function Winner() {
  return (
    <>
      <PointHeader />
      <main>
        <h1>The winner is Jenny!</h1>
        <h2>With 70 points</h2>
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
