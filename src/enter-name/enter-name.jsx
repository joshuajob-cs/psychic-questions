import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";
import { InputCollector } from "./input-collector";
import { Context } from "../context";
import { logout } from "../apis/auth-api";

export function EnterName() {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setUser((prev) => ({ ...prev, username: null }));
    navigate("/login");
  }

  return (
    <>
      <header>
        <Title />
        {user?.username && (
          <button className="btn btn-outline-secondary" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>
      <main>
        <h1>Name</h1>
        <InputCollector />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
