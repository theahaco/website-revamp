// Conversion events for the audience analytics set in src/data/site.ts.
// Each call is a no-op unless the provider's script is on the page, which
// only happens on the production domain.
export function track(name) {
  try {
    if (window.umami && typeof window.umami.track === 'function') window.umami.track(name);
    else if (typeof window.plausible === 'function') window.plausible(name);
    else if (typeof window.gtag === 'function') window.gtag('event', name.toLowerCase().replace(/\s+/g, '_'));
  } catch (err) {
    // Analytics must never break the page.
  }
}

export function initAnalytics() {
  // Email links anywhere on the site.
  document.addEventListener('click', (e) => {
    const link = e.target instanceof Element ? e.target.closest('a[href^="mailto:"]') : null;
    if (link) track('Email click');
  });
  // A booking completed in a Calendly embed (Contact page) or popup (home badge).
  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://calendly.com' || !e.data || e.data.event !== 'calendly.event_scheduled') return;
    track('Call booked');
  });
}
