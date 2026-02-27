import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function InputTester() {
  const [badEntry, setBadEntry] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const go = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "john" && password === "doe") {
      go("/enter-name");
    } else {
      setBadEntry(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {badEntry && (
            <p style={{ color: "red" }}>
              Invalid username or password. (Hint: the correct username is
              "john" and the correct password is "doe")
            </p>
          )}
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
