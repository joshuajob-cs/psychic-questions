import React from "react";
import { createContext } from "react";

export const Context = createContext();

export const ShareVars = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", {
    name: "",
    username: "",
    score: 0,
  });

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};
