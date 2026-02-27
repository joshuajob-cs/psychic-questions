import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function InputTester() {
  const [badEntry, setBadEntry] = useState(false);
  const [code, setCode] = useState("");
  const go = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === "ABCDE") {
      go("/enter-name");
    } else {
      setBadEntry(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setCode(e.target.value)}
          placeholder="Join Code"
          required
        />
        {badEntry && <p style={{ color: "red" }}>The code is ABCDE</p>}
        <div>
          <button type="submit">Join</button>
        </div>
      </form>
    </>
  );
}
