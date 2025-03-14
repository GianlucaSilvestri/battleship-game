export type ShipType = {
  size: number;
  count: number;
};

export type Ship = {
  ship: string;
  positions: number[][];
};

export type BoardProps = {
  rows: number;
  cols: number;
};

export type GameProps = {
  layout: Ship[];
  board: BoardProps;
};

export type Settings = {
  shipTypes: Record<string, ShipType>;
  board: BoardProps;
};
