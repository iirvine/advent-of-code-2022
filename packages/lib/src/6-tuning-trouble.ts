import { readFile } from "./util";

const INPUT = "./inputs/6-input.txt";
const message = readFile(INPUT);

export function checkPacket(xs: string[], markerLength: number) {
  return new Set(xs).size === markerLength;
}

export function read(input: string, markerLength: number) {
  let left = 0;
  let right = markerLength;
  while (right <= input.length - 1) {
    if (checkPacket(Array.from(input.slice(left, right)), markerLength)) {
      return right;
    }
    left++;
    right++;
  }
}

export function day6_pt1() {
  return read(message, 4);
}

export function day6_pt2() {
  return read(message, 14);
}
