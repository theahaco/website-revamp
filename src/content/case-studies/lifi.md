---
title: LI.FI
metaTitle: 'LI.FI on Stellar: cross-chain routing on Soroban'
order: 2
eyebrow: Protocol · Stellar
lede: LI.FI's routing was built for EVM chains. Bringing it to Stellar meant writing the Soroban contracts from scratch, matching the guarantees LI.FI gives users elsewhere, with a clean surface for its existing stack.
cta: Bringing your protocol to a new network? Talk to the engineers who did it for LI.FI.
facts:
- label: Client
  value: LI.FI
  style: plain
- label: Role
  value: Smart contract engineering
  style: plain
- label: Network
  value: Stellar
  style: net
- label: Status
  value: Live
  style: net
  live: true
- label: Year
  value: '2026'
  style: plain
- label: Engagement
  value: Integration partner
  style: plain
hero:
  image: /images/cases/lifi.webp
  alt: 'Cross-chain routing, brought to Stellar: routes from several networks converging on Stellar'
  caption: ''
metrics:
- figure: Audited
  label: By Halborn, before production
  receipt: ''
- figure: Live
  label: In production on Stellar
  receipt: https://docs.li.fi/introduction/lifi-architecture/stellar-overview
- figure: End to end
  label: Contract layer designed, built and delivered by us
  receipt: ''
- figure: Native
  label: Soroban contracts, not ported from EVM
  receipt: ''
sections:
- id: challenge
  title: Challenge
  body: 'LI.FI aggregates bridges and exchanges so users can move assets across chains in one transaction. Its stack was built for EVM chains, and Stellar is not one: contracts run on Soroban, in Rust, with Stellar''s own account, authorization and asset model. Bringing LI.FI to Stellar meant writing that layer natively, while keeping the guarantees LI.FI gives users everywhere else.'
- id: solution
  title: Solution
  body: |-
    LI.FI came to us directly, as a standard commercial engagement. We designed and built the entire smart-contract layer on Soroban, had it audited by Halborn, and delivered it into production.

    The contracts give LI.FI's existing stack a clean surface on Stellar, so a route on Stellar goes through the same interface as a route anywhere else.
- id: architecture
  title: Architecture highlights
  body: |-
    - Soroban contracts written for Stellar's authorization and asset model, not ported from EVM
    - Routes executed under the user's signed authorization or a token allowance
    - Tokens, native XLM included, addressed through their Stellar Asset Contracts
    - Third-party audit by Halborn before production
- id: outcome
  title: Outcome
  body: LI.FI is live on Stellar. According to LI.FI's documentation, users can swap on Stellar through Soroswap, bring USDC in from EVM chains through Circle's CCTP, bring XLM and USDC in through NEAR Intents, and send USDC out to ten EVM chains.
tech:
- Soroban
- Rust
- Stellar
- Stellar Asset Contract
- Cross-chain
receipts: '- [LI.FI''s Stellar documentation](https://docs.li.fi/introduction/lifi-architecture/stellar-overview)'
relatedService: Protocol and product integration
team:
- enzo-soyer
- hugo-heer
- pamphile-roy
quote:
  label: ''
  text: '“The Aha Company built the Soroban contracts behind our Stellar integration. Working with the people who maintain the tooling made the difference.”'
  author: Max Klenk
  role: Chief Technology Officer, LI.FI
  portrait: /images/people/max-klenk.webp
  portraitAlt: Max Klenk
ndaSummary: ''
client: LI.FI
logo: /images/logos/logo-light-lifi.svg
nda: false
workTitle: Soroban contracts behind the Stellar integration
workLine: EVM routing brought to Stellar with contracts written from scratch, matching the guarantees LI.FI gives users elsewhere.
audience: Protocols and products
network: Stellar
year: '2026'
shortTitle: LI.FI
description: 'How we brought LI.FI’s routing to Stellar: Soroban contracts written from scratch, with the guarantees LI.FI gives users on other chains.'
---
