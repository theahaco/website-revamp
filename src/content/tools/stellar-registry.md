---
name: Stellar Registry
order: 3
network: Stellar
category: Developer tooling
title: 'Stellar Registry: an onchain package manager for smart contracts'
metaTitle: 'Stellar Registry: onchain package manager for Soroban'
description: 'Stellar Registry, an onchain package manager for Soroban contracts: publish once, deploy and resolve by name. Audited by Veridise, 166,833 mainnet calls.'
lede: 'Publish a contract once, then deploy and import it by name on any network, instead of passing addresses around. The Stellar Registry is an onchain package manager for Soroban smart contracts. We designed, built and operate it, and Veridise audited it with no findings.'
summary: 'Publish a contract once, then deploy and resolve it by name on any network.'
headline:
  figure: 166,833
  label: mainnet calls
facts:
- label: Network
  value: Stellar
- label: Our role
  value: Designed, built and operated by us
- label: Audit
  value: Veridise, no findings (November 2025)
- label: Status
  value: On mainnet since July 2026
  live: true
- label: Release
  value: Contract v0.8.0 (October 2026)
- label: Runs as
  value: A Stellar CLI plugin and rgstry.xyz
metrics:
- figure: '218'
  label: Names on the mainnet Registry, namespaces included (November 2, 2026)
  receipt: https://rgstry.xyz
- figure: '67'
  label: Namespaces on mainnet (November 2, 2026)
  receipt: https://rgstry.xyz
- figure: 166,833
  label: Mainnet calls to contracts running Registry-published code (October 31, 2026)
  receipt: ''
- figure: 20,495
  label: Crate downloads (November 2, 2026)
  receipt: https://crates.io/crates/stellar-registry
visual:
  kind: image
  image: /images/tools/stellar-registry.webp
  alt: 'The Stellar Registry interface on a phone: browse and discover deployed smart contracts on the Stellar network, searching by name or Wasm.'
  tone: dark
  label: 'A real session of the Stellar Registry CLI plugin: its help and its first commands, from naming accounts to publishing Wasm'
  clip: true
  lines:
  - '$ stellar registry --help'
  - 'Add, manage, and use Wasm packages & named contracts in the Stellar Registry'
  - ''
  - 'Usage: stellar-registry <COMMAND>'
  - ''
  - 'Commands:'
  - '  account                  Name and manage accounts (G-addresses and smart accounts)'
  - '  create-alias             Create a local `stellar contract alias` from a named registry contract'
  - '  current-version          Get the current (latest) version of a published Wasm'
  - '  deploy                   Deploy a named contract from a published Wasm'
  - '  deploy-unnamed           Deploy a contract from a published Wasm without registering a name'
  - '  download                 Download a Wasm binary, optionally creating a local file'
  - '  fetch-contract-id        Look up the contract ID of a deployed contract by name'
  - '  fetch-hash               Fetch the hash of a published Wasm binary'
  - '  publish                  Publish Wasm to registry with package name and semantic version'
  - '…'
  caption: 'rgstry.xyz, where anyone can search published contracts by name or by Wasm hash. The plugin runs as `stellar registry`, here in a real session (version 0.3.0, recorded on November 5, 2026).'
sections:
- id: what-it-does
  title: What it does
  body: |-
    On Stellar, a contract is an address. Teams pass those addresses around in configuration files and messages, and every network has its own. The Registry gives contracts names. A developer publishes a contract’s code once, under a name and a version. Anyone can then deploy a named instance from it, or resolve a name to the contract it points to, from the command line, from Rust code or at runtime.

    An issuer can run its own namespace and decide which contract version its name points to. Versions only move forward. Compromised entries can be flagged, and flagged entries are refused by default.
- id: what-we-built
  title: What we built
  body: |-
    - **The registry contract**: a managed root, namespaces, and versions that only move forward.
    - **Safety controls**: flagged entries are refused by default, and naming an account needs that account’s consent.
    - **Admin and upgrade rights** through the contract admin standard we drafted with an engineer at the Stellar Development Foundation, governed by a security council on [Tansu](/open-source/tansu), on testnet for now.
    - **The CLI plugin and Rust macros** that import a contract or an asset by name, the rgstry.xyz interface and its indexer.
