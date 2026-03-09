import React from "react";
import { Title } from "../components/title";
import { Footer } from "../components/shared-footer";
import { InputCollector } from "./input-collector";

export function EnterName() {
  return (
    <>
      <header>
        <Title />
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
