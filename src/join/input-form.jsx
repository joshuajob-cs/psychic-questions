import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function InputForm({
  inputSpecs, // [{ name, type, placeholder }]
  successRoute, // path to navigate on success
  errorMessage, // message to show if validate fails
  buttonText, // text for submit button
}) {
  const [badEntry, setBadEntry] = useState(false);
  const go = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (true) {
      go(successRoute);
    } else {
      setBadEntry(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div key={inputSpecs.name}>
        <input
          type={inputSpecs.type}
          placeholder={inputSpecs.placeholder}
          required
        />
      </div>
      {badEntry && errorMessage && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  );
}
