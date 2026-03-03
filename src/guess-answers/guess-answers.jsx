import React, { useState } from "react";
import { Title } from "../join/title";
import { Footer } from "../join/shared-footer";
import { useContext } from "react";
import { Context } from "../context";
import { QuestionList } from "./question-list";
import "./guess-answers.css";

export function GuessAnswers() {
  const { user } = useContext(Context);

  return (
    <>
      <header id="between-header">
        <Title />
        <div id="points-container">
          <div id="player-name">{user.name}</div>
          <div id="points">
            <div id="points-label">Points</div>
            <div id="points-value">{user.score}</div>
          </div>
        </div>
      </header>
      <main>
        <h2 className="heavy-basic">Lily's Questions</h2>
        <h3 className="basic-font">You are 50% alike</h3>
        <QuestionList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
