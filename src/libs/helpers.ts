import { Settings, Ship } from "../types";

export function generateRandomLayout({ shipTypes, board }: Settings) {
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
        !occupied.has([x, y].toString()),
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

    positions.forEach((coords) => occupied.add(coords.toString()));

    layout.push({ ship, positions });
  };

  Object.entries(shipTypes).forEach(([ship, { size, count }]) =>
    Array.from({ length: count }).map(() => placeShip(ship, size)),
  );

  return layout;
}

export function isValidLayout({
  layout,
  settings,
}: {
  layout: Ship[];
  settings: Settings;
}): boolean {
  const unknownShipFound = layout.some(
    (li) => !Object.keys(settings.shipTypes).includes(li.ship),
  );
  if (unknownShipFound) return false;

  const invalidShipLengthFound = layout.some(
    (li) => settings.shipTypes[li.ship].size !== li.positions.length,
  );
  if (invalidShipLengthFound) return false;

  const invalidNumberOfShipsFound = Object.keys(settings.shipTypes).some(
    (st) =>
      settings.shipTypes[st].count !==
      layout.filter((li) => li.ship === st).length,
  );
  if (invalidNumberOfShipsFound) return false;

  const invalidShipCoordsFound = layout.some(
    (ship) => !isValidShip(ship.positions),
  );
  if (invalidShipCoordsFound) return false;

  const shipsOutOfBoardFound = layout.some(({ positions }) =>
    positions.some(
      ([x, y]) =>
        x < 0 || x >= settings.board.cols || y < 0 || y >= settings.board.rows,
    ),
  );
  if (shipsOutOfBoardFound) return false;

  const overlappingShipsFound =
    new Set(
      layout.flatMap((layout) =>
        layout.positions.map((coords) => coords.toString()),
      ),
    ).size !== layout.flatMap((layout) => layout.positions).length;
  if (overlappingShipsFound) return false;

  return true;
}

const isValidShip = (positions: number[][]): boolean => {
  const isConsecutiveVertical = positions.every(([x, y], i) => {
    const priorCoords = positions[i - 1];
    return i === 0 || (x === priorCoords[0] && y === priorCoords[1] + 1);
  });

  const isConsecutiveHorizontal = positions.every(([x, y], i) => {
    const priorCoords = positions[i - 1];
    return i === 0 || (y === priorCoords[1] && x === priorCoords[0] + 1);
  });

  return isConsecutiveVertical || isConsecutiveHorizontal;
};
