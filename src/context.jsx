import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const shareVars = ({ app }) => {
  const [username, setUsername] = useState("");

  return (
    <Context.Provider value={{ username, setUsername }}>{app}</Context.Provider>
  );
};
