import React from "react";

export function Login() {
  return (
    <main>
      <h1>Login</h1>
      <form action="enter-name">
        <div>
          <input type="text" placeholder="Username" required />
        </div>
        <div>
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
