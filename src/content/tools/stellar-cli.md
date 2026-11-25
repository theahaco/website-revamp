---
name: Stellar CLI
order: 1
network: Stellar
category: Developer tooling
title: 'Stellar CLI: our core contributions to the network’s official command line'
metaTitle: 'Stellar CLI: our core contributions and plugin system'
description: 'We are core contributors to the Stellar CLI, Stellar’s official command line: about a fifth of its commits from 2022 to 2025, including its plugin system.'
lede: 'The Stellar CLI is the official command-line tool of the Stellar network, maintained by the Stellar Development Foundation. Teams use it to build, deploy and call smart contracts and to manage keys. Our engineers wrote about a fifth of its commits from 2022 to 2025, including several of the parts developers use every day.'
summary: 'Core contributors to Stellar’s official command line: plugins, typed contract calls, key management.'
headline:
  figure: '~20%'
  label: of its commits, 2022 to 2025
facts:
- label: Network
  value: Stellar
- label: Our role
  value: Core contributor
- label: Owner
  value: Stellar Development Foundation
- label: Status
  value: v30.0.1 (November 3, 2026)
  live: true
- label: Language
  value: Rust
- label: License
  value: Apache-2.0
metrics:
- figure: '~20%'
  label: Of all Stellar CLI commits, 2022 to 2025
  receipt: https://github.com/stellar/stellar-cli/graphs/contributors
- figure: 297k
  label: Downloads on crates.io, with its predecessor soroban-cli (October 2026)
  receipt: https://crates.io/crates/stellar-cli
- figure: 225k
  label: Downloads of sep5, our key-derivation crate inside the CLI (November 2026)
  receipt: https://crates.io/crates/sep5
visual:
  kind: terminal
  label: 'A Stellar CLI 30.0.1 session: the version, a new key and its address, the networks and the default one, a new contract project and the installed plugins'
  lines:
  - '$ stellar --version'
  - 'stellar 30.0.1 (f2a7b74175c34585f3b30a1abf42a2d41cbcc390)'
  - '…'
  - '$ stellar keys generate alice'
  - '✅ Key saved with alias alice in "/home/dev/.config/stellar/identity/alice.toml"'
  - '$ stellar keys address alice'
  - 'GAYQDVYRICEBBA62MCJ34Y5TU2SKI2BHPL6D5AMYKUK3TCNV5GJYWGLE'
  - '$ stellar network ls'
  - 'local'
  - 'futurenet'
  - 'mainnet'
  - 'testnet'
  - '$ stellar network use testnet'
  - 'ℹ️ The default network is set to `testnet`'
  - '$ stellar contract init hello-world'
  - 'ℹ️ Initializing workspace at "hello-world"'
  - '➕ Writing "hello-world/.gitignore"'
  - '➕ Writing "hello-world/AGENTS.md"'
  - '➕ Writing "hello-world/Cargo.toml"'
  - '…'
  - '$ stellar plugin ls'
  - 'Installed Plugins:'
  - '    registry'
  - '    scaffold'
  caption: 'A real session, recorded on November 5, 2026 with Stellar CLI 30.0.1 (skipped lines and commands are marked “…”). Key management and the plugin system, which runs our Scaffold and Registry as `stellar` subcommands, are among the parts our engineers built.'
sections:
- id: what-it-does
  title: What it does
  body: |-
    Most teams that build smart contracts on Stellar start with the Stellar CLI. It compiles contracts to WebAssembly, deploys them, calls their functions, manages keys, and builds, simulates, signs and sends transactions, on a local network, on testnet or on mainnet.

    The CLI belongs to the Stellar Development Foundation, which maintains it and sets its roadmap. We are among its core contributors.
- id: what-we-built
  title: What we built
  body: |-
    - **The plugin system**, which lets separate tools run as `stellar` subcommands. [Stellar Scaffold](/open-source/stellar-scaffold) and the [Stellar Registry](/open-source/stellar-registry), which we build, run this way as `stellar scaffold` and `stellar registry`.
    - **Contract calls generated from each contract’s interface**: every function of a deployed contract becomes a typed command.
    - **Key management**: SEP-5 key derivation through our sep5 crate, storage in the operating system’s keychain, and Ledger hardware signing, tested in CI.
    - **The transaction toolkit** (build, simulate, sign, send) and the CLI’s **TypeScript client generation**, which Stellar’s JavaScript SDK has since taken over.
- id: related-work
  title: Related work
  body: |-
    TypeScript clients generated from a contract’s interface run on `contract.Client` and `AssembledTransaction` in Stellar’s official JavaScript SDK (written by [Chad](../../team/chad-ostrowski)). Two of our Rust crates ship inside the CLI: sep5 for key derivation (225k downloads; written by [Willem](../../team/willem-wyndham)) and stellar-ledger for Ledger signing (87k downloads; written by [Elizabeth](../../team/elizabeth-engelman)).
tech:
- Rust
- Soroban
- WebAssembly
- SEP-5
- Ledger
- TypeScript
receipts: |-
  - [Stellar CLI on GitHub](https://github.com/stellar/stellar-cli)
  - [Contributors](https://github.com/stellar/stellar-cli/graphs/contributors)
  - [stellar-cli on crates.io](https://crates.io/crates/stellar-cli)
  - [sep5 on crates.io](https://crates.io/crates/sep5)
built:
- willem-wyndham
- elizabeth-engelman
- chad-ostrowski
related:
- stellar-scaffold
- stellar-registry
cta: Building on Stellar? Talk to the engineers who write its tooling.
maintainer: Stellar Development Foundation
repo: https://github.com/stellar/stellar-cli
license: Apache-2.0
languages:
- Rust
---
