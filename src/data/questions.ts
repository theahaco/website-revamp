// The four questions of /networks, in order. The page renders them
// (src/components/networks/RouteBuilder.astro) and src/scripts/integrate.js
// reads them to fill in the route card and to carry the answers to /contact
// (?what=...&who=...&where=...&fund=...). The ids are those parameters, which
// src/scripts/form.js labels in the message: keep them.

export interface Question {
  id: 'what' | 'who' | 'where' | 'fund';
  q: string;
  opts: string[];
}

export const QS: Question[] = [
  { id: 'what', q: 'What goes onchain?', opts: ['A regulated asset: stablecoin, fund units, deposits', 'A protocol or product already live on another network', 'Developer tooling for an ecosystem'] },
  { id: 'who', q: 'Who may read the ledger?', opts: ['Anyone: a public network is acceptable', 'Only the parties to each transaction', 'Not decided yet'] },
  { id: 'where', q: 'Where are your users and liquidity today?', opts: ['EVM ecosystems', 'Payment corridors and fiat rails', 'Institutional counterparties and custodians'] },
  { id: 'fund', q: 'How will the work be funded?', opts: ['Our own budget', 'An ecosystem program, if one applies', 'Not sure yet'] },
];
