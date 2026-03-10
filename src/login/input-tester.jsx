import { useContext } from "react";
import { InputForm } from "../components/input-form";
import { Context } from "../context";
import { login } from "../apis/auth-api";
import { createGame } from "../apis/game-api";

export function InputTester() {
  const { setUser } = useContext(Context);
  return (
    <>
      <InputForm
        inputSpecs={[
          { name: "username", type: "text", placeholder: "Username" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
        successRoute="/enter-name"
        buttonText="Login"
        updateBackend={async (inputs) => {
          try {
            await login(inputs.username, inputs.password);
            return true;
          } catch (err) {
            return err.message;
          }
        }}
        updateFrontend={async (inputs) => {
          const gameCode = await createGame();
          setUser((prevUser) => ({
            ...prevUser,
            username: inputs.username,
            gameCode,
            score: 0,
          }));
        }}
      />
    </>
  );
}
