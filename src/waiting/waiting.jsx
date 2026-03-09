import React from "react";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";

export function Waiting() {
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
