// Review overlay, rendered only on the preview (never on the production
// domain). Outlines and numbers the elements listed in src/data/review.ts for
// the current page, and shows them in a small panel.
const COLORS = { new: '#47A019', changed: '#2F6FB0', check: '#D97706' };
const LABELS = { new: 'New', changed: 'Changed', check: 'Check' };

function store(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (e) {
    return null;
  }
  return null;
}

function visible(el) {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden';
}

export function initReview() {
  const dataEl = document.getElementById('rv-data');
  if (!dataEl) return;
  const { items, total, pages, index } = JSON.parse(dataEl.textContent);

  const css = document.createElement('style');
  css.textContent = `
    [data-rv-mark]{outline:2px dashed var(--rv-c);outline-offset:4px;border-radius:2px}
    html.rv-off [data-rv-mark]{outline:none}
    html.rv-off .rv-badge{display:none}
    .rv-badge{position:absolute;z-index:9;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:var(--rv-c);color:#fff;font:700 11px/20px 'Space Grotesk',system-ui,sans-serif;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.25);cursor:pointer}
    .rv-panel{position:fixed;left:16px;bottom:16px;z-index:2147483001;width:min(380px,calc(100vw - 32px));max-height:min(62vh,560px);display:flex;flex-direction:column;background:#fff;color:#14243A;border:1px solid rgba(26,59,96,.18);border-radius:10px;box-shadow:0 12px 32px -12px rgba(20,36,58,.45);font:14px/1.45 'Space Grotesk',system-ui,sans-serif}
    .rv-head{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid rgba(26,59,96,.12)}
    .rv-title{font-weight:700;flex:1}
    .rv-btn{border:1px solid rgba(26,59,96,.25);background:#fff;color:#1A3B60;border-radius:6px;padding:3px 8px;font:600 12px 'Space Grotesk',system-ui,sans-serif;cursor:pointer;text-decoration:none;white-space:nowrap}
    .rv-btn:hover{border-color:#1A3B60}
    .rv-list{list-style:none;margin:0;padding:6px 0;overflow:auto}
    .rv-item{display:flex;gap:10px;padding:8px 12px;cursor:pointer}
    .rv-item:hover,.rv-item.rv-on{background:#F6F4F0}
    .rv-num{flex:0 0 20px;height:20px;border-radius:10px;background:var(--rv-c);color:#fff;font-weight:700;font-size:11px;line-height:20px;text-align:center}
    .rv-kind{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--rv-c)}
    .rv-ititle{font-weight:600}
    .rv-note{color:#3C4C60;font-size:13px}
    .rv-hidden{color:#7A8798;font-size:12px;font-style:italic}
    .rv-panel.rv-min .rv-list{display:none}
    .rv-panel.rv-min{width:auto;max-width:calc(100vw - 32px)}
    .rv-panel.rv-min .rv-title{white-space:nowrap}
    @media (max-width:479px){.rv-long{display:none}}
    .rv-flash{animation:rvflash 1.2s ease 2}
    @keyframes rvflash{50%{outline-color:transparent}}
  `;
  document.head.appendChild(css);

  const layer = document.createElement('div');
  document.body.appendChild(layer);
  const marks = items.map((item, i) => {
    const color = COLORS[item.kind] || COLORS.changed;
    let els = [];
    try {
      els = item.target ? [...document.querySelectorAll(item.target)] : [];
    } catch (e) {
      els = [];
    }
    els.forEach((el) => {
      el.setAttribute('data-rv-mark', item.kind);
      el.style.setProperty('--rv-c', color);
    });
    const badge = document.createElement('div');
    badge.className = 'rv-badge';
    badge.style.setProperty('--rv-c', color);
    badge.textContent = String(i + 1);
    badge.title = item.title;
    badge.addEventListener('click', () => openItem(i));
    layer.appendChild(badge);
    return { item, els, badge, color };
  });

  function place() {
    marks.forEach(({ els, badge }) => {
      const el = els.find(visible);
      if (!el) {
        badge.style.display = 'none';
        return;
      }
      const r = el.getBoundingClientRect();
      badge.style.display = '';
      badge.style.top = `${Math.max(0, r.top + window.scrollY - 12)}px`;
      badge.style.left = `${Math.max(0, r.left + window.scrollX - 12)}px`;
    });
  }

  function openItem(i) {
    setMin(false);
    const li = list.children[i];
    if (li) {
      [...list.children].forEach((c) => c.classList.toggle('rv-on', c === li));
      li.scrollIntoView({ block: 'nearest' });
    }
    focusItem(i);
  }

  function focusItem(i) {
    const m = marks[i];
    const el = m.els.find(visible) || m.els[0];
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    m.els.forEach((e) => {
      e.classList.remove('rv-flash');
      void e.offsetWidth;
      e.classList.add('rv-flash');
    });
  }

  // panel
  const panel = document.createElement('aside');
  panel.className = 'rv-panel';
  panel.setAttribute('aria-label', 'Review mode');
  const head = document.createElement('div');
  head.className = 'rv-head';
  const title = document.createElement('div');
  title.className = 'rv-title';
  const long = document.createElement('span');
  long.className = 'rv-long';
  long.textContent = ' on this page';
  title.append(items.length ? `Review · ${items.length}` : 'Review · nothing', long);
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'rv-btn';
  const all = document.createElement('a');
  all.className = 'rv-btn';
  all.href = index;
  all.textContent = `All ${total}`;
  all.title = `${total} suggestions on ${pages} pages`;
  const min = document.createElement('button');
  min.type = 'button';
  min.className = 'rv-btn';
  head.append(title, toggle, all, min);
  panel.appendChild(head);

  const list = document.createElement('ol');
  list.className = 'rv-list';
  marks.forEach(({ item, els, color }, i) => {
    const li = document.createElement('li');
    li.className = 'rv-item';
    li.style.setProperty('--rv-c', color);
    const num = document.createElement('span');
    num.className = 'rv-num';
    num.textContent = String(i + 1);
    const body = document.createElement('div');
    const kind = document.createElement('div');
    kind.className = 'rv-kind';
    kind.textContent = LABELS[item.kind] || item.kind;
    const t = document.createElement('div');
    t.className = 'rv-ititle';
    t.textContent = item.title;
    const n = document.createElement('div');
    n.className = 'rv-note';
    n.textContent = item.note;
    body.append(kind, t, n);
    if (item.target && els.length && !els.some(visible)) {
      const h = document.createElement('div');
      h.className = 'rv-hidden';
      h.textContent = 'Not visible at this screen width, or inside a tab or a collapsed question.';
      body.appendChild(h);
    }
    li.append(num, body);
    li.addEventListener('click', () => focusItem(i));
    list.appendChild(li);
  });
  if (items.length) panel.appendChild(list);
  document.body.appendChild(panel);

  function setOff(off) {
    document.documentElement.classList.toggle('rv-off', off);
    toggle.textContent = off ? 'Show marks' : 'Hide marks';
    store('rv-off', off ? '1' : '0');
  }
  function setMin(m) {
    panel.classList.toggle('rv-min', m);
    min.textContent = m ? 'Open' : 'Fold';
    min.setAttribute('aria-expanded', m ? 'false' : 'true');
    store('rv-min', m ? '1' : '0');
  }
  toggle.addEventListener('click', () => setOff(!document.documentElement.classList.contains('rv-off')));
  min.addEventListener('click', () => setMin(!panel.classList.contains('rv-min')));
  setOff(store('rv-off') === '1');
  setMin(store('rv-min') !== '0' || !items.length);
  if (!items.length) {
    min.style.display = 'none';
    toggle.style.display = 'none';
  }

  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(place);
  };
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  document.addEventListener('click', () => setTimeout(schedule, 350), true);
  document.addEventListener('toggle', schedule, true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  schedule();
}
