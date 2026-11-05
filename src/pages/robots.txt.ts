// robots.txt: open to crawlers on the production domain, closed elsewhere
// (only the production domain serves it from the host root anyway).
import type { APIRoute } from 'astro';
import { site as siteData } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const production = !site || site.origin === siteData.productionOrigin;
  const sitemap = site ? new URL(import.meta.env.BASE_URL.replace(/\/$/, '') + '/sitemap-index.xml', site).href : '/sitemap-index.xml';
  const body = production ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n` : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
