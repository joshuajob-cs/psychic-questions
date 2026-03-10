import { useContext } from "react";
import { InputForm } from "../components/input-form";
import { Context } from "../context";
import { checkGame } from "../storage-api/game-api";

export function InputTester() {
  const { user, setUser } = useContext(Context);
  return (
    <>
      <InputForm
        inputSpecs={[
          {
            name: "joinCode",
            type: "text",
            placeholder: "Join Code",
          },
        ]}
        successRoute="/enter-name"
        buttonText="Join"
        updateBackend={async (inputs) => {
          try {
            await checkGame(inputs.joinCode);
            return true;
          } catch (err) {
            return err.message;
          }
        }}
        updateFrontend={(inputs) => setUser({ ...user, gameCode: inputs.joinCode, score: 0 })}
      />
    </>
  );
}
