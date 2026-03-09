import React, { useState } from "react";
import { AuthHeader } from "../components/auth-header";
import { AuthFooter } from "../components/auth-footer";
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
            <InputTester />
          </div>
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
