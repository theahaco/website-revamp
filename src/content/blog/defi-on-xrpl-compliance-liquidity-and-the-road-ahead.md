---
title: 'DeFi on XRPL: compliance, liquidity and the road ahead'
category: Protocols
lede: 'XRPL keeps adding the pieces regulated DeFi needs at the protocol level: issuer controls, credentials, permissioned domains and a permissioned exchange. What is live, what is still missing, and how we advise teams issuing regulated assets on it today.'
author: enzo-soyer
authorName: Enzo Soyer
authorRole: Chief Executive Officer
date: November 13, 2026
readMinutes: '4'
cover: /images/covers/defi-on-xrpl-compliance-liquidity-and-the-road-ahead.webp
coverCaption: ''
authorBio: CEO of The Aha Company, a Ripple program partner for accelerator mentoring and developer experience on the XRP Ledger.
relatedWork: ripple
relatedWorkLabel: Ripple's accelerator cohorts and hackathons
audience: Protocols and products
network: XRPL
order: 1
description: 'What XRPL offers regulated DeFi today: issuer controls, credentials, permissioned domains and a permissioned DEX, what is still missing, and our advice.'
---
## Finance functions built into the ledger

The XRP Ledger has been in production since 2012. Issuance, issuer controls, a native exchange and escrow are functions of the ledger itself, not contracts a team writes and audits. Settlement is final in three to five seconds for a fraction of a cent, and validators are known entities: there is no mining and no staking economy to explain to a risk committee.

## A compliance toolkit that keeps deepening

Clawback went live in 2024. Deep Freeze, Credentials and Multi-Purpose Tokens (MPTs) followed in 2025, then Permissioned Domains and the Permissioned DEX in 2026, and in October 2026 delegated permissions, which give operational roles their own keys. Credentials let a trusted issuer attest onchain that an account passed KYC, without putting personal data on the ledger. A permissioned domain then restricts a market to credentialed accounts.

## Liquidity: what exists today

The native exchange and its AMM give issued tokens a market without a separate protocol, and the Permissioned DEX lets institutions trade on the same ledger while enforcing KYC and AML rules, though it cannot draw on the AMM's pools yet. The market is still small: RWA.xyz counted $0.5B of tokenized assets on XRPL in October 2026, plus $1.3B of stablecoins, almost all of it Ripple's RLUSD.

## What is still missing

The newest pieces are not yet connected. MPTs cannot trade on the native exchange today, and credentials do not yet decide who may hold a token. Native vaults and lending, proposed to validators in January 2026, stood between 46% and 57% support on October 8, 2026, against the more than 80% an amendment needs. There is no custom logic on the main ledger, so products with bespoke rules keep them offchain or wait for a protocol change.

## How we advise issuers today

- One MPT per instrument, with Require Auth as the KYC gate: the investor opts in, then the issuer approves.
- Instrument identifiers such as the name and ISIN in the token's metadata, documents offchain, referenced by link and hash. No investor data on the ledger.
- Finalize the compliance policy before issuance, because MPT settings are fixed at creation today.
- Check that the custodian supports MPTs before choosing the token model.

## The road ahead

Ripple's stated roadmap covers confidential balances for MPTs, native vaults and lending, MPTs on the exchange and Smart Escrows. Each depends on a validator vote, so none should be planned as a date. For teams building now, the practical path is to design for the ledger as it is, and keep the token model ready to adopt each piece as it lands.
