import { Dot, Direction } from '../types';

export class Snake {
  dots: Dot[];

  constructor(dots: Dot[]) {
    this.dots = dots;
  }

  public getDots(): Dot[] {
    return this, this.dots;
  }

  private canMove(head: Dot, direction: Direction): boolean {
    const dotsWithoutHead = this.dots.filter((_, index) => index !== 0);

    switch (direction) {
      case Direction.Up: {
        return (
          dotsWithoutHead.every((dot) => dot.y !== head.y + 1) &&
          head.y + 1 < 10
        );
      }

      case Direction.Right: {
        return (
          dotsWithoutHead.every((dot) => dot.x !== head.x + 1) &&
          head.x + 1 < 10
        );
      }

      case Direction.Down: {
        return (
          dotsWithoutHead.every((dot) => dot.y !== head.y - 1) &&
          head.y - 1 >= 0
        );
      }

      case Direction.Left: {
        return (
          dotsWithoutHead.every((dot) => dot.x !== head.x - 1) &&
          head.x - 1 >= 0
        );
      }

      default:
        throw new Error('Unexpected direction');
    }
  }

  private geNextHeadDot(head: Dot, direction: Direction): Dot {
    if (!this.canMove(head, direction)) {
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
        return { ...head, y: head.x - 1 };
      default:
        throw new Error('Unexpected direction');
    }
  }

  public move(direction: Direction): Dot[] {
    const newDots = this.dots.map((dot, index) => {
      if (index === 0) {
        return this.geNextHeadDot(dot, direction);
      }

      return this.dots[index - 1];
    });

    this.dots = newDots;

    return this.dots;
  }
}
