import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const shareVars = ({ app }) => {
  const [user, setUser] = useLocalStorage("user", {
    name: "",
    username: "",
    score: 0,
  });

  return <Context.Provider value={{ user, setUser }}>{app}</Context.Provider>;
};
