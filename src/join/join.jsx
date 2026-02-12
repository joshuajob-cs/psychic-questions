import React from "react";
import { AuthHeader } from "./auth-header";
import { AuthFooter } from "./auth-footer";

export function Join() {
  return (
    <>
      <AuthHeader />
      <main>
        <div className="screen-rotater">
          <div>
            <h1>Join Game</h1>
            <form action="enter-name">
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
      <AuthFooter />
    </>
  );
}
