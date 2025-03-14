import styles from "../styles/legend.module.css";

export default function Legend() {
  return (
    <section className={styles.legend}>
      <div className={styles.legendEntry}>
        <p>{"💧 Miss"}</p>
      </div>
      <div className={styles.legendEntry}>
        <p>{"🔥 Hit"}</p>
      </div>
      <div className={styles.legendEntry}>
        <div className={`${styles.legendTile} ${styles.sunk}`} />
        <p>{"💀 Sunk"}</p>
      </div>
    </section>
  );
}
