// The visual on top of each case study tile (src/components/WorkTile.astro,
// drawn by src/components/home/WorkVisual.astro): the home page's "Selected
// work" and the Work page. The four home tiles each get a different kind of
// visual, so they do not look alike: an onchain record, a list of routes, a
// path, a flow. The other cases get the "flow" kind: the case page's flow cut
// to tile size (no opening card, two checks, the closing card). None carries
// the client's logo: the tile names the client once, in its byline. A client
// not named gets generic steps only, nothing the case file does not say.
// The Stellar Development Foundation has no entry: its tile shows the case
// page's phones (src/lib/caseVisuals.ts, kind "phones").
//
// Truth rule, as in src/lib/caseVisuals.ts: every word restates the case file
// (src/content/case-studies/<id>.md), except EURCV's issuer flags, read on
// Stellar mainnet (Horizon, the asset record of EURCV, November 6, 2026).

/** Same shape as FlowStep in src/components/vx/Flow.astro (no logo: tiles carry none). */
export interface FlowStep {
  kind: 'anchor' | 'check';
  title: string;
  sub?: string;
  /** Anchor tile: an icon from src/icons, or a network's symbol. */
  icon?: string;
  net?: 'stellar' | 'xrpl' | 'canton' | 'ethereum';
  tone?: 'blue' | 'green' | 'pink' | 'tan';
  /** A green status pill on the anchor card: live systems only. */
  status?: string;
}

export type Panel = 'blue' | 'green' | 'pink' | 'tan';

export type WorkVisual =
  | {
      /** An onchain record: an asset and its flags, as read on a date. */
      kind: 'asset';
      panel: Panel;
      label: string;
      net: 'stellar' | 'xrpl';
      title: string;
      sub: string;
      status?: string;
      heading: string;
      flags: { title: string; sub: string }[];
      account: string;
      read: string;
    }
  | {
      /** Routes a product offers on a network, each with its direction. */
      kind: 'routes';
      panel: Panel;
      label: string;
      net: 'stellar' | 'xrpl';
      title: string;
      sub: string;
      status?: string;
      routes: { dir: 'In' | 'Out' | 'Swap'; what: string; via?: string }[];
    }
  | {
      /** A path in a few steps, drawn across; the last one is the outcome. */
      kind: 'path';
      panel: Panel;
      label: string;
      heading: string;
      steps: { title: string; sub?: string }[];
      end: { net: 'stellar' | 'xrpl'; title: string; sub?: string };
      note?: string;
    }
  | {
      /** The case page's flow, without its opening card (the client's). */
      kind: 'flow';
      panel: Panel;
      label: string;
      steps: FlowStep[];
      planned?: boolean;
    };

