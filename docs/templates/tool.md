---
# Copy this file to src/content/tools/<slug>.md, for example
# src/content/tools/acme-sdk.md -> theaha.co/open-source/acme-sdk
# The tool then appears on /open-source, on the Work page, on the home page
# "Open source" block, and on the team pages of the people in `built`.

name: Acme SDK
title: 'Acme SDK: a typed client for Soroban contracts'
# Page heading: "<name>: <what it is>". The Work page shows the part after the colon.
metaTitle: 'Acme SDK: typed Soroban clients | The Aha Company'
# Optional <title> for Google, 60 characters or fewer.
description: 'What Google shows: 120 to 160 characters, with the words people search for.'
lede: 'Two or three sentences: what it does, who it is for, where it stands.'
summary: 'One line for the /open-source card and the home page.'
category: Developer tooling
# Developer tooling, Wallet, Smart accounts, Privacy, Governance...
network: Stellar
# Stellar, XRPL, or "XRPL and Stellar".
order: 100
# Position on /open-source and in lists (lower first).

headline:
  figure: '42'
  label: projects build on it
  # Shown on the cards: "42 projects build on it".

facts:
- label: Network
  value: Stellar
- label: Our role
  value: Built and maintained by our team
- label: Status
  value: On mainnet since 2026
  live: true
- label: License
  value: Apache-2.0

metrics:
# Up to four figures, each dated, each with a public receipt when possible.
- figure: '42'
  label: Projects building on it (November 2, 2026)
  receipt: https://github.com/example/acme-sdk

visual:
  kind: ''
  # '' (none), image, code, bars or terminal.
  # image: image: /images/tools/acme-sdk.webp, alt: '...', tone: dark or light
  #   (a phone capture of the tool's site: see public/images/tools/README.md)
  # code: filename: example.ts, code: |- (the code, indented)
  # bars: title: '...', bars: - label, sub, value (number), display, highlight
  # terminal: label: '...', lines: - '$ a command' then each printed line,
  #   copied from a real run (cut whole lines only, marked '…')
  caption: ''

sections:
- id: what-it-does
  title: What it does
  body: |-
    Plain explanation for someone who has never used it.
- id: status
  title: Where it stands
  body: |-
    Releases, audits, who uses it, with dates.

tech:
- Rust
- TypeScript
receipts: |-
  - [GitHub](https://github.com/example/acme-sdk)
built:
- willem-wyndham
# Team file names, in credit order.
related:
- stellar-scaffold
# Other tool file names shown under "More open-source tools".
cta: Building on Stellar? Talk to the engineers who write its tooling.
repo: https://github.com/example/acme-sdk
license: Apache-2.0
languages:
- Rust
draft: false
---
