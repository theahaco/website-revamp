---
title: 'Stellar Scaffold: how we built the developer toolkit'
category: Ecosystems
lede: Stellar Scaffold takes a team from an empty folder to contracts, a web front end, a local network and typed clients in one command. Why we built it as a Stellar CLI plugin, and what it took to make it production-grade.
author: willem-wyndham
authorName: Willem Wyndham
authorRole: Chief Science Officer
date: November 4, 2026
readMinutes: '3'
cover: /images/covers/scaffold-stellar-how-we-built-the-developer-toolkit.webp
coverCaption: ''
authorBio: Chief Science Officer at The Aha Company. Architect of Stellar Scaffold and of the Stellar Registry contract.
relatedWork: stellar-development-foundation
relatedWorkLabel: 'Stellar Development Foundation: tooling and public goods'
audience: Ecosystems and open source
network: Stellar
order: 3
description: 'How we built Stellar Scaffold: from an empty folder to contracts, a front end, a local network and typed clients in one command, as a Stellar CLI plugin.'
---
## The problem: a blank repository

When Soroban brought smart contracts to Stellar, every new project started the same way: write a contract, compile it to WebAssembly, deploy it to a local network, generate a client, wire that client into a front end, and repeat on every change. Each step had a tool, and nothing joined them. A proof of concept spent its first week on plumbing.

## Built on the Stellar CLI's plugin system

We were already core contributors to the Stellar CLI, the network's official command-line tool. One of the pieces we built there is its plugin system, which lets a separate tool run as a `stellar` subcommand. Stellar Scaffold is such a plugin, and it grew out of Loam, the tool we started in 2023. It reuses the CLI's networks, keys and contract commands instead of reimplementing them, so a project behaves the same way on a laptop and on a public network.

## What one command sets up

- Contracts, built and deployed in dependency order
- A web front end in React or Svelte, wired to those contracts
- A local network running in Docker
- TypeScript clients generated from each contract's interface, regenerated on every change

The other commands follow the life of the project: build, watch, generate, upgrade, and doctor, which checks a project's setup.

## Safe by default

Configuration lives per network, and secrets stay out of the repository. Deployment to a public network is locked unless the project explicitly allows it, so a demo cannot reach mainnet by accident. Contract templates come from OpenZeppelin: allowlist, blocklist and pausable tokens, the patterns a regulated issuer asks for on day one.

## Release engineering

Stellar Scaffold ships for six platforms from one release pipeline, and every release comes with a software bill of materials. As of November 2, 2026, it has had 37 releases, and version 1.0 is in preparation.

## Maintained as a public good

Stellar Scaffold is open source, listed in the official Stellar documentation and funded as a Stellar public good. On November 2, 2026, 111 projects built on it, and OpenZeppelin's Contracts Wizard exports any Stellar contract as a Stellar Scaffold package. It runs on a quarterly proposal and review, which keeps it maintained, not merely released. Who builds on it, with every count dated, is on its [tool page](/open-source/stellar-scaffold).

## What it changes for a client

A client's proof of concept starts from a reproducible, documented project instead of a blank repository. The same structure carries the project to testnet and then to mainnet, so the first week goes to the product, not the plumbing.
