import React from "react";
import { useContext } from "react";
import { InputForm } from "../components/input-form";
import { Context } from "../context";

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
        errorMessage='Invalid username or password. (Hint: username "john", password "doe")'
        validate={(inputs) =>
          inputs.username === "john" && inputs.password === "doe"
        }
        save={(inputs) => {
          const gameCode = Array.from({ length: 5 }, () =>
            String.fromCharCode(65 + Math.floor(Math.random() * 26))
          ).join("");
          setUser((prevUser) => ({ ...prevUser, username: inputs.username, gameCode }));
        }}
      />
    </>
  );
}
