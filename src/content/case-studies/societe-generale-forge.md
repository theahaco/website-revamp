---
title: Société Générale-FORGE
metaTitle: 'EURCV on Stellar: SG-FORGE euro stablecoin case study'
order: 1
eyebrow: Financial institution · Stellar
lede: EURCV, Société Générale-FORGE's regulated euro stablecoin, live on Stellar mainnet since Q1 2026. We built its issuance and governance on Stellar, and guided its move to compliance on the network's built-in controls.
cta: Issuing a regulated stablecoin? Talk to the engineers who took one to mainnet.
facts:
- label: Client
  value: Société Générale-FORGE
  style: plain
- label: Role
  value: Smart contract engineering and onchain architecture
  style: plain
- label: Network
  value: Stellar
  style: net
- label: Status
  value: Live since Q1 2026
  style: net
- label: Year
  value: 2025-2026
  style: plain
- label: Engagement
  value: Integration partner
  style: plain
hero:
  image: /images/cases/societe-generale-forge.webp
  alt: 'A regulated euro stablecoin, live on Stellar: the issuer, compliance and holders around the EURCV token'
  caption: One native Stellar asset, with its controls in the hands of the issuer and its compliance team.
metrics:
- figure: €20M+
  label: Regulated stablecoin issued onchain
  receipt: https://stellar.expert/explorer/public/asset/EURCV-GCEYGIVOLAVBF2TG2RUSGTUJCIN75KEX3NGLMY4VPL4GFE5L355AXW3G
- figure: Live
  label: On Stellar mainnet since Q1 2026
  receipt: https://stellar.expert/explorer/public/asset/EURCV-GCEYGIVOLAVBF2TG2RUSGTUJCIN75KEX3NGLMY4VPL4GFE5L355AXW3G
- figure: Audited
  label: By Hacken, before mainnet
  receipt: ''
sections:
- id: challenge
  title: Challenge
  body: A regulated subsidiary of Société Générale needed a euro stablecoin with institutional compliance controls and auditable issuance, on a public network where anyone can read the ledger. The design had to be production-grade from day one, and able to evolve as compliance requirements and the ecosystem moved, without reissuing the asset.
- id: solution
  title: Solution
  body: |-
    We designed EURCV’s issuance on Stellar and built its launch governance on Soroban: issuer, compliance and pause authorities as separate roles, a denylist and pausable transfers, audited by Hacken before mainnet. Compliance controls were agreed with the SG-FORGE compliance team before the first line of contract code.

    We then guided FORGE’s move to reactive compliance on Stellar’s built-in issuer controls: no contract screens transfers in advance, and the compliance team freezes an address when it is flagged. EURCV stayed the same native Stellar asset throughout.
- id: architecture
  title: Architecture highlights
  body: |-
    - A native Stellar asset, reached by Soroban contracts through the Stellar Asset Contract
    - Compliance on the protocol’s issuer controls: a flagged address is frozen, with no contract in the transfer path
    - Launch governance on Soroban (issuer, compliance and pause roles, denylist), audited by Hacken before mainnet
    - Every privileged action explicit and visible on the public ledger
- id: outcome
  title: Outcome
  body: 'EURCV is live on Stellar mainnet with €20M+ issued onchain. Its compliance runs on Stellar’s built-in controls, operated by the SG-FORGE compliance team.'
tech:
- Soroban
- Rust
- Stellar
- SEP-41
- Stellar Asset Contract
receipts: |-
  - [EURCV on the Stellar explorer](https://stellar.expert/explorer/public/asset/EURCV-GCEYGIVOLAVBF2TG2RUSGTUJCIN75KEX3NGLMY4VPL4GFE5L355AXW3G)
relatedService: Stablecoin issuance and governance
team:
- willem-wyndham
- hugo-heer
- enzo-soyer
- chad-ostrowski
quote:
  label: Client
  text: ''
  author: ''
  role: ''
  portrait: ''
  portraitAlt: ''
  logo: /images/logos/logo-light-sgforge.svg
  logoAlt: Société Générale-FORGE
ndaSummary: ''
client: Société Générale-FORGE
nda: false
workTitle: EURCV, a regulated euro stablecoin on Stellar mainnet
workLine: Issuance and governance on Stellar, compliance controls agreed with the SG-FORGE compliance team.
audience: Financial institutions
network: Stellar
year: 2025-2026
shortTitle: Société Générale-FORGE
description: 'EURCV, Société Générale-FORGE’s regulated euro stablecoin, live on Stellar since Q1 2026: we built its issuance and governance, audited by Hacken.'
---
