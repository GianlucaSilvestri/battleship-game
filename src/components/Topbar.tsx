import React from "react";
import styles from "../styles/topbar.module.css";

type Props = {
  handleReset: () => void;
};

export default function Topbar({ handleReset }: Props) {
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
