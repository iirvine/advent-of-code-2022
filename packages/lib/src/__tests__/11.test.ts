import {
  day11_pt1,
  day11_pt2,
  INPUT,
  Operation,
  parse,
  runOp,
} from "../11-monkey-in-the-middle";

test("parse", () => {
  console.log(parse(INPUT));
});

describe("runOp", () => {
  type CaseType = {
    name: string;
    input: { op: Operation; score: number };
    expected: number;
  };

  test.each<CaseType>([
    {
      name: "old * old",
      input: { op: { rhs: "old", operand: "*" }, score: 2 },
      expected: 4,
    },
    {
      name: "old * 2",
      input: { op: { rhs: "2", operand: "*" }, score: 2 },
      expected: 4,
    },
  ])("$name", ({ input, expected }) => {
    expect(runOp(input.op, input.score)).toBe(expected);
  });
});

test("day11_pt1", () => {
  const testInput = `
  Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
  `.trim();
  console.log(day11_pt2(testInput));
});
