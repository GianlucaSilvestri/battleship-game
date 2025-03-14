import { useCallback, useEffect, useMemo, useState } from "react";
import Cell from "./Cell";
import { GameProps, Ship } from "../types";
import styles from "../styles/board.module.css";

export default function Board({ layout, board: { rows, cols } }: GameProps) {
  const [revealedCells, setRevealedCells] = useState<string[]>([]);
  const [recentlySunkShip, setRecentlySunkShip] = useState<
    string | undefined
  >();

  const sunkShips = useMemo(
    () =>
      layout.filter((ship) =>
        ship.positions.every((p) => revealedCells.includes(`${p[0]},${p[1]}`)),
      ),
    [layout, revealedCells],
  );

  const isGameOver = useMemo(() => {
    return layout.length === sunkShips.length;
  }, [layout.length, sunkShips.length]);

  useEffect(() => {
    setRevealedCells([]);
  }, [layout]);

  const isRevealed = useCallback(
    (coords: string) => {
      return revealedCells.includes(coords);
    },
    [revealedCells],
  );

  const shipAt = useCallback(
    (coords: string) => {
      return layout.find((ship) =>
        ship.positions.map((p) => `${p[0]},${p[1]}`).includes(coords),
      );
    },
    [layout],
  );

  const isSunk = useCallback(
    (ship: Ship | undefined) => {
      if (!ship) return false;
      return ship.positions.every((p) =>
        revealedCells.includes(`${p[0]},${p[1]}`),
      );
    },
    [revealedCells],
  );

  const handleCellClicked = useCallback((x: number, y: number) => {
    setRevealedCells((prev) => prev.concat([`${x},${y}`]));
  }, []);

  useEffect(() => {
    const lastRevealedCell = revealedCells[revealedCells.length - 1];
    const ship = shipAt(lastRevealedCell);
    if (!ship || !isSunk(ship)) return;

    setRecentlySunkShip(ship.ship);
    const to = setTimeout(() => setRecentlySunkShip(undefined), 1000);
    return () => clearTimeout(to);
  }, [isSunk, revealedCells, shipAt]);

  return (
    <>
      <section
        aria-label="Battleship board"
        className={`${styles.board} ${isGameOver || recentlySunkShip ? styles.boardDisabled : ""}`}
      >
        {Array.from({ length: rows }).map((_, x) => (
          <div key={x} className={styles.boardRow}>
            {Array.from({ length: cols }).map((_, y) => (
              <Cell
                onClick={handleCellClicked}
                isRevealed={isRevealed(`${x},${y}`)}
                isShip={!!shipAt(`${x},${y}`)}
                isSunk={isSunk(shipAt(`${x},${y}`))}
                key={`${x},${y}`}
                x={x}
                y={y}
              />
            ))}
          </div>
        ))}
      </section>
      {isGameOver && (
        <div className={`${styles.messageBanner} ${styles.gameOverBanner}`}>
          <h3>{"GAME OVER!"}</h3>
        </div>
      )}
      {recentlySunkShip && (
        <div className={`${styles.messageBanner} ${styles.sunkBanner}`}>
          <h3>{`${recentlySunkShip} SUNK!`}</h3>
        </div>
      )}
    </>
  );
}
