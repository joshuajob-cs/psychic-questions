import { Title } from "../components/title";
import { useContext, useEffect } from "react";
import { Context } from "../context";
import { getPlayer } from "../apis/game-api";
import "./point-header.css";

export function PointHeader() {
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    if (user.score == null) {
      getPlayer(user.gameCode, user.name).then((data) => {
        setUser({ ...user, score: data.points });
      });
    }
  }, []);

  return (
    <header className="between-header">
      <Title />
      <div id="points-container">
        <div id="player-name">{user.name}</div>
        <div id="points">
          <div id="points-label">Points</div>
          <div id="points-value">{user.score}</div>
        </div>
      </div>
    </header>
  );
}
