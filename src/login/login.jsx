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
        <form action="/enter-name">
          <div>
            <input type="text" placeholder="Username" required />
          </div>
          <div>
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <InputTester />
      </main>
      <AuthFooter />
    </>
  );
}
