import { Title } from "../components/title";
import { useContext } from "react";
import { Context } from "../context";
import "./point-header.css";

export function PointHeader() {
  const { user } = useContext(Context);

  return (
    <header className="between-header point-header">
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
