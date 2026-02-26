import React from "react";
import { Title } from "../join/title";
import { Footer } from "../join/shared-footer";

//Create a context that stores the name, so everything else can access it.

export function EnterName() {
  return (
    <>
      <header>
        <Title />
      </header>
      <main>
        <h1>Name</h1>
        <form action="/start-game">
          <div>
            <input type="text" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
