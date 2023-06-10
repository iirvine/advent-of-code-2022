import { readFile } from "./util";

export const INPUT = <const>"./inputs/2-input.txt";

type Rock = "rock";
type Paper = "paper";
type Scissors = "scissors";

type Move = Rock | Paper | Scissors;

export const LosingMoveAgainst: { [K in Move]: Move } = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
} as const;

export const WinningMoveAgainst: { [K in Move]: Move } = Object.fromEntries(
  Object.entries(LosingMoveAgainst).map((a) => a.reverse()),
);

export const ShapeScore: { [K in Move]: number } = {
  rock: 1,
  paper: 2,
  scissors: 3,
} as const;

type Loss = "loss";
type Draw = "draw";
type Win = "win";

type Outcome = Loss | Draw | Win;

type Round = { opponent: Move; player: Move };

export const OutcomeScore: { [K in Outcome]: number } = {
  loss: 0,
  draw: 3,
  win: 6,
} as const;

type OpponentChoice = "A" | "B" | "C";
type PlayerChoice = "X" | "Y" | "Z";

function mapChoiceToMove(
  choice: OpponentChoice | PlayerChoice | unknown,
): Move {
  switch (choice) {
    case "A":
    case "X":
      return "rock";
    case "B":
    case "Y":
      return "paper";
    default:
      return "scissors";
  }
}

function mapChoiceToOutcome(choice: PlayerChoice | unknown): Outcome {
  switch (choice) {
    case "X":
      return "loss";
    case "Y":
      return "draw";
    default:
      return "win";
  }
}

export function getMoveForOutcome(oppchoice: Move, outcome: Outcome): Move {
  switch (outcome) {
    case "draw":
      return oppchoice;
    case "loss":
      return LosingMoveAgainst[oppchoice];
    case "win":
      return WinningMoveAgainst[oppchoice];
  }
}

export function score({ opponent, player }: Round) {
  const shapeScore = ShapeScore[player];

  if (opponent === player) {
    return shapeScore + OutcomeScore.draw;
  }

  if (LosingMoveAgainst[player] === opponent) {
    return shapeScore + OutcomeScore.win;
  }

  return shapeScore + OutcomeScore.loss;
}

export function day2(): number {
  const parsed: Round[] = readFile(INPUT)
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map(mapChoiceToMove))
    .map(([opponent, player]) => ({ opponent, player }));

  return parsed.reduce((acc, round) => acc + score(round), 0);
}

export function day2_pt2() {
  const parsed = readFile(INPUT)
    .split("\n")
    .map((row) => row.split(" "))
    .map<[Move, Outcome]>(([oppchoice, outcome]) => [
      mapChoiceToMove(oppchoice),
      mapChoiceToOutcome(outcome),
    ]);

  return parsed
    .map<Round>(([oppchoice, outcome]) => ({
      opponent: oppchoice,
      player: getMoveForOutcome(oppchoice, outcome),
    }))
    .reduce((acc, round) => acc + score(round), 0);
}
