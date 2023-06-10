import {
  day3_pt1,
  day3_pt2,
  findDuplicates,
  GROUPED_SACKS,
} from "../3-rucksacks";

test("priority", () => {});

test("grouped", () => {
  console.log(GROUPED_SACKS);
});

test("findDuplicates", () => {
  let ans = findDuplicates("abc", "abz");
  console.log(ans);
});

test("day3", () => {
  console.log(day3_pt1());
});

test("grouped duplicates", () => {
  console.log(day3_pt2());
});
