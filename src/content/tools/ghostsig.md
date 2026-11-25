---
name: GhostSig
order: 8
network: XRPL and Stellar
category: Wallet
title: 'GhostSig: a passkey wallet for XRPL and Stellar that stores no keys'
metaTitle: 'GhostSig: passkey web wallet for XRPL and Stellar'
description: 'GhostSig, a passkey web wallet for XRPL and Stellar that stores no keys, default in the Stellar Wallets Kit and xrpl-connect. In beta.'
lede: 'GhostSig is a passkey web wallet for the XRP Ledger and Stellar. Its key is derived from the user’s passkey at each signature and never stored, and there is no backend. It is the default passkey module in the Stellar Wallets Kit and in XRPL Commons’ xrpl-connect. GhostSig is in beta, and the work continues.'
summary: 'One passkey wallet for XRPL and Stellar, with keys derived at each signature and never stored.'
headline:
  figure: '2'
  label: wallet kits ship it by default
facts:
- label: Networks
  value: XRPL and Stellar
- label: Our role
  value: Built and maintained by Pamphile Roy
- label: License
  value: MIT
- label: Status
  value: Beta, mainnet enabled, not yet audited
- label: Stack
  value: TypeScript, WebAuthn PRF, SLIP-10, SLIP-39
- label: Site
  value: ghostsig.dev
metrics:
- figure: '2'
  label: 'Wallet kits ship it by default: the Stellar Wallets Kit since v2.7.0 (September 23, 2026), and XRPL Commons’ xrpl-connect 1.0.0'
  receipt: https://github.com/Creit-Tech/Stellar-Wallets-Kit/pull/114
- figure: '0'
  label: 'Keys stored: each signature expands the passkey’s PRF output into a key, then zeroes it'
  receipt: https://github.com/XRPL-Commons/xrpl-connect/tree/develop/packages/adapters/ghostsig
- figure: '1'
  label: Passkey prompt per signature, with the requesting site shown in the popup
  receipt: ''
visual:
  kind: code
  filename: connect.ts
  code: |-
    import { WalletManager, GhostsigAdapter } from 'xrpl-connect';

    const wallet = new WalletManager({
      adapters: [new GhostsigAdapter()],
      network: 'testnet',
    });

    // A popup on ghostsig.dev and a passkey: nothing to install
    const { address } = await wallet.connect('ghostsig');

    // One passkey prompt approves one transaction
    const { hash } = await wallet.signAndSubmit({
      TransactionType: 'Payment',
      Destination: 'rDestination...',
      Amount: '1000000', // 1 XRP, in drops
    });
  caption: 'GhostSig through xrpl-connect, XRPL Commons’ wallet kit: one import, then one passkey prompt per signature.'
sections:
- id: what-it-does
  title: What it does
  body: |-
    GhostSig keeps no key. Each time the user signs, it derives the key from their passkey through the WebAuthn PRF extension, signs, and discards it. Nothing is written to storage, and there is no backend.

    - XRPL multi-purpose tokens and trust lines, and Stellar SEP-41 tokens
    - SLIP-39 split backups
    - A popup protocol any application can connect to, used by [Tansu](/open-source/tansu) and by Carbon Coin, our XRPL token demo
- id: where-it-ships
  title: Where it ships
  body: |-
    GhostSig is the default passkey module in the Stellar Wallets Kit, since v2.7.0, and in XRPL Commons’ xrpl-connect 1.0.0, so apps built on either kit can offer it without extra work. In xrpl-connect it is part of the main package and of its wallet picker; in the Stellar Wallets Kit it is one of the modules that follow SEP-43, Stellar’s wallet interface standard, exactly. One passkey wallet covers pilots on both networks.
- id: status
  title: Status
  body: |-
    GhostSig is in beta: mainnet is enabled, it has not been audited yet, and the work continues. [Pamphile](../../team/pamphile-roy) built it and maintains it, under the MIT license. Our other passkey wallet, [Nido](../../open-source/nido), is a smart-account wallet for Stellar only, with its rules enforced onchain.
tech:
- TypeScript
- WebAuthn PRF
- SLIP-10
- SLIP-39
- XRPL
- Stellar
receipts: |-
  - [ghostsig.dev](https://ghostsig.dev)
  - [Module in the Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit/blob/main/src/sdk/modules/ghostsig.module.ts)
  - [Adapter in xrpl-connect](https://github.com/XRPL-Commons/xrpl-connect/tree/develop/packages/adapters/ghostsig)
  - [xrpl-connect on npm](https://www.npmjs.com/package/xrpl-connect)
built:
- pamphile-roy
related:
- nido
- tansu
cta: Running a pilot on XRPL or Stellar? Talk to the engineers who build its wallets.
maintainer: Pamphile Roy
maintainerType: Person
license: MIT
languages:
- TypeScript
---
