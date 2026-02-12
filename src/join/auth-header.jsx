import React from "react";
import { NavLink } from "react-router-dom";

export function AuthHeader() {
  return (
    <header>
      <h3>🔮 Psychic Questions 🤔</h3>
      <nav>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="accountDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Account
          </button>
          <ul className="dropdown-menu" aria-labelledby="accountDropdown">
            <li>
              <NavLink className="dropdown-item" to="/">
                Join
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/sign-up">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
