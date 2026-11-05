// Review mode. Open points for the owner, each attached to the element(s) it
// concerns. On the github.io preview the elements are outlined and numbered,
// and /review/ lists everything; on the production domain
// (site.productionOrigin) none of this is rendered.
//
// This file is public (the repository and the preview are public): notes say
// what to look at, never confidential details. Those stay out of the repo.
//
// kind: "new" fills an empty section, "changed" replaces existing copy,
// "check" flags existing copy to verify (left unchanged).
// Accept, rewrite or reject a point, then delete its entry here. An empty
// list switches the overlay off.

export type ReviewKind = 'new' | 'changed' | 'check';
export interface ReviewItem {
  page: string; // site path, without base path or trailing slash
  target: string; // CSS selector(s); empty for a page-level note
  kind: ReviewKind;
  title: string;
  note: string;
}

export const review: ReviewItem[] = [
  // ------------------------------------------------------------------ every page
  { page: '/', target: '.nav_links', kind: 'changed', title: 'Navigation (every page)', note: 'Services, Work, Open source, Networks, About, and the call button. The blog link moved to the footer until there are more articles. On phones, a “Book a call” button sits next to Menu.' },
  { page: '/', target: '', kind: 'changed', title: 'Search titles and share images (every page)', note: 'Each page has a title under 60 characters, written for what people search (Stellar and Soroban development, tokenized money market fund, Scaffold Stellar...). Case studies, tools and articles share a 1200 × 630 image on LinkedIn and X.' },
  // ------------------------------------------------------------------ home
  { page: '/', target: '#work-cases > .w-dyn-list', kind: 'changed', title: 'Order of the case studies', note: 'The three with a testimonial first (Stellar Development Foundation, LI.FI, Ripple), then Société Générale-FORGE. The PwC US co-selling alliance is in the hero credentials, and stays on the Work page without a link.' },
  { page: '/', target: '[data-rv=card-footer], [data-rv=stat-os]', kind: 'new', title: '137 projects', note: '“137 projects use our open-source tools”, in the key figures under the hero, with a link to how it is counted. Also in the open-source band below.' },
  { page: '/', target: '.work_all', kind: 'new', title: 'Link to all the work', note: 'Under the selection, a link to the Work page (case studies, tools and articles).' },
  { page: '/', target: '.logos_section', kind: 'changed', title: 'Logo band', note: 'Static instead of scrolling: every logo is shown whole, and nothing on the page moves without a way to stop it.' },
  { page: '/', target: '#ways', kind: 'changed', title: 'Ways to work with us', note: 'The architecture-lead model is described with your engineers only. The floating booking button is gone: the call button in the header is on every page.' },
  // ------------------------------------------------------------------ work
  { page: '/work', target: '[data-wk="cases"]', kind: 'changed', title: 'Order and filters', note: 'Same order as the home page, then the open-source tools, then the PwC US alliance. A filter appears only when something matches it, so no choice leads to an empty list.' },
  // ------------------------------------------------------------------ case studies
  { page: '/case-studies/lifi', target: '[data-cs=quote]', kind: 'changed', title: 'Testimonial first', note: 'The quote now opens the page, in place of the header image (that image stays the share image). Same on the Stellar Development Foundation and Ripple pages.' },
  { page: '/case-studies/lifi', target: '.cs_facts', kind: 'new', title: 'Network link', note: 'The network in the facts links to its page, on every case study and tool page.' },
  { page: '/case-studies/societe-generale-forge', target: '.cs_intro, #solution, #architecture', kind: 'changed', title: 'Compliance on built-in controls', note: 'The page describes EURCV with compliance on Stellar’s built-in issuer controls, the launch governance contracts as the first stage. Same in the “Why Stellar” article.' },
  // ------------------------------------------------------------------ networks, open source
  { page: '/networks/stellar', target: '.nx_heroleft, [data-nx=funding-sec]', kind: 'changed', title: 'Heading and funding', note: 'The heading speaks to issuers and to protocols. Funding is no longer in the introduction; the funding section starts with your own budget.' },
  { page: '/open-source/stellar-registry', target: '[data-tl=metrics]', kind: 'changed', title: 'Headline figure', note: 'Cards and the Work list now show the mainnet calls (166,833), which come from other teams’ contracts. The names count stays on this page, with its definition.' },
  // ------------------------------------------------------------------ contact, faq, about, legal
  { page: '/contact', target: '.calendar_widget', kind: 'changed', title: 'Scheduler', note: 'The scheduler now fills its box (it showed a 150 px strip) and takes the full width on tablets and phones. Calendly shows its own cookie notice.' },
  { page: '/contact', target: '#email-form', kind: 'check', title: 'Contact form', note: 'No form service is connected yet, so the button opens the visitor’s email app and says so. Create a Formspree form for hello@theaha.co and paste its address in src/data/site.ts (formEndpoint): the form then sends directly.' },
  { page: '/faq', target: '[data-rv=faq-audits]', kind: 'new', title: 'New question: audits', note: 'Who audited what, as each case study and tool page already says (Hacken, Halborn, Veridise, Runtime Verification).' },
  { page: '/about', target: '[data-ab=team]', kind: 'check', title: 'Team pages', note: 'Confirm each person is happy with their page and credits. Three photos are small (Elizabeth, Pamphile, Zach): send larger ones if you have them.' },
  { page: '/privacy', target: '[data-rv=privacy-third]', kind: 'changed', title: 'Scheduler and form', note: 'Says that the Contact page loads Calendly when it opens. Formspree is named once the form uses it.' },
  // ------------------------------------------------------------------ articles
  { page: '/blog/why-stellar-is-the-right-chain-for-tokenization', target: '.art_lede, .art_byline', kind: 'check', title: 'Date: November 9', note: 'Scheduled for Monday November 9. Check the market figures that day.' },
  { page: '/blog/defi-on-xrpl-compliance-liquidity-and-the-road-ahead', target: '.art_lede, .art_byline', kind: 'check', title: 'Date: November 13', note: 'Scheduled for Friday November 13. Refresh the XRPL figures (checked October 8) before then.' },
];
