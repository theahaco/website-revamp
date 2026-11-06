// Site-wide settings. Edit here, not in the components.

export const site = {
  name: 'The Aha Company',
  defaultTitle: 'Blockchain integration partner | The Aha Company',
  defaultDescription:
    "Stablecoins, tokenized funds and protocol integrations on Stellar, XRPL and Canton, by core contributors to Stellar's tooling. €20M+ of EURCV issued.",
  ogImage: '/images/og-default.png',
  // Canonical address of the live site. Builds served anywhere else (the
  // github.io preview) get <meta name="robots" content="noindex"> so search
  // engines do not index a duplicate of theaha.co.
  productionOrigin: 'https://theaha.co',
};

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Open source', href: '/open-source' },
  { label: 'Networks', href: '/networks' },
  { label: 'About', href: '/about' },
];

/** Footer "Company" column: the main navigation plus these. */
export const footerLinks = [
  { label: 'Blog', href: '/work?view=articles' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const contact = {
  email: 'hello@theaha.co',
  github: 'https://github.com/theahaco',
  // Company LinkedIn page.
  linkedin: 'https://www.linkedin.com/company/theahaco',
  // Endpoint that receives the contact form as a POST (Formspree, Basin,
  // Getform, a Worker...). While empty, the form opens the visitor's email
  // client with the message prefilled, addressed to `email` above.
  formEndpoint: '',
};

// Projects using our open-source tools, and the date they were counted
// (/open-source#how-we-count). Shown on the home page and the Open source page.
export const toolAdoption = { count: 137, date: 'November 2, 2026' };

// Home key figures (hero on phones, the band under it elsewhere), as the CEO
// approved them in November 2026.
// - deployments: smart contract deployments on mainnet, stated by the CEO
//   (add the source and a date here when there is one).
// - audits: third-party security audits of our code and our clients'
//   contracts: Hacken (EURCV launch contracts), Halborn (LI.FI on Stellar),
//   Veridise (Stellar Registry), Runtime Verification (Moonlight core
//   contracts) and two by Arda.
// - founded: the year The Aha Company was founded (About).
export const keyFigures = { deployments: '20+', audits: 6, founded: 2021 };

export const calendly = {
  url: 'https://calendly.com/d/cs4b-dy3-9py/introduction-to-the-aha-company?background_color=fbfaf8&text_color=14243a&primary_color=1a3b60',
};

// Audience analytics, loaded on the production domain only (never on the
// github.io preview). The privacy policy describes whichever provider is set.
//   provider: '' (none yet), 'umami' (Umami Cloud, free plan, no cookies),
//             'plausible', 'cloudflare' (Cloudflare Web Analytics) or
//             'ga4' (Google Analytics 4, sets cookies).
//   snippet:  the provider's script tag(s), pasted as given (Umami: the
//             website's tracking code). Leave empty for Cloudflare Web
//             Analytics switched on in the Pages dashboard, which injects
//             its own script.
// Events sent when a provider is present: "Call booked" (Calendly),
// "Contact form sent" and "Email click". Umami lists them under Events by
// itself; Plausible needs a goal with exactly each name.
// data-domains keeps Umami to theaha.co itself, so a build served from any
// other address (a Cloudflare preview deployment, say) is never counted.
export const analytics: { provider: '' | 'umami' | 'plausible' | 'cloudflare' | 'ga4'; snippet: string } = {
  provider: 'umami',
  snippet: '<script defer src="https://cloud.umami.is/script.js" data-website-id="6c6e9f95-98f2-485e-b879-c80ca476bdf5" data-domains="theaha.co"></script>',
};

export const footer = {
  description: 'Blockchain integration partner for financial institutions, protocols and ecosystems.',
  locations: 'United States · Europe · Brazil',
  // The site is operated by the US company only (see /terms and /privacy).
  legal: ['Dawning Inc. (dba The Aha Company), a Delaware corporation'],
  copyright: '© 2026 Dawning Inc. (dba The Aha Company). All rights reserved.',
};
