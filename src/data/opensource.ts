// Standards and other contributions listed on /open-source, below the tools
// (each tool has its own page in src/content/tools). Figures carry their
// as-of date; keep them in step with the tool pages, the Stellar Development
// Foundation case study and the network pages.
// `href` is the public proof (the standard, the code or the package); leave
// it out when there is none to point to.

export interface Contribution {
  name: string;
  network: string;
  status: string;
  what: string;
  href?: string;
}

export interface ContributionGroup {
  title: string;
  items: Contribution[];
}

export const contributions: ContributionGroup[] = [
  {
    title: 'Standards',
    items: [
      { name: 'SEP-53, Sign and Verify Messages', network: 'Stellar', status: 'Final, June 2026', href: 'https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0053.md', what: 'Signing and verifying offchain messages with Stellar keys. Co-authored by Pamphile Roy.' },
      { name: 'SEP-61, Trustline Onboarder', network: 'Stellar', status: 'Draft, merged October 2026', href: 'https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0061.md', what: 'Onboarding users to regulated assets, including assets that need issuer authorization. By Willem Wyndham, Enzo Soyer, Pamphile Roy and Hugo Heer.' },
      { name: 'SEP-52, Key Sharing Method', network: 'Stellar', status: 'Draft', href: 'https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0052.md', what: 'A method for sharing Stellar keys. Co-authored by Pamphile Roy.' },
      { name: 'Contract admin and upgrades', network: 'Stellar', status: 'Draft', what: 'A common admin and upgrade interface for Soroban contracts, drafted by Willem Wyndham and Pamela Selle with a Stellar Development Foundation engineer.' },
    ],
  },
  {
    title: 'In SDKs, wallets and libraries',
    items: [
      { name: 'JavaScript SDK contract client', network: 'Stellar', status: 'In the official SDK', href: 'https://github.com/stellar/js-stellar-sdk/tree/master/src/contract', what: 'contract.Client and AssembledTransaction in Stellar’s official JavaScript SDK, written by Chad Ostrowski.' },
      { name: 'Rust crates', network: 'Stellar', status: 'Used by the Stellar CLI', href: 'https://crates.io/crates/sep5', what: 'sep5 key derivation and stellar-ledger signing (225k and 87k downloads, November 2026), and a Stellar RPC client. By Willem Wyndham and Elizabeth Engelman.' },
      { name: 'Trezor Stellar package', network: 'Stellar', status: 'Shipped, September 2026', href: 'https://github.com/trezor/trezor-suite/pull/31616', what: 'Trezor’s Stellar package upgraded to Stellar SDK v17 by Pamela Selle.' },
      { name: 'XRPL Rust library', network: 'XRPL', status: 'Contributor', what: 'Fixes contributed upstream by Willem Wyndham.' },
    ],
  },
  {
    title: 'Early tools and demos',
    items: [
      { name: 'Loam and SmartDeploy', network: 'Stellar', status: 'Since 2023', what: 'The tools we started in 2023, from which Stellar Scaffold and the Stellar Registry grew. The crates of all four have 125,107 downloads in total (November 2, 2026).' },
      { name: 'Carbon Coin', network: 'XRPL', status: 'Testnet demo, September 2026', what: 'A multi-purpose token with a 2-of-3 multisig issuer, freeze and clawback, built by Chad Ostrowski.' },
    ],
  },
];
