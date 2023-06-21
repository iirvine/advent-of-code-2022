import { readFile } from "./util";

interface Operation {
  source: number;
  dest: number;
  count: number;
}

const INPUT = "./inputs/5-input.txt";

export const [rawStacks, rawOps] = readFile(INPUT).split("\n\n");

export const stackTable = rawStacks
  .split("\n")
  .slice(0, -1)
  .map((row) => row.split("").map((c) => (c.match(/[A-Z]/) ? [c] : [])));

export const stacks = transpose(stackTable)
  .map((row) => row.flat().reverse())
  .filter((c) => c.length > 0);

export const stackMap: Map<number, string[]> = new Map(
  stacks.map((stack, idx) => [idx + 1, stack]),
);

function transpose<T>(arr: T[][]) {
  return arr[0].map((_, i) => arr.map((row) => row[i]));
}

export const ops: Operation[] = rawOps.split("\n").map((op) => {
  const [_, q, , from, , to] = op.split(" ");
  return { source: +from, dest: +to, count: +q };
});

function topItems(stacks: Map<number, string[]>): string[] {
  return Array.from(stacks.values()).reduce<string[]>(
    (acc, curr) => [...acc, curr.pop() as string],
    [],
  );
}

export function day5_pt1() {
  for (const op of ops) {
    const src = stackMap.get(op.source) ?? [];
    const dest = stackMap.get(op.dest) ?? [];
    const moved = src.splice(src.length - op.count).reverse();
    stackMap.set(op.dest, dest.concat(moved));
  }

  return topItems(stackMap);
}

export function day5_pt2() {
  for (const op of ops) {
    const src = stackMap.get(op.source) ?? [];
    const dest = stackMap.get(op.dest) ?? [];
    const moved = src.splice(src.length - op.count);
    stackMap.set(op.dest, dest.concat(moved));
  }

  return topItems(stackMap);
}
