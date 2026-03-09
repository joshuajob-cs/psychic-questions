import React from "react";
import { useContext } from "react";
import { InputForm } from "../components/input-form";
import { Context } from "../context";

export function InputCollector() {
  const { setUser } = useContext(Context);

  return (
    <>
      <InputForm
        inputSpecs={[{ name: "name", type: "text", placeholder: "" }]}
        successRoute="/start-game"
        buttonText="Submit"
        save={(inputs) =>
          setUser((prevUser) => ({ ...prevUser, name: inputs.name }))
        }
      />
    </>
  );
}
