---
title: Why XRPL is the right chain for tokenization
category: Institutions
lede: On the XRP Ledger, issuing a token, approving who may hold it, freezing a balance and clawing it back are functions of the ledger itself. A regulated issuer configures them instead of writing and auditing token code, and banks and asset managers already issue there.
author: enzo-soyer
authorBio: CEO of The Aha Company, a Ripple program partner for accelerator mentoring and developer experience on the XRP Ledger.
date: November 25, 2026
readMinutes: '3'
cover: /images/covers/why-xrpl-is-the-right-chain-for-tokenization.webp
coverCaption: ''
relatedWork: ripple
relatedWorkLabel: Ripple's accelerator cohorts and hackathons
# While Ripple is hidden (src/data/curation.ts), this bio replaces the one above
# and the Related work link is left out.
ifClientHidden:
  ripple:
    authorBio: CEO of The Aha Company, an integration partner for financial institutions bringing assets onchain.
audience: Financial institutions
network: XRPL
description: 'On the XRP Ledger, issuer controls are ledger settings, and banks and asset managers already issue there. Why XRPL fits tokenization, and what to check first.'
---
## Issuer controls are ledger settings

On the XRP Ledger (XRPL), the core controls a compliance team asks for are ledger settings, not code to audit. The issuer can require its approval before an account holds the token, freeze one holder or all of them, and claw tokens back. [Multi-Purpose Tokens](https://xrpl.org/docs/concepts/tokens/fungible-tokens/multi-purpose-tokens) (MPTs), live since October 2025, carry these settings for each issuance, along with a supply cap and up to 1,024 bytes of metadata. Transactions settle in 3 to 5 seconds for a fraction of a cent.

## Compliance checks without personal data onchain

[Credentials](https://xrpl.org/docs/concepts/decentralized-storage/credentials), live since September 2025, let a trusted party such as a KYC provider attest on the ledger that an account meets a requirement, without publishing the data behind it. A permissioned domain turns a set of accepted credentials into an allow-list, and since February 2026 the permissioned DEX uses it to open an order book only to credentialed accounts. Since October 2026, delegated permissions let an issuer hand specific transactions, such as authorizing holders, to operational accounts, so the issuing key can stay offline.

## Institutions are already there

Ripple's dollar stablecoin, RLUSD, issued by its New York-regulated trust company, has been live on the XRP Ledger and Ethereum since December 2024. Ondo's OUSG, Guggenheim Treasury Services' digital commercial paper and Circle's USDC followed in June 2025. Société Générale-FORGE launched EURCV there in February 2026, and Aviva Investors tokenized share classes of its dollar and sterling liquidity funds in July and October 2026. Franklin Templeton's Singapore fund token, sgBENJI, announced with DBS and Ripple in September 2025, is issued as an MPT.

Registries and market infrastructures are following. The Dubai Land Department's property tokenization pilot issues its title-deed tokens on the ledger through Ctrl Alt, and in September 2026 CSD BR, a Brazilian market infrastructure, announced it would mirror ownership records of tokenized BTG Pactual fund shares there.

## Custody: check the token format

Ripple Custody documents support for both token formats, MPTs included. BitGo and Fireblocks support XRPL trust line tokens, and Komainu holds the wallets of Aviva's tokenized share classes. MPTs are the newer format, so confirm the custodian's support for them early: it decides which format an issuer can use on day one.

## What to weigh

On November 24, 2026, [RWA.xyz](https://app.rwa.xyz/networks/xrp-ledger) counted $2.8B of tokenized assets that holders can move between wallets on the XRP Ledger, against $14.4B on Ethereum, and a single energy token accounts for more than two thirds of the XRPL figure. Another $3.0B is recorded on the ledger but cannot leave its issuers' platforms. The ledger runs no general smart contracts: rules its settings cannot express run offchain, and Smart Escrows are still in development. MPTs cannot trade on the native exchange yet, and native vaults and lending, released for validator voting in January 2026, were still short of the more than 80% support they need in late November 2026. Holders need a small amount of XRP for reserves and fees. And many issuers go multi-chain: RLUSD, OUSG and EURCV all live on more than one network.

## Where to start

Start with the compliance policy, because today holder approval and clawback cannot be added once tokens circulate. Then choose the format: an MPT for a new instrument, a trust line token if it must trade on the native exchange today. Then confirm that the custodian supports that format. Our [Carbon Coin testnet demo](/networks/xrpl) shows the pattern for an MPT: a 2-of-3 multisig issuer, with freeze and clawback set at creation.
