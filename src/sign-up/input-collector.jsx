import React from "react";
import { useContext } from "react";
import { InputForm } from "../join/input-form";
import { Context } from "../context";

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
        errorMessage="John is already taken."
        validate={(inputs) => inputs.username !== "john"}
        save={(inputs) =>
          setUser((prevUser) => ({ ...prevUser, username: inputs.username }))
        }
      />
    </>
  );
}
