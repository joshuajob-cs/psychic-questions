import React from "react";
import { NavLink } from "react-router-dom";
import { Title } from "../join/title";
import { Footer } from "../join/shared-footer";
import { useContext } from "react";
import { Context } from "../context";
import "./start-game.css";

export function StartGame() {
  const { user } = useContext(Context);
  console.log("User from context:", user);
  return (
    <>
      <header className="screen-rotater" id="between-header">
        <Title />
        <h5 className="basic-font"> {user.name} Mystery User's Game</h5>
      </header>
      <main>
        <div>
          <h1>Game Code</h1>
          <h2 className="basic-font">
            <strong>ACXLDE</strong>
          </h2>
        </div>
        <h3 className="basic-font">Players: 26</h3>
        <div className="grid">
          <div className="player">Charles</div>
          <div className="player">Jenny</div>
          <div className="player">Tasha</div>
          <div className="player">Bob</div>
          <div className="player">Skyler</div>
          <div className="player">Robin</div>
          <div className="player">Billy Bob Jones Jr.</div>
        </div>
        <NavLink to="/ask-questions">
          <button>Start</button>
        </NavLink>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
