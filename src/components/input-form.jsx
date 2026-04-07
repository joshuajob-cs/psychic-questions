import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function InputForm({
  inputSpecs, // Specifications for the input field (type, placeholder, etc.)
  successRoute, // path to navigate on success
  buttonText, // text for submit button
  updateBackend, // validates input, updates database, and returns true or an error string
  updateFrontend, // updates the browser state
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
    const isValid = updateBackend ? await updateBackend(inputs) : true;

    if (isValid === true) {
      if (updateFrontend) updateFrontend(inputs);
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
        <button className="btn btn-primary mt-2" type="submit">{buttonText}</button>
      </div>
    </form>
  );
}
