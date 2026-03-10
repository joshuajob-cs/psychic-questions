import React, { useContext } from "react";
import { InputForm } from "../components/input-form";
import { Context } from "../context";
import { checkGame } from "../storage-api/game-api";

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
        errorMessage="Invalid join code."
        buttonText="Join"
        validate={async (inputs) => await checkGame(inputs.joinCode)}
        save={(inputs) => setUser({ ...user, joinCode: inputs.joinCode, score: 0 })}
      />
    </>
  );
}
