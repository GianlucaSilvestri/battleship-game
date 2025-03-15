import { Settings, Ship } from "../types";

type Props = {
  layout: Ship[];
  settings: Settings;
};

export default function isValidLayout({ layout, settings }: Props): boolean {
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
