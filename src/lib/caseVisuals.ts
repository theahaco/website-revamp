// The one visual of each case study page (/case-studies/<id>), drawn with the
// vx/ kit (src/components/vx) by src/components/cases/CaseVisual.astro and shown
// in the page header, beside the title.
//
// Truth rule: every title, sub-line and float below restates something written
// in the case file, src/content/case-studies/<id>.md. The comment above each
// step gives the line numbers it comes from, so the content team can check it.
// If you edit a case file, check its visual here too (line numbers move when
// lines are added above them).
// - No sample amounts, no figure the case file does not state, no new dates.
// - Anonymous (NDA) cases: generic steps, no logo, no client name, nothing
//   about the client that the case file does not already say.
// - PwC US is a co-selling alliance, not an engagement: it has no visual (its
//   page keeps its header image).
// Keep check titles short (about 32 characters) so they hold on one line on a
// laptop; a sub-line takes the detail. Steps read top to bottom in the order
// things happened. Status: a live system ends on a "Live" pill; a system not
// live yet says where it stands in a float ("In build", "In design"), never
// with the pill, whose green dot means live.
//
// Panel tint by audience, as on the home page rows: financial institutions
// blue, protocols green, ecosystems pink.

export type Tone = 'blue' | 'green' | 'pink' | 'tan';
export type Panel = 'paper' | 'blue' | 'pink' | 'tan' | 'green';

/** Same shape as FlowStep in src/components/vx/Flow.astro. */
export interface CaseStep {
  kind: 'anchor' | 'check';
  title: string;
  sub?: string;
  icon?: string;
  logo?: { src: string; w: number; h: number };
  net?: 'stellar' | 'xrpl' | 'canton' | 'ethereum';
  tone?: Tone;
  status?: string;
}

export type CaseVisual =
  | {
      kind: 'flow';
      /** What the flow shows, for screen readers. */
      label: string;
      panel: Panel;
      steps: CaseStep[];
      floats?: { text: string; icon?: string; at: 'top' | 'bottom' }[];
      /** Shown under the panel; when empty, the case file's hero caption is used. */
      caption?: string;
    }
  | {
      kind: 'phones';
      panel: Panel;
      /** Tool phones (public/images/tools/<name>-phone-*.webp); the center one is in front. */
      left: string;
      center: string;
      right: string;
      caption: string;
    };

const LOGOS = '/images/logos';

