import React from "react";
import { createContext } from "react";
import useLocalStorage from "./storage";

export const Context = createContext();

export const ShareVars = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", {
    name: "josh",
    username: "jjob",
    score: 10,
    gameCode: "ABCDE",
  });

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};
