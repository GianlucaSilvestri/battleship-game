import React, { useCallback } from "react";
import styles from "../styles/cell.module.css";

type Props = {
  onClick: (x: number, y: number) => void;
  isRevealed: boolean;
  isShip: boolean;
  isSunk: boolean;
  x: number;
  y: number;
};

export default React.memo(function Cell({
  isRevealed,
  isShip,
  isSunk,
  onClick,
  x,
  y,
}: Props) {
  const handleClick = useCallback(() => {
    onClick(x, y);
  }, [onClick, x, y]);

  return (
    <button
      aria-label={`Cell [${x}, ${y}]`}
      className={`${styles.cell} ${isRevealed ? `${styles.disabledCell} ${isShip ? (isSunk ? styles.sunkCell : styles.burnCell) : styles.seaCell}` : styles.enabledCell}`}
      onClick={handleClick}
    >
      {isRevealed ? (isShip ? (isSunk ? "💀" : "🔥") : "💧") : ""}
    </button>
  );
});
