import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";
import { Context } from "../context";
import { usePhaseChange } from "../hooks/usePhaseChange";
import { getPlayers, advancePhase } from "../apis/game-api";
import { namesClient } from "../apis/websocket";
import "./start-game.css";

export function StartGame() {
  const { user } = useContext(Context);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPlayers(user.gameCode)
      .then(setPlayers)
      .catch(() => {});

    const observer = ({ event, name }) => {
      if (event === "new_name") setPlayers((prev) => [...prev, name]);
    };
    namesClient.addObserver(observer);

    return () => {
      namesClient.observers = namesClient.observers.filter(
        (o) => o !== observer,
      );
    };
  }, []);

  usePhaseChange(() => navigate("/ask-questions"));

  async function handleStart() {
    await advancePhase(user.gameCode, "answering");
  }

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
        <h3 className="basic-font">Players: {players.length}</h3>
        <div className="grid">
          {players.map((name) => (
            <div className="player" key={name}>
              {name}
            </div>
          ))}
        </div>
        {user.isHost && (
          <div>
            <button className="btn btn-primary mt-2" onClick={handleStart}>
              Start
            </button>
          </div>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
