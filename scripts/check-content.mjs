// Checks the content files (src/content/) before every build and explains
// each problem in plain words, with the file and the line. On GitHub the
// messages also appear on the pull request, next to the line.
// usage: node scripts/check-content.mjs   (`npm run build` runs it first)
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parseDocument, LineCounter } from 'yaml';

const ROOT = new URL('..', import.meta.url).pathname;
const DIRS = ['blog', 'case-studies', 'team', 'tools', 'networks'];
const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
const BOM = String.fromCharCode(0xfeff);
const EM_DASH = String.fromCharCode(0x2014);
const problems = [];
const add = (file, line, msg, level = 'error') => problems.push({ file, line, msg, level });
const slugify = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\.md$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const files = (dir) => readdirSync(join(ROOT, dir)).filter((f) => !f.startsWith('.') && f !== 'README.md' && statSync(join(ROOT, dir, f)).isFile());
// Entry ids: the file name without .md, or the `slug` field when a file sets one.
const idOf = (d, f) => (readFileSync(join(ROOT, 'src/content', d, f), 'utf8').match(/^---[\s\S]*?^slug:\s*['"]?([\w-]+)/m) || [])[1] || f.slice(0, -3);
const ids = Object.fromEntries(DIRS.map((d) => [d, files(`src/content/${d}`).filter((f) => f.endsWith('.md')).map((f) => idOf(d, f))]));
const allImages = [];
(function walk(dir) {
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) e.isDirectory() ? walk(`${dir}/${e.name}`) : allImages.push(`${dir}/${e.name}`);
})('public/images');

// An image path as written in a content file: /images/covers/my-article.webp
function checkImage(file, line, path) {
  if (!path) return;
  if (/^https?:\/\/(github\.com|raw\.githubusercontent\.com)\//.test(path)) return add(file, line, `Write the image path on the site, starting with /images/ (for example /images/covers/my-article.webp), not a GitHub link.`);
  if (/^https?:\/\//.test(path)) return;
  if (/^\/?public\//.test(path)) return add(file, line, `Remove "public" from the image path: write ${path.replace(/^\/?public/, '')}`);
  if (!path.startsWith('/images/')) return add(file, line, `Image paths start with /images/ (for example /images/covers/my-article.webp). Found: ${path}`);
  const want = `public${decodeURI(path)}`;
  if (existsSync(join(ROOT, want))) return;
  const name = want.split('/').pop().toLowerCase();
  const stem = name.replace(/\.[a-z0-9]+$/, '');
  const same = allImages.find((p) => p.split('/').pop().toLowerCase() === name);
  const other = allImages.find((p) => p.split('/').pop().toLowerCase().replace(/\.[a-z0-9]+$/, '') === stem && p.slice(0, p.lastIndexOf('/')) === want.slice(0, want.lastIndexOf('/')));
  if (same) return add(file, line, `The image is not at ${want}. A file with that name is at ${same}: move it to the right folder, or change the path to ${same.slice(6)}.`);
  if (other) return add(file, line, `The image is not at ${want}, but ${other} exists: write ${other.slice(6)} (same extension, same capitals).`);
  add(file, line, `The image ${want} does not exist. Upload it to ${want.slice(0, want.lastIndexOf('/') + 1)} with exactly this name (lowercase), or fix the path.`);
}

// What a YAML error means, in plain words, from the line it points at.
function yamlHint(err, src) {
  const value = (src.match(/^\s*-?\s*[\w]+:\s*(.*)$/) || [])[1] || '';
  if (err.code === 'TAB_AS_INDENT') return 'This line starts with a Tab: use spaces instead, as in the template.';
  if (err.code === 'BLOCK_AS_IMPLICIT_KEY' || (/: /.test(value) && !/^['"|>]/.test(value)))
    return `This text contains a colon (:). Put the whole text between double quotes, for example: ${src.replace(/:\s*(.*)$/, ': "$1"').trim()}`;
  if (value.startsWith("'")) return `An apostrophe inside '...' ends the text too early. Put the text between double quotes instead, for example: ${src.replace(/:\s*'(.*)'\s*$/, ': "$1"').trim()}`;
  if (value.startsWith('"')) return 'A double quote (") inside "..." ends the text too early. Use an apostrophe or curly quotes inside instead.';
  return `The spaces at the start of this line do not match the template: keep exactly the same indentation as in docs/templates/. (${err.message.split(' at line')[0]})`;
}

for (const dir of DIRS) {
  for (const f of files(`src/content/${dir}`)) {
    const file = `src/content/${dir}/${f}`;
    if (!f.endsWith('.md')) { add(file, 1, `The site only reads files whose name ends in .md: rename this file ${slugify(f) || 'my-file'}.md`); continue; }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(f)) add(file, 1, `Rename this file ${slugify(f)}.md: lowercase letters, numbers and hyphens only, no spaces or accents. The file name becomes the page address.`);
    const lines = readFileSync(join(ROOT, file), 'utf8').replace(BOM, '').split(/\r?\n/);
    if (lines[0].trim() !== '---') { add(file, 1, 'The first line must be exactly --- (three hyphens): it opens the block of fields at the top.'); continue; }
    const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
    if (end === -1) { add(file, 1, 'The block of fields at the top is not closed: add a line with exactly --- (three hyphens) after the last field, before the text.'); continue; }
    const lc = new LineCounter();
    const doc = parseDocument(lines.slice(1, end).join('\n'), { lineCounter: lc });
    if (doc.errors.length) {
      for (const err of doc.errors.slice(0, 1)) {
        const line = (err.linePos?.[0]?.line || 1) + 1;
        add(file, line, yamlHint(err, lines[line - 1] || ''));
      }
      continue;
    }
    const data = doc.toJS() || {};
    const lineOf = (key) => {
      const node = doc.contents?.items?.find((p) => p.key?.value === key);
      return node ? lc.linePos(node.key.range[0]).line + 1 : 1;
    };
    const ref = (key, value, coll, label) => {
      if (!value || ids[coll].includes(value)) return;
      const guess = ids[coll].find((id) => id === slugify(String(value)));
      add(file, lineOf(key), guess ? `Write ${guess} (the file name in src/content/${coll}/, without .md), not "${value}".` : `"${value}" is not ${label}. Use a file name from src/content/${coll}/ without .md: ${ids[coll].join(', ')}.`);
    };
    const text = String(data.title ?? data.name ?? '').trim();
    if (!text) add(file, 2, `The ${dir === 'team' ? 'name' : 'title'} field is missing or empty.`);
    if ('draft' in data && typeof data.draft !== 'boolean') add(file, lineOf('draft'), 'Write draft: false (to publish) or draft: true (to keep it off the site).');
    if (['blog', 'case-studies', 'tools'].includes(dir)) {
      if ((data.metaTitle || text).length > 60) add(file, lineOf(data.metaTitle ? 'metaTitle' : 'title'), `The title has ${(data.metaTitle || text).length} characters: Google shows about 60. Shorten it, or add a shorter metaTitle.`, 'warning');
      const desc = String(data.description ?? '');
      if (desc && (desc.length < 120 || desc.length > 160)) add(file, lineOf('description'), `The description has ${desc.length} characters: aim for 120 to 160.`, 'warning');
    }
    if (['blog', 'case-studies'].includes(dir)) {
      // Work page filters: any other value hides the item from the filtered lists.
      const AUDS = ['Financial institutions', 'Protocols and products', 'Ecosystems and open source', ...(dir === 'case-studies' ? ['Institutions'] : [])];
      const NETS = ['Stellar', 'XRPL', 'Canton', 'Ethereum', 'Multi-network'];
      if (data.audience && !AUDS.includes(data.audience)) add(file, lineOf('audience'), `"${data.audience}" is not a Work page filter. Write one of: Financial institutions, Protocols and products, Ecosystems and open source.`);
      if (data.network && !NETS.includes(data.network)) add(file, lineOf('network'), `"${data.network}" is not a Work page filter. Write one of: ${NETS.join(', ')}.`);
    }
    const dash = lines.findIndex((l) => l.includes(EM_DASH));
    if (dash !== -1) add(file, dash + 1, 'House style: no long dash (em-dash). Use a colon, a comma or a new sentence.', 'warning');

    if (dir === 'blog') {
      const date = String(data.date ?? '').trim();
      if (!new RegExp(`^(${MONTHS}) ([1-9]|[12][0-9]|3[01]), 20[0-9]{2}$`).test(date) && !/^20\d\d-\d\d-\d\d$/.test(date))
        add(file, lineOf('date'), date ? `Write the date like November 20, 2026 (month in English, day, comma, year). "${date}" would show a wrong date or publish the article at once.` : 'Add the publication date, written like November 20, 2026.');
      ref('author', data.author, 'team', 'a team member file');
      ref('relatedWork', data.relatedWork, 'case-studies', 'a case study file');
      checkImage(file, lineOf('cover'), data.cover);
      if (!data.cover) {
        // The cover is found by name: public/images/covers/<file name>.webp, .jpg or .png
        const id = data.slug || f.slice(0, -3);
        const ok = ['webp', 'jpg', 'jpeg', 'png'].some((e) => existsSync(join(ROOT, `public/images/covers/${id}.${e}`)));
        const near = allImages.find((p) => !p.startsWith('public/images/og/') && /\.(webp|jpe?g|png)$/i.test(p) && p.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase() === id);
        if (!ok && near) add(file, lineOf('cover'), `The cover ${near} is not used: it must be in public/images/covers/, named ${id}.jpg (or .png, .webp), in lowercase.`);
        else if (!ok) add(file, lineOf('cover'), `No cover: to add one, upload public/images/covers/${id}.jpg (or .png).`, 'warning');
      }
      let fence = false;
      const heads = lines.slice(end + 1).filter((l) => /^#{2,3}\s/.test(l));
      if (heads.length && !heads.some((l) => l.startsWith('## '))) add(file, end + 2, 'Section headings start with ## (two #): with ### only, "In this article" stays empty.', 'warning');
      lines.slice(end + 1).forEach((l, i) => {
        const n = end + 2 + i;
        if (/^\s*(```|~~~)/.test(l)) fence = !fence;
        if (fence) return;
        if (/^#\s/.test(l)) add(file, n, 'A line starting with one # becomes a second page title, and is published. Section headings start with ## (two #). Delete notes for the team.');
        if (/Write the article here|Delete this example text|^## A (first|second) section|^## A section heading/.test(l)) add(file, n, "The template's example text is still here: replace it with the article.");
        for (const m of l.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) if (!m[1].startsWith('data:')) checkImage(file, n, m[1]);
        if (/!\[[^\]]*\]\[[^\]]*\]|\]: <?data:image/.test(l)) add(file, n, 'An image pasted from Google Docs is embedded as code. Upload the image to public/images/blog/ and write ![What it shows](/images/blog/<file-name>.webp).');
      });
    }
    if (dir === 'team') checkImage(file, lineOf('portrait'), data.portrait);
    if (dir === 'case-studies') {
      checkImage(file, lineOf('hero'), data.hero?.image);
      for (const m of data.team || []) ref('team', m, 'team', 'a team member file');
      (data.sections || []).forEach((s) => {
        const extra = Object.keys(s || {}).filter((k) => !['id', 'title', 'body'].includes(k));
        if (extra.length) add(file, lineOf('sections'), `In sections, the text of "${s.title}" is not indented enough: every line under body: |- starts with 4 spaces.`);
      });
    }
    if (dir === 'tools') {
      for (const m of data.built || []) ref('built', m, 'team', 'a team member file');
      for (const t of data.related || []) ref('related', t, 'tools', 'a tool file');
    }
  }
}

const gh = process.env.GITHUB_ACTIONS === 'true';
const esc = (s) => s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
for (const p of problems) {
  console.log(`${p.level === 'error' ? 'ERROR' : 'Warning'} in ${p.file}, line ${p.line}: ${p.msg}`);
  if (gh) console.log(`::${p.level} file=${p.file},line=${p.line}::${esc(p.msg)}`);
}
const errors = problems.filter((p) => p.level === 'error').length;
if (errors) {
  console.log(`\n${errors} problem(s) to fix before the site can be published. Help: docs/CONTENT.md, "If the check fails".`);
  process.exit(1);
}
console.log(`content files OK (${Object.values(ids).flat().length} files)`);
