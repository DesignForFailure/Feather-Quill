#!/usr/bin/env node
// Check the local theme contract without importing a sibling project or a service.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
function sources(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(dir, entry.name);
    return entry.isDirectory() ? sources(path) : /\.(css|svelte|ts)$/.test(path) ? [path] : [];
  });
}
const files = sources(resolve(root, "src"));
const text = files.map((path) => readFileSync(path, "utf8")).join("\n");
const declarations = new Set([
  ...[...text.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]),
  ...[...text.matchAll(/style:(--[\w-]+)/g)].map((match) => match[1]),
]);
const missing = new Set();
for (const match of text.matchAll(/var\((--[\w-]+)\s*([,)])/g)) {
  if (!declarations.has(match[1]) && match[2] !== "," && !match[1].endsWith("-"))
    missing.add(match[1]);
}
if (missing.size) throw new Error(`Undefined theme variables: ${[...missing].join(", ")}`);
for (const path of ["src/styles/press", "static/brand", "DESIGN_GUIDE.md"])
  if (existsSync(resolve(root, path))) throw new Error(`Removed Press material returned: ${path}`);
const palette = JSON.parse(readFileSync(resolve(root, "src/styles/theme/palette.json"), "utf8"));
for (const [key, value] of Object.entries(palette.light)) {
  if (!/^#[a-f0-9]{6}$/i.test(value)) throw new Error(`Invalid tag colour: ${key}`);
  if (!declarations.has(key.replace("--tag-", "--color-tag-")))
    throw new Error(`Missing theme colour for ${key}`);
}
for (const relative of [
  "static/fonts/licenses/inter/OFL.txt",
  "static/fonts/licenses/fraunces/OFL.txt",
  "static/fonts/licenses/newsreader/OFL.txt",
])
  if (!existsSync(resolve(root, relative))) throw new Error(`Missing font notice: ${relative}`);
console.log(
  `Local theme contract checked against ${files.length} source files; font notices present.`
);
