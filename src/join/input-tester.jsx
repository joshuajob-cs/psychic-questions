import React from "react";
import { useState } from "react";
//Take input
//Check if it matches another input
//If it does, return true, else false
// Print text? Invalid input? Below the box?

export function InputTester({ checker }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    checker(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
        {submitted && <p style={{ color: "red" }}>Wrong button</p>}
      </form>
    </>
  );
}
