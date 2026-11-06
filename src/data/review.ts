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
  { page: '/', target: '#work-cases > .w-dyn-list', kind: 'changed', title: 'Order of the case studies', note: 'Société Générale-FORGE first, for the banks reading the page, then LI.FI, the Stellar Development Foundation and Ripple, each row with its client’s logo (the testimonials are in the section under the hero). Same order on the Work page. The PwC US co-selling alliance is in the hero credentials, and stays on the Work page without a link.' },
  { page: '/', target: '.hp_tot', kind: 'changed', title: 'Key figures', note: 'The totals of the “Live on mainnet” card, at every width: 20+ deployments on mainnet and 6 third-party security audits (Hacken, Halborn, Veridise, Runtime Verification, and two by Arda). The band of figures under the hero is gone, and so are the auditor logos. Still to add: the source and date of the 20+.' },
  { page: '/', target: '[data-rv=stat-os]', kind: 'changed', title: '137 projects', note: '“137 projects using our open-source tools”, as the figure of the open-source band. How it is counted stays on the open-source page.' },
  { page: '/', target: '.hero_call, .hero_pwc', kind: 'changed', title: 'Under the buttons', note: 'What the first call is, as the FAQ answers it, then the PwC US co-selling alliance in the words of its page. The network roles left the hero: they are in the Networks section and About.' },
  { page: '/', target: '.work_all', kind: 'new', title: 'Link to all the work', note: 'Under the selection, a link to the Work page (case studies, tools and articles).' },
  { page: '/', target: '.vc', kind: 'changed', title: 'Clients and partners', note: 'Under the hero, our clients’ words instead of a band of figures: the quotes of the Stellar Development Foundation, LI.FI and Ripple case studies, one at a time. Tomer Weller’s shows first; picking another author under it shows theirs, and nothing changes on its own. Then the six client tiles; four open their case study. The rows of Selected work show logos, not quotes.' },
  { page: '/', target: '#ways', kind: 'changed', title: 'Ways to work with us', note: 'The team photo is the section’s visual; the four models sit under it, without the small diagrams. The architecture-lead model is described with your engineers only. The floating booking button is gone: the call button in the header is on every page.' },
  { page: '/', target: '#what-we-do', kind: 'changed', title: 'What we do: one row per audience', note: 'Right after the clients and partners, before Selected work. Each row lists its services and precedents, with one visual drawn as product UI: the settlement stablecoin of the top US commercial bank (under NDA) and LI.FI on Stellar, step by step from their case studies, and a recorded Stellar CLI session (version 30.0.1) with our two plugins. Check the wording of each step.' },
  // ------------------------------------------------------------------ work
  { page: '/work', target: '.work_list', kind: 'changed', title: 'Rows without images', note: 'Numbered rows with their text only, like the home page’s Selected work.' },
  { page: '/work', target: '[data-wk="cases"]', kind: 'changed', title: 'Order and filters', note: 'Same order as the home page, then the open-source tools, then the PwC US alliance. A filter appears only when something matches it, so no choice leads to an empty list.' },
  // ------------------------------------------------------------------ case studies
  { page: '/case-studies/nda-settlement-stablecoin', target: '[data-cs=visual]', kind: 'new', title: 'Header visual (client under NDA)', note: 'Beside the title, the settlement stablecoin step by step. Each step restates a line of the case file: no name, no logo, nothing the page does not already say. The home page draws the same engagement in its institutions row.' },
  { page: '/case-studies/nda-money-market-fund', target: '[data-cs=visual]', kind: 'new', title: 'Header visual (client under NDA)', note: 'The share class as designed, step by step from the case file. It is in build: the checks are drawn hollow and a tag gives its status, so nothing reads as live.' },
  { page: '/case-studies/nda-real-estate-debt-fund', target: '[data-cs=visual]', kind: 'new', title: 'Header visual (client under NDA)', note: 'The fund’s interests as designed, step by step from the case file. It is in design: hollow checks and a status tag, as on the money market fund page.' },
  { page: '/case-studies/societe-generale-forge', target: '[data-cs=visual]', kind: 'new', title: 'Header visual', note: 'Beside the title, the engagement step by step, each step from a line of the case file: controls agreed first, launch governance audited by Hacken, live since Q1 2026, compliance now on Stellar’s built-in controls. Same kind of visual on the LI.FI and Ripple pages; the Stellar Development Foundation page shows three of our tools on their own sites.' },
  { page: '/case-studies/lifi', target: '[data-cs=quote]', kind: 'changed', title: 'Testimonial first', note: 'The quote now opens the page, right under the header and its visual; the old header image stays the share image. Same on the Stellar Development Foundation and Ripple pages.' },
  { page: '/case-studies/lifi', target: '.cs_facts', kind: 'new', title: 'Network link', note: 'The network in the facts links to its page, on every case study and tool page.' },
  { page: '/case-studies/societe-generale-forge', target: '.cs_intro, #solution, #architecture', kind: 'changed', title: 'Compliance on built-in controls', note: 'The page describes EURCV with compliance on Stellar’s built-in issuer controls, the launch governance contracts as the first stage. Same in the “Why Stellar” article.' },
  // ------------------------------------------------------------------ networks, open source
  { page: '/services', target: '.pc_fig', kind: 'new', title: 'Figures on the live precedents', note: '€20M+ issued for EURCV and 5 months to handover for the bank, as on the home page and in their case studies.' },
  { page: '/services', target: '.sv-visual', kind: 'new', title: 'One visual per audience', note: 'Institutions: EURCV’s controls at launch and now, from its case study. Protocols: the integration surface, with the labels of the offer. Ecosystems: three of our tools on their own sites, under the 137 figure (how it is counted stays on the open-source page).' },
  { page: '/networks/stellar', target: '.nxi_visual', kind: 'new', title: 'A recorded session', note: 'A real Stellar CLI session next to what the integration involves, copied from the recording (skipped lines are marked “…”).' },
  { page: '/networks/xrpl', target: '.nxp_visual', kind: 'new', title: 'Ripple’s programs, step by step', note: 'Next to the precedent, the programs as a flow, with only the facts of the Ripple case study.' },
  { page: '/open-source/stellar-cli', target: '[data-tl=visual]', kind: 'new', title: 'A recorded session', note: 'A real session on Stellar CLI 30.0.1, recorded on November 5, 2026, copied line for line (skipped lines and commands are marked “…”). Same on the Scaffold and Registry pages, with their own sessions.' },
  { page: '/open-source/moonlight', target: '[data-tl=visual]', kind: 'check', title: 'Moonlight’s site on a phone', note: 'The capture shows moonlightprotocol.io as it is: its hero says “Transactions are confidential on-chain”, while this page says amounts stay visible. Align the site’s text with “private, not anonymous”, then we recapture it.' },
  { page: '/networks/stellar', target: '.nx_heroleft, [data-nx=funding-sec]', kind: 'changed', title: 'Heading and funding', note: 'The heading speaks to issuers and to protocols. Funding is no longer in the introduction; the funding section starts with your own budget.' },
  { page: '/open-source/stellar-registry', target: '[data-tl=metrics]', kind: 'changed', title: 'Headline figure', note: 'Cards and the Work list now show the mainnet calls (166,833), which come from other teams’ contracts. The names count stays on this page, with its definition.' },
  // ------------------------------------------------------------------ contact, faq, about, legal
  { page: '/contact', target: '.calendar_widget', kind: 'changed', title: 'Scheduler', note: 'The scheduler now fills its box (it showed a 150 px strip) and takes the full width on tablets and phones. Calendly shows its own cookie notice.' },
  { page: '/contact', target: '#email-form', kind: 'check', title: 'Contact form', note: 'No form service is connected yet, so the button opens the visitor’s email app and says so. Create a Formspree form for hello@theaha.co and paste its address in src/data/site.ts (formEndpoint): the form then sends directly.' },
  { page: '/faq', target: '[data-rv=faq-audits]', kind: 'new', title: 'New question: audits', note: 'Who audited what, as each case study and tool page already says (Hacken, Halborn, Veridise, Runtime Verification).' },
  { page: '/about', target: '.abr_visual', kind: 'new', title: 'Roles we hold: a recorded session', note: 'The official Stellar CLI, with the two plugins we maintain running as stellar subcommands, recorded on November 5, 2026.' },
  { page: '/about', target: '[data-ab=team]', kind: 'check', title: 'Team pages', note: 'Confirm each person is happy with their page and credits. Three photos are small (Elizabeth, Pamphile, Zach): send larger ones if you have them.' },
  { page: '/privacy', target: '[data-rv=privacy-third]', kind: 'changed', title: 'Scheduler and form', note: 'Says that the Contact page loads Calendly when it opens. Formspree is named once the form uses it.' },
  // ------------------------------------------------------------------ articles
  { page: '/blog/why-stellar-is-the-right-chain-for-tokenization', target: '.art_lede, .art_byline', kind: 'check', title: 'Date: November 9', note: 'Scheduled for Monday November 9. Check the market figures that day.' },
  { page: '/blog/defi-on-xrpl-compliance-liquidity-and-the-road-ahead', target: '.art_lede, .art_byline', kind: 'check', title: 'Date: November 13', note: 'Scheduled for Friday November 13. Refresh the XRPL figures (checked October 8) before then.' },
];
