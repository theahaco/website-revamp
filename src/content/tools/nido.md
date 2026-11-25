---
name: Nido
order: 4
network: Stellar
category: Wallet
title: 'Nido: an open-source passkey wallet for Stellar'
metaTitle: 'Nido: open-source passkey smart wallet for Stellar'
description: 'Nido, an open-source passkey wallet for Stellar: no seed phrase, no server key, limits enforced onchain. 54 mainnet wallets in four days.'
lede: 'Nido is our open-source smart-account wallet for Stellar: passkeys instead of seed phrases, across the user’s devices, with recovery built in. The account is a smart contract controlled by the user’s devices, so no signing key sits on a server. It went live on mainnet in a curated release on October 26, 2026.'
summary: 'Passkeys instead of seed phrases, with spending limits enforced onchain.'
headline:
  figure: '54'
  label: mainnet wallets in four days
facts:
- label: Network
  value: Stellar
- label: Our role
  value: Built by our engineers
- label: License
  value: Apache-2.0
- label: Status
  value: Curated mainnet release since October 26, 2026
  live: true
- label: Next
  value: Open launch after an external audit
- label: Runs on
  value: Perch smart accounts
metrics:
- figure: '54'
  label: Wallets created on mainnet in the curated release, October 26 to 29, 2026
  receipt: https://stellar.expert/explorer/public/contract/CBHERM3IKL2QLLJWNPBTATIHVFNT3FLFZKPFG4L2X7CHUPRLJHGC3FAC
- figure: '705'
  label: Testnet wallets since June 1, 2026, our own testing included (November 2, 2026)
  receipt: https://github.com/nidohq/nido/blob/main/DEPLOYED.md
- figure: '8'
  label: Apps integrating it (November 2, 2026)
  receipt: ''
- figure: '26'
  label: Wallets that transacted with Shake, Agama and Darwin at HackMeridian 2026 (testnet)
  receipt: ''
visual:
  kind: image
  image: /images/tools/nido.webp
  alt: 'Nido’s site on a phone: a safe place for everything you own, set up with your face, ready in seconds, never locked out.'
  tone: dark
  caption: '[nido.fyi](https://nido.fyi). Mainnet access stays curated until an external audit completes.'
sections:
- id: what-it-does
  title: What it does
  body: |-
    A Nido wallet is a smart contract on Stellar, controlled by the passkeys on the user’s devices. There is no seed phrase to write down and no signing key on a server: setting one up takes a face or a fingerprint, in seconds.

    Every Nido mainnet wallet runs on a [Perch](/open-source/perch) account, so its rules are enforced onchain: spending caps, time-limited permissions for apps (session keys), and recovery by guardians, a zero-knowledge proof, or both. An app can ask for a session that spends up to a daily cap; the user approves once, and the account refuses anything beyond it.

    Nido is smoother than any Web2 login, powered by the security and key-management primitives of Web3. The authentication layer the web always lacked, Nido follows the Progressive Security paradigm: add custodians and hardware wallets as signers to your account if and when you need them.
- id: mainnet
  title: Mainnet, launched
  body: |-
    Nido moved from testnet to a curated mainnet release during Meridian 2026 in Lisbon. Its mainnet factory created 54 wallets in four days, 33 of them on October 27 at a cocktail hour that surreptitiously doubled as Nido's launch party. 43 accounts joined the Telegram support & feedback chat.
- id: apps
  title: Apps integrating Nido
  body: |-
    | App | Context | How it uses Nido |
    |---|---|---|
    | [Agama](https://github.com/agamafinance/agama-stellar) | SCF #45 | Nido in its wallet picker, with Perch session rules |
    | [Shake](https://github.com/franciscogfsm/shake) | HackMeridian 2026 | Face ID payments: approve once, then pay within onchain limits |
    | [Darwin](https://app.darwin.market/stellar) | HackMeridian 2026 | One Touch ID per trade, with a session key, in a live app |
    | [LumenSplit](https://github.com/manuuvllgs/LumenSplit) | HackMeridian 2026 | Passkey onboarding with a daily spending cap |
    | [Tansu](/open-source/tansu) | SCF #28, #30 | Sign-in with Nido in its governance dApp, on testnet |
    | [Turbolong](https://github.com/Dgetsylver/TurboLong) | SCF #43 | Nido in its wallet picker |
    | [Authline](https://github.com/theahaco/authline) | SCF #44 | Onboards Nido wallets to issued assets |
    | Stroopies | SCF Pilots | SCF Pilots can hold their soulbound credential in a Nido wallet, on testnet |

    Tero, Agentic Realities and Nod, from HackMeridian 2026, list Nido as their next step.
- id: integrate
  title: Integrating it
  body: |-
    Integration takes a few lines. `@nidohq/stellar-wallets-kit-module` adds Nido to any Stellar Wallets Kit picker, and `@nidohq/passkey-sdk` covers custom flows; the repo ships an integration guide and an example dApp. The passkey SDK has 903 npm downloads since its June release, installs pulled in by the Wallets Kit module included (November 2, 2026).
- id: security
  title: Security and the open launch
  body: |-
    - Open source under Apache-2.0, with 364 commits to nidohq/nido (November 2, 2026).
    - 134 Rust tests (November 2, 2026), 91 of them with real passkey signatures and zero-knowledge proofs.
    - An audit preparation package in the repo: threat models (STRIDE included), security invariants, audit scope, runbooks and a mainnet readiness checklist. CoinFabrik Scout runs in CI.
    - Mainnet access stays curated until an external audit completes, and the open launch follows it.
tech:
- Rust
- Soroban
- TypeScript
- WebAuthn
- Passkeys
- Zero-knowledge proofs
receipts: |-
  - [nido.fyi](https://nido.fyi)
  - [GitHub](https://github.com/nidohq/nido)
  - [Mainnet factory on StellarExpert](https://stellar.expert/explorer/public/contract/CBHERM3IKL2QLLJWNPBTATIHVFNT3FLFZKPFG4L2X7CHUPRLJHGC3FAC)
  - [Testnet factory on StellarExpert](https://stellar.expert/explorer/testnet/contract/CDDIW3F63PB6ZKMJN7CCGJSCYXTAVAVEEYNS36K2YFEJH7GQ3ADVZSVS)
  - [Earlier factories (DEPLOYED.md)](https://github.com/nidohq/nido/blob/main/DEPLOYED.md)
built:
- willem-wyndham
- elizabeth-engelman
- enzo-soyer
- chad-ostrowski
related:
- perch
- stellar-registry
cta: Want passkey wallets in your app? Talk to the engineers who built Nido.
repo: https://github.com/nidohq/nido
license: Apache-2.0
languages:
- Rust
- TypeScript
---
