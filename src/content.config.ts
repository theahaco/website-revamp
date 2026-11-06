// Content collections: what used to be the Webflow CMS.
// Every field is optional with an empty default, like Webflow fields:
// templates skip empty ones exactly as the Webflow site did.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Text fields are forgiving, so files edited by hand on GitHub still build:
// a number (year: 2026) becomes text, an empty value (caption:) becomes '',
// and a date written 2026-11-20 becomes "November 20, 2026".
const toText = (v: unknown) => {
  if (v === null || v === undefined) return undefined;
  if (v instanceof Date) return v.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  return v;
};
const str = z.preprocess(toText, z.string().default(''));
const quote = z
  .object({
    label: str, // small tag above the quote ("Placeholder quote" until approved)
    text: str,
    author: str,
    role: str,
    portrait: str,
    portraitAlt: str,
    logo: str,
    logoAlt: str,
  })
  .default({});

const caseStudies = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './src/content/case-studies' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(), // page heading
    metaTitle: str, // <title> for search engines (60 characters max); defaults to "<title> | Case study | The Aha Company"
    shortTitle: str, // used in "More work" and team engagement rows
    alliance: z.boolean().default(false), // an alliance, not a client engagement: listed last, without a link to a case page
    order: z.number().default(100), // Work page order
    eyebrow: str, // "Financial institution · Stellar"
    lede: str, // also the paragraph in Selected work on the home page
    description: str, // search description (160 characters max); defaults to the lede
    ndaSummary: str, // one-liner in the "Client under NDA" block on home
    cta: str, // heading of the closing call-to-action band
    client: str,
    nda: z.boolean().default(false), // shows the "Under NDA" pill on the Work page
    workTitle: str, // Work page row title
    workLine: str, // Work page row line
    // Work page filter. "Institutions" (the former label) is still accepted.
    audience: z.preprocess((v) => (v === 'Institutions' ? 'Financial institutions' : v), z.enum(['Financial institutions', 'Protocols and products', 'Ecosystems and open source', '']).default('')),
    network: str, // Stellar, XRPL, Canton, Multi-network
    year: str,
    facts: z.array(z.object({ label: z.string(), value: str, style: z.enum(['plain', 'net']).default('plain'), live: z.boolean().default(false) })).default([]), // live: green status dot
    hero: z.object({ image: str, alt: str, caption: str }).default({}),
    metrics: z.array(z.object({ figure: str, label: str, receipt: str })).default([]),
    sections: z.array(z.object({ id: z.string(), title: z.string(), body: str })).default([]),
    tech: z.array(z.string()).default([]),
    receipts: str, // Markdown list of links
    relatedService: str,
    team: z.array(z.string()).default([]), // team member slugs
    quote,
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './src/content/blog' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    metaTitle: str, // <title> for search engines (60 characters max); defaults to "<title> | The Aha Company"
    order: z.number().default(100),
    category: str, // eyebrow
    lede: str,
    description: str, // search description (160 characters max); defaults to the lede
    author: str, // team member slug (for the team page "Writing" list)
    authorName: str,
    authorRole: str,
    authorBio: str,
    date: str, // as written, e.g. "September 1, 2026"
    readMinutes: str,
    cover: str,
    coverCaption: str,
    relatedWork: str, // case study slug
    relatedWorkLabel: str,
    audience: str,
    network: str,
  }),
});

const row2 = z.object({ title: z.string(), description: str });
const networks = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './src/content/networks' }),
  schema: z.object({
    draft: z.boolean().default(false),
    name: z.string(),
    order: z.number().default(100),
    mark: str,
    markAlt: str,
    heading: str, // a network without a heading has no page of its own (redirects to /networks)
    metaTitle: str, // <title> for search engines (60 characters max); defaults to "Integrate with <name> | The Aha Company"
    lede: str,
    description: str, // search description (160 characters max); defaults to the lede
    secondaryCta: z.object({ label: str, href: str }).default({}),
    stats: z.array(z.object({ value: z.string(), label: str })).default([]),
    ship: z
      .object({ title: str, meta: str, rows: z.array(z.object({ name: z.string(), description: str, badge: str, href: str })).default([]) })
      .default({}),
    involves: z.array(row2).default([]),
    stepsLede: str,
    steps: z.array(z.object({ title: z.string(), description: str, output: str })).default([]),
    proof: z
      .object({ eyebrow: str, heading: str, body: str, caseStudy: str, linkLabel: str, quote })
      .default({}),
    funding: z
      .object({ heading: str, body: str, rows: z.array(z.object({ name: z.string(), description: str, badge: str })).default([]) })
      .default({}),
    cta: str,
    homeDescription: str,
    homeCta: str,
    card: z.object({ name: str, line: str, logo: str, logoAlt: str }).default({}),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './src/content/team' }),
  schema: z.object({
    draft: z.boolean().default(false),
    name: z.string(),
    order: z.number().default(100),
    role: str,
    location: str,
    focus: str,
    networks: str,
    since: str,
    portrait: str,
    links: z.object({ linkedin: str, github: str, email: str }).default({}),
  }),
});

// One page per open-source tool (/open-source/<id>), laid out like a case
// study. Figures carry their as-of date and follow the counting rules shown
// on /open-source#how-we-count.
const tools = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './src/content/tools' }),
  schema: z.object({
    draft: z.boolean().default(false),
    name: z.string(), // "Stellar Scaffold"
    order: z.number().default(100),
    network: str, // "Stellar", "XRPL and Stellar"
    category: str, // eyebrow and index card tag: "Developer tooling", "Wallet"...
    title: z.string(), // page heading
    metaTitle: str, // <title>; defaults to "<name>: <category> | The Aha Company"
    description: str, // meta description; defaults to the lede
    lede: str,
    summary: str, // one line on the /open-source index card
    headline: z.object({ figure: str, label: str }).default({}), // index card figure
    facts: z.array(z.object({ label: z.string(), value: str, live: z.boolean().default(false) })).default([]),
    metrics: z.array(z.object({ figure: str, label: str, receipt: str })).default([]),
    visual: z
      .object({
        // terminal: a recorded session alone; an image can also carry one (lines)
        kind: z.enum(['image', 'code', 'bars', 'terminal', '']).default(''),
        image: str,
        alt: str,
        tone: z.enum(['dark', 'light']).default('dark'), // panel behind an image
        filename: str, // code
        code: str,
        title: str, // bars
        bars: z.array(z.object({ label: z.string(), sub: str, value: z.number(), display: str, highlight: z.boolean().default(false) })).default([]),
        // terminal, or an image with a session beside it: the session exactly as
        // printed ("$ " starts a command, "…" marks skipped lines and
        // commands), and what it shows, for screen readers
        lines: z.array(str).default([]),
        // keep one line per printed line, cut by the window (for --help columns)
        clip: z.boolean().default(false),
        label: str,
        caption: str,
      })
      .default({}),
    sections: z.array(z.object({ id: z.string(), title: z.string(), body: str })).default([]),
    tech: z.array(z.string()).default([]),
    receipts: str, // Markdown list of links
    built: z.array(z.string()).default([]), // team member slugs, in credit order
    builtNote: str, // credit not on a team page
    related: z.array(z.string()).default([]), // other tool ids
    cta: str,
    // Structured data (schema.org SoftwareSourceCode). maintainer: who owns
    // the tool when it is not The Aha Company (we are then a contributor).
    maintainer: str,
    maintainerType: z.enum(['Organization', 'Person']).default('Organization'),
    repo: str,
    license: str, // SPDX id when known
    languages: z.array(z.string()).default([]),
  }),
});

export const collections = { caseStudies, blog, networks, team, tools };
