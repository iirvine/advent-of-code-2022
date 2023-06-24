import { day9_pt1, day9_pt2, moveHead, Position, run } from "../9-rope-bridge";

test("run", () => {
  /* 0 1 2 3 4 5
   * . . . . H .
   * . . . T . .
   * */
  let ans = run(2, [
    { distance: 4, direction: "R" },
    { distance: 1, direction: "U" },
  ]);

  console.log(ans);
});

test("day9_pt1", () => {
  console.log(day9_pt1());
});

test("day9_pt2", () => {
  console.log(day9_pt2());
});
