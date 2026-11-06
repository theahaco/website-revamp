// The six services: shown on the home page ("What we do", with their
// precedents) and on /services (with their bullets). Edit the copy here; both
// pages read it. Each `id` is the service's stable key.
//
// Precedents are real engagements only. A public client shows its logo alone
// (its name is enough); a client not named shows a lock and its anonymous
// name, never a logo; our own tools link to their pages.

/** Who the service is mainly for: sets the icon tint (blue, green, pink, tan). */
export type Audience = 'institutions' | 'protocols' | 'ecosystems' | 'any';

export type Precedent =
  /** A public client: its logo alone (drawn at w x h px). */
  | { kind: 'client'; logo: string; alt: string; w: number; h: number; href: string }
  /** A network mark (cropped to the symbol), then a few words. */
  | { kind: 'mark'; logo: string; text: string; href: string }
  /** A client under NDA: lock icon and its anonymous name, no logo. */
  | { kind: 'nda'; text: string; href: string }
  /** One of our open-source tools. */
  | { kind: 'tool'; icon: string; text: string; href: string };

export interface Service {
  id: string;
  title: string;
  desc: string;
  icon: string;
  audience: Audience;
  bullets: string[];
  precedents: Precedent[];
  /** A short status after the precedents (e.g. "in build"), when one applies. */
  note?: string;
  /** Review-overlay hook on the precedent line (data-rv). */
  rv?: string;
}

const LOGOS = '/images/logos';
const NDA_BANK = '/case-studies/nda-settlement-stablecoin';

export const services: Service[] = [
  {
    id: 'stablecoin-issuance',
    title: 'Stablecoin issuance and governance',
    desc: 'Issuance and controls a regulated issuer can operate.',
    icon: 'coins',
    audience: 'institutions',
    bullets: ['Role separation, freeze and clawback', 'Allow and deny lists, alerting-to-freeze automation', 'Mint and burn bridges to core banking'],
    precedents: [
      { kind: 'client', logo: `${LOGOS}/logo-light-sgforge.svg`, alt: 'Société Générale-FORGE', w: 63, h: 18, href: '/case-studies/societe-generale-forge' },
      { kind: 'nda', text: 'Top US commercial bank', href: NDA_BANK },
    ],
  },
  {
    id: 'tokenized-funds',
    title: 'Tokenized funds and deposits',
    desc: 'Fund units and deposits mapped to the legal structure.',
    icon: 'certificate',
    audience: 'institutions',
    bullets: ['Transfer restrictions enforced onchain', 'Subscriptions and redemptions onchain', 'Custody integration'],
    precedents: [{ kind: 'nda', text: 'Regulated European asset manager', href: '/case-studies/nda-money-market-fund' }],
    note: 'A tokenized share class of a money market fund, in build',
    rv: 'precedent-fund',
  },
  {
    id: 'protocol-integration',
    title: 'Protocol and product integration',
    desc: 'Your protocol or product on Stellar, XRPL, Canton or EVM, whether it is live elsewhere or launching for the first time.',
    icon: 'plugs-connected',
    audience: 'protocols',
    bullets: ['Integration roadmap', 'Native contracts, adapters and SDKs', 'Routing and liquidity'],
    precedents: [
      { kind: 'client', logo: `${LOGOS}/logo-light-lifi.svg`, alt: 'LI.FI', w: 44, h: 16, href: '/case-studies/lifi' },
      { kind: 'client', logo: `${LOGOS}/logo-light-talwex.svg`, alt: 'Talwex', w: 71, h: 14, href: '/case-studies/talwex' },
    ],
  },
  {
    id: 'custody-wallets',
    title: 'Custody, wallets and accounts',
    desc: 'From custodian integrations to smart accounts and passkeys.',
    icon: 'vault',
    audience: 'institutions',
    bullets: ['Custodian and MPC integrations', 'KYT through the custodian', 'Smart accounts and passkeys'],
    precedents: [
      { kind: 'nda', text: 'Top US commercial bank', href: NDA_BANK },
      { kind: 'tool', icon: 'fingerprint', text: 'Nido passkey wallet', href: '/open-source/nido' },
    ],
  },
  {
    id: 'developer-tooling',
    title: 'Developer tooling and DevX',
    desc: 'A two-week DevX audit by two senior engineers, then a tooling roadmap.',
    icon: 'terminal-window',
    audience: 'ecosystems',
    bullets: ['CLIs and scaffolding', 'Registries and sandboxes', 'Maintained as public goods'],
    precedents: [
      // The two DevX audits: Stellar's (2022, its section in the SDF case
      // study) and Starknet's (its own case study).
      { kind: 'mark', logo: `${LOGOS}/logo-light-stellar.svg`, text: 'Stellar DevX audit', href: '/case-studies/stellar-development-foundation#devx-audit' },
      { kind: 'mark', logo: `${LOGOS}/logo-light-starknet.svg`, text: 'Starknet DevX audit', href: '/case-studies/starknet' },
      { kind: 'client', logo: `${LOGOS}/logo-light-ripple.svg`, alt: 'Ripple', w: 54, h: 14, href: '/case-studies/ripple' },
      { kind: 'tool', icon: 'terminal-window', text: 'Stellar CLI plugins and bindings', href: '/open-source/stellar-cli' },
      { kind: 'tool', icon: 'stack', text: 'Stellar Scaffold', href: '/open-source/stellar-scaffold' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture and embedded engineering',
    desc: 'We design the system and lead delivery with your engineers, or place a principal engineer with your team.',
    icon: 'blueprint',
    audience: 'any',
    bullets: ['Architecture and delivery lead', 'Inside your engineering team', 'Principal engineer placed for a quarter or more'],
    precedents: [
      { kind: 'nda', text: 'Top US commercial bank', href: NDA_BANK },
      { kind: 'mark', logo: `${LOGOS}/logo-light-stellar.svg`, text: 'SDF Architect Program', href: '/case-studies/stellar-development-foundation' },
    ],
    rv: 'precedent-arch',
  },
];

/** Icon-box modifier per audience (visual.css: .v-iconbox, --green, --pink, --tan). */
export const tint: Record<Audience, string> = { institutions: '', protocols: 'green', ecosystems: 'pink', any: 'tan' };

/** The /services section each audience belongs to. */
export const doors: Record<Audience, { href: string; label: string }> = {
  institutions: { href: '#institutions', label: 'For financial institutions' },
  protocols: { href: '#protocols', label: 'For protocols and products' },
  ecosystems: { href: '#ecosystems', label: 'For ecosystems and foundations' },
  any: { href: '/#ways', label: 'Ways to work with us' },
};
