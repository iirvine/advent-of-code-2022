import { attica } from "../App";

test("hello", () => {
  console.log(attica);
  const l = 23;
  const a = l + 5;
  console.log(`hello dere ${a}`);
  expect(1 + 2).toBe(3);
});
