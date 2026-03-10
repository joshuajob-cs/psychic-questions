import React from "react";
import { useContext } from "react";
import { InputForm } from "../components/input-form";
import { Context } from "../context";
import { joinGame } from "../storage-api/game-api";

export function InputCollector() {
  const { user, setUser } = useContext(Context);

  return (
    <>
      <InputForm
        inputSpecs={[{ name: "name", type: "text", placeholder: "" }]}
        successRoute="/start-game"
        buttonText="Submit"
        updateBackend={async (inputs) => {
          try {
            await joinGame(user.gameCode, inputs.name);
            return true;
          } catch (err) {
            return err.message;
          }
        }}
        updateFrontend={(inputs) =>
          setUser((prevUser) => ({ ...prevUser, name: inputs.name }))
        }
      />
    </>
  );
}
