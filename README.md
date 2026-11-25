# theaha.co

The Aha Company website.

> **Publishing an article, a case study or a team member?** You need no installation and no code: follow [Publishing on theaha.co](docs/CONTENT.md), from the GitHub website.

The rest of this page is for developers. A static site built with [Astro](https://astro.build): every push to `main` deploys theaha.co on GitHub Pages.

It started as a rebuild of a Webflow design: same pages, URLs, copy, design and behavior, with the Webflow runtime and CMS replaced by plain HTML, a few small scripts and Markdown content files.

## Run it locally

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/
npm run check      # after a build: every internal link, image and #anchor resolves
```

To check a build made for a sub-path (as on `theahaco.github.io/website/`): `BASE_PATH=/website npm run build && BASE_PATH=/website npm run check`.

Node 22.23.4 or newer (24 recommended: `.nvmrc`).

## Where things are

| What | Where |
| --- | --- |
| Pages (one file per URL) | `src/pages/` |
| Case studies, articles, networks, team, open-source tools | `src/content/<collection>/*.md` |
| Field definitions for those collections | `src/content.config.ts` |
| Nav, footer, contact details, form endpoint, Calendly link, analytics | `src/data/site.ts` |
| Shared layout (head, nav, footer, scripts) | `src/layouts/BaseLayout.astro` |
| Reusable blocks (work rows, CTA, cards) | `src/components/` |
| Styles | `src/styles/webflow.css` (the original Webflow stylesheet, unchanged), `src/styles/site.css` (custom code that lived in Webflow embeds) |
| Browser scripts (menu, tabs, filters, questionnaire, form) | `src/scripts/` |
| Images, logos, favicons | `public/` |

## Editing content

The step-by-step guide for non-developers is [`docs/CONTENT.md`](docs/CONTENT.md), with templates in [`docs/templates/`](docs/templates/). `scripts/check-content.mjs` runs before every build: it explains content mistakes in plain words, with the file and the line (shown on the pull request on GitHub).

Each case study, article, network and team member is a Markdown file. The frontmatter holds the structured fields (client, network, metrics, quote...), the body or the named Markdown fields hold the rich text. Add a file, push, and it appears everywhere it is listed (home, Work, network pages, team pages) with its own page at the matching URL.

- `src/content/case-studies/<slug>.md` → `/case-studies/<slug>`
- `src/content/blog/<slug>.md` → `/blog/<slug>`
- `src/content/networks/<slug>.md` → `/networks/<slug>`
- `src/content/team/<slug>.md` → `/team/<slug>`
- `src/content/tools/<slug>.md` → `/open-source/<slug>` (one page per open-source tool: facts, dated figures with receipts, a visual from `public/images/tools/`, the story, builders; team pages list the tools each person is credited for)

Set `draft: true` in the frontmatter to keep an item off the site. The file stays public on GitHub, and it must still be valid: a draft with an error stops the build. A `description` field (160 characters at most) sets what search engines show; without it, the lede is used.

Testimonials still waiting for approval carry the quote label `Placeholder quote`: the preview shows them, the production build never does (the slot keeps the logo, labelled “Client”).

## Deployment

Production is hosted by GitHub Pages from `theahaco/theahaco.github.io`:

- `.github/workflows/deploy.yml` builds and publishes https://theaha.co/ on every push to `main` (including merges), every morning at 05:30 UTC and on demand. Scheduled runs may be delayed by GitHub.
- Repository Settings → Pages uses **GitHub Actions**, custom domain **theaha.co**, and **Enforce HTTPS**.
- The workflow explicitly builds for `https://theaha.co` at `/`: production is indexable, hides future articles, and enables configured analytics.
- Pull requests run `.github/workflows/check.yml`, including production and preview-mode builds, but do not publish a hosted preview. For a local preview with future articles, run `SITE_URL=http://localhost:4321 npm run dev`.

Safeguards: a build with a broken link, image or anchor fails before it is published, and a mandatory production check verifies indexability and the homepage canonical URL. Failed builds leave the previous deployment live. Only a build for `https://theaha.co` (`site.productionOrigin` in `src/data/site.ts`) is indexable; `www.theaha.co` and `http://` builds are treated as theaha.co. GitHub Pages ignores the legacy Cloudflare files `public/_headers` and `public/_redirects`; redirect stubs in `src/pages/` provide the supported page redirects. Deployment checks and operational notes: [`docs/LAUNCH.md`](docs/LAUNCH.md).

## Contact form

Set `contact.formEndpoint` in `src/data/site.ts` to a Formspree form address (`https://formspree.io/f/...`, or any endpoint that accepts a form POST and answers JSON). The form already carries Formspree's `_subject` and `_gotcha` (spam trap) fields, and the privacy policy names Formspree once the address is set. Until then the button reads “Open in my email app”: the form writes the message into the visitor's email app, addressed to `hello@theaha.co`, and says so.

## Analytics

Set `analytics` in `src/data/site.ts`: the provider (`umami`, `plausible`, `cloudflare` or `ga4`) and its script tag as given. It loads on theaha.co only, never on the preview, and the privacy policy describes whichever provider is set. The site sends three events: `Call booked` (a Calendly booking), `Contact form sent` and `Email click`.

## Legal pages

`/terms` and `/privacy` are written for Dawning Inc. (dba The Aha Company) and a US audience. Update the `updated` date at the top of each file when the text changes.
