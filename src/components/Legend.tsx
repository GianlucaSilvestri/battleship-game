import styles from "../styles/legend.module.css";

export default function Legend() {
  return (
    <section className={styles.legend} aria-label="Game legend">
      <div className={styles.legendEntry}>
        <p aria-label="Miss, represented by a water drop">{"💧 Miss"}</p>
      </div>
      <div className={styles.legendEntry}>
        <p aria-label="Hit, represented by a fire">{"🔥 Hit"}</p>
      </div>
      <div className={styles.legendEntry}>
        <div className={`${styles.legendTile} ${styles.sunk}`} />
        <p aria-label="Sunk, represented by a skull">{"💀 Sunk"}</p>
      </div>
    </section>
  );
}
