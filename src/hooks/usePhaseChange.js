import { useEffect } from "react";
import { namesClient } from "../apis/websocket";

export function usePhaseChange(onPhaseChange) {
  useEffect(() => {
    const observer = ({ event, name: phase }) => {
      if (event === "phase_change") onPhaseChange(phase);
    };
    namesClient.addObserver(observer);
    return () => {
      namesClient.observers = namesClient.observers.filter(
        (o) => o !== observer,
      );
    };
  }, []);
}
