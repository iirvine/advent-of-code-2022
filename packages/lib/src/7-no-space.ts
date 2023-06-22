import { readFile } from "./util";

type cd = "cd";
type ls = "ls";
type cmd = cd | ls;

const INPUT = readFile("./inputs/7-input.txt").split("\n");

interface Command {
  cmd: cmd;
  args: string[];
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

const ROOT = "/";

export function parseCommand(s: string): Command {
  const [prompt, cmd, ...args] = s.split(" ");
  return {
    cmd: cmd as cmd,
    args,
  };
}

export function parentPath(p: string) {
  const parts = p.split("/");
  return parts.length > 2 ? parts.slice(0, parts.length - 1).join("/") : ROOT;
}

export function changePath(cwd: string, path: string) {
  return path === ROOT ? ROOT : cwd === ROOT ? `/${path}` : `${cwd}/${path}`;
}

export function buildState(input: string[]): State {
  return input.reduce<State>(
    (acc, curr) => {
      if (curr.startsWith("$")) {
        const {
          cmd,
          args: [path],
        } = parseCommand(curr);
        switch (cmd) {
          case "cd":
            if (path === "..") {
              return { ...acc, cwd: parentPath(acc.cwd) };
            } else {
              return {
                ...acc,
                cwd: changePath(acc.cwd, path),
              };
            }
          case "ls":
            return acc;
        }
      }
      let node: Node = acc.filetree[acc.cwd] ?? {
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

export function stat(n: Node, filetree: Record<string, Node>): number {
  const files = n.files.reduce((acc, curr) => acc + curr.size, 0);
  const dirs = n.directories.reduce(
    (acc, curr) => acc + stat(filetree[changePath(n.name, curr)], filetree),
    0,
  );
  return files + dirs;
}

export function day7_pt1() {
  const state = buildState(INPUT);
  const cutoff = 100_000;

  return Object.entries(state.filetree).reduce<number>((acc, [k, v]) => {
    const t = stat(v, state.filetree);
    if (t <= cutoff) {
      return acc + t;
    }

    return acc;
  }, 0);
}

export function day7_pt2() {
  const state = buildState(INPUT);

  const totalSpace = 70_000_000;
  const requiredSpace = 30_000_000;
  const rootTotal = stat(state.filetree[ROOT], state.filetree);
  const freeSpace = totalSpace - rootTotal;
  const needed = requiredSpace - freeSpace;

  return Object.entries(state.filetree)
    .map<[string, number]>(([k, v]) => [k, stat(v, state.filetree)])
    .filter(([, v]) => v > needed)
    .sort(([, a], [, b]) => a - b)
    .at(0);
}
