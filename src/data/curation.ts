// Editorial choices that Webflow encoded as list filters and sort orders.
// Each list holds content slugs (file names without .md), in display order.

/** Home page, "Selected work" > Case studies. */
// Société Générale-FORGE first (a regulated issuer, for the banks reading the
// page), then LI.FI, the Stellar Development Foundation and Ripple.
export const homeFeaturedCases = ["societe-generale-forge", "lifi", "stellar-development-foundation", "ripple"];

/** Home page, the section under the hero: the case studies whose quotes it
 * shows, one at a time (the first by default), over the client tiles. The
 * rows of "Selected work" show their client's logo, not the quote. */
export const homeQuotes = ["stellar-development-foundation", "lifi", "ripple"];

/** Home page, "Client under NDA" block under the case studies. */
export const homeNdaCases = ["nda-settlement-stablecoin", "nda-money-market-fund", "nda-real-estate-debt-fund"];

/** "More work" at the bottom of a case study: two other case studies, those for
 * the same audience first, in this order. Alliances (PwC US) are never listed. */
export const moreWork = ["societe-generale-forge", "lifi", "stellar-development-foundation", "nda-settlement-stablecoin", "nda-money-market-fund", "ripple", "nda-real-estate-debt-fund"];

/** Pages whose "More work" is chosen by hand: case study slugs, or tool pages
 * written "/open-source/<tool>". Ripple's page stays on XRPL. */
export const moreWorkFor: Record<string, string[]> = {
  ripple: ["/open-source/ghostsig"],
  pwc: ["stellar-development-foundation", "lifi"],
};

/** Home page, "Selected work" > Articles: leave empty to show the three most recent
 * articles automatically (scheduled ones appear on their date). List slugs only to pin a selection. */
export const homeArticles: string[] = [];

/** Team cards on team pages ("The rest of the team") and on case studies. */
export const teamPanelOrder = ["hugo-heer", "roberson-costa-dresch", "zach-fedor", "pamphile-roy", "elizabeth-engelman", "pamela-selle", "fabricius-zatti", "willem-wyndham", "chad-ostrowski", "enzo-soyer"];

/** Engagement rows on team pages (case studies whose `team` includes the person). */
export const engagementOrder = ["nda-settlement-stablecoin", "societe-generale-forge", "lifi", "pwc", "stellar-development-foundation", "ripple", "nda-real-estate-debt-fund", "nda-money-market-fund"];

/** "Other networks" cards at the bottom of a network page. */
export const otherNetworksOrder = ["ethereum", "canton", "xrpl", "stellar"];
