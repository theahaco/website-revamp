---
name: Stellar Scaffold
order: 2
network: Stellar
category: Developer tooling
title: 'Stellar Scaffold: a working Stellar dApp in one command'
metaTitle: 'Stellar Scaffold (Scaffold Stellar): Soroban dApp toolkit'
description: 'Stellar Scaffold, also called Scaffold Stellar, sets up a Soroban dApp in one command: contracts, typed TypeScript clients and a front end. 111 projects use it.'
lede: 'One command gives a working Stellar dApp: smart contracts, generated TypeScript clients and a web front end, wired to a local network, testnet and mainnet. We built Stellar Scaffold (Scaffold Stellar in Stellar’s docs) and maintain it as a Stellar public good. On November 2, 2026, 111 projects were building on it.'
summary: 'One command from an empty folder to contracts, typed clients and a web front end.'
headline:
  figure: '111'
  label: projects build on it
facts:
- label: Network
  value: Stellar
- label: Our role
  value: Built and maintained since 2025
- label: Funding
  value: Stellar public good
- label: Status
  value: 37 releases, version 1.0 in preparation
  live: true
- label: Language
  value: Rust and TypeScript
- label: Runs as
  value: A Stellar CLI plugin
metrics:
- figure: '111'
  label: Projects building on it (November 2, 2026)
  receipt: ''
- figure: 21,492
  label: Crate downloads (November 2, 2026)
  receipt: https://crates.io/crates/stellar-scaffold-cli
- figure: '37'
  label: Releases (November 2, 2026)
  receipt: https://crates.io/crates/stellar-scaffold-cli/versions
- figure: '16'
  label: Contributors to the main repo, bots excluded
  receipt: https://github.com/stellar-scaffold/cli/graphs/contributors
visual:
  kind: image
  image: /images/tools/scaffold-stellar.webp
  alt: 'The Stellar Scaffold site on a phone: go from an empty directory to a deployed Stellar dApp, installed with cargo binstall stellar-scaffold-cli.'
  tone: light
  label: 'A real session of the Stellar Scaffold CLI plugin: its help and its first commands, from init to watch'
  lines:
  - '$ stellar scaffold --help'
  - 'Build smart contracts with frontend support'
  - ''
  - 'Usage: stellar-scaffold [OPTIONS] <COMMAND>'
  - ''
  - 'Commands:'
  - '  init        Initialize the project'
  - '  version     Version of the stellar-scaffold-cli'
  - '  build       Build contracts, resolving dependencies in the correct order; build clients (JS packages) as specified in `scaffold.yml`'
  - '  generate    generate contracts'
  - '  ext         Inspect and manage extensions'
  - '  upgrade     Upgrade an existing Soroban workspace to a scaffold project'
  - '  update-env  Update an environment variable in a .env file'
  - '  watch       Monitor contracts and environments.toml for changes and rebuild as needed'
  - '…'
  caption: 'Install it with `cargo binstall stellar-scaffold-cli`, start a project, and it runs against a local network in a few minutes. It runs as `stellar scaffold`, here in a real session (version 0.0.34, recorded on November 5, 2026).'
sections:
- id: what-it-does
  title: What it does
  body: |-
    Starting a Stellar project used to mean wiring the pieces by hand: a contract workspace, a local network, deploy scripts, client bindings and a front end that talks to all of them. Stellar Scaffold sets them up in one command:

    - Contracts, built and deployed in dependency order
    - A web front end wired to those contracts
    - A local network running in Docker
    - TypeScript clients generated from each contract’s interface, regenerated on every change

    It runs as a [Stellar CLI](/open-source/stellar-cli) plugin, so it uses the networks, keys and commands teams already have. Deployment to a public network stays locked unless the project allows it, and every release ships with a software bill of materials.
