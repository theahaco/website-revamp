import { href } from './base.js';

// Work page: Case studies / Articles views and the audience and network filters.
// Filter values, in display order. A chip shows only when at least one item of
// the current view matches it, so no filter leads to an empty list.
const AUDS = ['All', 'Financial institutions', 'Protocols and products', 'Ecosystems and open source'];
const NETS = ['All', 'Stellar', 'XRPL', 'Canton', 'Ethereum', 'Multi-network'];
const COPY = {
  articles: {
    eyebrow: 'Blog',
    h1: 'Notes from the engineers.',
    lede: 'What we learned taking regulated assets, protocol integrations and developer tooling to mainnet. Switch to Case studies for the work itself.',
    title: 'Blog: notes from the engineers | The Aha Company',
  },
  cases: {
    eyebrow: 'Work',
    h1: 'Client work, live systems, public code.',
    lede: 'Case studies and our open-source tools, filtered by who the work was for and the network it runs on.',
    ledeArticles: ' Switch to Articles for the writing that came out of them.',
    title: 'Blockchain case studies and open source | The Aha Company',
  },
};

export function initWork() {
  const casesWrap = document.querySelector('[data-wk="cases"]');
  const artsWrap = document.querySelector('[data-wk="articles"]');
  if (!casesWrap || !artsWrap) return;
  const eyeEl = document.querySelector('[data-wk="eyebrow"]');
  const h1El = document.querySelector('[data-wk="h1"]');
  const ledeEl = document.querySelector('[data-wk="lede"]');
  const countEl = document.querySelector('[data-wk="count"]');
  const emptyEl = document.querySelector('[data-wk="empty"]');
  const tabs = document.querySelectorAll('.wk_tab');
  // /work?for=institutions|protocols|ecosystems opens with that audience selected
  // (the Services page links there).
  const FOR = { institutions: 'Financial institutions', protocols: 'Protocols and products', ecosystems: 'Ecosystems and open source' };
  const params = new URLSearchParams(location.search);
  const state = {
    view: params.get('view') === 'articles' && document.querySelector('.wk_tab[data-view="articles"]') ? 'articles' : 'cases',
    aud: FOR[params.get('for')] || 'All',
    net: 'All',
  };

  function chips(group, vals) {
    const g = document.querySelector(`[data-wk="${group}"]`);
    if (!g) return;
    vals.forEach((v) => {
      const b = document.createElement('button');
      b.type = 'button';
      const on = v === state[group];
      b.className = 'wk_chip' + (on ? ' is-on' : '');
      b.textContent = v;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.setAttribute('data-val', v);
      b.addEventListener('click', () => {
        state[group] = v;
        g.querySelectorAll('.wk_chip').forEach((c) => {
          const on = c.getAttribute('data-val') === v;
          c.classList.toggle('is-on', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        render();
      });
      g.appendChild(b);
    });
  }
  chips('aud', AUDS);
  chips('net', NETS);

  function render() {
    const isArt = state.view === 'articles';
    const copy = COPY[state.view];
    casesWrap.style.display = isArt ? 'none' : '';
    artsWrap.style.display = isArt ? '' : 'none';
    if (eyeEl) eyeEl.textContent = copy.eyebrow;
    if (h1El) h1El.textContent = copy.h1;
    if (ledeEl) ledeEl.textContent = copy.lede + (copy.ledeArticles && document.querySelector('.wk_tab[data-view="articles"]') ? copy.ledeArticles : '');
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
    const items = [...active.querySelectorAll('.work_item')];
    const hasA = (it, v) => it.getAttribute('data-fa') === v;
    const hasN = (it, v) => (it.getAttribute('data-fn') || '').split('|').includes(v);
    // Hide the chips that match nothing in this view; reset a hidden choice.
    [['aud', hasA], ['net', hasN]].forEach(([group, has]) => {
      document.querySelectorAll(`[data-wk="${group}"] .wk_chip`).forEach((c) => {
        const v = c.getAttribute('data-val');
        const shown = v === 'All' || items.some((it) => has(it, v));
        c.hidden = !shown;
        if (!shown && state[group] === v) {
          state[group] = 'All';
          c.parentElement.querySelectorAll('.wk_chip').forEach((x) => {
            const on = x.getAttribute('data-val') === 'All';
            x.classList.toggle('is-on', on);
            x.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
        }
      });
    });
    // A filter group with a single choice besides "All" is hidden, and the
    // whole filter bar when no group is left.
    document.querySelectorAll('[data-wk="aud"], [data-wk="net"]').forEach((g) => { g.hidden = g.querySelectorAll('.wk_chip:not([hidden])').length <= 2; });
    const filters = document.querySelector('.wk_filters');
    if (filters) filters.hidden = [...filters.querySelectorAll('.wk_filtergroup')].every((g) => g.hidden);
    let n = 0;
    active.querySelectorAll('.work_item').forEach((it) => {
      const okA = state.aud === 'All' || it.getAttribute('data-fa') === state.aud;
      const okN = state.net === 'All' || (it.getAttribute('data-fn') || '').split('|').includes(state.net);
      const show = okA && okN;
      it.style.display = show ? '' : 'none';
      if (show) n++;
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
      state.aud = 'All';
      state.net = 'All';
      document.querySelectorAll('.wk_chip').forEach((c) => {
        const on = c.getAttribute('data-val') === 'All';
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      render();
    });
  }
  render();
}
