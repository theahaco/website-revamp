// Structured data (schema.org JSON-LD) shared by pages. URLs are absolute,
// built from the site URL of the current build (preview or theaha.co).
import { site, contact } from '../data/site';

export function siteUrl(astroSite: URL | undefined): string {
  return astroSite ? new URL(import.meta.env.BASE_URL, astroSite).href : site.productionOrigin + '/';
}

export function organization(base: string) {
  return {
    '@type': 'Organization',
    '@id': base + '#organization',
    name: site.name,
    alternateName: ['Aha Labs'],
    legalName: 'Dawning Inc.',
    description: site.defaultDescription,
    knowsAbout: ['Stellar', 'Soroban', 'XRP Ledger', 'Canton', 'Stablecoins', 'Tokenization', 'Smart contracts', 'Developer tooling'],
    url: base,
    logo: new URL('images/brand/logo-512.png', base).href,
    email: contact.email,
    foundingDate: '2021',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '108 W. 13th Street, Suite 100',
      addressLocality: 'Wilmington',
      addressRegion: 'DE',
      postalCode: '19801',
      addressCountry: 'US',
    },
    sameAs: [contact.linkedin, contact.github].filter(Boolean),
  };
}

/** JSON for a <script type="application/ld+json">, safe inside HTML. */
export function ld(data: object): string {
  return JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c');
}
