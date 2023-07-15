import { readFile } from "./util";

type Coord = [number, number];
// Node represents a coordinate and its height
type Node = [Coord, string];
type Grid = string[][];

// fake priority queue
type pqItem = [Coord, number];
type pq = pqItem[];

function pqCompare(a: pqItem, b: pqItem) {
  return a[1] - b[1];
}

function pqPush(pq: pq, coord: Coord, priority: number) {
  pq.push([coord, priority]);
  pq.sort(pqCompare);
}

function pqPop(pq: pq) {
  return pq.shift()![0];
}

class CoordMap<T> {
  private map: Map<string, T> = new Map();

  constructor(entries?: [Coord, T][]) {
    this.map = new Map(
      entries?.map(([coord, value]) => [coord.toString(), value]),
    );
  }

  get(coord: Coord): T | undefined {
    return this.map.get(coord.toString());
  }

  set(coord: Coord, value: T) {
    this.map.set(coord.toString(), value);
  }

  has(coord: Coord): boolean {
    return this.map.has(coord.toString());
  }
}

function coordmap<T>(entries?: [Coord, T][]) {
  return new CoordMap(entries);
}

export const INPUT = readFile("./inputs/12-input.txt");

export function parse(input: string): Grid {
  return input.split("\n").map((line) => line.split(""));
}

function compHeight(a: string, b: string) {
  return a.charCodeAt(0) - b.charCodeAt(0);
}

function compCoord(a: Coord, b: Coord) {
  return a[0] === b[0] && a[1] === b[1];
}

function validRange(grid: Grid, [x, y]: Coord): boolean {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}

export function neighbors(grid: Grid, [x, y]: Coord): Node[] {
  return (
    [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ] as Coord[]
  )
    .filter((coord: Coord) => validRange(grid, coord))
    .map((neighbor) => getAt(grid, neighbor));
}

export function find(grid: Grid, char: string): Coord {
  return grid.flatMap((row, x) =>
    row.flatMap((col, y) => (col === char ? [x, y] : [])),
  ) as Coord;
}

export function findAll(grid: Grid, char: string): Coord[] {
  return grid.flatMap((row, x) =>
    row.flatMap((col, y) => (col === char ? [[x, y]] : [])),
  ) as Coord[];
}

function getAt(grid: Grid, [x, y]: Coord): Node {
  const c: Coord = [x, y];
  const height = grid[x][y];
  return height === "S" ? [c, "a"] : height === "E" ? [c, "z"] : [c, height];
}

function traversable(height: string, from: string): boolean {
  return compHeight(height, from) <= 1;
}

function cost(from: Node, to: Node): number {
  return traversable(to[1], from[1]) ? 1 : Infinity;
}

export function djikstra(grid: Grid, start: Coord, stop: Coord): Coord[] {
  let frontier: pq = [[start, 0]];
  let cameFrom: CoordMap<Coord | null> = coordmap([[start, null]]);
  let costSoFar: CoordMap<number> = coordmap([[start, 0]]);
  do {
    let [current, currentHeight] = getAt(grid, pqPop(frontier));
    if (compCoord(current, stop)) {
      break;
    }

    for (const [next, height] of neighbors(grid, current)) {
      const nextCost =
        (costSoFar.get(current) ?? 0) +
        cost([current, currentHeight], [next, height]);

      if (nextCost < (costSoFar.get(next) ?? Infinity)) {
        costSoFar.set(next, nextCost);
        pqPush(frontier, next, nextCost);
        cameFrom.set(next, current);
      }
    }
  } while (frontier.length > 0);
  return buildPath(cameFrom, start, stop);
}

export function buildPath(
  paths: CoordMap<Coord | null>,
  start: Coord,
  end: Coord,
): Coord[] {
  let current = end;
  let path: Coord[] = [];
  if (!paths.has(end)) {
    return [];
  }

  while (!compCoord(current, start)) {
    current = paths.get(current)!;
    path.push(current);
  }
  return path.reverse();
}

export function day12_pt1(input: string): number {
  const grid = parse(input);
  const start: Coord = find(grid, "S");
  const end = find(grid, "E");
  const path = djikstra(grid, start, end);
  return path.length;
}

export function day12_pt2(input: string): number {
  const grid = parse(input);
  const starts: Coord[] = findAll(grid, "a");
  const end = find(grid, "E");
  return Math.min(
    ...starts
      .map((start) => djikstra(grid, start, end))
      .filter((path) => path.length > 0)
      .map((path) => path.length),
  );
}
