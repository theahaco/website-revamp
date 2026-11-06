// The NDA icons of the home page (caseVisual). The thumbnails below are not
// shown at the moment: the home page and the Work page show the case studies
// as tiles with drawn visuals (src/lib/workVisuals.ts, WorkTile.astro), the
// tools with their icons (src/lib/toolIcons.ts) and the articles as rows.
//
// A case study, article or open-source tool shows its thumbnail when the file
// exists: public/images/cases/thumbs/<id>.webp, covers/thumbs/<id>.webp or
// tools/thumbs/<id>.webp (the Aha diagram alone on its background, 400 x 400,
// see the README.md in each folder). Without one, a case study falls back to
// its header image and an article to its cover, both shown by their right
// side, where the diagram is; anything else shows an icon on its audience
// tint. A new case study therefore always has a visual.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { coverFor } from './content';

export type Tone = 'blue' | 'green' | 'pink' | 'tan';
export interface Visual {
  /** thumb: a thumbnail; crop: a header image or cover, shown by its right side; icon: no image */
  kind: 'thumb' | 'crop' | 'icon';
  src: string;
  width: number;
  height: number;
  /** Icon (src/icons) and tint used when there is no image, and in the NDA block */
  icon: string;
  tone: Tone;
}

const PUBLIC = join(process.cwd(), 'public');
const EXTS = ['webp', 'png', 'jpg', 'jpeg'];
/** "/images/cases/thumbs/lifi.webp" when public/images/cases/thumbs/lifi.<ext> exists. */
function find(dir: string, id: string): string {
  const ext = EXTS.find((e) => existsSync(join(PUBLIC, dir, `${id}.${e}`)));
  return ext ? `/${dir}/${id}.${ext}` : '';
}
const local = (src = '') => (src.startsWith('/') && !src.startsWith('//') && existsSync(join(PUBLIC, src)) ? src : '');

// Audience colour coding shared by the site: financial institutions blue,
// protocols and products green, ecosystems and open source pink, others tan.
const AUDIENCE: Record<string, { tone: Tone; icon: string }> = {
  'Financial institutions': { tone: 'blue', icon: 'bank' },
  'Protocols and products': { tone: 'green', icon: 'plugs-connected' },
  'Ecosystems and open source': { tone: 'pink', icon: 'code' },
};
const audience = (a = '') => AUDIENCE[a] || { tone: 'tan' as Tone, icon: 'cube' };

// Icons for case studies whose subject an icon says better than the audience
// does (the NDA block on the home page). Generic on purpose: no client detail.
const CASE_ICONS: Record<string, string> = {
  'nda-settlement-stablecoin': 'bank',
  'nda-money-market-fund': 'certificate',
  'nda-real-estate-debt-fund': 'buildings',
};

const THUMB = { width: 400, height: 400 };
const BANNER = { width: 2520, height: 1080 };

export function caseVisual(id: string, data: { audience?: string; hero?: { image?: string } }): Visual {
  const { tone, icon: audIcon } = audience(data.audience);
  const icon = CASE_ICONS[id] || audIcon;
  const thumb = find('images/cases/thumbs', id);
  if (thumb) return { kind: 'thumb', src: thumb, ...THUMB, icon, tone };
  const banner = local(data.hero?.image) || find('images/cases', id);
  if (banner) return { kind: 'crop', src: banner, ...BANNER, icon, tone };
  return { kind: 'icon', src: '', ...THUMB, icon, tone };
}

export function articleVisual(id: string, data: { audience?: string; cover?: string }): Visual {
  const { tone } = audience(data.audience);
  const icon = 'file-text';
  const thumb = find('images/covers/thumbs', id);
  if (thumb) return { kind: 'thumb', src: thumb, ...THUMB, icon, tone };
  const cover = local(coverFor(id, data.cover));
  if (cover) return { kind: 'crop', src: cover, ...BANNER, icon, tone };
  return { kind: 'icon', src: '', ...THUMB, icon, tone };
}

export function toolVisual(id: string): Visual {
  const { tone } = audience('Ecosystems and open source');
  const thumb = find('images/tools/thumbs', id);
  if (thumb) return { kind: 'thumb', src: thumb, ...THUMB, icon: 'terminal-window', tone };
  return { kind: 'icon', src: '', ...THUMB, icon: 'terminal-window', tone };
}
