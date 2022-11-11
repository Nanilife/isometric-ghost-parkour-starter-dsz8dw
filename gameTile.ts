import { dx, dy } from ".";
import { DecorationFrame, drawItem, TileFrame } from "./spritesheet";

const tileMap = new Map([
  ['Empt', TileFrame.Empty], // Empty, no tile
  ['Gren', TileFrame.Green], // Green grass
  ['GrSu', TileFrame.GreenSunken], // Green grass (sunken, ideal for adding decoration)
  ['GrEa', TileFrame.GreenEarth], // Green grass with earth
  ['Snow', TileFrame.Snow], // Snow
  ['SnSu', TileFrame.SnowSunken], // Snow (sunken, ideal for adding decoration)
  ['SnSt', TileFrame.SnowStone], // Snow with small stone
  ['SnSs', TileFrame.SnowStones], // Snow with multiple small stones
  ['SnBc', TileFrame.SnowStoneBlock], // Snow with small stone block
  ['Wood', TileFrame.Bridge1], // Wood
  ['Brdg', TileFrame.Bridge2], // Wooden bridge
]);

const decoMap = new Map([
  ['None', DecorationFrame.None], // No decoration
  ['01Pi', DecorationFrame.OnePink], // Pink numbers (1 to 10)
  ['02Pi', DecorationFrame.TwoPink],
  ['03Pi', DecorationFrame.ThreePink],
  ['04Pi', DecorationFrame.FourPink],
  ['05Pi', DecorationFrame.FivePink],
  ['06Pi', DecorationFrame.SixPink],
  ['07Pi', DecorationFrame.SevenPink],
  ['08Pi', DecorationFrame.EightPink],
  ['09Pi', DecorationFrame.NinePink],
  ['10Pi', DecorationFrame.TenPink],

  ['01Bw', DecorationFrame.OneBrown], // Brown numbers (1 to 10)
  ['02Bw', DecorationFrame.TwoBrown],
  ['03Bw', DecorationFrame.ThreeBrown],
  ['04Bw', DecorationFrame.FourBrown],
  ['05Bw', DecorationFrame.FiveBrown],
  ['06Bw', DecorationFrame.SixBrown],
  ['07Bw', DecorationFrame.SevenBrown],
  ['08Bw', DecorationFrame.EightBrown],
  ['09Bw', DecorationFrame.NineBrown],
  ['10Bw', DecorationFrame.TenBrown],

  ['Bush', DecorationFrame.Bush], // Brown bush
  ['Flow', DecorationFrame.Flower], // Small flower
  ['Ston', DecorationFrame.BigStone], // Big stone
  ['SnTr', DecorationFrame.SnowTree], // Large snowy tree
  ['GrTr', DecorationFrame.Tree], // Large tree
]);

export class Tile {
  constructor(public tile: TileFrame, public decoration: DecorationFrame) { }

  public draw() {
    if (this.tile) {
      drawItem(this.tile, dx / 2, dy / 2, this.decoration);
    }
  }

  get acceptsGhost() {
    return this.tile !== TileFrame.Empty &&
      this.decoration !== DecorationFrame.Tree &&
      this.decoration !== DecorationFrame.SnowTree &&
      this.decoration !== DecorationFrame.BigStone;
  }
}

export function parseLevel(level: string): Tile[][] {
  const tiles: Tile[][] = [];

  level = level.trim();
  level.split('\n').forEach((l) => {
    l = l.trim();
    while (l.indexOf('  ') != -1) {
      l = l.replaceAll('  ', ' ');
    }

    const tileRow: Tile[] = [];

    l.split(' ').forEach((t) => {
      const tileDeco = t.trim().split('+');
      tileRow.push(new Tile(tileMap.get(tileDeco[0]), decoMap.get(tileDeco[1])));
    });

    tiles.push(tileRow);
  });

  return tiles;
}