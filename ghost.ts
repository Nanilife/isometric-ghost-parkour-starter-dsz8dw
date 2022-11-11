import { dx, dy } from '.';
import { drawGhost, GhostFrame } from './spritesheet';

export type Position = { x: number; y: number };

export class Ghost {
  public position: Position;
  private animation: { height: number; direction: number } = { height: 0, direction: 1 };

  constructor(private frame: GhostFrame, x: number, y: number) {
    this.position = { x, y };
  }

  public draw() {
    this.animation.height += this.animation.direction;
    if (this.animation.height >= 30) {
      this.animation.direction = -1;
    } else if (this.animation.height <= 0) {
      this.animation.direction = 1;
    }

    drawGhost(this.frame, dx / 2, dy / 2 + this.animation.height);
  }
}
