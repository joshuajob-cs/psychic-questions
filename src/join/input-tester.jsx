import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Take input
//Check if it matches another input
//If it does, return true, else false
// Print text? Invalid input? Below the box?

export function InputTester() {
  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");
  const go = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === "ABCDE") {
      go("/enter-name");
    }
    setSubmitted(true);
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
        <div>
          <button type="submit">Join</button>
          {submitted && <p style={{ color: "red" }}>The code is ABCDE</p>}
        </div>
      </form>
    </>
  );
}
