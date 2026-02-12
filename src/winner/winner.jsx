import React from "react";
import { Title } from "../join/title";
import { Footer } from "../join/shared-footer";

export function Winner() {
  return (
    <>
      <header>
        <Title />
      </header>
      <main>
        <h1>The winner is Jenny!</h1>
        <h2>With 95 points</h2>
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
