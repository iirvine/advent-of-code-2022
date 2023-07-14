import { PriorityQ } from "../12-hill-climbing";

test("priorityQueue", () => {
  let heap = new PriorityQ<number>((a, b) => b - a);
  heap.push(1);
  heap.push(2);
  heap.push(5);
  heap.push(3);
  heap.push(4);

  expect(heap.pop()).toBe(5);
});
