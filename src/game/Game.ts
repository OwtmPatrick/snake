import { SnakeStatus, GameStatus, Direction, Dot } from '../types';
import { Snake } from './Snake';
import { scale } from '../constants';

export class Game {
  status: GameStatus;
  food: Dot;
  private snake: Snake;
  private timerId: number | undefined;

  constructor(snake: Snake) {
    this.snake = snake;
    this.status = GameStatus.Idle;
    this.food = this.getFreeDot();
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

  private getRandomFreeDotIndex(min = 0, max: number): number {
    return Math.round(min + (max - min) * Math.random());
  }

  public getFreeDot(): Dot {
    const freeDots = [];

    for (let i = 0; i < scale; i++) {
      for (let j = 0; j < scale; j++) {
        if (!this.snake.dots.find((dot) => dot.x === i && dot.y === j)) {
          freeDots.push({ x: i, y: j });
        }
      }
    }

    const dotIndex = this.getRandomFreeDotIndex(0, freeDots.length);

    return freeDots[dotIndex];
  }
}
