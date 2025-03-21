import React, { useCallback } from "react";
import styles from "../styles/topbar.module.css";
import { useAppDispatch } from "../libs/hooks";
import { restart } from "../libs/stores/gameStatus";

export default function Topbar() {
  const dispatch = useAppDispatch();

  const handleReset = useCallback(() => {
    dispatch(restart());
  }, [dispatch]);

  return (
    <section className={styles.topbar}>
      <h1>{"BATTLESHIP"}</h1>
      <button
        onClick={handleReset}
        className={styles.resetButton}
        aria-label="Reset the game"
      >
        {"RESET"}
      </button>
    </section>
  );
}
