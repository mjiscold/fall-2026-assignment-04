import { execFile } from "node:child_process";
import path from "node:path";

const input = process.argv[2];

if (!input) {
  console.error("SYNTAX_ERROR: Missing Mermaid input file.");
  process.exit(1);
}

const output = path.resolve("docs/architecture/erd.svg");

execFile(
  "npx",
  ["mmdc", "-i", input, "-o", output],
  { shell: true },
  (error, stdout, stderr) => {
    if (error) {
      console.error("SYNTAX_ERROR:");
      console.error(stderr || error.message);
      process.exit(1);
    }

    console.log("SUCCESS");
    process.exit(0);
  }
);