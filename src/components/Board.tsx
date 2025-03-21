import { useEffect, useState } from "react";
import Cell from "./Cell";
import { BoardProps } from "../types";
import styles from "../styles/board.module.css";
import { useAppSelector } from "../libs/hooks";
import { selectLastSunkShip } from "../libs/stores/gameStatus";
import Banner from "./Banner";

export default function Board({ rows, cols }: BoardProps) {
  const [recentlySunkShip, setRecentlySunkShip] = useState<
    string | undefined
  >();

  const lastSunkShip = useAppSelector(selectLastSunkShip);

  useEffect(() => {
    setRecentlySunkShip(lastSunkShip?.ship);

    const to = setTimeout(() => setRecentlySunkShip(undefined), 1000);
    return () => clearTimeout(to);
  }, [lastSunkShip]);

  return (
    <>
      <section
        aria-label="Battleship board"
        className={`${styles.board} ${recentlySunkShip ? styles.boardDisabled : ""}`}
      >
        {Array.from({ length: rows }).map((_, x) => (
          <div key={x} className={styles.boardRow}>
            {Array.from({ length: cols }).map((_, y) => {
              return <Cell key={`cell-[${x}:${y}]`} x={x} y={y} />;
            })}
          </div>
        ))}
      </section>
      <Banner recentlySunkShip={recentlySunkShip} />
    </>
  );
}
