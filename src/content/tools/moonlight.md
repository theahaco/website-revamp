---
name: Moonlight
order: 6
network: Stellar
category: Privacy
title: 'Moonlight: private payments on Stellar for regulated finance'
metaTitle: 'Moonlight: private payments on Stellar for regulated finance'
description: 'Moonlight, private payments on Stellar for regulated finance: the provider knows the customer, the market sees no names. Audited, on mainnet since July 2026.'
lede: 'Private, not anonymous. Moonlight is an open-source privacy layer for Stellar payments: a regulated provider knows each customer, while the ledger shows amounts and flows between one-time keys, but no names. Its core contracts were audited by Runtime Verification and have been in a limited mainnet release since July 2026.'
summary: 'Private, not anonymous: payments known to the provider, not to the market.'
headline:
  figure: '0'
  label: critical or high audit findings
facts:
- label: Network
  value: Stellar
- label: Our role
  value: Designed and built in house, from the contracts to the consoles
- label: Audit
  value: Runtime Verification, July 2026
- label: Status
  value: Limited mainnet release since July 2026, for invite-only pilots
  live: true
- label: License
  value: Apache-2.0 (contracts), MIT (SDK)
- label: Contact
  value: moonlight@theaha.co
metrics:
- figure: '0'
  label: Critical or high findings in the Runtime Verification audit of the core contracts (report of July 23, 2026)
  receipt: https://github.com/Moonlight-Protocol/soroban-core/tree/main/audits
- figure: v0.5.0
  label: Audited core contracts, deployed on mainnet on July 30, 2026
  receipt: https://github.com/Moonlight-Protocol/soroban-core
- figure: '18'
  label: 'Public repositories (November 2026): contracts, SDK, provider and council platforms, wallet'
  receipt: https://github.com/Moonlight-Protocol
sections:
- id: what-it-does
  title: What it does
  body: |-
    Payments on a public ledger show who paid whom. For a bank or a payment company, that exposes customers and counterparties to the whole market. Moonlight keeps the ledger public and the customers private: payments move between one-time keys, so the ledger shows amounts and flows, but no names. The privacy provider, a regulated intermediary, knows each customer.

    This version uses no zero-knowledge proofs. Amounts, entries and exits stay visible: Moonlight hides who paid whom from the market, not from the provider.
- id: roles
  title: Three roles
  body: |-
    | Role | Who takes it | What it does |
    |---|---|---|
    | Council | A bank consortium, a market operator or a network serving one jurisdiction | Sets the rules: deploys a channel per asset, admits and removes providers, publishes its jurisdictions |
    | Privacy provider | Banks, payment institutions, regulated wallets and custodians | Knows the customer, signs each bundle of payments it submits, and earns a fee in the channel’s asset |
    | Customer | People and businesses | Holds the keys |

    A bank usually takes the provider role, and a group of institutions can run the council for its market. A provider runs one service, a database and a funded Stellar account, self-hosted or run with us.
- id: status
  title: Where it stands
  body: |-
    - **Core contracts** (Privacy Channel and Channel Auth, v0.5.0): audited by Runtime Verification through the Stellar Development Foundation’s Soroban Audit Bank, with no critical or high findings, and on mainnet since July 30, 2026.
    - **Provider platform and council console**: on mainnet, invite-only.
    - **Moonlight SDK**: released, on JSR as `@moonlight/moonlight-sdk`.
    - **Browser wallet**: beta.
    - **Compliance connectors** (KYC vendors, screening, approval workflows, reporting exports): built per institution.

    The audit report and its fixes are public, with the hashes that match the contracts deployed on mainnet. We publish no usage figure yet.
- id: recognition
  title: Recognition
  body: |-
    - Stellar Community Fund Build award (SCF #37)
    - DraperU × Stellar Founder Residency, 2025 cohort
    - Featured guest at the Stellar Development Foundation’s [developer meeting of August 27, 2026](https://developers.stellar.org/meetings/2026/08/27)
tech:
- Rust
- Soroban
- TypeScript
- Deno
- P-256
- Ed25519
receipts: |-
  - [GitHub](https://github.com/Moonlight-Protocol)
  - [Audit report and fixes](https://github.com/Moonlight-Protocol/soroban-core/tree/main/audits)
  - [Documentation](https://docs.moonlightprotocol.io)
built:
- fabricius-zatti
- chad-ostrowski
- hugo-heer
related:
- nido
- stellar-registry
cta: Bringing private payments to a regulated market? Talk to the team that built Moonlight.
repo: https://github.com/Moonlight-Protocol
license: Apache-2.0
languages:
- Rust
- TypeScript
---
