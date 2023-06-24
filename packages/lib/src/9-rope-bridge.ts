import { readFile } from "./util";

type Up = "U";
type Right = "R";
type Down = "D";
type Left = "L";
type Direction = Up | Right | Down | Left;

export type Position = [number, number];

type Instruction = {
  direction: Direction;
  distance: number;
};

export const INPUT = readFile("./inputs/9-input.txt");

function parseInstruction(instruction: string): Instruction {
  const direction = instruction[0] as Direction;
  const distance = Number(instruction.slice(1));
  return { direction, distance };
}

function parse(input: string): Instruction[] {
  return input.split("\n").map(parseInstruction);
}

export function move([x, y]: Position, direction: Direction): Position {
  switch (direction) {
    case "U":
      return [x, y + 1];
    case "R":
      return [x + 1, y];
    case "D":
      return [x, y - 1];
    case "L":
      return [x - 1, y];
  }
}

export function follow(
  [tailX, tailY]: Position,
  [headX, headY]: Position,
): Position {
  if (Math.abs(headX - tailX) <= 1 && Math.abs(headY - tailY) <= 1) {
    return [tailX, tailY];
  }

  let [x, y] = [tailX, tailY];

  if (x < headX) {
    x += 1;
  } else if (x > headX) {
    x -= 1;
  }

  if (y < headY) {
    y += 1;
  } else if (y > headY) {
    y -= 1;
  }

  return [x, y];
}

export function run(length: number, instructions: Instruction[]): number {
  let r: Position[] = new Array(length).fill([0, 0]);
  let tailPositions: Set<string> = new Set(["0,0"]);

  for (const { direction, distance } of instructions) {
    for (let i = 0; i < distance; i++) {
      let [head, ...tail] = r;
      head = move(head, direction);
      tail = tail.reduce(
        (acc, curr, idx) =>
          acc.concat([follow(curr, idx === 0 ? head : acc[idx - 1])]),
        [] as Position[],
      );
      tailPositions = new Set([
        ...tailPositions,
        tail.at(-1)?.join(",") ?? "0,0",
      ]);
      r = [head, ...tail];
    }
  }

  return tailPositions.size;
}

export function day9_pt1() {
  return run(2, parse(INPUT));
}

export function day9_pt2() {
  return run(10, parse(INPUT));
}
