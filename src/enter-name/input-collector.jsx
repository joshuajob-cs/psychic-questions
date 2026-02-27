import React from "react";
import { useContext } from "react";
import { InputForm } from "../join/input-form";
import { Context } from "../context";

export function InputCollector() {
  const { setUser } = useContext(Context);

  return (
    <>
      <InputForm
        inputSpecs={{ name: "name", type: "text", placeholder: "" }}
        successRoute="/start-game"
        buttonText="Submit"
        save={(input) => setUser((prevUser) => ({ ...prevUser, name: input }))}
      />
    </>
  );
}
