import React, { useCallback } from "react";
import styles from "../styles/cell.module.css";

type Props = {
  onClick: (coords: string) => void;
  isRevealed: boolean;
  isShip: boolean;
  isSunk: boolean;
  coords: string;
};

export default React.memo(function Cell({
  isRevealed,
  isShip,
  isSunk,
  onClick,
  coords,
}: Props) {
  const handleClick = useCallback(() => {
    onClick(coords);
  }, [onClick, coords]);

  return (
    <button
      aria-label={`Cell [${coords.toString()}]`}
      className={`${styles.cell} ${isRevealed ? `${styles.disabledCell} ${isShip ? (isSunk ? styles.sunkCell : styles.burnCell) : styles.seaCell}` : styles.enabledCell}`}
      onClick={handleClick}
    >
      {isRevealed ? (isShip ? (isSunk ? "💀" : "🔥") : "💧") : ""}
    </button>
  );
});
