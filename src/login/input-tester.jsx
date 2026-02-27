import React from "react";
import { InputForm } from "../join/input-form";

export function InputTester() {
  return (
    <>
      <InputForm
        inputSpecs={[
          { name: "username", type: "text", placeholder: "Username" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
        successRoute="/enter-name"
        buttonText="Login"
        errorMessage='Invalid username or password. (Hint: username "john", password "doe")'
        validate={(inputs) =>
          inputs.username === "john" && inputs.password === "doe"
        }
        save={(inputs) =>
          setUser((prevUser) => ({ ...prevUser, username: inputs.username }))
        }
      />
    </>
  );
}
