import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function InputForm({
  inputSpecs, // Specifications for the input field (type, placeholder, etc.)
  successRoute, // path to navigate on success
  errorMessage, // message to show if validate fails
  buttonText, // text for submit button
  validate, // function to validate the input
}) {
  const [badEntry, setBadEntry] = useState(false);
  const [input, setInput] = useState("");
  const go = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate ? validate(input) : true;

    if (isValid) {
      go(successRoute);
    } else {
      setBadEntry(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div key={inputSpecs.name}>
        <input
          name={inputSpecs.name}
          type={inputSpecs.type}
          placeholder={inputSpecs.placeholder}
          onChange={(e) => setInput(e.target.value)}
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
