import React from "react";
import { AuthHeader } from "./auth-header";
import { AuthFooter } from "./auth-footer";
import { InputTester } from "./input-tester";
import "./join.css";

export function Join() {
  return (
    <>
      <AuthHeader />
      <main>
        <div className="screen-rotater" id="join-rotater">
          <div>
            <h1>Join Game</h1>
            <form action="/enter-name">
              <input type="text" placeholder="Join Code" required />
              <div>
                <button type="submit">Join</button>
                <InputTester />
              </div>
            </form>
          </div>
          <InputTester />
          <img
            id="shrinkable"
            src="Brain.png"
            alt="You climb up a latter to reach a brain"
          />
        </div>
      </main>
      <AuthFooter />
    </>
  );
}
