import { readFile } from "./util";

export type Pair = [number, number];

const input = "./inputs/4-input.txt";
export const PAIRS = readFile(input);
export const PAIRS_PARSED = PAIRS.split("\n").map<[Pair, Pair]>((row) => {
  const [pair1, pair2] = row.split(",");
  return [
    pair1.split("-").map((p) => +p) as Pair,
    pair2.split("-").map((p) => +p) as Pair,
  ];
});

export function pairsOverlapFull(
  [px, py]: [number, number],
  [rx, ry]: [number, number],
): boolean {
  return (px <= rx && py >= ry) || (rx <= px && ry >= py);
}

export function pairsOverlapPartial(
  [px, py]: [number, number],
  [rx, ry]: [number, number],
): boolean {
  return (
    pairsOverlapFull([px, py], [rx, ry]) ||
    (px >= rx && px <= ry) ||
    (rx >= px && rx <= py)
  );
}

export function day4_pt1() {
  return PAIRS_PARSED.reduce(
    (acc, [p1, p2]) => (pairsOverlapFull(p1, p2) ? acc + 1 : acc),
    0,
  );
}

export function day4_pt2() {
  return PAIRS_PARSED.reduce(
    (acc, [p1, p2]) => (pairsOverlapPartial(p1, p2) ? acc + 1 : acc),
    0,
  );
}
