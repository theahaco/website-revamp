// The visual on top of each tile of the home page's "Selected work"
// (src/components/HomeWork.astro, drawn by src/components/home/WorkVisual.astro).
// Each case gets a different kind of visual, so the four tiles do not look
// alike: an onchain record, a list of routes, a path, a flow. None carries the
// client's logo: the tile names the client once, in its byline.
//
// Truth rule, as in src/lib/caseVisuals.ts: every word restates the case file
// (src/content/case-studies/<id>.md), except EURCV's issuer flags, read on
// Stellar mainnet (Horizon, the asset record of EURCV, November 6, 2026).

/** Same shape as FlowStep in src/components/vx/Flow.astro. */
export interface FlowStep {
  kind: 'anchor' | 'check';
  title: string;
  sub?: string;
  net?: 'stellar' | 'xrpl' | 'canton' | 'ethereum';
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
};
