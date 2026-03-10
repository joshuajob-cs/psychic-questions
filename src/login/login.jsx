import { AuthHeader } from "../components/auth-header";
import { AuthFooter } from "../components/auth-footer";
import { InputTester } from "./input-tester";

export function Login() {
  return (
    <>
      <AuthHeader />
      <main>
        <h1>Login</h1>
        <InputTester />
      </main>
      <AuthFooter />
    </>
  );
}
