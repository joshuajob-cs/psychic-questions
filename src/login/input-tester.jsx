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
        validate={async (inputs) => {
          try {
            await login(inputs.username, inputs.password);
            return true;
          } catch {
            return false;
          }
        }}
        save={(inputs) => {
          setUser((prevUser) => ({ ...prevUser, username: inputs.username }));
        }}
      />
    </>
  );
}
