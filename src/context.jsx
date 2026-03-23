import { createContext } from "react";
import useLocalStorage from "./storage";

export const Context = createContext();

export const ShareVars = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", {
    name: "",
    username: "",
    score: 0,
    gameCode: "",
  });

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};
