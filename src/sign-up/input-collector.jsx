import { useContext } from "react";
import { InputForm } from "../components/input-form";
import { Context } from "../context";
import { signup } from "../storage-api/auth-api";
import { createGame } from "../storage-api/game-api";

export function InputCollector() {
  const { setUser } = useContext(Context);
  return (
    <>
      <InputForm
        inputSpecs={[
          { name: "username", type: "text", placeholder: "Username" },
          { name: "password", type: "password", placeholder: "Password" },
        ]}
        successRoute="/enter-name"
        buttonText="Sign Up"
        updateBackend={async (inputs) => {
          try {
            await signup(inputs.username, inputs.password);
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
          }));
        }}
      />
    </>
  );
}
