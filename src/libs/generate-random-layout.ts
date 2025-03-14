import { Settings, Ship } from "../types";

export default function generateRandomLayout({ shipTypes, board }: Settings) {
  const occupied = new Set<string>();
  const layout: Ship[] = [];

  const getRandomInt = (max: number) => Math.floor(Math.random() * max);

  const isValidPlacement = (positions: number[][]): boolean =>
    positions.every(
      ([x, y]) =>
        x >= 0 &&
        x < board.cols &&
        y >= 0 &&
        y < board.rows &&
        !occupied.has(`${x},${y}`),
    );

  const placeShip = (ship: string, size: number) => {
    let positions: number[][];

    do {
      const startX = getRandomInt(board.cols);
      const startY = getRandomInt(board.rows);
      const isVertical = Math.random() < 0.5;

      positions = Array.from({ length: size }, (_, i) =>
        isVertical ? [startX + i, startY] : [startX, startY + i],
      );
    } while (!isValidPlacement(positions));

    positions.forEach(([x, y]) => occupied.add(`${x},${y}`));

    layout.push({ ship, positions });
  };

  Object.entries(shipTypes).forEach(([ship, { size }]) =>
    placeShip(ship, size),
  );

  return layout;
}
