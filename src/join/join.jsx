import React from "react";

export function Join() {
  return (
    <main>
      <div className="screen-rotater">
        <div>
          <h1>Join Game</h1>
          <form action="HTML/enter-name.html">
            <input type="text" placeholder="Join Code" required />
            <div>
              <button type="submit">Join</button>
            </div>
          </form>
        </div>
        <img
          src="HTML/Brain.png"
          width="300"
          alt="You climb up a latter to reach a brain"
        />
      </div>
    </main>
  );
}
