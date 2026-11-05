// Site behaviour. Replaces webflow.js and the Webflow site's custom script
// (aha-site-v14.js). Everything that only depended on CMS data (links,
// hidden empty sections, dates, tables of contents) is now done at build
// time; what remains here is interaction.
import { initTabs } from './tabs.js';
import { initForms } from './form.js';
import { initWork } from './work.js';
import { initIntegrate } from './integrate.js';
import { initShare, initBackLink } from './article.js';
import { initAnalytics } from './analytics.js';

function initMenu() {
  const btn = document.querySelector('.nav_menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  const set = (open) => {
    menu.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
  };
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    set(!menu.classList.contains('is-open'));
  });
  // Escape closes the menu and gives focus back to its button.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      set(false);
      btn.focus();
    }
  });
}

initMenu();
initTabs();
initForms();
initWork();
initIntegrate();
initShare();
initBackLink();
initAnalytics();
