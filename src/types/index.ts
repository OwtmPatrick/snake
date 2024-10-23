export type Dot = {
  x: number;
  y: number;
};

export enum Direction {
  Up,
  Right,
  Down,
  Left
}

export enum SnakeStatus {
  Ok,
  Error
}

export enum GameStatus {
  Idle,
  Started,
  Ended
}
