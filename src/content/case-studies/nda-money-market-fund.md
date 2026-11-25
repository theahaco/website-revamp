---
title: A tokenized share class for a money market fund
metaTitle: 'Tokenized money market fund share class on Stellar'
order: 6
eyebrow: Financial institution · Stellar
lede: A regulated European asset manager is adding a tokenized share class to its money market fund, on Stellar. In build; launch targeted for 2027.
description: A tokenized money market fund share class on Stellar for a regulated European asset manager, with fund units, NAV and net settlement onchain.
cta: Bringing a fund onchain? Talk to the engineers building one.
facts:
- label: Client
  value: Regulated European asset manager
  style: plain
- label: Role
  value: Onchain architecture and smart contract engineering
  style: plain
- label: Network
  value: Stellar
  style: net
- label: Status
  value: In build
  style: net
- label: Year
  value: 2025-2026
  style: plain
- label: Engagement
  value: Integration partner
  style: plain
hero:
  image: /images/cases/nda-money-market-fund.webp
  alt: 'A tokenized share class for a money market fund: fund units issued against a published NAV'
  caption: Tokens in circulation equal units on the fund register; holder approval, freeze and clawback are set on the asset.
metrics:
- figure: Share class
  label: Tokenized, alongside the fund's existing units
  receipt: ''
- figure: '1:1'
  label: Tokens in circulation to units on the fund register
  receipt: ''
- figure: Onchain
  label: Subscriptions and redemptions, by design
  receipt: ''
- figure: '2027'
  label: Launch targeted
  receipt: ''
sections:
- id: challenge
  title: Challenge
  body: Tokenizing a regulated fund means the onchain representation has to mirror the legal structure exactly, support controlled transfers, and remain auditable for regulators, all while being efficient enough to run at scale.
- id: solution
  title: Solution
  body: |-
    We designed a compliance-aware token architecture that ties onchain units to the fund structure, supports transfer restrictions, and gives the administrator the controls they need without weakening the security model.

    The engagement runs as a fixed-scope, milestone-based integration: one scoping session with the manager's technical lead, an MOU with verifiable milestones, a first release on testnet with the operations team, then mainnet deployment, runbooks and handover at launch.
- id: architecture
  title: Architecture highlights
  body: |-
    - Fund units as a native Stellar asset with holder approval, freeze and clawback: tokens in circulation equal units on the register
    - One contract nets subscriptions against redemptions at the published NAV, so only the net goes to the depositary
    - NAV published onchain by the management company, which keeps the transfer-agent controls
    - Cash leg designed for a regulated euro stablecoin on the same ledger, with delivery versus payment in one step
- id: outcome
  title: Outcome
  body: Each milestone is validated as it is delivered. Launch is targeted for 2027, once the custody and depositary integrations are in place; subscriptions and redemptions will then run onchain under the manager's existing compliance controls. Settlement then happens in the same transaction as the order, not in days, and the manager, the depositary and the distributor share one register instead of reconciling three.
tech:
- Soroban
- Rust
- Stellar
- RWA
receipts: ''
relatedService: Tokenized funds and deposits
team:
- enzo-soyer
- hugo-heer
quote:
  label: ''
  text: ''
  author: ''
  role: ''
  portrait: ''
  portraitAlt: ''
ndaSummary: A tokenized share class for the money market fund of a regulated European asset manager, in build on Stellar.
client: Regulated European asset manager
nda: true
workTitle: A tokenized share class for a money market fund
workLine: Fund units equal to units on the register, holder approval on the asset, subscriptions and redemptions netted onchain.
audience: Financial institutions
network: Stellar
year: 2025-2026
shortTitle: A tokenized money market fund share class
---
