import React, { useCallback, useMemo } from "react";
import styles from "../styles/cell.module.css";
import { useAppDispatch, useAppSelector } from "../libs/hooks";
import {
  revealCoord,
  selectIsGameOver,
  selectIsRevealed,
  selectIsShipAt,
  selectIsSunkShipAt,
} from "../libs/stores/gameStatus";

type Props = {
  x: number;
  y: number;
};

export default React.memo(function Cell({ x, y }: Props) {
  const coords = useMemo(() => [x, y].toString(), [x, y]);

  const dispatch = useAppDispatch();
  const isGameOver = useAppSelector((state) => selectIsGameOver(state));
  const isRevealed = useAppSelector((state) => selectIsRevealed(state, coords));
  const isShip = useAppSelector((state) => selectIsShipAt(state, coords));
  const isSunk = useAppSelector((state) => selectIsSunkShipAt(state, coords));

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

  const handleClick = useCallback(() => {
    dispatch(revealCoord(coords));
  }, [dispatch, coords]);

  return (
    <button
      disabled={isRevealed || isGameOver}
      aria-label={tooltip}
      aria-disabled={isRevealed || isGameOver}
      className={`
              ${styles.cell} 
              ${
                isRevealed
                  ? isShip
                    ? isSunk
                      ? styles.sunkCell
                      : styles.burnCell
                    : styles.seaCell
                  : ""
              }`}
      onClick={handleClick}
    >
      {isRevealed ? (isShip ? (isSunk ? "💀" : "🔥") : "💧") : ""}
    </button>
  );
});
