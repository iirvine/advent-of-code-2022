import { readFile } from "./util";

type cd = "cd";
type ls = "ls";
type cmd = cd | ls;

const INPUT = readFile("./inputs/7-input.txt").split("\n");

interface Command {
  cmd: cmd;
  args: string[];
  output?: string[];
}

interface File {
  name: string;
  size: number;
}

interface Node {
  name: string;
  files: File[];
  directories: string[];
}

interface State {
  cwd: string;
  filetree: Record<string, Node>;
}

const Root = "/";

export function parseCommand(s: string, output?: string[]): Command {
  const [prompt, cmd, ...args] = s.split(" ");
  return {
    cmd: cmd as cmd,
    args,
    output,
  };
}

export function parent(p: string) {
  const parts = p.split("/");
  return parts.length > 2 ? parts.slice(0, parts.length - 1).join("/") : Root;
}

export function changePath(cwd: string, path: string) {
  return path === Root ? Root : cwd === Root ? `/${path}` : `${cwd}/${path}`;
}

export function buildState(input: string[]): State {
  return input.reduce<State>(
    (acc, curr) => {
      if (curr.startsWith("$")) {
        const cmd = parseCommand(curr);
        switch (cmd.cmd) {
          case "cd":
            if (cmd.args[0] == "..") {
              return { ...acc, cwd: parent(acc.cwd) };
            } else {
              return {
                ...acc,
                cwd: changePath(acc.cwd, cmd.args[0]),
              };
            }
          case "ls":
            return acc;
        }
      }
      let node = acc.filetree[acc.cwd] ?? {
        name: acc.cwd,
        files: [],
        directories: [],
      };
      const [kind, name] = curr.split(" ");
      if (kind === "dir") {
        node.directories.push(name);
      } else {
        node.files.push({ name, size: parseInt(kind) });
      }

      acc.filetree[acc.cwd] = node;
      return acc;
    },
    { cwd: "/", filetree: {} },
  );
}

export function total(n: Node, filetree: Record<string, Node>) {
  const files = n.files.reduce((acc, curr) => acc + curr.size, 0);
  const dirs = n.directories.reduce(
    (acc, curr) => acc + total(filetree[changePath(n.name, curr)], filetree),
    0,
  );
  return files + dirs;
}

export function day7_pt1() {
  const state = buildState(INPUT);
  const cutoff = 100_000;

  return Object.entries(state.filetree).reduce<number>((acc, [k, v]) => {
    const t = total(v, state.filetree);
    if (t <= cutoff) {
      return acc + t;
    }

    return acc;
  }, 0);
}

export function day7_pt2() {
  const totalSpace = 700_00_000;
  const requiredSpace = 30_000_000;
  const state = buildState(INPUT);

  const rootTotal = total(state.filetree[Root], state.filetree);
  const freeSpace = totalSpace - rootTotal;
  const needed = requiredSpace - freeSpace;

  return Object.entries(state.filetree)
    .map(([k, v]) => {
      const t = total(v, state.filetree);
      return [k, t];
    })
    .filter(([, v]) => v > needed)
    .sort(([, a], [, b]) => a - b)
    .at(0);
}
