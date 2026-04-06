import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";
import { Context } from "../context";
import { namesClient } from "../apis/websocket";
import { getPlayers } from "../apis/game-api";
import "./start-game.css";

export function StartGame() {
  const { user } = useContext(Context);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers(user.gameCode).then(setPlayers).catch(() => {});

    const observer = ({ event, from }) => {
      if (event === "received") {
        setPlayers((prev) => [...prev, from]);
      }
    };
    namesClient.addObserver(observer);

    return () => {
      namesClient.observers = namesClient.observers.filter((o) => o !== observer);
    };
  }, []);

  return (
    <>
      <header className="screen-rotater between-header">
        <Title />
        <h5 className="basic-font"> {user.username}'s Game</h5>
      </header>
      <main className="uncenter">
        <div>
          <h1>Game Code</h1>
          <h2 className="basic-font">
            <strong>{user.gameCode}</strong>
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
