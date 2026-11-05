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
  kind: code
  filename: terminal
  code: |-
    # Keys kept in the operating system’s keychain
    stellar keys generate alice --secure-store \
      --fund --network testnet

    # Deploy, and save the contract id under an alias
    stellar contract deploy --wasm hello.wasm \
      --source alice --network testnet --alias hello

    # Each contract function becomes a typed command
    stellar contract invoke --id hello --source alice \
      --network testnet -- hello --to world

    # Plugins run as stellar subcommands
    stellar scaffold init my-project
  caption: 'A first contract call with the Stellar CLI. Secure key storage, the typed contract commands and the plugin system are among the parts our engineers built.'
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
    TypeScript clients generated from a contract’s interface run on `contract.Client` and `AssembledTransaction` in Stellar’s official JavaScript SDK, which Chad Ostrowski, on our team, wrote. Two of our Rust crates ship inside the CLI: sep5 for key derivation (225k downloads) and stellar-ledger for Ledger signing (87k downloads).
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
