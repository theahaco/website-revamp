// Contact form without Webflow's form backend.
//
// The endpoint lives in src/data/site.ts (contact.formEndpoint) and is
// rendered into the form's `action`. Any service that accepts a POST of form
// fields and answers JSON works (Formspree, Basin, Getform, a Cloudflare
// Worker...). Until one is configured the form falls back to opening the
// visitor's email app with the message prefilled, and says so: the visitor
// still has to send that email.
//
// Markup keeps Webflow's structure and classes:
//   .w-form > form + .w-form-done + .w-form-fail
import { track } from './analytics.js';

export function initForms(root = document) {
  root.querySelectorAll('.w-form form').forEach((form) => {
    const wrap = form.closest('.w-form');
    const done = wrap.querySelector('.w-form-done');
    const fail = wrap.querySelector('.w-form-fail');
    const submit = form.querySelector('[type="submit"]');
    const endpoint = form.getAttribute('action') || '';
    const mailto = form.dataset.mailto || '';

    // Answers carried over from the Integrate questionnaire (/contact?what=...)
    const params = new URLSearchParams(location.search);
    const labels = { what: 'What goes onchain', who: 'Who may read the ledger', where: 'Users and liquidity today', fund: 'Funding' };
    const answers = Object.keys(labels).filter((k) => params.get(k)).map((k) => `${labels[k]}: ${params.get(k)}`);
    const message = form.querySelector('textarea');
    if (answers.length && message && !message.value) {
      message.value = `From the Integrate page:\n${answers.join('\n')}\n\n`;
    }
    // Calendly fills its first invitee question from a1, so the call starts
    // with the same answers (ignored if the event asks no question).
    const cal = document.querySelector('.calendar_widget iframe');
    if (answers.length && cal) {
      const u = new URL(cal.src);
      u.searchParams.set('a1', answers.join('\n'));
      cal.src = u.href;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      // Honeypot: a field people never see. Bots fill it; the message is dropped.
      const trap = form.querySelector('[name="_gotcha"]');
      if (trap && trap.value) return;
      let delivered = false;
      if (fail) fail.style.display = 'none';
      const data = new FormData(form);
      const label = submit ? (submit.value || submit.textContent) : '';
      const wait = submit && submit.dataset.wait;
      if (submit && wait) {
        if (submit.tagName === 'INPUT') submit.value = wait; else submit.textContent = wait;
      }
      try {
        if (endpoint && /^https?:/i.test(endpoint)) {
          const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          delivered = true;
        } else if (mailto) {
          const lines = [];
          for (const [k, v] of data.entries()) {
            if (typeof v === 'string' && v.trim() && !k.startsWith('_')) lines.push(`${k}: ${v}`);
          }
          const subject = encodeURIComponent(form.dataset.subject || 'Website inquiry');
          window.location.href = `mailto:${mailto}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
        } else {
          throw new Error('No form endpoint configured');
        }
        // Counted only when the message actually reached the endpoint: opening
        // an email app does not mean the email was sent.
        if (delivered) track('Contact form sent');
        // Hide the form only once the message was delivered: after opening an
        // email app, the visitor may still need the text they typed.
        if (delivered) form.style.display = 'none';
        if (done) {
          done.style.display = 'block';
          done.focus();
        }
      } catch (err) {
        console.error(err);
        if (fail) fail.style.display = 'block';
      } finally {
        if (submit && wait) {
          if (submit.tagName === 'INPUT') submit.value = label; else submit.textContent = label;
        }
      }
    });
  });
}
