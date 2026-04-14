import { NavLink, useLocation } from "react-router-dom";
import { Title } from "./title";

const NAV_ITEMS = [
  { to: "/", label: "Join" },
  { to: "/login", label: "Login" },
  { to: "/sign-up", label: "Sign Up" },
];

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
              {NAV_ITEMS.filter((item) => item.to !== pathname).map((item) => (
                <li key={item.to}>
                  <NavLink className="dropdown-item" to={item.to}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
