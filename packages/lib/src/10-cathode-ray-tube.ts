import { readFile } from "./util";

interface Instruction {
  cycles: number;
  apply(machine: Machine);
}

export function parseInstruction(s: string): Instruction {
  const [name, arg] = s.split(" ");
  switch (name) {
    case "addx":
      return addx(parseInt(arg));
    default:
      return noop();
  }
}

const INPUT = readFile("./inputs/10-input.txt");

class Noop implements Instruction {
  readonly _tag = "noop";
  cycles = 1;
  apply(machine: Machine) {
    return machine;
  }
}

function noop(): Instruction {
  return new Noop();
}

export class Addx implements Instruction {
  readonly _tag = "addx";
  cycles = 2;
  value: number;
  constructor(value: number) {
    this.value = value;
  }
  apply(machine: Machine) {
    machine.registers.x = this.value + (machine.registers.x ?? 0);
  }
}

export function addx(value: number): Instruction {
  return new Addx(value);
}

type Machine = {
  registers: Record<string, number>;
  cycles: number;
};

export const instructions = INPUT.split("\n").map(parseInstruction);

function* tick(machine: Machine, instructions: Instruction[]) {
  for (const instruction of instructions) {
    const finished = machine.cycles + instruction.cycles;
    while (machine.cycles < finished) {
      yield {
        machine: { ...machine, cycles: machine.cycles++ },
      };
    }
    instruction.apply(machine);
  }
}

export function day10_pt1(instructions: Instruction[]) {
  let result = 0;
  for (const { machine } of tick(
    {
      cycles: 1,
      registers: {
        x: 1,
      },
    },
    instructions,
  )) {
    if (machine.cycles % 40 === 20) {
      result += machine.cycles * machine.registers["x"];
    }
  }

  return result;
}

export function day10_pt2(instructions: Instruction[]) {
  let image: string[] = [];

  for (const { machine } of tick(
    {
      cycles: 1,
      registers: {
        x: 1,
      },
    },
    instructions,
  )) {
    const spriteMin = machine.registers.x - 1;
    const spriteMax = machine.registers.x + 1;
    const testPixel = (machine.cycles % 40) - 1;
    if ((machine.cycles - 1) % 40 === 0) {
      image.push("\n");
    }

    if (testPixel >= spriteMin && testPixel <= spriteMax) {
      image.push("█");
    } else {
      image.push("░");
    }
  }

  return image.join("");
}
