// Content helpers shared by pages and components.
import { getCollection, type CollectionEntry } from 'astro:content';
import { marked } from 'marked';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Share image (LinkedIn, X, Slack previews) of a page: public/images/og/<id>.png,
 * 1200 x 630, when that file exists. Pages without one share their header image.
 */
export function ogImageFor(id: string): string | undefined {
  return existsSync(join(process.cwd(), 'public', 'images', 'og', `${id}.png`)) ? `/images/og/${id}.png` : undefined;
}

/**
 * Article cover: the `cover` field when set, otherwise the image named after
 * the article in public/images/covers/ (webp, jpg, jpeg or png), if any.
 */
export function coverFor(id: string, cover = ''): string {
  if (cover) return cover;
  const ext = ['webp', 'jpg', 'jpeg', 'png'].find((e) => existsSync(join(process.cwd(), 'public', 'images', 'covers', `${id}.${e}`)));
  return ext ? `/images/covers/${id}.${ext}` : '';
}

/** Title text for set:html, with hyphenated words kept on one line (no font here has a non-breaking hyphen). */
export const nobr = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/(\S+-\S+)/g, '<span class="nobr">$1</span>');

/**
 * Dates are written "November 9, 2026" in the content files. They are read as
 * UTC midnight, so a build anywhere (a laptop in Paris, CI in UTC) gives the
 * same day and the same publication time.
 */
export function parseDate(value: string): Date {
  if (!value) return new Date(NaN);
  const utc = new Date(`${value} 00:00 UTC`);
  return Number.isNaN(utc.getTime()) ? new Date(value) : utc;
}

marked.use({ gfm: true, breaks: false });

/** Markdown (from frontmatter) to HTML, the same way Webflow rich text rendered. */
export function md(src: string | undefined | null): string {
  if (!src || !src.trim()) return '';
  return (marked.parse(src, { async: false }) as string).trim();
}

/** One line of Markdown (links, code, emphasis) to HTML, without a <p>. */
export function mdInline(src: string | undefined | null): string {
  if (!src || !src.trim()) return '';
  return (marked.parseInline(src, { async: false }) as string).trim();
}

/** Markdown tables in a horizontally scrollable wrapper (narrow screens). */
export function wrapTables(html: string): string {
  return html.replace(/<table>/g, '<div class="tl_tablewrap"><table>').replace(/<\/table>/g, '</table></div>');
}

type Quote = { label: string; text: string; author: string; role: string; portrait: string; portraitAlt: string; logo: string; logoAlt: string };
/**
 * Testimonials still waiting for approval carry the label "Placeholder quote".
 * The preview shows them for review; the production build (theaha.co) never
 * publishes them: the slot keeps the logo, labelled "Client".
 */
export function publicQuote<Q extends Quote>(q: Q, production: boolean): Q {
  if (!q || !production || !/placeholder/i.test(q.label || '')) return q;
  return { ...q, label: 'Client', text: '', author: '', role: '', portrait: '' };
}

export type CaseStudy = CollectionEntry<'caseStudies'>;
export type Post = CollectionEntry<'blog'>;
export type Network = CollectionEntry<'networks'>;
export type Member = CollectionEntry<'team'>;

const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) => a.data.order - b.data.order;

export async function caseStudies() {
  return (await getCollection('caseStudies', (e) => !e.data.draft)).sort(byOrder);
}
/**
 * Articles dated in the future are scheduled: the production build
 * (theaha.co) leaves them out until their date, and the deploy workflow
 * rebuilds every morning so each one goes live on its day. The preview
 * shows them all, for review.
 */
const PRODUCTION = import.meta.env.SITE ? new URL(import.meta.env.SITE).origin === 'https://theaha.co' : true;
export function isScheduled(date: string, now = new Date()): boolean {
  const d = parseDate(date);
  return Boolean(date) && !Number.isNaN(d.getTime()) && d.getTime() > now.getTime();
}
/** Articles, newest first (by `date`; `order` only breaks ties between articles of the same day). */
const byDateDesc = (a: Post, b: Post) => {
  const da = parseDate(a.data.date).getTime() || 0;
  const db = parseDate(b.data.date).getTime() || 0;
  return db - da || a.data.order - b.data.order;
};
export async function posts() {
  const members = await team();
  return (await getCollection('blog', (e) => !e.data.draft && !(PRODUCTION && isScheduled(e.data.date))))
    .map((p) => {
      // Name and role come from the author's team file unless the article sets them.
      const m = members.find((x) => x.id === p.data.author);
      if (!m) return p;
      return { ...p, data: { ...p.data, authorName: p.data.authorName || m.data.name.replace(/ \(.*\)/, ''), authorRole: p.data.authorRole || m.data.role } };
    })
    .sort(byDateDesc);
}
/** Links to articles not published yet become plain text (scheduled posts). */
export function unlinkPosts(html: string, published: Set<string>): string {
  return html.replace(/<a href="\/blog\/([^"\/]+)\/?">(.*?)<\/a>/g, (m, id, text) => (published.has(id) ? m : text));
}
export async function networks() {
  return (await getCollection('networks', (e) => !e.data.draft)).sort(byOrder);
}
export async function team() {
  return (await getCollection('team', (e) => !e.data.draft)).sort(byOrder);
}
export type Tool = CollectionEntry<'tools'>;
export async function tools() {
  return (await getCollection('tools', (e) => !e.data.draft)).sort(byOrder);
}

/** Pick entries by id, in the given order, skipping ids that do not exist. */
export function pick<T extends { id: string }>(entries: T[], ids: string[]): T[] {
  return ids.map((id) => entries.find((e) => e.id === id)).filter((e): e is T => Boolean(e));
}

/** All entries, those named in `ids` first (in that order), the rest after in their usual order. */
export function orderBy<T extends { id: string }>(entries: T[], ids: string[]): T[] {
  const rank = (e: T) => {
    const i = ids.indexOf(e.id);
    return i === -1 ? ids.length : i;
  };
  return [...entries].sort((a, b) => rank(a) - rank(b));
}

/** "Financial institution · Stellar" -> the Services page anchor of the matching audience. */
export function serviceAnchor(eyebrow: string): string {
  if (eyebrow.startsWith('Protocol')) return '/services#protocols';
  if (eyebrow.startsWith('Ecosystem')) return '/services#ecosystems';
  return '/services#institutions';
}

/** Network marks shown next to the network name on case studies and tool pages: each network's own logo, in its official colors. */
export const networkMarks: Record<string, string> = {
  Stellar: '/images/logos/logo-light-stellar.svg',
  XRPL: '/images/logos/logo-xrpl-transparent.webp',
  Canton: '/images/logos/logo-light-canton.svg',
  Ethereum: '/images/logos/logo-ethereum.webp',
};

/** Dates are written "September 1, 2026"; lists show "Sep 1, 2026", pages "September 1, 2026". */
export function formatDate(value: string, style: 'short' | 'long'): string {
  const d = parseDate(value);
  if (!value || Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', { month: style === 'short' ? 'short' : 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