- id: adoption
  title: Who builds on it
  body: |-
    111 projects build on Stellar Scaffold, from Stellar Community Fund teams and hackathon entries to community projects and courses. A selection:

    | Project | Team | Since |
    |---|---|---|
    | [Strata Vault Kit](https://github.com/BootNodeDev/strata-vault-kit), open RWA vault infrastructure | BootNode (SCF #45) | August 2026 |
    | [Ballast vault demo](https://github.com/BootNodeDev/stellar-vault-demo-dapp), an OpenZeppelin vault with a Scaffold dApp | BootNode (SCF #45) | July 2026 |
    | [stellar-wallet-mock](https://github.com/SentinelFi/stellar_wallet_mock), end-to-end testing for Scaffold dApps | Sentinel Protocol (SCF #35, #36) | March 2026 |
    | [Stellar SAFT](https://github.com/jamesbachini/Stellar-SAFT), a React interface built with Scaffold | SoroPG’s author | July 2025 |
    | [AuraCoin](https://github.com/pragya-shar/aura-coin-scaffold), an OpenZeppelin Wizard token as a Scaffold app | QuillTip’s author (SCF #39) | July 2025 |

    At HackMeridian 2026, 6 of the 165 submissions started their repo on Stellar Scaffold during the hackathon, all on October 25: Arqueo, Blendlord, DCA Platform, DrainMyWallet, ZBE TOLL and ZEPHO. One Scale-track team, Fermentos Norberto y Raimunda, has built on it since August 2025.

    A scan of more than 1,600 public repos from earlier Stellar hackathons (Hack Pera and Grand Pera in Istanbul, Hack-o-Ween at Harvard and MIT, HackMeridian 2025 in Rio and a YTU hackathon in Istanbul) found 7 more, such as Spellbound, a card battle game, and Gasolina, a gas-abstraction SDK for Soroban.

    GitHub code search finds 86 more public projects carrying Scaffold’s configuration or template, in 189 repos from 158 owners. The largest are community projects whose contributors fork them to work on: LearnVault, Quipay, PayD, Prompt Hash, Stellar Save and prompt-mint. Courses and bootcamps teach with it too, from Odisea and Código Futura in Latin America to HCMUS in Vietnam.
- id: where-builders-find-it
  title: Where builders find it
  body: |-
    - The Stellar developer docs list Stellar Scaffold under Tools, with its own page.
    - OpenZeppelin’s Contracts Wizard exports any Stellar contract as a Stellar Scaffold package.
    - PG Atlas, the Stellar Community Fund’s map of public goods, scores its adoption at 88.9, 12th of the 91 public goods it rates (November 2, 2026).
    - 16 contributors (November 2, 2026) have shipped to the main repo, including the authors of the SCF-funded Soroban SDK Tools and SoroPG.
- id: history
  title: Where it came from
  body: |-
    Stellar Scaffold grew out of Loam, the tool we started in 2023. Loam’s crates have 71,027 downloads since August 2023, and Stellar Scaffold’s 21,492 since May 2025 (crates.io, November 2, 2026). The Stellar Community Fund funds its maintenance as a public good, on a quarterly proposal and review, which keeps it maintained, not merely released. [How we built it](/blog/scaffold-stellar-how-we-built-the-developer-toolkit), by Willem Wyndham.
tech:
- Rust
- TypeScript
- React
- Soroban
- Docker
- Stellar CLI
receipts: |-
  - [GitHub](https://github.com/stellar-scaffold/cli)
  - [stellar-scaffold-cli on crates.io](https://crates.io/crates/stellar-scaffold-cli)
  - [PG Atlas](https://www.pgatlas.xyz)
built:
- willem-wyndham
- zach-fedor
- pamela-selle
- chad-ostrowski
- pamphile-roy
- elizabeth-engelman
related:
- stellar-registry
- stellar-cli
cta: Starting a Stellar project? Talk to the team that maintains its starter kit.
repo: https://github.com/stellar-scaffold/cli
languages:
- Rust
- TypeScript
---
