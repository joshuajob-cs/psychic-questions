import { NavLink } from "react-router-dom";
import { Title } from "./title";
import "../join/join.css";

export function AuthHeader() {
  return (
    <header>
      <div className="screen-rotater header-rotater">
        <Title />
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
      </div>
    </header>
  );
}
