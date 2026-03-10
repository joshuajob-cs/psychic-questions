import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function InputForm({
  inputSpecs, // Specifications for the input field (type, placeholder, etc.)
  successRoute, // path to navigate on success
  buttonText, // text for submit button
  validate, // function to validate the input, returns true or an error string
  save, // function to save the input value
}) {
  const [badEntry, setBadEntry] = useState(null);
  const [inputs, setInputs] = useState(
    Object.fromEntries(inputSpecs.map((spec) => [spec.name, ""])),
  );
  const go = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate ? await validate(inputs) : true;

    if (isValid === true) {
      if (save) save(inputs);
      go(successRoute);
    } else {
      setBadEntry(typeof isValid === "string" ? isValid : "Invalid input.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {inputSpecs.map((spec) => (
          <div key={spec.name}>
            <input
              name={spec.name}
              value={inputs[spec.name]}
              type={spec.type}
              placeholder={spec.placeholder}
              onChange={handleChange}
              required
            />
          </div>
        ))}
      </div>
      {badEntry && <p style={{ color: "red" }}>{badEntry}</p>}
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  );
}
