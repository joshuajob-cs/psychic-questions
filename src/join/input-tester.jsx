import React, { useContext } from "react";
import { InputForm } from "./input-form";
import { Context } from "../context";

export function InputTester() {
  const { user, setUser } = useContext(Context);
  return (
    <>
      <InputForm
        inputSpecs={[
          {
            name: "joinCode",
            type: "text",
            placeholder: "Join Code",
          },
        ]}
        successRoute="/enter-name"
        errorMessage={`Invalid join code. Correct code is ${user.gameCode}.`}
        buttonText="Join"
        validate={(inputs) => inputs.joinCode === user.gameCode}
        save={() => setUser({ ...user, score: 0 })}
      />
    </>
  );
}
