import React from "react";
import { AuthHeader } from "../join/auth-header";

export function SignUp() {
  return (
    <>
      <AuthHeader />
      <main>
        <h1>Sign Up</h1>
        <form action="enter-name">
          <div>
            <input type="text" placeholder="Username" required />
          </div>
          <div>
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </main>
    </>
  );
}
