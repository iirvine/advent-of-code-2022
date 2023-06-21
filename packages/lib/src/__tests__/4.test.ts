import {
  day4_pt1,
  day4_pt2,
  PAIRS_PARSED,
  pairsOverlapFull,
} from "../4-camp-cleanup";

test.skip("parsing", () => {
  console.log(PAIRS_PARSED);
});

test("pairsOverlap", () => {
  let ans = pairsOverlapFull([1, 1], [1, 1]);
  expect(ans).toBeTruthy();

  ans = pairsOverlapFull([2, 4], [6, 8]);
  expect(ans).toBeFalsy();

  ans = pairsOverlapFull([2, 8], [3, 7]);
  expect(ans).toBeTruthy();

  ans = pairsOverlapFull([2, 8], [1, 8]);
  expect(ans).toBeTruthy();
});

test("day4_pt1", () => {
  console.log(day4_pt1());
});

test("day4_pt2", () => {
  console.log(day4_pt2());
});
