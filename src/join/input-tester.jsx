import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          {submitted && code !== "ABCDE" && (
            <p style={{ color: "red" }}>The code is ABCDE</p>
          )}
        </div>
      </form>
    </>
  );
}
