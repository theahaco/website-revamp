// Base path of the deployment ("/" on theaha.co, "/website/" on github.io).
export const BASE = (document.documentElement.dataset.base || '/').replace(/\/?$/, '/');

/** Root-relative site path -> URL including the base path. */
export function href(path) {
  return BASE.replace(/\/$/, '') + path;
}

/** Current page path without base path and trailing slash. */
export function pagePath(pathname = location.pathname) {
  const b = BASE.replace(/\/$/, '');
  let p = b && pathname.startsWith(b) ? pathname.slice(b.length) || '/' : pathname;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}
