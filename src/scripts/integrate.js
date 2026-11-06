import { href } from './base.js';
import { QS } from '../data/questions';

// Networks page: the four-question route builder. The steps (one native radio
// per option) and the route card are in the page's markup
// (src/components/networks/RouteBuilder.astro); this script keeps the picks,
// fills the route card in, and points the call-to-action at the contact page
// with the answers (/contact?what=...&who=...&where=...&fund=...), which
// prefills the message with them (src/scripts/form.js). Styles live in the
// component: this script only sets classes, the radios' state and the text.
export function initIntegrate() {
  const qsHost = document.querySelector('[data-net="qs"]');
  if (!qsHost) return;
  let picks = {};
  const routeList = document.querySelector('[data-net="routelist"]');
  const progEl = document.querySelector('[data-net="progress"]');
  const verdictEl = document.querySelector('[data-net="verdict"]');
  const ctaEl = document.querySelector('[data-net="cta"]');
  const resetEl = document.querySelector('[data-net="reset"]');

  QS.forEach((qd) => {
    const li = qsHost.querySelector(`[data-q="${qd.id}"]`);
    if (!li) return;
    li.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener('change', () => {
        if (!input.checked) return;
        picks[qd.id] = Number(input.getAttribute('data-opt'));
        update();
      });
    });
  });

  function update() {
    let answered = 0;
    QS.forEach((qd) => {
      const li = qsHost.querySelector(`[data-q="${qd.id}"]`);
      const done = Object.prototype.hasOwnProperty.call(picks, qd.id);
      if (done) answered++;
      if (li) {
        li.classList.toggle('is-done', done);
        li.querySelectorAll('input[type="radio"]').forEach((input) => {
          input.checked = done && Number(input.getAttribute('data-opt')) === picks[qd.id];
        });
      }
      const rrow = routeList ? routeList.querySelector(`[data-rq="${qd.id}"]`) : null;
      if (rrow) {
        rrow.classList.toggle('is-done', done);
        const ra = rrow.querySelector('[data-ra]');
        if (ra) ra.textContent = done ? qd.opts[picks[qd.id]] : 'Not answered';
      }
      const dot = document.querySelector(`[data-dot="${qd.id}"]`);
      if (dot) dot.classList.toggle('is-on', done);
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
