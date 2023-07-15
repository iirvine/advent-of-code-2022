import { day12_pt1, INPUT, day12_pt2 } from "../12-hill-climbing";

const testInput = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`.trim();

test("day12_pt1", () => {
  console.log(day12_pt1(testInput));
});

test("day12_pt2", () => {
  console.log(day12_pt2(INPUT));
});
