import React from "react";
import { useState } from "react";
//Take input
//Check if it matches another input
//If it does, return true, else false
// Print text? Invalid input? Below the box?

export function InputTester() {
  const [code, setCode] = useState("");

  const isValid = /^\d{6}$/.test(code);

  return (
    <>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter 6-digit code"
      />
      {!isValid && code.length > 0 && <p>Code must be 6 digits</p>}
    </>
  );
}
