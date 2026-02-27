import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context";

export function InputCollector() {
  const [name, setName] = useState("");
  const go = useNavigate();
  const { setUser } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser((prevUser) => ({
      ...prevUser,
      name: name,
    }));
    go("/start-game");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
