// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import basePath from './integrations/base-path.mjs';

/**
 * The production workflow explicitly sets SITE_URL=https://theaha.co and
 * BASE_PATH=/. Preview-mode checks can override them for a different host
 * and base path.
 * Locally both fall back to the production values.
 */
// Cloudflare Pages also builds every pull request branch: those builds are
// previews (scheduled articles shown, noindex, no analytics), like github.io.
const cfPreview = process.env.CF_PAGES === '1' && Boolean(process.env.CF_PAGES_BRANCH) && process.env.CF_PAGES_BRANCH !== 'main';
const raw = new URL(process.env.SITE_URL || (cfPreview && process.env.CF_PAGES_URL) || 'https://theaha.co');
// The production domain, however the host reports it (www.theaha.co, or
// http:// before HTTPS is enforced), always builds as https://theaha.co: the
// noindex, analytics and canonical switches compare against that exact origin.
const site = /(^|\.)theaha\.co$/.test(raw.hostname) ? 'https://theaha.co' : raw.origin;
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      // Redirect stubs (/blog, networks without a page, /case-studies, /team)
      // and noindex pages stay out of the sitemap.
      filter: (page) => !/\/(404|blog|case-studies|case-studies\/pwc|team|networks\/canton|networks\/ethereum)\/?$/.test(page),
    }),
    basePath(),
  ],
});
