import React from "react";
import { AuthHeader } from "../join/auth-header";
import { AuthFooter } from "../join/auth-footer";
import { InputTester } from "./input-tester";

export function Login() {
  return (
    <>
      <AuthHeader />
      <main>
        <h1>Login</h1>
        <InputTester />
      </main>
      <AuthFooter />
    </>
  );
}
