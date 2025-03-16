import { useCallback, useEffect, useMemo, useState } from "react";
import Cell from "./Cell";
import { GameProps } from "../types";
import styles from "../styles/board.module.css";

export default function Board({ layout, board: { rows, cols } }: GameProps) {
  const [revealedCells, setRevealedCells] = useState<string[]>([]);
  const [recentlySunkShip, setRecentlySunkShip] = useState<
    string | undefined
  >();

  const isGameOver = useMemo(() => {
    return layout.every((ship) =>
      ship.positions.every((p) => revealedCells.includes(p.toString())),
    );
  }, [layout, revealedCells]);

  useEffect(() => {
    setRevealedCells([]);
    setRecentlySunkShip(undefined);
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
        ship.positions.map((p) => p.toString()).includes(coords),
      );
    },
    [layout],
  );

  const sunkShipAt = useCallback(
    (coords: string) => {
      const ship = shipAt(coords);
      if (!ship) return;
      const confirmed = ship.positions.every((p) =>
        revealedCells.includes(p.toString()),
      );
      return confirmed ? ship : undefined;
    },
    [revealedCells, shipAt],
  );

  const handleCellClicked = useCallback((coords: string) => {
    setRevealedCells((prev) => prev.concat(coords));
  }, []);

  useEffect(() => {
    const lastRevealedCell = revealedCells[revealedCells.length - 1];
    const ship = sunkShipAt(lastRevealedCell);
    if (!ship) return;

    setRecentlySunkShip(ship.ship);
    const to = setTimeout(() => setRecentlySunkShip(undefined), 1000);
    return () => clearTimeout(to);
  }, [revealedCells, sunkShipAt]);

  return (
    <>
      <section
        aria-label="Battleship board"
        className={`${styles.board} ${isGameOver || recentlySunkShip ? styles.boardDisabled : ""}`}
      >
        {Array.from({ length: rows }).map((_, x) => (
          <div key={x} className={styles.boardRow}>
            {Array.from({ length: cols }).map((_, y) => {
              const coords = [x, y].toString();
              return (
                <Cell
                  disabled={isGameOver || !!recentlySunkShip}
                  onClick={handleCellClicked}
                  isRevealed={isRevealed(coords)}
                  isShip={!!shipAt(coords)}
                  isSunk={!!sunkShipAt(coords)}
                  key={coords}
                  coords={coords}
                />
              );
            })}
          </div>
        ))}
      </section>
      {recentlySunkShip ? (
        <div className={`${styles.messageBanner} ${styles.sunkBanner}`}>
          <h3>{`${recentlySunkShip} sunk!`}</h3>
        </div>
      ) : (
        isGameOver && (
          <div className={`${styles.messageBanner} ${styles.gameOverBanner}`}>
            <h3>{"GAME OVER"}</h3>
          </div>
        )
      )}
    </>
  );
}
