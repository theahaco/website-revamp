// Path helpers. Links in templates are written root-relative ("/services");
// integrations/base-path.mjs adds the base path and trailing slash at build.

/** Page path without the base path and without a trailing slash ("/" for home). */
export function pagePath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let p = pathname;
  if (base && p.startsWith(base)) p = p.slice(base.length) || '/';
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  if (p.endsWith('/index.html')) p = p.slice(0, -'/index.html'.length) || '/';
  return p || '/';
}
