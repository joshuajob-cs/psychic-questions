import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./backdrop.css";

export default function App() {
  return (
    <div className="body">
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
                <a className="dropdown-item" href="HTML/login.html">
                  Login
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="HTML/sign-up.html">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>App content goes here</main>
      <footer>
        <h2>
          <a id="github-link" href="https://github.com/joshuajob-cs/startup">
            GitHub
          </a>
        </h2>
        <p>&copy; 2026 Psychic Questions</p>
      </footer>
    </div>
  );
}
