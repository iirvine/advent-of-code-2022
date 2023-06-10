import { readFile } from "./util";

export const INPUT = <const>"./inputs/1-input.txt";

export function day1_pt1(): number {
  const rows = parse(readFile(INPUT));
  return Math.max(...sums(rows));
}

export function day1_pt2(): number {
  const rows = parse(readFile(INPUT));
  return sums(rows)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr, 0);
}

export function parse(input: string): number[][] {
  return input
    .split("\n\n")
    .map((row) => row.split("\n").map((x) => parseInt(x)));
}

export function sums(input: number[][]) {
  return input.reduce<number[]>(
    (acc, row) => [...acc, row.reduce((acc, curr) => acc + curr, 0)],
    [],
  );
}
