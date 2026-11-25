// Clients kept off the site until they approve what it says about them
// (src/data/curation.ts, hiddenClients). Nothing is deleted: the files keep
// their content, and removing the client from that list shows it all again.
//
// While a client is hidden:
// - its case study is not built, so its page, home tile, quote and "More
//   work" rows disappear with it (caseStudies() in content.ts);
// - in the content files, a list item that belongs to it is dropped, and a
//   block that belongs to it (a button, a precedent) is emptied, so the
//   template skips it. An item belongs to a client through its `client`,
//   `caseStudy` or `href` ("/case-studies/<client>") field;
// - `ifClientHidden: { <client>: { field: value } }` in a content file
//   replaces those fields (a bio, a one-line description) with wording that
//   does not name the client;
// - pages written in code ask isHiddenClient() or linksToHiddenClient().
import { hiddenClients } from '../data/curation';

export const isHiddenClient = (id?: string | null): boolean => Boolean(id) && hiddenClients.includes(String(id));

/** A link to the case study of a hidden client. */
export function linksToHiddenClient(href?: string | null): boolean {
  const m = String(href || '').match(/^\/case-studies\/([^/?#]+)/);
  return Boolean(m && isHiddenClient(m[1]));
}

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => Boolean(v) && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date);
const belongsToHidden = (o: Obj) =>
  isHiddenClient(o.client as string) || isHiddenClient(o.caseStudy as string) || linksToHiddenClient(o.href as string);

/** Every text of a block set to '' and every list emptied: templates skip empty blocks. */
function emptied(o: Obj): Obj {
  const out: Obj = {};
  for (const [k, v] of Object.entries(o)) out[k] = typeof v === 'string' ? '' : Array.isArray(v) ? [] : isObj(v) ? emptied(v) : v;
  return out;
}

function merge(target: Obj, fields: Obj): Obj {
  const out: Obj = { ...target };
  for (const [k, v] of Object.entries(fields)) out[k] = isObj(v) && isObj(out[k]) ? merge(out[k] as Obj, v) : v;
  return out;
}

function strip(v: unknown, top: boolean): unknown {
  if (Array.isArray(v)) return v.filter((x) => !(isObj(x) && belongsToHidden(x))).map((x) => strip(x, false));
  if (!isObj(v)) return v;
  if (!top && belongsToHidden(v)) return emptied(v);
  let out: Obj = {};
  for (const [k, x] of Object.entries(v)) if (k !== 'ifClientHidden') out[k] = strip(x, false);
  // An article's "Related work" link to a hidden case study.
  if (top && isHiddenClient(out.relatedWork as string)) out = { ...out, relatedWork: '', relatedWorkLabel: '' };
  const overrides = v.ifClientHidden;
  if (isObj(overrides)) for (const [client, fields] of Object.entries(overrides)) if (isHiddenClient(client) && isObj(fields)) out = merge(out, fields);
  return out;
}

/** An entry's data as the site shows it while some clients are hidden. */
export function withoutHiddenClients<T>(data: T): T {
  return hiddenClients.length ? (strip(data, true) as T) : data;
}
