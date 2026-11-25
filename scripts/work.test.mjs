import assert from 'node:assert/strict';
import test from 'node:test';

// base.js reads the deployment base when imported.
globalThis.document = { documentElement: { dataset: { base: '/' } } };
const { initWork } = await import('../src/scripts/work.js');
delete globalThis.document;

const audiences = ['Financial institutions', 'Protocols and products', 'Ecosystems and open source'];

function element(attrs = {}) {
  const classes = new Set();
  const listeners = {};
  return {
    style: {},
    hidden: false,
    textContent: '',
    children: [],
    classList: {
      toggle(name, on) { if (on) classes.add(name); else classes.delete(name); },
      contains(name) { return classes.has(name); },
    },
    getAttribute(name) { return attrs[name] ?? null; },
    setAttribute(name, value) { attrs[name] = value; },
    addEventListener(name, listener) { listeners[name] = listener; },
    appendChild(child) { this.children.push(child); },
    querySelectorAll(selector) {
      if (selector === '[data-fa]') return this.children;
      if (selector === '.wk_chip') return this.children;
      if (selector === '.wk_chip:not([hidden])') return this.children.filter((c) => !c.hidden);
      throw new Error(`Unexpected selector: ${selector}`);
    },
    click() { listeners.click({ preventDefault() {} }); },
  };
}

function setup(t, path, articleAudiences = audiences) {
  const nodes = Object.fromEntries(
    ['cases', 'articles', 'eyebrow', 'h1a', 'h1b', 'lede', 'count', 'empty', 'aud', 'clear']
      .map((key) => [`[data-wk="${key}"]`, element()]),
  );
  nodes['[data-wk="cases"]'].children = audiences.map((aud) => element({ 'data-fa': aud }));
  nodes['[data-wk="articles"]'].children = articleAudiences.map((aud) => element({ 'data-fa': aud }));
  const tabs = ['cases', 'articles'].map((view) => element({ 'data-view': view }));
  const location = new URL(path, 'https://example.com');
  const historyState = { preserved: true };
  const history = {
    state: historyState,
    replaceState(state, _, url) {
      this.state = state;
      location.href = String(url);
    },
  };
  const document = {
    querySelector(selector) {
      if (selector === '.wk_tab[data-view="articles"]') return tabs[1];
      return nodes[selector] ?? null;
    },
    querySelectorAll(selector) {
      if (selector === '.wk_tab') return tabs;
      if (selector === 'a.nav_link, a.nav_menu-link') return [];
      throw new Error(`Unexpected selector: ${selector}`);
    },
    createElement() { return element(); },
  };
  for (const [key, value] of Object.entries({ document, location, history })) {
    const original = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
    t.after(() => {
      if (original) Object.defineProperty(globalThis, key, original);
      else delete globalThis[key];
    });
  }
  initWork();
  return {
    location, history, historyState, tabs,
    chip: (aud) => nodes['[data-wk="aud"]'].children.find((c) => c.getAttribute('data-val') === aud),
    cases: nodes['[data-wk="cases"]'].children,
    clear: nodes['[data-wk="clear"]'],
  };
}

test('audience clicks update the query, selection and visible items', (t) => {
  const page = setup(t, '/work/?for=institutions');
  assert.equal(page.chip(audiences[0]).getAttribute('aria-pressed'), 'true');
  for (const [index, slug] of ['protocols', 'ecosystems', 'institutions'].entries()) {
    const audienceIndex = [1, 2, 0][index];
    page.chip(audiences[audienceIndex]).click();
    assert.equal(page.location.searchParams.get('for'), slug);
    assert.equal(page.chip(audiences[audienceIndex]).getAttribute('aria-pressed'), 'true');
    assert.deepEqual(page.cases.map((item) => item.style.display),
      audiences.map((_, i) => i === audienceIndex ? '' : 'none'));
  }
});

test('All and Clear filters remove only the audience parameter', (t) => {
  const page = setup(t, '/website/work/?for=institutions&utm_source=test#results');
  for (const clear of [() => page.chip('All').click(), () => page.clear.click()]) {
    page.chip(audiences[0]).click();
    clear();
    assert.equal(page.location.href, 'https://example.com/website/work/?utm_source=test#results');
    assert.equal(page.chip('All').getAttribute('aria-pressed'), 'true');
    assert.ok(page.cases.every((item) => item.style.display === ''));
    assert.equal(page.history.state, page.historyState);
  }
});

test('audience and view changes preserve each other', (t) => {
  const page = setup(t, '/work/?for=institutions');
  page.tabs[1].click();
  assert.equal(page.location.searchParams.get('view'), 'articles');
  assert.equal(page.location.searchParams.get('for'), 'institutions');
  page.chip(audiences[1]).click();
  assert.equal(page.location.searchParams.get('view'), 'articles');
  assert.equal(page.location.searchParams.get('for'), 'protocols');
  page.chip('All').click();
  assert.equal(page.location.search, '?view=articles');
  page.tabs[0].click();
  assert.equal(page.location.search, '');
});

test('switching to a view without the selected audience clears its query parameter', (t) => {
  const page = setup(t, '/work/?for=institutions', [audiences[2]]);
  page.tabs[1].click();
  assert.equal(page.location.search, '?view=articles');
  assert.equal(page.chip('All').getAttribute('aria-pressed'), 'true');
});
