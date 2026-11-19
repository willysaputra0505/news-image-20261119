import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copy the pre-drawn news poster into the output directory.
// No network, no randomness: the same bytes come out every run.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "entry.png");

if (!existsSync(source)) {
  throw new Error(`missing source image: ${source}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "entry.png"));

// Confirm the copy landed intact: same size as the source.
if (statSync(join(outDir, "entry.png")).size !== statSync(source).size) {
  throw new Error("copied entry.png does not match the source size");
}
