/** Wordmarks cropped to their leading symbol; ratios are symbol width / logo height. */
export const networkSymbols = {
  stellar: { src: '/images/logos/logo-light-stellar.svg', ratio: 1.21 },
  xrpl: { src: '/images/logos/logo-xrpl-transparent.webp', ratio: 1.31 },
  canton: { src: '/images/logos/logo-light-canton.svg', ratio: 0.9 },
  ethereum: { src: '/images/logos/logo-ethereum.webp', ratio: 0.63 },
};

export type NetworkId = keyof typeof networkSymbols;

export const networkIds: Record<string, NetworkId> = {
  Stellar: 'stellar',
  XRPL: 'xrpl',
  Canton: 'canton',
  Ethereum: 'ethereum',
};

/** Full logos for locations that show the wordmark rather than just its symbol. */
export const networkMarks: Record<string, string> = Object.fromEntries(
  Object.entries(networkIds).map(([name, id]) => [name, networkSymbols[id].src]),
);
