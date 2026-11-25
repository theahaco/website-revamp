---
title: Why Stellar is the right chain for tokenization
category: Institutions
lede: For a regulated issuer, the question is not which chain is fastest. It is where the controls a regulator expects are part of the ledger, where custodians already are, and where counterparties have already gone. On those three questions, Stellar is hard to beat.
author: the-aha-company
authorBio: Stellar Community Fund reviewers and co-authors of SEP-61.
date: November 9, 2026
readMinutes: '3'
cover: /images/covers/why-stellar-is-the-right-chain-for-tokenization.webp
coverCaption: ''
relatedWork: societe-generale-forge
relatedWorkLabel: EURCV, a regulated euro stablecoin on Stellar
audience: Financial institutions
network: Stellar
order: 2
description: 'For a regulated issuer, the right chain is where controls are part of the ledger and custodians and counterparties already are. Why Stellar fits.'
---
## The controls are part of the ledger

On Stellar, a token issued with the network's built-in functions carries issuer controls at the protocol level: authorization required, so only approved accounts can hold it, then freeze and clawback. A regulated issuer gets the controls its compliance team asks for without writing or auditing token code. Transactions settle in about five seconds, for a fraction of a cent.

EURCV, Société Générale-FORGE's regulated euro stablecoin, works this way. We built it with SG-FORGE’s compliance team on the built-in freeze and clawback: an address is frozen when it is flagged, with no contract in the transfer path.

## Smart contracts where the rules need them

Since Soroban, every Stellar asset also has a smart-contract interface, the Stellar Asset Contract, so an issuer can add rules the built-in controls cannot express, and take them off later without reissuing the asset.

## Institutions are already there

Franklin Templeton brought its money market fund to Stellar in 2021, the first US-registered fund on a public blockchain. Circle issues USDC and EURC on Stellar. Ondo's USDY and PayPal's PYUSD went live in September 2025, MoneyGram's MGUSD in June 2026, and EURCV, announced on Stellar in March 2026, after Ethereum, Solana and the XRP Ledger. The register of SAFO, the overnight fund from Spiko and Amundi, lives on Ethereum and Stellar. In May 2026, DTCC and the Stellar Development Foundation announced plans to tokenize DTC-custodied assets on Stellar, targeted for the first half of 2027.

## Custody is not a blocker

Major institutional custodians support Stellar for custody and for issuance. Check one thing early: support for native assets usually comes first, and support for smart contract calls can come later. That decides how much an issuer can rely on contracts on day one.

## What to weigh

Stellar is not the deepest market: RWA.xyz counted $3.6B of tokenized assets on Stellar in October 2026, against $16.8B on Ethereum. About half of Stellar's figure is issued as contract tokens, not native assets: Spiko's funds and the State Street and Galaxy fund among them. Native is the simplest choice, not the only one. A native asset has no asset-wide pause or rule engine of its own, so those come from a contract, with an audit to match. And most issuers go multi-chain sooner or later, so the useful question is which network carries the controls, not which one carries everything.

## Where to start

Start with the compliance policy, not the chain. If the built-in controls cover it, a native asset is the simplest thing to operate and to audit. If the product needs subscription, redemption and cash settlement onchain, add contracts on Soroban. Either way, choose the custodian before the token model.
