---
title: Is Cardano the right chain for tokenization?
category: Institutions
lede: 'For tokenized Swiss shares, Cardano became a real option in October 2026: a programmable token standard with transfer rules went live, and Switzerland''s Capital Markets and Technology Association recognized a profile of it as equivalent to its own token for shares. For a stablecoin or a fund that needs freeze, seizure and broad custody on day one, the pieces are still arriving.'
author: enzo-soyer
authorBio: CEO of The Aha Company, an integration partner for financial institutions bringing assets onchain.
date: November 23, 2026
readMinutes: '3'
cover: /images/covers/is-cardano-the-right-chain-for-tokenization.webp
coverCaption: ''
relatedWork: ''
relatedWorkLabel: ''
audience: Financial institutions
network: Cardano
description: 'A programmable token standard with transfer rules went live on Cardano in October 2026. What it changes for shares, stablecoins and funds, and what is missing.'
---
## Tokens are native to the ledger

Since the Mary hard fork in March 2021, Cardano tracks tokens in the ledger itself, alongside ADA, so a plain transfer runs no smart contract. A minting policy decides who may create or burn a token, and a time-locked policy can make its supply provably fixed. Fees and script results can be computed before a transaction is sent, and if the ledger accepts it, its effects are exactly the ones computed. A simple transfer costs about 0.17 to 0.20 ADA, set by a formula, with no fee auction.

## Transfer rules arrived in October 2026

Once minted, a plain native token moves freely: the ledger has no freeze, clawback or approved-holder list. [CIP-0113](https://cips.cardano.org/cip/CIP-0113), the programmable token standard the Cardano Foundation [announced live on mainnet](https://cardanofoundation.org/blog/programmable-tokens-cardano-mainnet) on October 7, 2026, lets issuers add them. Tokens stay native assets, held at a shared script address, and every transfer runs the issuer's rules, such as KYC checks, allow-lists, limits and freezes; the issuer can also seize tokens. The first announced issuance was the equity of Veridian, a Cardano Foundation spin-out. Separately, the Capital Markets and Technology Association (CMTA), a Swiss industry body, [recognized a CIP-0113 profile](https://cmta.ch/news-articles/cardano-s-cip-0113-programmable-asset-tokens-recognized-as-equivalent-to-the-cmtat-under-the-cmta-certification-scheme) as equivalent to its CMTAT token for certifying Swiss tokenized shares. Debt is outside that scope.

## Who issues on Cardano today

Since February 2026, [USDCx](https://www.circle.com/blog/usdcx-on-cardano-now-available-via-circle-xreserve), a dollar stablecoin issued by a protocol on Cardano and backed by USDC held in Circle's xReserve, has given Cardano access to USDC. The largest fiat-backed dollar stablecoins issued on Cardano itself are Moneta's USDM, live since 2024, and Anzens' USDA, live since 2025. Kinka, a subsidiary of Japan's UNBANKED, issued gold-backed tokens on Cardano in April 2025, and Archax, an FCA-regulated exchange, added Cardano to its tokenization engine in March 2026. The most notable bank launch sits next door: in November 2026, UK bank Monument launched tokenized deposits on Midnight, Cardano's privacy-focused partner chain.

## Custody is the gating item

BitGo has supported selected Cardano native tokens since December 2025, and the Cardano Foundation expects Fireblocks, which supports ADA, to offer [full native-token support](https://cardanofoundation.org/blog/fireblocks-cardano-native-tokens) by March 2027. We know of no major custodian that had announced support for CIP-0113 tokens by November 2026: because they sit at a shared script address, custodians, wallets and exchanges need specific integration work to show and move them.

## What to weigh

Cardano's tokenized markets are small: DefiLlama put its stablecoins at $50M to $60M in November 2026. Blocks arrive about every 20 seconds and settlement is probabilistic; Ouroboros Peras, which could settle blocks in as little as two minutes, is planned for a later upgrade. Every output holding tokens must also carry about 1.2 ADA or more, so issuers and distributors manage an ADA float, and that minimum and the fees are protocol parameters that can change by governance vote. CIP-0113 is still a "Proposed" standard, and its deployments are upgradable: whoever holds the upgrade authority can change the rules for every token, so a regulated issuer needs to know who that is. And by default, freezing one programmable token also immobilizes the other tokens held in the same output.

## Where to start

Start with the compliance policy. If the instrument needs freeze or seizure, plan on CIP-0113, choose or write its rule set, and ask who holds the deployment's upgrade authority. Then check custody: native tokens at BitGo today, programmable tokens only with integration work. For Swiss shares, CMTA's recognition gives a reference a legal team can check. For a stablecoin or a fund, run a testnet pilot with the custodian before committing to a launch date.