- id: adoption
  title: Who uses it
  body: |-
    Contracts running code published in the Registry carry live mainnet traffic: 166,833 calls by October 31, 2026, calls made from other contracts included.

    | Contract | What the calls do | Mainnet calls |
    |---|---|---:|
    | [kalien](https://stellar.expert/explorer/public/contract/CDDAYXNY6MMA47Q54VSHG2WV445ZUOJ354NOLSFRC7ZUDTD6OTS4A7PE), an onchain game | Game transactions | 109,116 |
    | [RISC Zero Groth16 verifier](https://stellar.expert/explorer/public/contract/CB4PBLDPTMAGCLSCEDMTKB5JZUDON5TFEF7GQ4KIWD7LSCHRUBINJM7X) | Zero-knowledge proof checks for other contracts | 53,233 |
    | [WebAuthn](https://stellar.expert/explorer/public/contract/CB7HENHJ7NF34I5FFXQK7D5I3WWQRGB5O5XO77D3NXMT7LM7LOKRQ5YR) and [Ed25519](https://stellar.expert/explorer/public/contract/CBOOZV2BK5OETGL4Q4KGEBESPRLJFN7DOFWDT7OZGLD7EQEZUVOWUEMC) verifiers, taken from the Registry by smart accounts | Passkey and key signature checks | 3,204 |
    | Other published contracts: smol, ohloss, Perch and smart-account policies | Token launches, games and account policies | 1,280 |
    | **Total** | | **166,833** |

    Call counts from StellarExpert. Contracts deployed before the Registry existed, such as KALE’s farm, are left out.

    On mainnet, passkey-kit and smart-account-kit, both now in the Stellar Development Foundation’s GitHub organization, publish their contracts through the Registry, as do KALE, smol, ohloss, kalien and a RISC Zero verifier. On testnet, HackMeridian 2026 teams used it from the first day: ZBE TOLL published two versions of its contracts and resolves them by name, ancora names each organization’s treasury in the Registry, and Shake resolves Nido’s factory at runtime. Our own [Nido](/open-source/nido), [Perch](/open-source/perch), Tansu and Moonlight use it too.
- id: names
  title: What the mainnet Registry names
  body: |-
    The mainnet Registry holds 218 names across 67 namespaces, for stablecoins, tokenized assets and DeFi protocols. Our team registered most third-party names so any developer can resolve them; a name implies no relationship with its issuer. It also holds 33 builds of OpenZeppelin’s contracts, ready to deploy by name, 31 of them published by our team.

    OpenZeppelin’s Contracts Wizard tells smart-account deployers to take verifier and policy contracts from the Stellar Registry, on testnet or mainnet.
- id: history
  title: Where it came from
  body: |-
    The Registry grew out of SmartDeploy, which we started in 2023: its crate has 12,093 downloads since September 2023, and the Registry’s own crates 20,495 since May 2025 (crates.io, November 2, 2026). Like [Stellar Scaffold](/open-source/stellar-scaffold), it is funded as a Stellar public good.
tech:
- Rust
- Soroban
- WebAssembly
- Stellar CLI
- TypeScript
receipts: |-
  - [rgstry.xyz](https://rgstry.xyz)
  - [Veridise audit report](https://veridise.com/wp-content/uploads/2025/12/VAR-AhaLabs-20250903-scaffold-stellar-v3.pdf)
  - [GitHub](https://github.com/stellar-registry)
  - [stellar-registry on crates.io](https://crates.io/crates/stellar-registry)
built:
- willem-wyndham
- pamela-selle
- chad-ostrowski
- zach-fedor
related:
- stellar-scaffold
- perch
cta: Shipping contracts other teams will call? Talk to the team that runs the Registry.
repo: https://github.com/stellar-registry
languages:
- Rust
---
