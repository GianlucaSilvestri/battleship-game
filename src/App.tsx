import React, { useCallback, useEffect, useState } from "react";
import Board from "./components/Board";
import settings from "./settings.json";
import isValidLayout from "./libs/is-layout-valid";
import generateRandomLayout from "./libs/generate-random-layout";
import { Ship } from "./types";
import Legend from "./components/Legend";
import Topbar from "./components/Topbar";
import styles from "./styles/app.module.css";

function App() {
  const [layout, setLayout] = useState<Ship[]>(generateRandomLayout(settings));
  const [isLayoutValid, setIsLayoutValid] = useState(false);

  const handleReset = useCallback(() => {
    setLayout(generateRandomLayout(settings));
  }, []);

  useEffect(() => {
    setIsLayoutValid(isValidLayout({ layout, settings }));
  }, [layout]);

  if (!isLayoutValid) return <p>Invalid data</p>;

  return (
    <>
      <header className={styles.header}>
        <Topbar handleReset={handleReset} />
      </header>
      <main className={styles.main}>
        <Board layout={layout} board={settings.board} />
      </main>
      <footer className={styles.footer}>
        <Legend />
      </footer>
    </>
  );
}

export default App;
