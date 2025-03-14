import { useCallback, useEffect, useMemo, useState } from "react";
import Cell from "./Cell";
import { GameProps } from "../types";
import styles from "../styles/board.module.css";

export default function Board({ layout, board: { rows, cols } }: GameProps) {
  const [revealedCells, setRevealedCells] = useState<string[]>([]);

  useEffect(() => {
    setRevealedCells([]);
  }, [layout]);

  const isGameOver = useMemo(() => {
    return layout.every((ship) =>
      ship.positions.every((p) => revealedCells.includes(`${p[0]},${p[1]}`)),
    );
  }, [layout, revealedCells]);

  const handleCellClicked = useCallback((x: number, y: number) => {
    setRevealedCells((prev) => prev.concat([`${x},${y}`]));
  }, []);

  const isRevealed = useCallback(
    (x: number, y: number) => {
      return revealedCells.includes(`${x},${y}`);
    },
    [revealedCells],
  );

  const isShip = useCallback(
    (x: number, y: number) => {
      return layout.some((ship) =>
        ship.positions.map((p) => `${p[0]},${p[1]}`).includes(`${x},${y}`),
      );
    },
    [layout],
  );

  const isSunk = useCallback(
    (x: number, y: number) => {
      const currentShip = layout.find((ship) =>
        ship.positions.map((p) => `${p[0]},${p[1]}`).includes(`${x},${y}`),
      );
      if (!currentShip) return false;

      return currentShip.positions.every((p) =>
        revealedCells.includes(`${p[0]},${p[1]}`),
      );
    },
    [layout, revealedCells],
  );

  return (
    <>
      <section
        className={`${styles.board} ${isGameOver ? styles.boardDisabled : ""}`}
      >
        {Array.from({ length: rows }).map((_, x) => (
          <div key={x} className={styles.boardRow}>
            {Array.from({ length: cols }).map((_, y) => (
              <Cell
                onClick={handleCellClicked}
                isRevealed={isRevealed(x, y)}
                isShip={isShip(x, y)}
                isSunk={isSunk(x, y)}
                key={`${x},${y}`}
                x={x}
                y={y}
              />
            ))}
          </div>
        ))}
      </section>
      {isGameOver && (
        <div className={styles.gameOverBanner}>
          <h3>{"GAME OVER!"}</h3>
        </div>
      )}
    </>
  );
}
