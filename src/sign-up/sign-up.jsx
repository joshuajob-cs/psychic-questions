import React from "react";

export function SignUp() {
  return (
    <main>
      <h1>Sign Up</h1>
      <form action="enter-name.html">
        <div>
          <input type="text" placeholder="Username" required />
        </div>
        <div>
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}
