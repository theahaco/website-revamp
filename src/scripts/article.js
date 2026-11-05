import { pagePath } from './base.js';

// Share buttons on articles: LinkedIn, X, copy link.
export function initShare() {
  const share = document.querySelector('.art_share');
  if (!share) return;
  const u = encodeURIComponent(location.href);
  const t = encodeURIComponent(document.title);
  const li = share.querySelector('[data-share="linkedin"]');
  if (li) {
    li.href = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    li.target = '_blank';
    li.rel = 'noopener';
  }
  const x = share.querySelector('[data-share="x"]');
  if (x) {
    x.href = `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    x.target = '_blank';
    x.rel = 'noopener';
  }
  const cp = share.querySelector('[data-share="copy"]');
  if (cp) {
    cp.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        navigator.clipboard && navigator.clipboard.writeText(location.href);
      } catch (err) {
        /* ignore */
      }
      cp.textContent = 'Copied';
      setTimeout(() => {
        cp.textContent = 'Copy link';
      }, 1600);
    });
  }
}

// "Back" links: when the visitor came from another page of the site, the link
// says where it goes ("← Back to the case study") and behaves like the browser
// back button. Same rules as the Webflow site.
export function initBackLink() {
  const b = document.querySelector('a[data-back], main a.art_back, [data-main] a.art_back');
  if (!b) return;
  try {
    const ref = document.referrer;
    if (!ref) return;
    const u = new URL(ref);
    if (u.origin !== location.origin) return;
    const from = pagePath(u.pathname);
    if (u.pathname === location.pathname) return;
    if (window.history.length < 2) return;
    let name = null;
    if (u.search.indexOf('view=articles') > -1) name = 'Blog';
    else if (from === '/') name = 'home';
    else if (from.startsWith('/case-studies/')) name = 'the case study';
    else if (from.startsWith('/team/')) name = 'the team';
    else if (from.startsWith('/blog/')) name = 'the article';
    else if (from.startsWith('/networks/')) name = 'Stellar';
    else if (from === '/networks') name = 'Integrate';
    else if (from === '/work') name = 'Work';
    else if (from === '/services') name = 'Services';
    else if (from === '/about') name = 'About';
    else if (from === '/faq') name = 'FAQ';
    else if (from === '/contact') name = 'Contact';
    if (name) {
      b.textContent = '← Back to ' + name;
      b.setAttribute('href', ref);
      b.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
      });
    }
  } catch (err) {
    /* ignore */
  }
}
