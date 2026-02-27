import React from "react";
import { AuthHeader } from "../join/auth-header";
import { AuthFooter } from "../join/auth-footer";
import { InputCollector } from "./input-collector";

export function SignUp() {
  return (
    <>
      <AuthHeader />
      <main>
        <h1>Sign Up</h1>
        <InputCollector />
      </main>
      <AuthFooter />
    </>
  );
}
