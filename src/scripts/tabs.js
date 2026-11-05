// Replacement for Webflow's tabs runtime (webflow.js "w-tabs").
// Markup keeps Webflow's classes so the original CSS applies unchanged:
//   .w-tabs > .w-tab-menu > a.w-tab-link[data-w-tab]
//   .w-tabs > .w-tab-content > .w-tab-pane[data-w-tab]
// The active link carries .w--current, the active pane .w--tab-active.
export function initTabs(root = document) {
  root.querySelectorAll('.w-tabs').forEach((tabs, ti) => {
    const menu = tabs.querySelector(':scope > .w-tab-menu');
    const content = tabs.querySelector(':scope > .w-tab-content');
    if (!menu || !content) return;
    const links = [...menu.querySelectorAll(':scope > .w-tab-link')];
    const panes = [...content.querySelectorAll(':scope > .w-tab-pane')];
    const fadeIn = Number(tabs.dataset.durationIn || 300);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    menu.setAttribute('role', 'tablist');
    links.forEach((link, i) => {
      const name = link.dataset.wTab;
      const pane = panes.find((p) => p.dataset.wTab === name);
      const linkId = link.id || `tabs-${ti}-tab-${i}`;
      const paneId = (pane && pane.id) || `tabs-${ti}-pane-${i}`;
      link.id = linkId;
      link.setAttribute('role', 'tab');
      link.setAttribute('aria-controls', paneId);
      if (pane) {
        pane.id = paneId;
        pane.setAttribute('role', 'tabpanel');
        pane.setAttribute('aria-labelledby', linkId);
      }
    });

    function activate(name, focus) {
      links.forEach((link) => {
        const on = link.dataset.wTab === name;
        link.classList.toggle('w--current', on);
        link.setAttribute('aria-selected', on ? 'true' : 'false');
        link.tabIndex = on ? 0 : -1;
        if (on && focus) link.focus();
      });
      panes.forEach((pane) => {
        const on = pane.dataset.wTab === name;
        const was = pane.classList.contains('w--tab-active');
        pane.classList.toggle('w--tab-active', on);
        if (on && !was && !reduced && fadeIn > 0) {
          pane.style.opacity = '0';
          pane.style.transition = `opacity ${fadeIn}ms ease`;
          requestAnimationFrame(() => requestAnimationFrame(() => { pane.style.opacity = '1'; }));
        }
      });
    }

    const current = links.find((l) => l.classList.contains('w--current')) || links[0];
    if (current) activate(current.dataset.wTab, false);

    links.forEach((link, i) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        activate(link.dataset.wTab, false);
      });
      link.addEventListener('keydown', (e) => {
        let j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % links.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + links.length) % links.length;
        if (e.key === 'Home') j = 0;
        if (e.key === 'End') j = links.length - 1;
        if (j !== null) {
          e.preventDefault();
          activate(links[j].dataset.wTab, true);
        }
      });
    });
  });
}
