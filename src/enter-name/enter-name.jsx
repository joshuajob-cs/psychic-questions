import React from "react";

export function EnterName() {
  return (
    <>
      <header>
        <h3>🔮 Psychic Questions 🤔</h3>
      </header>
      <main>
        <h1>Name</h1>
        <form action="start-game">
          <div>
            <input type="text" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
