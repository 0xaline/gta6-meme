// gta6-meme-x-01 entry — written for this entry.
//
// The entry is the X post named in POST.json; this program's only job is to
// hand that file to the grader: copy POST.json from the repository root
// (MAKEFUN_BOT_DIR, /bot in the grader) into the output directory
// (MAKEFUN_OUTPUT_DIR, /output in the grader), byte for byte, and say what
// it copied. Run locally:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = join(botDir, 'POST.json');
const dst = join(outDir, 'POST.json');

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

const post = JSON.parse(readFileSync(dst, 'utf8'));
if (typeof post.url !== 'string' || !/^https:\/\/(x|twitter)\.com\/[^/]+\/status\/\d+$/.test(post.url)) {
  console.error(`POST.json holds no real post address: ${post.url}`);
  process.exit(1);
}
console.log(`POST.json copied to ${dst} — entry post: ${post.url}`);
