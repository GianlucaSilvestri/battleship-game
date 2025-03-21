import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ship } from "../../types";
import settings from "../../settings.json";
import { generateRandomLayout, isValidLayout } from "../helpers";

interface GameStatusState {
  revealedCoords: string[];
  layout: Ship[];
}

const initialState: GameStatusState = {
  revealedCoords: [],
  layout: [],
};

const gameStatus = createSlice({
  name: "GameStatus",
  initialState,
  reducers: {
    restart: (state) => {
      const layout = generateRandomLayout(settings);
      if (!isValidLayout({ layout, settings })) {
        console.error("Invalid layout generated");
        return;
      }

      state.layout = layout;
      state.revealedCoords = [];
    },
    revealCoord: (state, action: PayloadAction<string>) => {
      state.revealedCoords.push(action.payload);
    },
  },
});

const isRevealed = (
  { gameStatus }: { gameStatus: GameStatusState },
  coords: string,
) => {
  return gameStatus.revealedCoords.includes(coords);
};

const shipAt = (
  { gameStatus }: { gameStatus: GameStatusState },
  coords: string,
) =>
  gameStatus.layout.find((ship) =>
    ship.positions.map((p) => p.toString()).includes(coords),
  );

const sunkShipAt = (
  { gameStatus }: { gameStatus: GameStatusState },
  coords: string,
) => {
  const ship = shipAt({ gameStatus }, coords);
  if (!ship) return;
  const confirmed = ship.positions.every((p) =>
    gameStatus.revealedCoords.includes(p.toString()),
  );
  return confirmed ? ship : undefined;
};

const lastSunkShip = ({ gameStatus }: { gameStatus: GameStatusState }) => {
  if (gameStatus.revealedCoords.length === 0) return undefined;

  const lastRevealedCoord =
    gameStatus.revealedCoords[gameStatus.revealedCoords.length - 1];
  return sunkShipAt({ gameStatus }, lastRevealedCoord);
};

export const isGameOver = ({ gameStatus }: { gameStatus: GameStatusState }) =>
  gameStatus.layout.every((ship) =>
    ship.positions.every((p) =>
      gameStatus.revealedCoords.includes(p.toString()),
    ),
  );

export const selectIsRevealed = createSelector([isRevealed], (isRev) => {
  return isRev;
});

export const selectIsShipAt = createSelector([shipAt], (ship) => {
  return !!ship;
});

export const selectIsSunkShipAt = createSelector(
  [sunkShipAt], // Dependencies
  (sunkShip) => {
    return !!sunkShip;
  },
);

export const selectLastSunkShip = createSelector([lastSunkShip], (lss) => lss);
export const selectIsGameOver = createSelector(
  [isGameOver],
  (gameOver) => gameOver,
);

export const { revealCoord, restart } = gameStatus.actions;
export default gameStatus.reducer;
