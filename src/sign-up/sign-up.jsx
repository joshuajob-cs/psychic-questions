import React from "react";
import { AuthHeader } from "../components/auth-header";
import { AuthFooter } from "../components/auth-footer";
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
