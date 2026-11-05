---
# Copy this file to src/content/case-studies/<slug>.md, for example
# src/content/case-studies/acme-bank.md -> theaha.co/case-studies/acme-bank
# For a client under NDA, start the file name with nda- and never write the
# client's name anywhere (file name, text, alt text, image), not even in a draft
# or a pull request: this repository and its history are public.

title: Acme Bank
# Page heading: the client's name, or a description for a client under NDA
# ("A tokenized share class for a money-market fund").
metaTitle: 'Acme Bank: a regulated stablecoin on Stellar'
# Optional <title> for Google, 60 characters or fewer (default: "<title> | Case study | The Aha Company").
shortTitle: Acme Bank
# Short name used in "More work" and on team pages.
eyebrow: Financial institution · Stellar
# Who it was for · network. Financial institution, Protocol, Ecosystem or Alliance.
lede: 'One or two sentences: what we built, for whom, and where it stands.'
description: 'What Google shows: 120 to 160 characters, with the words people search for.'
cta: Issuing a stablecoin? Talk to the engineers who built this one.
# Heading of the call-to-action band at the bottom.

client: Acme Bank
nda: false
# true shows the "Under NDA" pill; then use a description as client ("Top US commercial bank").
ndaSummary: ''
# For NDA cases listed on the home page: one line.

workTitle: A regulated stablecoin on Stellar
workLine: 'One line for the Work page list.'
audience: Financial institutions
# Work page filter: Financial institutions, Protocols and products, or Ecosystems and open source.
network: Stellar
# Stellar, XRPL, Canton or Multi-network.
year: 2026
order: 100
# Position on the Work page (lower first). The home page selection is in src/data/curation.ts.

facts:
- label: Client
  value: Acme Bank
  style: plain
- label: Role
  value: Smart contract engineering
  style: plain
- label: Network
  value: Stellar
  style: net
- label: Status
  value: Live
  style: net
  live: true
  # live: true adds the green dot.
- label: Year
  value: '2026'
  style: plain
- label: Engagement
  value: Integration partner
  style: plain

hero:
  image: /images/cases/acme-bank.webp
  # 2520 x 1080 px (21:9), uploaded to public/images/cases/. Also the LinkedIn/X preview.
  alt: 'What the image shows, in a sentence'
  caption: ''

metrics:
# Up to four figures. Each with a date or a source when it can change.
- figure: Live
  label: On Stellar mainnet since Q1 2026
  receipt: ''
  # Optional link that proves the figure (explorer, public repo, announcement).
- figure: '3'
  label: Distinct onchain roles
  receipt: ''

sections:
# Keep the four ids. An empty body hides the section. Markdown works inside.
- id: challenge
  title: Challenge
  body: |-
    What the client needed and what made it hard.
- id: solution
  title: Solution
  body: |-
    What we did, in plain words.
- id: architecture
  title: Architecture highlights
  body: |-
    - One line per highlight
    - Second highlight
- id: outcome
  title: Outcome
  body: |-
    Where it stands now, with dates and figures.

tech:
- Soroban
- Rust
receipts: |-
  - [Public link that proves the work](https://example.com)
relatedService: Stablecoin issuance and governance
team:
- enzo-soyer
# File names from src/content/team/ (without .md), in the order to show them, the lead first.

quote:
  label: ''
  # Write Placeholder quote here while the client has not approved the quote:
  # the preview shows it, theaha.co never does.
  text: ''
  author: ''
  role: ''
  portrait: ''
  portraitAlt: ''
  logo: ''
  logoAlt: ''

draft: false
---
