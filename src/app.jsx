import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./backdrop.css";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Join } from "./join/join";
import { Login } from "./login/login";
import { SignUp } from "./sign-up/sign-up";
import { AskQuestions } from "./ask-questions/ask-questions";
import { EnterName } from "./enter-name/enter-name";
import { GuessAnswers } from "./guess-answers/guess-answers";
import { StartGame } from "./start-game/start-game";
import { Waiting } from "./waiting/waiting";
import { Winner } from "./winner/winner";

export default function App() {
  return (
    <BrowserRouter>
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
                  <NavLink className="dropdown-item" to="">
                    Join
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="sign-up">
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Join />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer>
          <h2>
            <a id="github-link" href="https://github.com/joshuajob-cs/startup">
              GitHub
            </a>
          </h2>
          <p>&copy; 2026 Psychic Questions</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main>
      <h1>404 Error. I'm not psychic. You are. I'm confused.</h1>
    </main>
  );
}
