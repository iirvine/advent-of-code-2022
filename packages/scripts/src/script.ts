#!/usr/bin/env tsx

import { sum } from "lib";

console.log("hello dere");

const a = 20;
const b = sum(a, 3);

console.log(`what's ${b}`);

await main();

async function main() {
  console.log("whee");
}
