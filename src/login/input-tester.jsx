import React from "react";
import { useContext } from "react";
import { InputForm } from "../components/input-form";
import { Context } from "../context";
import { login } from "../storage-api";

export function InputTester() {
  const { setUser } = useContext(Context);
  return (
    <>
      <InputForm
        inputSpecs={[
          { name: "username", type: "text", placeholder: "Username" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
        successRoute="/enter-name"
        buttonText="Login"
        errorMessage="Invalid username or password."
        save={(inputs) => {
          setUser((prevUser) => ({ ...prevUser, username: inputs.username }));
          login(inputs.username, inputs.password).catch((err) =>
            console.error(err.message)
          );
        }}
      />
    </>
  );
}
