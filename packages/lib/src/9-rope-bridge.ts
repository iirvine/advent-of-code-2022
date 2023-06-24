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

export function moveHead([x, y]: Position, direction: Direction): Position {
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

export function moveTail(
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

function moveRope(rope: Position[], direction: Direction): Position[] {
  const [head, ...tail] = rope;
  const nextHead = moveHead(head, direction);
  const nextTail = tail.reduce(
    (acc, curr, idx) =>
      acc.concat([moveTail(curr, idx === 0 ? nextHead : acc[idx - 1])]),
    [] as Position[],
  );
  return [nextHead, ...nextTail];
}

export function run(length: number, instructions: Instruction[]): number {
  let r: Position[] = new Array(length).fill([0, 0]);
  let tailPositions: Set<string> = new Set(["0,0"]);

  for (const { direction, distance } of instructions) {
    for (let i = 0; i < distance; i++) {
      r = moveRope(r, direction);
      tailPositions.add(r[r.length - 1].join(","));
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
