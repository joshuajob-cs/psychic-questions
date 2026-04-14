import { NavLink, useLocation } from "react-router-dom";
import { Title } from "./title";

export function AuthHeader() {
  const { pathname } = useLocation();
  const buttonLabel = pathname === "/" ? "New Game" : "Options";

  return (
    <header>
      <div className="screen-rotater rotater-gap">
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
              {buttonLabel}
            </button>
            <ul className="dropdown-menu" aria-labelledby="accountDropdown">
              {pathname !== "/" && (
                <li>
                  <NavLink className="dropdown-item" to="/">
                    Join
                  </NavLink>
                </li>
              )}
              {pathname !== "/login" && (
                <li>
                  <NavLink className="dropdown-item" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
              {pathname !== "/sign-up" && (
                <li>
                  <NavLink className="dropdown-item" to="/sign-up">
                    Sign Up
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
