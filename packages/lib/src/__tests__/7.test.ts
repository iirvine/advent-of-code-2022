import { buildState, day7_pt1, day7_pt2, stat } from "../7-no-space";

test("buildState", () => {
  const s = buildState([
    "$ cd /",
    "$ ls",
    "dir a",
    "dir b",
    "$ cd a",
    "$ ls",
    "1234 a.txt",
    "dir c",
    "$ cd c",
    "$ cd ..",
    "$ cd ..",
  ]);

  expect(s).toMatchSnapshot();
});

test("buildState test input", () => {
  const input = `
  $ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
  `
    .trim()
    .split("\n");

  const s = buildState(input);
  expect(s).toMatchSnapshot();

  const t = stat(s.filetree["/a"], s.filetree);
  expect(t).toBe(29116 + 2557 + 62596 + 584);

  const t2 = stat(s.filetree["/"], s.filetree);
  expect(t2).toBe(48381165);
});

test("day7_pt1", () => {
  const s = day7_pt1();
  console.log(s);
});

test("day7_pt2", () => {
  const s = day7_pt2();
  console.log(s);
});
