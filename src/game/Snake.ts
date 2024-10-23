import { Dot, Direction, SnakeStatus } from '../types';
import { scale } from '../constants';

export class Snake {
  dots: Dot[];
  direction: Direction;
  status: SnakeStatus;
  food: Dot;

  constructor(dots: Dot[], direction: Direction) {
    this.dots = dots;
    this.direction = direction;
    this.status = SnakeStatus.Ok;
    this.food = this.getFood();
  }

  public getDots(): Dot[] {
    return this, this.dots;
  }

  private canMove(head: Dot, direction: Direction): boolean {
    const dotsWithoutHead = this.dots.filter((_, index) => index !== 0);

    switch (direction) {
      case Direction.Up: {
        return (
          dotsWithoutHead.every(
            (dot) => dot.x !== head.x || dot.y !== head.y + 1
          ) && head.y + 1 < 10
        );
      }

      case Direction.Right: {
        return (
          dotsWithoutHead.every(
            (dot) => dot.x !== head.x + 1 || dot.y !== head.y
          ) && head.x + 1 < 10
        );
      }

      case Direction.Down: {
        return (
          dotsWithoutHead.every(
            (dot) => dot.x !== head.x || dot.y !== head.y - 1
          ) && head.y - 1 >= 0
        );
      }

      case Direction.Left: {
        return (
          dotsWithoutHead.every(
            (dot) => dot.x !== head.x - 1 || dot.y !== head.y
          ) && head.x - 1 >= 0
        );
      }

      default:
        throw new Error('Unexpected direction');
    }
  }

  private geNextHeadDot(head: Dot, direction: Direction): Dot {
    if (!this.canMove(head, direction)) {
      this.status = SnakeStatus.Error;
      throw new Error('Game over');
    }

    switch (direction) {
      case Direction.Up:
        return { ...head, y: head.y + 1 };
      case Direction.Right:
        return { ...head, x: head.x + 1 };
      case Direction.Down:
        return { ...head, y: head.y - 1 };
      case Direction.Left:
        return { ...head, x: head.x - 1 };
      default:
        throw new Error('Unexpected direction');
    }
  }

  public move(): Dot[] {
    const newDots = this.dots.map((dot, index) => {
      if (index === 0) {
        return this.geNextHeadDot(dot, this.direction);
      }

      return this.dots[index - 1];
    });

    const head = newDots[0];
    const canEatFood = head.x === this.food.x && head.y === this.food.y;

    if (canEatFood) {
      this.dots = [...newDots, this.dots.pop()!];
      this.food = this.getFood();
    } else {
      this.dots = newDots;
    }

    return this.dots;
  }

  public changeDirection(direction: Direction) {
    this.direction = direction;
  }

  private getRandomFreeDotIndex(min = 0, max: number): number {
    return Math.round(min + (max - min) * Math.random());
  }

  public getFood(): Dot {
    const freeDots = [];

    for (let i = 0; i < scale; i++) {
      for (let j = 0; j < scale; j++) {
        if (!this.dots.find((dot) => dot.x === i && dot.y === j)) {
          freeDots.push({ x: i, y: j });
        }
      }
    }

    const dotIndex = this.getRandomFreeDotIndex(0, freeDots.length);

    return freeDots[dotIndex];
  }
}
