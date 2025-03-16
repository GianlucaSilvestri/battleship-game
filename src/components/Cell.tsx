import React, { useCallback, useMemo } from "react";
import styles from "../styles/cell.module.css";

type Props = {
  onClick: (coords: string) => void;
  isRevealed: boolean;
  isShip: boolean;
  isSunk: boolean;
  disabled: boolean;
  coords: string;
};

export default React.memo(function Cell({
  disabled,
  isRevealed,
  isShip,
  isSunk,
  onClick,
  coords,
}: Props) {
  const handleClick = useCallback(() => {
    if (isRevealed) return;

    onClick(coords);
  }, [isRevealed, onClick, coords]);

  let tooltip = useMemo(() => {
    const status = isRevealed
      ? isSunk
        ? "sunk ship"
        : isShip
          ? "hit"
          : "miss"
      : "to reveal";

    return `Cell at coords ${coords} - ${status}!`;
  }, [coords, isRevealed, isShip, isSunk]);

  return (
    <button
      disabled={disabled}
      aria-label={tooltip}
      aria-disabled={disabled}
      className={`${styles.cell} ${isRevealed ? `${styles.disabledCell} ${isShip ? (isSunk ? styles.sunkCell : styles.burnCell) : styles.seaCell}` : styles.enabledCell}`}
      onClick={handleClick}
    >
      {isRevealed ? (isShip ? (isSunk ? "💀" : "🔥") : "💧") : ""}
    </button>
  );
});
