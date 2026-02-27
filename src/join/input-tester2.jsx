import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "./input-form";

export function InputTester2() {
  return (
    <>
      <InputForm
        inputSpecs={{
          name: "joinCode",
          type: "text",
          placeholder: "Join Code",
        }}
        successRoute="/enter-name"
        errorMessage="Invalid join code. Correct code is ABCDE."
        buttonText="Join"
        validate={(code) => code === "ABCDE"}
      />
    </>
  );
}
