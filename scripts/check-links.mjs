// Checks every internal link, image, script and #anchor in the built site.
// usage: npm run build && npm run check
// The output folder defaults to dist/ (override with DIST=...), and BASE_PATH
// must match the one used for the build (e.g. BASE_PATH=/website).
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, extname, resolve as resolvePath } from 'node:path';

const DIST = resolvePath(process.env.DIST || new URL('../dist/', import.meta.url).pathname) + '/';
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function exists(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

/** URL path -> built file (or null when nothing would be served). */
async function target(path) {
  if (base) {
    if (!path.startsWith(base + '/') && path !== base) return null; // outside the base path: 404 once deployed
    path = path.slice(base.length) || '/';
  }
  const file = join(DIST, decodeURIComponent(path));
  if (extname(file) && (await exists(file))) return file;
  if (await exists(join(file, 'index.html'))) return join(file, 'index.html');
  return null;
}

const pages = new Map(); // file -> { html, ids }
for await (const file of walk(DIST)) {
  if (extname(file) !== '.html') continue;
  const html = await readFile(file, 'utf8');
  pages.set(file, { html, ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])) });
}

const problems = [];
let checked = 0;
for (const [file, { html, ids }] of pages) {
  const page = '/' + file.slice(DIST.length);
  const urls = [...html.matchAll(/\b(?:href|src|action|poster)="([^"]+)"/g)].map((m) => m[1]);
  for (const m of html.matchAll(/\bsrcset="([^"]+)"/g)) urls.push(...m[1].split(',').map((s) => s.trim().split(/\s+/)[0]));
  for (const raw of urls) {
    const url = raw.replace(/&amp;/g, '&');
    if (url.startsWith('#')) {
      checked++;
      if (url.length > 1 && !ids.has(url.slice(1))) problems.push(`${page}: missing anchor ${url}`);
      continue;
    }
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    checked++;
    const [pathAndQuery, hash] = url.split('#');
    const path = pathAndQuery.split('?')[0];
    const hit = await target(path);
    if (!hit) {
      problems.push(`${page}: broken ${url}`);
      continue;
    }
    if (hash && extname(hit) === '.html' && !pages.get(hit)?.ids.has(hash)) problems.push(`${page}: missing anchor ${url}`);
  }
}
console.log(`checked ${checked} internal URLs in ${pages.size} pages (${DIST}, base "${base || '/'}")`);
if (problems.length) {
  console.log([...new Set(problems)].join('\n'));
  process.exit(1);
}
console.log('no broken internal links or anchors');
