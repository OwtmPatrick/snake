import { SnakeStatus, GameStatus, Direction } from '../types';
import { Snake } from './Snake';

export class Game {
  status: GameStatus;
  private snake: Snake;
  private timerId: number | undefined;

  constructor(snake: Snake) {
    this.snake = snake;
    this.status = GameStatus.Idle;
  }

  public start(): void {
    this.status = GameStatus.Started;

    this.timerId = setInterval(() => {
      if (this.snake.status === SnakeStatus.Error) {
        clearInterval(this.timerId);
        this.status = GameStatus.Ended;
      }
      this.snake.move();
    }, 500);
  }

  public changeSnakeDirection(direction: Direction): void {
    this.snake.changeDirection(direction);
  }
}
