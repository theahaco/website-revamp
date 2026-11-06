---
name: Perch
order: 5
network: Stellar
category: Onchain policies
title: 'Perch: a policy layer for Stellar smart accounts'
metaTitle: 'Perch: policy layer for Stellar smart accounts'
description: 'Perch, a policy layer for Stellar smart accounts: spending caps, session keys and recovery, written as a reviewable document and enforced onchain.'
lede: 'Perch says what each key on a Stellar smart account may do, in a policy document anyone can review, and enforces it onchain. Spending caps, session keys, scoped app access and recovery compile onto OpenZeppelin’s smart-account rules. Every Nido wallet runs on it.'
summary: 'What each key may do, written as a reviewable document and enforced onchain.'
headline:
  figure: 2,106
  label: npm downloads since September
facts:
- label: Network
  value: Stellar
- label: Our role
  value: Built and maintained by our team
- label: Built on
  value: OpenZeppelin stellar-accounts
- label: Status
  value: On mainnet since October 2026
  live: true
- label: Published through
  value: The Stellar Registry
- label: Package
  value: '@stellar-registry/perch'
metrics:
- figure: 2,106
  label: npm downloads since its September 9 release (November 2, 2026)
  receipt: https://www.npmjs.com/package/@stellar-registry/perch
- figure: '3'
  label: 'Apps running their users on Perch session rules: Agama, Darwin and LumenSplit'
  receipt: ''
- figure: '27'
  label: Testnet wallets whose spending limit Perch enforced at HackMeridian 2026
  receipt: ''
- figure: '116'
  label: Commits since the first, on August 7, 2026 (November 2, 2026)
  receipt: https://github.com/stellar-registry/perch
visual:
  kind: code
  filename: policy.ts
  code: |-
    const doc = policy()
      .signer('owner',   external(WEBAUTHN_VERIFIER, passkey))
      .signer('session', external(ED25519_VERIFIER, sessionKey))
      .rule('daily-spend', r => r
        .callContract(USDC)
        .signedBy('session')
        .func('transfer')
        .cap({ limit: 1_000_000_000n, periodLedgers: 17280 }))
      .build();
  caption: 'A Perch policy: the owner signs with a passkey, and a session key may call transfer on USDC, up to 100 USDC per 17,280 ledgers, about a day.'
sections:
- id: what-it-does
  title: What it does
  body: |-
    A smart account can hold several signers: a passkey on a phone, a session key an app holds for a while, a guardian for recovery. Perch decides what each of them may do. A policy is a reviewable, content-hashed document; Perch compiles it onto OpenZeppelin’s context rules onchain, where the account enforces it on every call.

    - Spending caps, per asset and per period
    - Session keys scoped to one contract and one function
    - Scoped access for each app
    - Recovery by guardians, a zero-knowledge proof, or both
- id: mainnet
  title: On mainnet
  body: |-
    Perch’s contracts went live on mainnet between October 24 and 26, 2026, published and deployed through the [Stellar Registry](/open-source/stellar-registry). Every [Nido](/open-source/nido) mainnet wallet runs on a Perch account.

    Agama (SCF #45), Darwin and LumenSplit run their users on Perch session rules, so an app can act within limits the user set. During HackMeridian 2026, Perch enforced spending limits for 27 wallets on testnet.

    The repo ships its own audit manifest: the commit in scope for review, the deployed build and its known limitations.
- id: roadmaps
  title: On builders’ roadmaps
  body: |-
    ancora, from HackMeridian 2026, models its treasury policies on Perch’s document format, and Sidekey lists Perch as its next step.
tech:
- TypeScript
- Rust
- Soroban
- OpenZeppelin
- Smart accounts
- Passkeys
receipts: |-
  - [GitHub](https://github.com/stellar-registry/perch)
  - [@stellar-registry/perch on npm](https://www.npmjs.com/package/@stellar-registry/perch)
  - [Mainnet deployment manifest](https://github.com/stellar-registry/perch/blob/main/deployments/mainnet.json)
built:
- willem-wyndham
- elizabeth-engelman
related:
- nido
- stellar-registry
cta: Need spending rules your risk team can read? Talk to the engineers who wrote Perch.
repo: https://github.com/stellar-registry/perch
languages:
- TypeScript
- Rust
---
