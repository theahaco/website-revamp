---
title: Stellar Development Foundation
metaTitle: 'Stellar Development Foundation: ecosystem tooling'
order: 3
eyebrow: Ecosystem · Stellar
lede: 'We build and maintain tooling the Stellar ecosystem runs on: Stellar Scaffold, the Stellar CLI plugin system, Stellar Registry and Nido, our open-source passkey wallet. Our principal engineer Fabricius Zatti is a core contributor to the Stellar Architect Program.'
cta: Building developer tooling for an ecosystem? Talk to the team that maintains Stellar’s.
facts:
- label: Client
  value: Stellar Development Foundation
  style: plain
- label: Role
  value: Developer tooling and public goods
  style: plain
- label: Network
  value: Stellar
  style: net
- label: Status
  value: Maintained as public goods
  style: net
- label: Year
  value: 2021-today
  style: plain
- label: Engagement
  value: Public goods and Architect Program
  style: plain
hero:
  image: /images/cases/stellar-development-foundation.webp
  alt: 'The tooling the Stellar ecosystem runs on: the Stellar CLI and the tools around it'
  caption: ''
metrics:
- figure: ~20%
  label: Of Stellar CLI commits, 2022 to 2025
  receipt: https://github.com/stellar/stellar-cli
- figure: 297k
  label: Stellar CLI downloads on crates.io, with soroban-cli (October 2026)
  receipt: https://crates.io/crates/stellar-cli
- figure: '37'
  label: Stellar Scaffold releases (November 2, 2026)
  receipt: https://github.com/stellar-scaffold/cli
- figure: 166,833
  label: Mainnet calls to contracts running Stellar Registry code (October 31, 2026)
  receipt: /open-source/stellar-registry#adoption
sections:
- id: challenge
  title: Challenge
  body: 'When Stellar added smart contracts with Soroban, it needed developer tooling to match: a command line that builds, deploys and calls contracts, typed clients for front ends, and a way to start a project without assembling it by hand. The Foundation looked for teams that could build that tooling, and keep maintaining it.'
- id: devx-audit
  title: DevX audit
  body: |-
    In 2022, as Stellar was adding smart contracts with Soroban, we ran a DevX audit of its developer path. It produced three documents for the Stellar team: a proposal for the organization and behavior of the Soroban CLI, a deeper design of its `invoke` command, and an analysis of the Soroban docs, with a new structure and the pages they were missing.

    The Stellar team took up the proposals, and we have shipped many of their recommendations together since: the CLI's plugin system and its TypeScript bindings came out of that work.
- id: solution
  title: Solution
  body: |-
    We became core contributors to the Stellar CLI, the network's official command-line tool, and built the parts developers use every day: the plugin system, contract calls generated from each contract's interface, key management and TypeScript client generation.

    On top of it we built Stellar Scaffold and the Stellar Registry, maintained as public goods with funding from the Stellar Community Fund. Fabricius Zatti, a principal engineer on our team, is also a core contributor to the Stellar Architect Program, working on institutional proposals.
- id: architecture
  title: Architecture highlights
  body: |-
    - [Stellar CLI](/open-source/stellar-cli): plugin system, typed contract calls, SEP-5 key management, Ledger signing
    - [Stellar Scaffold](/open-source/stellar-scaffold): one command from an empty folder to contracts, a front end, a local network and typed clients
    - [Stellar Registry](/open-source/stellar-registry): an onchain package manager for Soroban contracts, audited by Veridise with no findings, on mainnet since July 2026
    - [Nido](/open-source/nido): our open-source passkey wallet, in a curated mainnet release since October 2026
    - JavaScript SDK: contract.Client and AssembledTransaction in Stellar's official SDK
    - Standards: co-authors of SEP-53 (final), SEP-61 and SEP-52 (drafts)
- id: outcome
  title: Outcome
  body: 'Most teams building contracts on Stellar start with the Stellar CLI, and Stellar Scaffold is listed in the official Stellar docs. The tooling stays maintained: each public good runs on a quarterly proposal and review. On November 2, 2026, 137 projects used at least one of our tools, 111 of them building on Stellar Scaffold, and the Stellar Community Fund votes its Public Goods Award on [Tansu](/open-source/tansu) ([how we count](/open-source#how-we-count)).'
tech:
- Rust
- TypeScript
- Soroban
- Stellar CLI
- WebAssembly
- Open source
receipts: |-
  - [Stellar CLI](https://github.com/stellar/stellar-cli)
  - [Stellar Scaffold](https://github.com/stellar-scaffold/cli)
  - [Stellar Registry](https://rgstry.xyz)
  - [Nido](https://nido.fyi)
relatedService: Developer tooling and DevX
team:
- willem-wyndham
- chad-ostrowski
- elizabeth-engelman
- pamela-selle
- zach-fedor
- pamphile-roy
- fabricius-zatti
quote:
  label: ''
  text: '“We searched far and wide for capable teams to help us. We found one.”'
  author: Tomer Weller
  role: Chief Product Officer, Stellar Development Foundation · On the launch of Soroban
  portrait: /images/people/tomer-weller.webp
  portraitAlt: Tomer Weller
  logo: /images/logos/logo-light-stellar.svg
  logoAlt: Stellar Development Foundation
ndaSummary: ''
client: Stellar Development Foundation
nda: false
workTitle: Stellar Scaffold, Stellar CLI plugin system, Stellar Registry, Nido
workLine: Tooling the Stellar ecosystem runs on, maintained as public goods, and a core contributor to the Stellar Architect Program.
audience: Ecosystems and open source
network: Stellar
year: 2021-today
shortTitle: Stellar Development Foundation
description: 'We build and maintain the tooling the Stellar ecosystem runs on: Stellar Scaffold, the Stellar CLI plugin system, Stellar Registry and Nido.'
---
