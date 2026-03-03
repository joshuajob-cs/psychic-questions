import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Title } from "../join/title";
import { Footer } from "../join/shared-footer";
import { useContext } from "react";
import { Context } from "../context";
import "./start-game.css";

const [players, setPlayers] = useState([
  "Charles",
  "Jenny",
  "Tasha",
  "Bob",
  "Skyler",
  "Robin",
]);

export function StartGame() {
  const { user } = useContext(Context);
  return (
    <>
      <header className="screen-rotater" id="between-header">
        <Title />
        <h5 className="basic-font"> {user.username}'s Game</h5>
      </header>
      <main>
        <div>
          <h1>Game Code</h1>
          <h2 className="basic-font">
            <strong>ABCDE</strong>
          </h2>
        </div>
        <h3 className="basic-font">Players: {players.length + 1}</h3>
        <div className="grid">
          {players.map((name) => (
            <div className="player" key={name}>
              {name}
            </div>
          ))}
          <div className="player">{user.name}</div>
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
