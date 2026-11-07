// Standards and other contributions listed on /open-source, below the tools
// (each tool has its own page in src/content/tools), one row each in the
// registry card (src/components/vx/Registry.astro). Figures carry their
// as-of date; keep them in step with the tool pages, the Stellar Development
// Foundation case study and the network pages.
// `href` is the public proof (the standard, the code or the package); leave
// it out when there is none to point to, and the row has no link.

export interface Contribution {
  /** A Stellar Ecosystem Proposal's number ("53"): the row's tile reads SEP over it. */
  sep?: string;
  /** Otherwise the row's icon (a file name in src/icons). */
  icon?: string;
  name: string;
  network: 'Stellar' | 'XRPL';
  /** The status pill: "Final", "Draft", "Shipped"... */
  status: string;
  /** The pill's tone: done (final, shipped or in use), draft, plain (contributor, since) or demo (testnet demo). */
  tone: 'done' | 'draft' | 'plain' | 'demo';
  /** The date of that status, shown after the network: "June 2026", "Merged October 2026". */
  date?: string;
  /** One line on what it is, without the credit (the faces carry it). Code names go between backticks. */
  what: string;
  /** Who did it, as team ids (src/content/team): their faces, in this order. */
  by?: string[];
  /** The credit in words, for the faces' tooltip and screen readers. */
  credit?: string;
  href?: string;
  /** Where the proof lives, shown at the end of the row: "GitHub", "crates.io". */
  linkLabel?: string;
}

export interface ContributionGroup {
  title: string;
  items: Contribution[];
}

export const contributions: ContributionGroup[] = [
  {
    title: 'Standards',
    items: [
      { sep: '53', name: 'Sign and Verify Messages', network: 'Stellar', status: 'Final', tone: 'done', date: 'June 2026', href: 'https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0053.md', linkLabel: 'GitHub', what: 'Signing and verifying offchain messages with Stellar keys.', by: ['pamphile-roy'], credit: 'Co-authored by Pamphile Roy' },
      { sep: '61', name: 'Trustline Onboarder', network: 'Stellar', status: 'Draft', tone: 'draft', date: 'Merged October 2026', href: 'https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0061.md', linkLabel: 'GitHub', what: 'Onboarding users to regulated assets, including assets that need issuer authorization.', by: ['willem-wyndham', 'enzo-soyer', 'pamphile-roy', 'hugo-heer'], credit: 'By Willem Wyndham, Enzo Soyer, Pamphile Roy and Hugo Heer' },
      { sep: '52', name: 'Key Sharing Method', network: 'Stellar', status: 'Draft', tone: 'draft', href: 'https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0052.md', linkLabel: 'GitHub', what: 'A method for sharing Stellar keys.', by: ['pamphile-roy'], credit: 'Co-authored by Pamphile Roy' },
      { icon: 'arrows-clockwise', name: 'Contract admin and upgrades', network: 'Stellar', status: 'Draft', tone: 'draft', what: 'A common admin and upgrade interface for Soroban contracts, drafted with a Stellar Development Foundation engineer.', by: ['willem-wyndham', 'pamela-selle'], credit: 'Drafted by Willem Wyndham and Pamela Selle with a Stellar Development Foundation engineer' },
    ],
  },
  {
    title: 'In SDKs, wallets and libraries',
    items: [
      { icon: 'code', name: 'JavaScript SDK contract client', network: 'Stellar', status: 'In the official SDK', tone: 'done', href: 'https://github.com/stellar/js-stellar-sdk/tree/master/src/contract', linkLabel: 'GitHub', what: '`contract.Client` and `AssembledTransaction` in Stellar’s JavaScript SDK.', by: ['chad-ostrowski'], credit: 'Written by Chad Ostrowski' },
      { icon: 'cube', name: 'Rust crates', network: 'Stellar', status: 'Used by the Stellar CLI', tone: 'done', href: 'https://crates.io/crates/sep5', linkLabel: 'crates.io', what: '`sep5` key derivation and `stellar-ledger` signing (225k and 87k downloads, November 2026), and a Stellar RPC client.', by: ['willem-wyndham', 'elizabeth-engelman'], credit: 'By Willem Wyndham and Elizabeth Engelman' },
      { icon: 'wallet', name: 'Trezor Stellar package', network: 'Stellar', status: 'Shipped', tone: 'done', date: 'September 2026', href: 'https://github.com/trezor/trezor-suite/pull/31616', linkLabel: 'GitHub', what: 'Trezor’s Stellar package upgraded to Stellar SDK v17.', by: ['pamela-selle'], credit: 'Upgraded by Pamela Selle' },
      { icon: 'wrench', name: 'XRPL Rust library', network: 'XRPL', status: 'Contributor', tone: 'plain', what: 'Fixes contributed upstream.', by: ['willem-wyndham'], credit: 'By Willem Wyndham' },
    ],
  },
  {
    title: 'Early tools and demos',
    items: [
      { icon: 'tree-structure', name: 'Loam and SmartDeploy', network: 'Stellar', status: 'Since 2023', tone: 'plain', what: 'The tools from which Stellar Scaffold and the Stellar Registry grew. The crates of all four have 125,107 downloads in total (November 2, 2026).' },
      { icon: 'coins', name: 'Carbon Coin', network: 'XRPL', status: 'Testnet demo', tone: 'demo', date: 'September 2026', what: 'A multi-purpose token with a 2-of-3 multisig issuer, freeze and clawback.', by: ['chad-ostrowski'], credit: 'Built by Chad Ostrowski' },
    ],
  },
];
