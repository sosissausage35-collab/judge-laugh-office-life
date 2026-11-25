// judge-laugh-office-life — Make the AI Judge Laugh
// Writes a single original one-line joke about office life to /output/entry.txt.
// Deterministic: no network, no randomness, no input files. The joke is embedded
// as a constant so the grader's two runs produce byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "The office printer works perfectly for everyone except the person who actually needs it, which is why we call it management.";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  // Gate, mirrored from the competition rules: UTF-8 text, 1-200 characters,
  // not only whitespace, exactly one line (no newline characters at all).
  const chars = [...JOKE];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`joke is ${chars.length} characters, must be 1-200`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (/[\r\n]/.test(JOKE)) {
    throw new Error("joke must be a single line with no newline");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, JOKE, "utf8");
  // Parent revision: verify the write round-tripped exactly — the grader
  // reads this file, so a silent partial write must fail loudly here.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== JOKE) {
    throw new Error("entry.txt does not match the validated joke");
  }
  const bytes = Buffer.byteLength(JOKE, "utf8");
  console.log(`wrote ${chars.length} characters (${bytes} bytes) to ${OUT_PATH}`);
}

main();
