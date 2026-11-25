---
title: Why Canton is the right network for tokenization
category: Institutions
lede: Two questions matter to a bank considering a shared ledger. Will its positions stay private, and will both legs of a trade settle together? Canton was designed around those two questions, and in October 2026 the DTCC Tokenization Service went live on it, alongside DTCC's private network.
author: enzo-soyer
authorBio: CEO of The Aha Company, an integration partner for financial institutions bringing assets onchain.
date: November 24, 2026
readMinutes: '3'
cover: /images/covers/why-canton-is-the-right-network-for-tokenization.webp
coverCaption: ''
relatedWork: ''
relatedWorkLabel: ''
audience: Financial institutions
network: Canton
description: 'Canton keeps positions private and settles both legs of a trade together, and DTCC''s tokenization service now runs on it. Why it fits, and what to weigh.'
---
## Each party sees only its part

On Canton, a transaction is split into views, and each participant receives only the parts it is entitled to see. Other validators learn nothing, not even that it happened, and the Super Validators that order transactions see who is involved and when, [not the contents](https://docs.canton.network/appdev/deep-dives/privacy-model). Contracts are written in Daml, which states who must sign each contract, who may see it and who can act on it, so a regulator or an auditor can be given a read-only view.

## Both legs settle together

One Daml transaction can touch contracts from several applications, a tokenized bond in one and cash in another, and it commits or aborts as a whole. That is how delivery versus payment works on Canton. [CIP-0056](https://github.com/canton-foundation/cips/blob/main/cip-0056/cip-0056.md), the network's token standard since March 2025, gives the tokens that adopt it the same interfaces for holdings, transfers and settlement allocations, so wallets can show any compliant asset and applications can settle against each other.

## Market infrastructure is already there

The [DTCC Tokenization Service](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live) went live on October 28, 2026, integrated with Canton and DTCC's private Besu network, after limited-production trades with more than 30 firms in July. Broadridge, whose Distributed Ledger Repo platform runs on Canton technology, reported $7.6 trillion of repo processed in October 2026. In August 2025, Digital Asset and a working group including Bank of America, Citadel Securities, DTCC, Tradeweb and Virtu reported an onchain US Treasury financing on Canton, done on a Saturday with USDC as the cash leg.

Since December 2025, [USDCx](https://www.circle.com/blog/usdcx-on-canton-now-available-via-circle-xreserve), a stablecoin minted by a protocol on Canton against USDC held in Circle's xReserve, has brought USDC to the network. Franklin Templeton, LSEG and Visa have been approved as Super Validators, and in January 2026 Kinexys by J.P. Morgan announced plans to issue its dollar deposit token, JPMD, natively on Canton in phases through 2026. The Canton Foundation, which coordinates the network's governance, is co-chaired by DTCC and Euroclear.

## Custody is catching up with tokens

Custody of Canton Coin, the network's own token, came first. Support for the token standard followed: Taurus in November 2025, BitGo in March 2026, and Fireblocks by July 2026, with contract calls for delivery versus payment. Check two things early: whether the custodian can take part in the settlement workflow as well as hold and send the token, and which asset registries it supports.

## What to weigh

Privacy has a cost in visibility. RWA.xyz's Canton figure comes entirely from Broadridge's repo platform, $405B of daily repo turnover on November 24, 2026, and the trillions quoted for Canton measure monthly transaction volume, largely repo, rather than assets held. An asset's controls are Daml code, written by its issuer or by a registry provider such as Digital Asset, so there is code to audit, and two tokens under the same standard can give their issuers different powers. Atomic settlement holds within one synchronizer: moving contracts between synchronizers is a separate step. Running a validator takes approval from the Canton Foundation and a sponsoring Super Validator, and fees are paid by burning Canton Coin for network traffic. And DTCC plans to connect its service to Stellar and Solana in 2027, so Canton will not be its only public network.

## Where to start

Start with the compliance policy, and turn it into who must sign, who may see and where the regulator's read-only view sits. Then choose the registry that will run the asset's controls, and have its code audited. Then pick a custodian that can take part in the settlement workflow, and settle what the cash leg will be before designing the asset.