export const caseVisuals: Record<string, CaseVisual> = {
  // stellar-development-foundation.md: three of the tools named in the case,
  // shown by real captures of their own sites (public/images/tools/README.md).
  'stellar-development-foundation': {
    kind: 'phones',
    panel: 'pink',
    // Nido: line 60. Stellar Scaffold: line 58 (in front: 111 of the 137
    // projects counted on November 2, 2026 build on it, line 65). Stellar
    // Registry: line 59.
    left: 'nido',
    center: 'scaffold-stellar',
    right: 'stellar-registry',
    // Names: lines 6 and 58-60 ("tooling the Stellar ecosystem runs on")
    caption: 'Nido, Stellar Scaffold and Stellar Registry, on their own sites: three of the tools we build and maintain.',
  },

  // lifi.md
  lifi: {
    kind: 'flow',
    label: 'LI.FI on Stellar: the Soroban contract layer we designed, built and delivered into production',
    panel: 'green',
    steps: [
      // line 6: "LI.FI's routing was built for EVM chains"
      { kind: 'anchor', logo: { src: `${LOGOS}/logo-light-lifi.svg`, w: 44, h: 16 }, tone: 'green', title: 'LI.FI', sub: 'Routing built for EVM chains' },
      // line 58; metric lines 42-44 ("Native: Soroban contracts, not ported from EVM")
      { kind: 'check', title: 'Soroban contracts for Stellar', sub: 'Written for it, not ported from EVM' },
      // line 59: "Routes executed under the user's signed authorization or a token allowance"
      { kind: 'check', title: 'Routes authorized by the user', sub: 'Signed, or through a token allowance' },
      // line 60: "Tokens, native XLM included, addressed through their Stellar Asset Contracts"
      { kind: 'check', title: 'Stellar Asset Contracts', sub: 'For tokens, native XLM included' },
      // lines 33-34 (metric: "Audited, by Halborn, before production"), 52 and 61
      { kind: 'check', title: 'Audited by Halborn', sub: 'Before production' },
      // title: line 64 ("LI.FI is live on Stellar"); sub: line 52 ("delivered it into
      // production"); status: lines 18-21 (Status: Live)
      { kind: 'anchor', net: 'stellar', title: 'LI.FI on Stellar', sub: 'Delivered into production', status: 'Live' },
    ],
  },

  // ripple.md
  ripple: {
    kind: 'flow',
    label: 'Ripple’s accelerator cohorts and hackathons: how our architects take teams from prototype to go live',
    panel: 'pink',
    steps: [
      // line 6 ("Ripple's accelerator cohorts and hackathons"), line 44 ("Teams
      // arrive with a prototype and a deadline")
      { kind: 'anchor', logo: { src: `${LOGOS}/logo-light-ripple.svg`, w: 44, h: 11 }, tone: 'pink', title: 'Teams in Ripple’s programs', sub: 'A prototype and a deadline' },
      // line 51: "Architecture reviews of each team's design, against the ledger's built-in functions"
      { kind: 'check', title: 'Architecture reviews', sub: 'Against the ledger’s built-in functions' },
      // line 52: "Token and issuer design: trust line tokens or MPTs, ..."
      { kind: 'check', title: 'Token and issuer design', sub: 'Trust line tokens or MPTs' },
      // line 54: "Hands-on help on the last steps before go live"
      { kind: 'check', title: 'Hands-on help', sub: 'On the last steps before go live' },
      // lines 35-36 (metric) and 58: "In one 2026 cohort, two of the teams we
      // mentored went live on mainnet or were ready to go live"
      { kind: 'anchor', net: 'xrpl', title: 'Go live on XRPL mainnet', sub: 'One 2026 cohort: two teams live or ready' },
    ],
  },

  // societe-generale-forge.md
  'societe-generale-forge': {
    kind: 'flow',
    label: 'EURCV on Stellar: compliance controls agreed first, launch governance on Soroban audited by Hacken, live on mainnet since Q1 2026 with compliance on Stellar’s built-in controls',
    panel: 'blue',
    steps: [
      // line 6 ("EURCV, Société Générale-FORGE's regulated euro stablecoin"); the
      // short name SG-FORGE: lines 48 and 60
      { kind: 'anchor', logo: { src: `${LOGOS}/logo-light-sgforge.svg`, w: 44, h: 13 }, tone: 'tan', title: 'EURCV', sub: 'Regulated euro stablecoin of SG-FORGE' },
      // line 48: "Compliance controls were agreed with the SG-FORGE compliance team
      // before the first line of contract code"
      { kind: 'check', title: 'Compliance controls agreed first', sub: 'Before the first line of contract code' },
      // lines 48 and 56: launch governance on Soroban, issuer, compliance and
      // pause roles
      { kind: 'check', title: 'Launch governance on Soroban', sub: 'Issuer, compliance and pause roles' },
      // lines 38-39 (metric: "Audited, by Hacken, before mainnet"), 48 and 56
      { kind: 'check', title: 'Audited by Hacken', sub: 'Before mainnet' },
      // title: line 6 and lines 35-36 (metric: "On Stellar mainnet since Q1 2026");
      // sub: lines 50, 55 and 60 (compliance moved to, and now runs on,
      // Stellar's built-in issuer controls); status: lines 18-19
      { kind: 'anchor', net: 'stellar', title: 'Mainnet since Q1 2026', sub: 'Compliance on built-in controls', status: 'Live' },
    ],
    // Caption: the case file's hero caption (line 30).
  },

  // nda-settlement-stablecoin.md (anonymous: no logo, no name)
  'nda-settlement-stablecoin': {
    kind: 'flow',
    label: 'The settlement stablecoin: minting and redemption from the bank’s systems, with the bank’s own controls and custody',
    panel: 'blue',
    steps: [
      // lines 45 and 52: "Minting and redemption tied to the bank's systems"
      { kind: 'anchor', icon: 'bank', tone: 'tan', title: 'The bank’s systems', sub: 'Minting and redemption' },
      // line 55: "Controls designed to the bank's compliance and custody requirements"
      { kind: 'check', title: 'Compliance and custody controls', sub: 'Designed to the bank’s requirements' },
      // line 53: "Freeze and clawback held by the bank"
      { kind: 'check', title: 'Freeze and clawback', sub: 'Held by the bank' },
      // line 54: "Keys in the bank's own custody setup"
      { kind: 'check', title: 'Keys in the bank’s own custody' },
      // title: lines 2 and 45; sub: line 58 ("issued and operated by the bank");
      // status: lines 18-21 (Status: Live)
      { kind: 'anchor', net: 'stellar', title: 'Settlement stablecoin', sub: 'Issued and operated by the bank', status: 'Live' },
    ],
  },

  // nda-money-market-fund.md (anonymous: no logo, no name)
  'nda-money-market-fund': {
    kind: 'flow',
    label: 'The tokenized share class, by design: subscriptions and redemptions netted at the published NAV, delivery versus payment in one step',
    panel: 'blue',
    steps: [
      // lines 39-40 (metric: "Onchain: subscriptions and redemptions, by design")
      { kind: 'anchor', icon: 'arrows-left-right', tone: 'tan', title: 'Subscriptions and redemptions', sub: 'Onchain, by design' },
      // line 59: "One contract nets subscriptions against redemptions at the published NAV"
      { kind: 'check', title: 'Netted at the published NAV', sub: 'In one contract' },
      // line 59: "so only the net goes to the depositary"
      { kind: 'check', title: 'Only the net goes to the depositary' },
      // line 61: "Cash leg designed for a regulated euro stablecoin on the same
      // ledger, with delivery versus payment in one step"
      { kind: 'check', title: 'Delivery versus payment in one step', sub: 'Cash leg in a regulated euro stablecoin' },
      // line 58 and lines 36-37 (metric: "1:1, tokens in circulation to units
      // on the fund register")
      { kind: 'anchor', net: 'stellar', title: 'Fund units on Stellar', sub: '1:1 with units on the fund register' },
    ],
    // line 6, lines 19-20 (Status: In build) and 42-43 (metric: 2027, launch targeted)
    floats: [{ text: 'In build · launch targeted for 2027', icon: 'calendar-blank', at: 'top' }],
    // Caption: the case file's hero caption (line 31).
  },

  // nda-real-estate-debt-fund.md (anonymous: no logo, no name)
  'nda-real-estate-debt-fund': {
    kind: 'flow',
    label: 'The real estate fund’s interests, by design: from an eligible investor authorized by the account keeper to the onchain register of record',
    panel: 'blue',
    steps: [
      // line 49 ("open only to eligible investors"), line 61 ("no wallet holds the
      // interest before the account keeper authorizes it")
      { kind: 'anchor', icon: 'identification-badge', tone: 'tan', title: 'Eligible investor', sub: 'Authorized by the account keeper' },
      // line 62: "An allowlist registry with hashed investor references and no
      // personal data onchain"
      { kind: 'check', title: 'On the allowlist', sub: 'No personal data onchain' },
      // line 55 ("compliance flags are set once and locked for the life of the
      // fund"), line 61 ("the rule set cannot be weakened later")
      { kind: 'check', title: 'Compliance flags locked', sub: 'For the life of the fund' },
      // line 64: "Subscriptions settled delivery-versus-payment in EURC or EURCV,
      // or by bank wire and then issuance"
      { kind: 'check', title: 'Subscriptions in EURC or EURCV', sub: 'Delivery versus payment, or bank wire' },
      // line 6 and lines 39-40 (metric: "the onchain register is the fund's
      // register of record")
      { kind: 'anchor', net: 'stellar', title: 'Fund interests on Stellar', sub: 'The register of record, onchain' },
    ],
    // lines 19-20 (Status: In design) and 67 ("One security audit of the full
    // suite before mainnet")
    floats: [{ text: 'In design · one audit before mainnet', icon: 'calendar-blank', at: 'top' }],
  },
};
