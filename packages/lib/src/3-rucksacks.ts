import { readFile } from "./util";

const INPUT = "./inputs/3-input.txt";
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export const PRIORITY = Object.fromEntries(
  ALPHABET.concat(ALPHABET.toUpperCase())
    .split("")
    .map((char, index) => [char, index + 1]),
);

const RUCKSACKS = readFile(INPUT).split("\n");

export const SPLIT_SACKS = RUCKSACKS.map((sack: string) => [
  sack.slice(0, Math.floor(sack.length / 2)),
  sack.slice(Math.floor(sack.length / 2), sack.length),
]);

export const GROUPED_SACKS = RUCKSACKS.reduce<
  [r1: string, r2: string, r3: string][]
>(
  (acc, curr, i) =>
    i % 3 === 0
      ? [...acc, [RUCKSACKS[i], RUCKSACKS[i + 1], RUCKSACKS[i + 2]]]
      : acc,
  [],
);

export function findDuplicates(xs: string, ys: string): string {
  const setX = new Set(xs);
  const setY = new Set(ys);
  return Array.from(setX.keys()).reduce<string>(
    (acc, k) => (setY.has(k) ? acc.concat(k) : acc),
    "",
  );
}

export function day3_pt1() {
  return SPLIT_SACKS.map(([first, second]) => findDuplicates(first, second))
    .map((char) => PRIORITY[char] ?? 0)
    .reduce((acc, curr) => acc + curr, 0);
}

export function day3_pt2() {
  return GROUPED_SACKS.map(([first, second, third]) =>
    findDuplicates(
      findDuplicates(first, second),
      findDuplicates(second, third),
    ),
  )
    .map((char) => PRIORITY[char] ?? 0)
    .reduce((acc, curr) => acc + curr, 0);
}
