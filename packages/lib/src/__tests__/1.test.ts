import { day1_pt1, day1_pt2, INPUT, parse } from "../1-calorie-counting";
import { readFile } from "../util";

test("calorie-counting-pt-1", () => {
  const answer = day1_pt1();
  console.log(answer);
});

test("calorie-counting-pt-2", () => {
  const answer = day1_pt2();
  console.log(answer);
});

test("parse", () => {
  const nums = parse(readFile(INPUT));
  console.log(nums);
});
