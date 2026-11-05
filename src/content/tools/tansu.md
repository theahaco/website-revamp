---
name: Tansu
order: 7
network: Stellar
category: Governance
title: 'Tansu: onchain governance for open-source projects'
metaTitle: 'Tansu: onchain governance for open-source projects'
description: 'Tansu, onchain governance for open-source projects on Stellar. The Stellar Community Fund votes its Public Goods Award on it: about $1.4M in 2026.'
lede: 'Tansu gives any open-source project its own onchain governance: a DAO with badge-weighted and anonymous voting, and a record of which code was released and who approved it. Since Q2 2026, the Stellar Community Fund votes its Public Goods Award on Tansu: about $1.4M approved over three rounds.'
summary: 'Onchain governance for open-source projects, where the Stellar Community Fund votes its Public Goods Award.'
headline:
  figure: '~$1.4M'
  label: public goods funding voted on it
facts:
- label: Network
  value: Stellar
- label: Our role
  value: Created and maintained by Pamphile Roy, funded as a Stellar public good through The Aha Company
- label: Status
  value: Mainnet contract since October 2025
  live: true
- label: Release
  value: v3.0.0 (October 2026)
- label: Audit
  value: Internal security reviews, no external audit yet
- label: Site
  value: tansu.dev
metrics:
- figure: '~$1.4M'
  label: Public goods funding approved through Tansu votes, Q2 to Q4 2026
  receipt: https://app.tansu.dev
- figure: '58'
  label: Proposals approved over three Stellar Community Fund rounds
  receipt: ''
- figure: '480'
  label: Ballots cast in the Q4 2026 round, the first on mainnet
  receipt: https://stellar.expert/explorer/public/contract/CDXINK2T3P46M4LWK35FVIXXHJ2XHAS4FOVCGVPJ63YV5OVTM24IY5BI
- figure: '8'
  label: Projects on Tansu mainnet (October 31, 2026)
  receipt: https://app.tansu.dev
visual:
  kind: bars
  title: Public Goods Award rounds voted on Tansu
  bars:
  - label: Q2 2026
    sub: 17 proposals, testnet
    value: 400000
    display: more than $400,000
  - label: Q3 2026
    sub: 18 proposals, testnet
    value: 453000
    display: $453,000
  - label: Q4 2026
    sub: 23 proposals, mainnet
    value: 581100
    display: $581,100
    highlight: true
  caption: 'Q2 and Q3 from the round reports; Q4 from the proposals approved and executed on the Tansu mainnet contract, and the budget each one requested. Total: 58 proposals, about $1.4 million.'
sections:
- id: what-it-does
  title: What it does
  body: |-
    Each project registered on Tansu gets its own DAO. Members earn badges, votes are weighted by them, and ballots can be anonymous. Proposals carry their outcome onchain, so anyone can check what was approved and when.

    Tansu also keeps release records: which code was released, what it contains and who approved it, with commit hashes, software bills of materials and signed attestations, append-only. A third party can check that evidence without access to the vendor’s systems.
- id: scf
  title: Where the Stellar Community Fund votes
  body: |-
    Since Q2 2026, SCF Pilots vote on the Stellar Community Fund’s Public Goods Award in Tansu, with anonymous ballots weighted by Neural Quorum Governance. Three rounds have used it, and the third ran on mainnet: 480 ballots were cast on 24 proposals, and 23 were approved and executed onchain, 22 on October 30, 2026 and one more on November 2.
- id: projects
  title: Projects on Tansu
  body: |-
    8 projects use Tansu on mainnet (October 31, 2026), with the Public Goods Award and its Q4 round counted once:

    - The Public Goods Award votes, Stellar Community Fund
    - Java Stellar SDK, Lightsail Network
    - Stellar PHP SDK, iOS Stellar SDK and Flutter Stellar SDK, Soneso
    - Soroban Security Portal, Inferara
    - Switchly DEX, Switchly
    - Stroopies, the SCF Pilots’ soulbound credential, built by our team

    Tansu’s repos have 86 forks (November 2, 2026) across its original and current homes. At HackMeridian 2026, Pinakion’s team designed its anonymous voting with Tansu as the first integrator.
- id: history
  title: Where it came from
  body: |-
    Pamphile Roy started Tansu as soroban-versioning and still leads it. Its mainnet contract has run since October 2025, and v3.0.0 shipped in October 2026. Tansu has had internal security reviews, and no external audit yet. It is funded as a Stellar public good through The Aha Company.
tech:
- Rust
- Soroban
- DAO governance
- Anonymous voting
- SBOM
receipts: |-
  - [tansu.dev](https://tansu.dev)
  - [Projects on app.tansu.dev](https://app.tansu.dev)
  - [Mainnet contract on StellarExpert](https://stellar.expert/explorer/public/contract/CDXINK2T3P46M4LWK35FVIXXHJ2XHAS4FOVCGVPJ63YV5OVTM24IY5BI)
  - [Q2 2026 round report](https://tansu.dev/blog/public-goods-award-q2)
  - [GitHub](https://github.com/Consulting-Manao/tansu)
built:
- pamphile-roy
- willem-wyndham
- pamela-selle
related:
- nido
- stellar-registry
cta: Running a grants program or an open-source project? Talk to the team behind Tansu.
maintainer: Pamphile Roy
maintainerType: Person
repo: https://github.com/Consulting-Manao/tansu
languages:
- Rust
---
