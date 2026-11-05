// Post-build pass over the generated HTML.
//
// Pages and content are written with root-relative links exactly like the
// Webflow site ("/services", "/case-studies/lifi", "/work?view=articles").
// This integration makes them work wherever the site is hosted:
//   1. page links get the trailing slash GitHub Pages expects for directory
//      pages ("/services" -> "/services/"), which avoids a redirect per click;
//   2. every root-relative URL is prefixed with the configured base path, so
//      the same build works on https://theahaco.github.io/website/ and later
//      on https://theaha.co/ (base "/").
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ASSET_EXT = /\.[a-z0-9]{2,5}$/i;

export function normalizeUrl(url, base) {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const prefix = base.replace(/\/$/, '');
  if (prefix && (url === prefix || url.startsWith(prefix + '/'))) return url;
  const m = url.match(/^([^?#]*)(.*)$/);
  let path = m[1];
  const rest = m[2];
  const lastSegment = path.split('/').pop();
  const isAsset = path.startsWith('/_astro/') || ASSET_EXT.test(lastSegment);
  if (!isAsset && path !== '/' && !path.endsWith('/')) path += '/';
  return prefix + path + rest;
}

function rewriteHtml(html, base) {
  const fix = (u) => normalizeUrl(u, base);
  html = html.replace(/\b(href|src|action|poster|data-href|data-src)=("|')(\/[^"']*)\2/g, (_, attr, q, url) => `${attr}=${q}${fix(url)}${q}`);
  html = html.replace(/\bsrcset=("|')([^"']*)\1/g, (_, q, set) => {
    const out = set.split(',').map((part) => {
      const p = part.trim().split(/\s+/);
      if (p[0]) p[0] = fix(p[0]);
      return p.join(' ');
    }).join(', ');
    return `srcset=${q}${out}${q}`;
  });
  html = html.replace(/url\((["']?)(\/[^)"']*)\1\)/g, (_, q, url) => `url(${q}${fix(url)}${q})`);
  return html;
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

export default function basePath() {
  let base = '/';
  return {
    name: 'aha-base-path',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base || '/';
      },
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        let n = 0;
        for await (const file of walk(root)) {
          if (extname(file) !== '.html') continue;
          const html = await readFile(file, 'utf8');
          const out = rewriteHtml(html, base);
          if (out !== html) {
            await writeFile(file, out);
            n++;
          }
        }
        logger.info(`normalized links in ${n} HTML files (base "${base}")`);
      },
    },
  };
}
