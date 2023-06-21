import { readFile } from "./util";

export type Coord = [number, number];
type Grid = Cell[][];
type Cell = {
  coord: Coord;
  value: number;
};
export type Bounds = [Coord, Coord];

export type Up = "up";
export type Right = "right";
export type Down = "down";
export type Left = "left";
export type Direction = Up | Right | Down | Left;

export const INPUT = readFile("./inputs/8-input.txt").trim();

export function parse(s: string): Grid {
  return s
    .split("\n")
    .map((row, y) =>
      row
        .split("")
        .map((value, x) => ({ coord: [x, y], value: parseInt(value) })),
    );
}

export function* iterateWithinBounds(grid: Grid, bounds: Bounds) {
  const [min, max] = bounds;
  for (let y = min[1]; y <= max[1]; y++) {
    for (let x = min[0]; x <= max[0]; x++) {
      yield grid[y][x];
    }
  }
}

export function getBounds(grid: Grid): Bounds {
  return [
    [0, 0],
    [grid[0].length - 1, grid.length - 1],
  ];
}

export function* traverseFrom(grid: Grid, start: Coord, direction: Direction) {
  const [min, max] = getBounds(grid);
  let [x, y] = start;
  while (true) {
    switch (direction) {
      case "up":
        y--;
        break;
      case "right":
        x++;
        break;
      case "down":
        y++;
        break;
      case "left":
        x--;
        break;
    }
    if (x < min[0] || x > max[0] || y < min[1] || y > max[1]) {
      return;
    }
    yield grid[y][x];
  }
}

export function day8_pt1(input) {
  const grid = parse(input);
  const innerBounds: Bounds = [
    [1, 1],
    [grid[0].length - 2, grid.length - 2],
  ];

  // Start with the outer bounds, which are always visible
  let visible = grid.length * 2 + grid[0].length * 2 - 4;

  for (const { coord, value } of iterateWithinBounds(grid, innerBounds)) {
    const isVisible = (["up", "right", "down", "left"] as Direction[])
      .map((direction: Direction) => [...traverseFrom(grid, coord, direction)])
      // If any of the cells in the sightline are greater than or equal to the current cell, then
      // the current cell is not visible all the way to the edge of the grid in that direction
      .map((cells) => cells.every((cell) => value > cell.value))
      .some(Boolean);

    if (isVisible) {
      visible++;
    }
  }

  return visible;
}

export function day8_pt2(input) {
  const grid = parse(input);
  const innerBounds: Bounds = [
    [1, 1],
    [grid[0].length - 2, grid.length - 2],
  ];

  let highestScore = 1;
  for (const { coord, value } of iterateWithinBounds(grid, innerBounds)) {
    const sightlines = (["up", "right", "down", "left"] as Direction[]).map(
      (direction: Direction) => [...traverseFrom(grid, coord, direction)],
    );

    let scenicScore = 1;
    for (const cells of sightlines) {
      let visible = 0;
      for (const cell of cells) {
        if (cell.value < value) {
          visible++;
        } else {
          visible++;
          break;
        }
      }
      scenicScore *= visible;
    }

    highestScore = Math.max(highestScore, scenicScore);
  }

  return highestScore;
}
