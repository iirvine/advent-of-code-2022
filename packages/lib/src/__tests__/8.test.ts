import {
  Bounds,
  Coord,
  day8_pt1,
  day8_pt2,
  INPUT,
  iterateWithinBounds,
  parse,
  traverseFrom,
} from "../8-treehouse";

const input = `
30373
25512
65332
33549
35390`.trim();

const output = parse(input);

test("iterateWithinBounds", () => {
  const b: Bounds = [output[1][1].coord, output.at(-2)?.at(-2)?.coord as Coord];
  console.log(b);
  const result = [...iterateWithinBounds(output, b)];
  expect(result).toMatchSnapshot();
});

test("transverseFrom", () => {
  let result = [...traverseFrom(output, [0, 0], "right")];
  console.log(result);

  result = [...traverseFrom(output, [0, 0], "down")];
  console.log(result);

  result = [...traverseFrom(output, [1, 1], "right")];
  console.log(result);
});

test("day8_pt1", () => {
  const ans = day8_pt1(INPUT);
  console.log(ans);
});

test("day8_pt2", () => {
  const ans = day8_pt2(INPUT);
  console.log(ans);
});
