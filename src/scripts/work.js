import { href } from './base.js';

// Work page: Case studies / Articles views and the audience filter.
// Filter values, in display order. A tag shows only when at least one item of
// the current view matches it, so no filter leads to an empty list. Items are
// the elements with a data-fa (audience) attribute: the case study tiles, the
// group of open-source tool rows (it counts as data-wk-count items), the
// alliance row, the article rows.
const AUDS = ['All', 'Financial institutions', 'Protocols and products', 'Ecosystems and open source'];
// The title in two tones: h1 in the page's colour, soft in the lighter one
// (no soft part: one tone). The first paint of /work?view=articles uses the
// same texts (the inline script in src/pages/work.astro).
const COPY = {
  articles: {
    eyebrow: 'Blog',
    h1: 'Notes from the engineers.',
    soft: '',
    lede: 'What we learned taking regulated assets, protocol integrations and developer tooling to mainnet.',
    title: 'Blog: notes from the engineers | The Aha Company',
  },
  cases: {
    eyebrow: 'Work',
    h1: 'Client work,',
    soft: 'live systems, public code.',
    lede: 'Case studies and our open-source tools, filtered by who the work was for.',
    title: 'Blockchain case studies and open source | The Aha Company',
  },
};

export function initWork() {
  const casesWrap = document.querySelector('[data-wk="cases"]');
  const artsWrap = document.querySelector('[data-wk="articles"]');
  if (!casesWrap || !artsWrap) return;
  const eyeEl = document.querySelector('[data-wk="eyebrow"]');
  const h1aEl = document.querySelector('[data-wk="h1a"]');
  const h1bEl = document.querySelector('[data-wk="h1b"]');
  const ledeEl = document.querySelector('[data-wk="lede"]');
  const countEl = document.querySelector('[data-wk="count"]');
  const emptyEl = document.querySelector('[data-wk="empty"]');
  const group = document.querySelector('[data-wk="aud"]');
  const tabs = document.querySelectorAll('.wk_tab');
  // /work?for=institutions|protocols|ecosystems opens with that audience selected
  // (the Services page links there).
  const FOR = { institutions: 'Financial institutions', protocols: 'Protocols and products', ecosystems: 'Ecosystems and open source' };
  const params = new URLSearchParams(location.search);
  const state = {
    view: params.get('view') === 'articles' && document.querySelector('.wk_tab[data-view="articles"]') ? 'articles' : 'cases',
    aud: FOR[params.get('for')] || 'All',
  };

  const select = (v) => {
    state.aud = v;
    if (!group) return;
    group.querySelectorAll('.wk_chip').forEach((c) => {
      const on = c.getAttribute('data-val') === v;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  };
  if (group) {
    AUDS.forEach((v) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'wk_chip';
      b.textContent = v;
      b.setAttribute('data-val', v);
      b.addEventListener('click', () => {
        select(v);
        render();
      });
      group.appendChild(b);
    });
    select(state.aud);
  }

  const countOf = (it) => Number(it.getAttribute('data-wk-count')) || 1;

  function render() {
    const isArt = state.view === 'articles';
    const copy = COPY[state.view];
    casesWrap.style.display = isArt ? 'none' : '';
    artsWrap.style.display = isArt ? '' : 'none';
    if (eyeEl) eyeEl.textContent = copy.eyebrow;
    if (h1aEl) h1aEl.textContent = copy.h1;
    if (h1bEl) {
      h1bEl.textContent = copy.soft;
      h1bEl.hidden = !copy.soft;
    }
    if (ledeEl) ledeEl.textContent = copy.lede;
    document.title = copy.title;
    tabs.forEach((t) => {
      const on = t.getAttribute('data-view') === state.view;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.querySelectorAll('a.nav_link, a.nav_menu-link').forEach((a) => {
      const h = a.getAttribute('href');
      if (h === href('/work/')) {
        if (isArt) a.removeAttribute('aria-current'); else a.setAttribute('aria-current', 'page');
      }
      if (h === href('/work/?view=articles')) {
        if (isArt) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      }
    });
    const active = isArt ? artsWrap : casesWrap;
    const items = [...active.querySelectorAll('[data-fa]')];
    // Hide the tags that match nothing in this view; reset a hidden choice.
    if (group) {
      group.querySelectorAll('.wk_chip').forEach((c) => {
        const v = c.getAttribute('data-val');
        const shown = v === 'All' || items.some((it) => it.getAttribute('data-fa') === v);
        c.hidden = !shown;
        if (!shown && state.aud === v) select('All');
      });
      // A single choice besides "All" is no choice: the tags are hidden.
      group.hidden = group.querySelectorAll('.wk_chip:not([hidden])').length <= 2;
    }
    let n = 0;
    items.forEach((it) => {
      const show = state.aud === 'All' || it.getAttribute('data-fa') === state.aud;
      it.style.display = show ? '' : 'none';
      if (show) n += countOf(it);
    });
    if (countEl) countEl.textContent = n + (n === 1 ? ' item' : ' items');
    if (emptyEl) emptyEl.classList.toggle('is-shown', n === 0);
  }

  tabs.forEach((t) => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      state.view = t.getAttribute('data-view');
      history.replaceState(null, '', state.view === 'articles' ? href('/work/?view=articles') : href('/work/'));
      render();
    });
  });
  const clearBtn = document.querySelector('[data-wk="clear"]');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      select('All');
      render();
    });
  }
  render();
}