export const workVisuals: Record<string, WorkVisual> = {
  // societe-generale-forge.md: line 6 ("regulated euro stablecoin"), lines
  // 18-19 (Status: Live since Q1 2026), line 55 ("Compliance on the protocol's
  // issuer controls: a flagged address is frozen"). The two flags are EURCV's
  // own: auth_revocable and auth_clawback_enabled, true on Horizon on
  // November 6, 2026. auth_required is left off the card on purpose (decision
  // of November 6, 2026): do not add it back. The card gives no read date.
  'societe-generale-forge': {
    kind: 'asset',
    panel: 'blue',
    label: 'EURCV on Stellar mainnet: a native Stellar asset issued by SG-FORGE, with two issuer flags set: authorization revocable, so a flagged address is frozen, and clawback enabled',
    net: 'stellar',
    title: 'EURCV',
    sub: 'Native Stellar asset, issued by SG‑FORGE',
    status: 'Live',
    heading: 'Issuer flags',
    flags: [
      { title: 'Authorization revocable', sub: 'A flagged address is frozen' },
      { title: 'Clawback enabled', sub: 'The issuer can claw back' },
    ],
    account: 'GCEYG…AXW3G',
    read: 'Issuer account, Stellar mainnet',
  },

  // lifi.md, line 64 (Outcome): "According to LI.FI's documentation, users can
  // swap on Stellar through Soroswap, bring USDC in from EVM chains through
  // Circle's CCTP, bring XLM and USDC in through NEAR Intents, and send USDC
  // out to ten EVM chains." Status: lines 18-21 (Live).
  lifi: {
    kind: 'routes',
    panel: 'green',
    label: 'LI.FI on Stellar, live: USDC in from EVM chains through Circle CCTP, XLM and USDC in through NEAR Intents, swaps on Stellar through Soroswap, USDC out to ten EVM chains',
    net: 'stellar',
    title: 'Routes on Stellar',
    sub: 'As in LI.FI’s documentation',
    status: 'Live',
    routes: [
      { dir: 'In', what: 'USDC from EVM chains', via: 'Circle CCTP' },
      { dir: 'In', what: 'XLM and USDC', via: 'NEAR Intents' },
      { dir: 'Swap', what: 'Swaps on Stellar', via: 'Soroswap' },
      { dir: 'Out', what: 'USDC to ten EVM chains' },
    ],
  },

  // talwex.md: lines 35-37 and 47 (Soroban smart contracts, developed by us,
  // in Rust), lines 32-34 and 50 (Stellar Community Fund, round 43, Build),
  // lines 18-19 (Status: In build). Not live yet: hollow checks, no pill.
  talwex: {
    kind: 'flow',
    panel: 'green',
    label: 'Talwex on Stellar: the Soroban smart contracts of its institutional bond yield pool, developed by us, a project awarded by the Stellar Community Fund, in build',
    steps: [
      { kind: 'check', title: 'Soroban smart contracts', sub: 'Developed by us, in Rust' },
      { kind: 'check', title: 'Stellar Community Fund', sub: 'Awarded, round 43 (Build)' },
      { kind: 'anchor', net: 'stellar', title: 'Talwex on Stellar', sub: 'Smart contracts in build' },
    ],
    planned: true,
  },

  // ripple.md: line 44 ("Teams arrive with a prototype and a deadline"),
  // line 51 ("Architecture reviews of each team's design"), line 52 (token and issuer design: trust
  // line tokens or MPTs), lines 35-36 and 58 ("In one 2026 cohort, two of the
  // teams we mentored went live on mainnet or were ready to go live").
  ripple: {
    kind: 'path',
    panel: 'pink',
    label: 'Teams in Ripple’s programs, from a prototype to go live on XRPL mainnet: architecture reviews, then token and issuer design; in one 2026 cohort, two teams went live or were ready',
    heading: 'Teams in Ripple’s programs',
    steps: [
      { title: 'Prototype', sub: 'And a deadline' },
      { title: 'Architecture reviews', sub: 'Of each team’s design' },
      { title: 'Token and issuer design', sub: 'Trust line tokens or MPTs' },
    ],
    end: { net: 'xrpl', title: 'Go live', sub: 'XRPL mainnet' },
    note: 'One 2026 cohort: two teams live or ready',
  },

  // The Work page's other tiles: each case page's flow (caseVisuals.ts) cut to
  // tile size, as for Talwex above. Systems not live yet keep `planned: true`
  // (hollow checks) and say where they stand in the closing line, never with
  // the pill.

  // nda-settlement-stablecoin.md (client not named: generic steps only):
  // line 53 ("Freeze and clawback held by the bank"), line 54 ("Keys in the
  // bank's own custody setup"); closing card: title, lines 2 and 45; sub,
  // line 58 ("issued and operated by the bank"); status, lines 18-21 (Live).
  'nda-settlement-stablecoin': {
    kind: 'flow',
    panel: 'blue',
    label: 'The settlement stablecoin, live on Stellar: freeze and clawback held by the bank, keys in the bank’s own custody, issued and operated by the bank',
    steps: [
      { kind: 'check', title: 'Freeze and clawback', sub: 'Held by the bank' },
      { kind: 'check', title: 'Keys in the bank’s own custody' },
      { kind: 'anchor', net: 'stellar', title: 'Settlement stablecoin', sub: 'Issued and operated by the bank', status: 'Live' },
    ],
  },

  // starknet.md (a DevX audit, delivered: solid checks, no pill): line 50 (the
  // core onboarding journey, the experience as a whole), line 51 (the command
  // line, small and large suggestions); closing card: line 57 and lines 38-40
  // (metric, receipt: pull request #1480). No logo: the byline names Starknet.
  starknet: {
    kind: 'flow',
    panel: 'pink',
    label: 'Our DevX audit of Starknet’s developer onboarding: the core onboarding journey and the command line reviewed, then Starknet restructured its quickstart',
    steps: [
      { kind: 'check', title: 'Core onboarding journey', sub: 'Analyzed as a whole' },
      { kind: 'check', title: 'Starknet command line', sub: 'Small and large suggestions' },
      { kind: 'anchor', icon: 'file-text', tone: 'green', title: 'Quickstart restructured', sub: 'Shortly after our feedback' },
    ],
  },

  // nda-money-market-fund.md (client not named; in build): line 59 ("One
  // contract nets subscriptions against redemptions at the published NAV"),
  // line 61 (cash leg in a regulated euro stablecoin, delivery versus payment
  // in one step); closing card: title, line 58; sub, line 6 ("In build; launch
  // targeted for 2027"), lines 18-20 (Status: In build) and 42-43 (metric).
  'nda-money-market-fund': {
    kind: 'flow',
    panel: 'blue',
    label: 'The tokenized share class, by design: subscriptions and redemptions netted at the published NAV, delivery versus payment in one step, fund units on Stellar, in build, launch targeted for 2027',
    steps: [
      { kind: 'check', title: 'Netted at the published NAV', sub: 'In one contract' },
      { kind: 'check', title: 'Delivery versus payment in one step', sub: 'Cash leg in a regulated euro stablecoin' },
      { kind: 'anchor', net: 'stellar', title: 'Fund units on Stellar', sub: 'In build · launch targeted for 2027' },
    ],
    planned: true,
  },

  // nda-real-estate-debt-fund.md (client not named; in design): line 62 (an
  // allowlist with no personal data onchain), lines 55 and 61 (compliance flags
  // set once and locked for the life of the fund); closing card: title, lines
  // 2 and 6; sub, lines 18-20 (Status: In design) and 67 ("One security audit
  // of the full suite before mainnet").
  'nda-real-estate-debt-fund': {
    kind: 'flow',
    panel: 'blue',
    label: 'The real estate fund’s interests, by design: an allowlist with no personal data onchain, compliance flags locked for the life of the fund, fund interests on Stellar, in design',
    steps: [
      { kind: 'check', title: 'On the allowlist', sub: 'No personal data onchain' },
      { kind: 'check', title: 'Compliance flags locked', sub: 'For the life of the fund' },
      { kind: 'anchor', net: 'stellar', title: 'Fund interests on Stellar', sub: 'In design · one audit before mainnet' },
    ],
    planned: true,
  },
};
