import React, { useEffect } from "react";
import Board from "./components/Board";
import Legend from "./components/Legend";
import Topbar from "./components/Topbar";
import styles from "./styles/app.module.css";
import { useAppDispatch } from "./libs/hooks";
import { restart } from "./libs/stores/gameStatus";
import settings from "./settings.json";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restart());
  });

  return (
    <>
      <header className={styles.header} role="banner">
        <Topbar />
      </header>
      <main className={styles.main} role="main">
        <Board {...settings.board} />
      </main>
      <footer className={styles.footer} role="contentinfo">
        <Legend />
      </footer>
    </>
  );
}

export default App;
