---
title: A tokenized real estate fund, issued natively on Stellar
metaTitle: 'Tokenized real estate fund on Stellar | The Aha Company'
order: 7
eyebrow: Financial institution · Stellar
lede: A Luxembourg real estate fund is preparing to issue its partnership interests natively on Stellar, with the onchain register as its register of record. We are designing its onchain issuance.
description: 'A tokenized real estate fund on Stellar: partnership interests issued natively, the onchain register as register of record, compliance locked in the asset.'
cta: Bringing a fund onchain? Talk to the engineers designing one.
facts:
- label: Client
  value: European real estate fund sponsor
  style: plain
- label: Role
  value: 'Onchain design: token, contracts and settlement'
  style: plain
- label: Network
  value: Stellar
  style: net
- label: Status
  value: In design
  style: net
- label: Year
  value: '2026'
  style: plain
- label: Engagement
  value: Integration partner
  style: plain
hero:
  image: /images/cases/nda-real-estate-debt-fund.webp
  alt: 'A real estate fund, issued natively on Stellar: fund units in one onchain register of record'
  caption: ''
metrics:
- figure: Closed-end
  label: Partnership interests for eligible investors
  receipt: ''
- figure: '4'
  label: 'Soroban contracts: compliance registry, NAV vault, distribution waterfall, delivery-versus-payment'
  receipt: ''
- figure: Native
  label: The onchain register is the fund's register of record, under Luxembourg's blockchain laws
  receipt: ''
- figure: EURC, EURCV
  label: Subscriptions and distributions in euro stablecoins, by design
  receipt: ''
sections:
- id: challenge
  title: Challenge
  body: |-
    The fund's partnership interests are securities, open only to eligible investors and governed by the partnership agreement. Under Luxembourg's blockchain laws they can be issued natively on a ledger, with the onchain register as the register of record. That only works if every eligibility rule, freeze and transfer restriction holds onchain, for every movement.

    The sponsor also wanted more than a new distribution rail: interests paid for in euro stablecoins, and usable as collateral where a transfer-restricted security cannot go.
- id: solution
  title: Solution
  body: |-
    We designed the token and its contract suite as a standard the sponsor can redeploy for its next funds. The interest is a Stellar asset whose compliance flags are set once and locked for the life of the fund; after configuration, the issuing key gives way to a multisig held by the fund's manager and its account keeper.

    A Soroban suite handles what the protocol does not: the allowlist, NAV, the distribution waterfall and settlement against euro stablecoins. A separate, freely transferable token, backed one for one by locked fund interests, carries the collateral use.
- id: architecture
  title: Architecture highlights
  body: |-
    - A Stellar asset with authorization required, revocable, clawback and immutable flags: no wallet holds the interest before the account keeper authorizes it, a holding can be frozen without being seized, and the rule set cannot be weakened later
    - An allowlist registry with hashed investor references and no personal data onchain. Each transfer is authorized, executed and de-authorized in one atomic transaction, with the holding period and concentration cap of the partnership agreement
    - A NAV vault on SEP-56, with NAV set by the fund manager on its valuation schedule, and a distribution waterfall paid in EURC or EURCV from a frozen snapshot
    - Subscriptions settled delivery-versus-payment in EURC or EURCV, or by bank wire and then issuance
    - Contracts upgradeable under SEP-49 behind a 7-day timelock, controlled by the manager and the account keeper
    - A collateral token (SEP-41), minted against locked fund interests and redeemable for them, for Stellar lending pools within the limits of its legal characterization
    - One security audit of the full suite before mainnet
- id: outcome
  title: Outcome
  body: Delivery will run in milestones, from a compliant issuance prototype to mainnet with the first subscriptions, with one audit of the full suite before launch.
tech:
- Soroban
- Rust
- Stellar Asset Contract
- SEP-41
- SEP-56
- SEP-49
receipts: ''
relatedService: Tokenized funds and deposits
team: []
quote:
  label: ''
  text: ''
  author: ''
  role: ''
  portrait: ''
  portraitAlt: ''
  logo: ''
  logoAlt: ''
ndaSummary: A Luxembourg real estate fund issuing its interests natively on Stellar. In design.
client: European real estate fund sponsor
nda: true
workTitle: Issuing a real estate fund natively on Stellar
workLine: Fund interests onchain as the register of record, compliance locked in the asset. In design.
audience: Financial institutions
network: Stellar
year: '2026'
shortTitle: A tokenized real estate fund
---
