import React, { use } from "react";
import { useContext } from "react";
import { InputForm } from "../components/input-form";
import { Context } from "../context";
import { signup } from "../storage-api/auth-api";
import { createGame } from "../storage-api/game-api";

export function InputCollector() {
  const { setUser } = useContext(Context);
  return (
    <>
      <InputForm
        inputSpecs={[
          { name: "username", type: "text", placeholder: "Username" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
        successRoute="/enter-name"
        buttonText="Sign Up"
        validate={async (inputs) => {
          try {
            await signup(inputs.username, inputs.password);
            return true;
          } catch (err) {
            return err.message;
          }
        }}
        save={(inputs) => {
          const gameCode = Array.from({ length: 5 }, () =>
            String.fromCharCode(65 + Math.floor(Math.random() * 26)),
          ).join("");
          setUser((prevUser) => ({
            ...prevUser,
            username: inputs.username,
            gameCode,
          }));
        }}
      />
    </>
  );
}
