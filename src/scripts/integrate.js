import { href } from './base.js';

// Integrate page: the four-question route builder. Same questions, markup and
// inline styles as the Webflow site's script; the call-to-action carries the
// answers to the contact page, which prefills the message with them.
const QS = [
  { id: 'what', q: 'What goes onchain?', opts: ['A regulated asset: stablecoin, fund units, deposits', 'A protocol or product already live on another network', 'Developer tooling for an ecosystem'] },
  { id: 'who', q: 'Who may read the ledger?', opts: ['Anyone: a public network is acceptable', 'Only the parties to each transaction', 'Not decided yet'] },
  { id: 'where', q: 'Where are your users and liquidity today?', opts: ['EVM ecosystems', 'Payment corridors and fiat rails', 'Institutional counterparties and custodians'] },
  { id: 'fund', q: 'How will the work be funded?', opts: ['Our own budget', 'An ecosystem program, if one applies', 'Not sure yet'] },
];
const G = '#47A019';
const LINE = 'rgba(26,59,96,.2)';

export function initIntegrate() {
  const qsHost = document.querySelector('[data-net="qs"]');
  if (!qsHost) return;
  let picks = {};
  const routeList = document.querySelector('[data-net="routelist"]');
  const progEl = document.querySelector('[data-net="progress"]');
  const verdictEl = document.querySelector('[data-net="verdict"]');
  const ctaEl = document.querySelector('[data-net="cta"]');
  const resetEl = document.querySelector('[data-net="reset"]');

  QS.forEach((qd, qi) => {
    const li = document.createElement('li');
    li.style.cssText = `position:relative;display:flex;flex-direction:column;gap:16px;padding:0 0 40px 44px;border-left:2px solid ${LINE}`;
    li.setAttribute('data-q', qd.id);
    const dot = document.createElement('span');
    dot.setAttribute('aria-hidden', 'true');
    dot.style.cssText = 'position:absolute;left:-17px;top:0;width:32px;height:32px;border-radius:999px;background:#fff;color:#1A3B60;border:2px solid #1A3B60;display:flex;align-items:center;justify-content:center;font-family:Spectral,Georgia,serif;font-style:italic;font-size:17px;line-height:1';
    dot.textContent = String(qi + 1);
    dot.setAttribute('data-dot', '1');
    const h2 = document.createElement('h2');
    h2.style.cssText = 'font-family:Spectral,Georgia,serif;font-style:italic;font-weight:400;font-size:clamp(22px,2.2vw,28px);line-height:1.2;color:#1A3B60;padding-top:3px;margin:0';
    h2.textContent = qd.q;
    const ul = document.createElement('ul');
    ul.setAttribute('role', 'radiogroup');
    ul.setAttribute('aria-label', qd.q);
    ul.style.cssText = 'display:flex;flex-direction:column;gap:10px;list-style:none;margin:0;padding:0';
    qd.opts.forEach((op, oi) => {
      const oli = document.createElement('li');
      oli.style.cssText = 'display:flex;align-items:center';
      const stub = document.createElement('span');
      stub.setAttribute('aria-hidden', 'true');
      stub.style.cssText = `width:28px;height:2px;background:${LINE};flex-shrink:0;margin-left:-44px`;
      stub.setAttribute('data-stub', '1');
      const gap = document.createElement('span');
      gap.setAttribute('aria-hidden', 'true');
      gap.style.cssText = 'width:16px;flex-shrink:0';
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', 'false');
      b.setAttribute('data-opt', String(oi));
      b.style.cssText = `display:flex;align-items:center;gap:12px;text-align:left;min-height:48px;padding:10px 16px;border:2px solid ${LINE};border-radius:8px;background:#fff;color:#14243A;font:inherit;font-size:15px;line-height:1.35;cursor:pointer;transition:border-color .2s,background .2s;width:100%`;
      const rd = document.createElement('span');
      rd.setAttribute('aria-hidden', 'true');
      rd.style.cssText = `width:10px;height:10px;border-radius:999px;background:${LINE};flex-shrink:0`;
      rd.setAttribute('data-rd', '1');
      b.appendChild(rd);
      b.appendChild(document.createTextNode(op));
      b.addEventListener('click', () => {
        picks[qd.id] = oi;
        update();
      });
      oli.appendChild(stub);
      oli.appendChild(gap);
      oli.appendChild(b);
      ul.appendChild(oli);
    });
    li.appendChild(dot);
    li.appendChild(h2);
    li.appendChild(ul);
    qsHost.appendChild(li);
    const rrow = document.createElement('li');
    rrow.style.cssText = 'display:flex;flex-direction:column;gap:2px;padding:14px 24px;border-bottom:1px solid rgba(255,255,255,.12)';
    rrow.setAttribute('data-rq', qd.id);
    const rq = document.createElement('span');
    rq.style.cssText = 'font-size:12px;color:rgba(255,255,255,.6)';
    rq.textContent = qd.q;
    const ra = document.createElement('span');
    ra.style.cssText = 'font-size:15px;font-weight:600;color:rgba(255,255,255,.6)';
    ra.textContent = 'Not answered';
    ra.setAttribute('data-ra', '1');
    rrow.appendChild(rq);
    rrow.appendChild(ra);
    if (routeList) routeList.appendChild(rrow);
  });

  const fin = document.createElement('li');
  fin.style.cssText = 'position:relative;display:flex;flex-direction:column;gap:12px;padding:0 0 0 44px';
  const fdot = document.createElement('span');
  fdot.setAttribute('aria-hidden', 'true');
  fdot.style.cssText = 'position:absolute;left:-17px;top:0;width:32px;height:32px;border-radius:999px;background:#1A3B60;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;line-height:1';
  fdot.textContent = '?';
  const fh = document.createElement('h2');
  fh.style.cssText = 'font-family:Spectral,Georgia,serif;font-style:italic;font-weight:400;font-size:clamp(22px,2.2vw,28px);line-height:1.2;color:#1A3B60;margin:0';
  fh.textContent = 'The answer is the call.';
  const fp = document.createElement('p');
  fp.style.cssText = 'font-size:15px;color:#3C4C60;max-width:520px;margin:0';
  fp.textContent = 'Every branch above ends in the same place. An engineer who has shipped on these networks reads your answers and tells you what the integration takes, and where it should run.';
  fin.appendChild(fdot);
  fin.appendChild(fh);
  fin.appendChild(fp);
  qsHost.appendChild(fin);

  function update() {
    let answered = 0;
    QS.forEach((qd) => {
      const li = qsHost.querySelector(`[data-q="${qd.id}"]`);
      const done = Object.prototype.hasOwnProperty.call(picks, qd.id);
      if (done) answered++;
      li.style.borderLeftColor = done ? G : LINE;
      const dot = li.querySelector('[data-dot]');
      if (dot) {
        dot.style.background = done ? G : '#fff';
        dot.style.color = done ? '#fff' : '#1A3B60';
        dot.style.borderColor = done ? G : '#1A3B60';
      }
      li.querySelectorAll('button[role="radio"]').forEach((b) => {
        const on = done && Number(b.getAttribute('data-opt')) === picks[qd.id];
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.style.borderColor = on ? G : LINE;
        b.style.background = on ? 'rgba(71,160,25,.06)' : '#fff';
        const rd = b.querySelector('[data-rd]');
        if (rd) rd.style.background = on ? G : LINE;
        const stub = b.parentElement.querySelector('[data-stub]');
        if (stub) stub.style.background = on ? G : LINE;
      });
      const rrow = routeList ? routeList.querySelector(`[data-rq="${qd.id}"] [data-ra]`) : null;
      if (rrow) {
        rrow.textContent = done ? qd.opts[picks[qd.id]] : 'Not answered';
        rrow.style.color = done ? '#fff' : 'rgba(255,255,255,.6)';
      }
    });
    if (progEl) progEl.textContent = `${answered} of 4`;
    if (verdictEl) {
      verdictEl.textContent =
        answered === 0
          ? 'Pick a branch on each question. The route fills in here.'
          : answered < 4
            ? 'Keep going. Every branch leads to the same room.'
            : 'Your answers point somewhere. We will tell you where, and what it takes, on the call.';
    }
    if (ctaEl) {
      const params = QS.filter((qd) => Object.prototype.hasOwnProperty.call(picks, qd.id))
        .map((qd) => `${qd.id}=${encodeURIComponent(qd.opts[picks[qd.id]])}`)
        .join('&');
      ctaEl.setAttribute('href', href('/contact/') + (params ? `?${params}` : ''));
    }
  }
  if (resetEl) {
    resetEl.addEventListener('click', (e) => {
      e.preventDefault();
      picks = {};
      update();
    });
  }
  update();
}
