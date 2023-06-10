import * as fs from "fs";
import * as path from "path";

export function readFile(filepath: string): string {
  return fs.readFileSync(path.join(__dirname, filepath)).toString();
}
