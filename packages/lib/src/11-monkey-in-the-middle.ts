import { readFile } from "./util";

type Operand = "+" | "*";

export type Operation = {
  operand: Operand;
  rhs: "old" | string;
};

type IfElse = {
  condition: number;
  then: string;
  else: string;
};

type Monkey = {
  id: string;
  items: number[];
  operation: Operation;
  test: IfElse;
};

type MonkeyMap = Map<string, Monkey>;

type Turn = {
  id: string;
  inspected: number;
  round: number;
};

export const INPUT = readFile("./inputs/11-input.txt");

function parseStartingItems(line: string, m: Monkey): Monkey {
  const items = line
    .split(":")[1]
    .split(",")
    .map((x) => parseInt(x.trim(), 10));
  return {
    ...m,
    items,
  };
}

function parseOperation(line: string, m: Monkey): Monkey {
  const op = line.split(":")[1].trim();
  const [_, operand, rhs] = op.match(/new = old ([+*]) (old|\d+)/) ?? [
    "",
    "*",
    "1",
  ];

  const operation: Operation = {
    operand: operand as Operand,
    rhs,
  };

  return {
    ...m,
    operation,
  };
}

function parseTestBlock(
  line: string,
  m: Monkey,
  [thenBranch, elseBranch]: string[],
): Monkey {
  const [_, condition] = line.match(/Test: divisible by (\d+)/) ?? ["", "1"];
  const testBlock: IfElse = {
    condition: parseInt(condition),
    then: thenBranch.split(" ").at(-1) ?? "0",
    else: elseBranch.split(" ").at(-1) ?? "0",
  };

  return {
    ...m,
    test: testBlock,
  };
}

export function parse(input: string): Monkey[] {
  const groups = input.split("\n\n");
  return groups.map((g) =>
    g.split("\n").reduce((acc, line, idx, xs) => {
      if (line.startsWith("Monkey")) {
        const [_, id] = line.match(/Monkey (\d+):/) ?? ["", "0"];
        return { ...acc, id };
      }

      let [kind] = line.split(":");
      switch (kind.trim()) {
        case "Starting items":
          return parseStartingItems(line, acc);
        case "Operation":
          return parseOperation(line, acc);
        case "Test":
          return parseTestBlock(line, acc, xs.slice(idx + 1));
        default:
          return acc;
      }
    }, {} as Monkey),
  );
}

export function runOp(operation: Operation, score: number): number {
  const rhs = operation.rhs === "old" ? score : parseInt(operation.rhs);
  switch (operation.operand) {
    case "*":
      return score * rhs;
    case "+":
      return score + rhs;
    default:
      return score;
  }
}

export function inspect(
  monkey: Monkey,
  score: number,
  lcm: number,
): [number, string] {
  const { operation, test } = monkey;
  let newScore =
    lcm === 0
      ? Math.floor(runOp(operation, score) / 3)
      : runOp(operation, score) % lcm;

  if (newScore % test.condition === 0) {
    return [newScore, test.then];
  } else {
    return [newScore, test.else];
  }
}

export function turn(monkey: Monkey, map: MonkeyMap, lcm: number): number {
  let inspected = 0;
  while (monkey.items.length > 0) {
    const score = monkey.items.shift() ?? 0;
    const [nextScore, nextId] = inspect(monkey, score, lcm);
    const nextMonkey = map.get(nextId) ?? monkey;
    map.set(nextId, {
      ...nextMonkey,
      items: [...nextMonkey.items, nextScore],
    });
    inspected++;
  }
  return inspected;
}

export function* run({
  round,
  map,
  lcm,
}: {
  round: number;
  map: MonkeyMap;
  lcm: number;
}): Generator<Turn> {
  for (const [id, monkey] of map.entries()) {
    const inspected = turn(monkey, map, lcm);
    yield { id, inspected, round };
  }
}

// computes the greatest common divisor of a and b
function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// computes the least common multiple of a and b
function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}

function simulate(
  map: MonkeyMap,
  rounds: number,
  lcm: number,
): Map<string, number> {
  let stats: Map<string, number> = new Map();
  for (let round = 0; round < rounds; round++) {
    for (const turn of run({ round, map, lcm })) {
      stats.set(turn.id, (stats.get(turn.id) ?? 0) + turn.inspected);
    }
  }
  return stats;
}

function compute(stats: Map<string, number>): number {
  return Array.from(stats.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .reduce((acc, [_, v]) => acc * v, 1);
}

export function day11_pt1(input: string) {
  let map: MonkeyMap = new Map(parse(input).map((m) => [m.id, m]));
  let stats = simulate(map, 20, 0);
  return compute(stats);
}

export function day11_pt2(input: string) {
  let map: MonkeyMap = new Map(parse(input).map((m) => [m.id, m]));
  let stats = simulate(
    map,
    10000,
    Array.from(map.values()).reduce((acc, m) => lcm(acc, m.test.condition), 1),
  );

  return compute(stats);
}
