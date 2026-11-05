// Small icon shown before a fact label on case study and tool pages
// (src/icons). A label without an entry shows no icon.
const icons: Record<string, string> = {
  Client: 'buildings',
  Alliance: 'handshake',
  Role: 'wrench',
  'Our role': 'wrench',
  Engagement: 'briefcase',
  Year: 'calendar-blank',
  Status: 'seal-check',
  Network: 'globe-hemisphere-west',
  Networks: 'globe-hemisphere-west',
  Audit: 'shield-check',
  License: 'certificate',
  Language: 'code',
  Package: 'cube',
  Release: 'rocket-launch',
  Stack: 'stack',
  'Built on': 'stack',
  'Runs as': 'cube',
  'Runs on': 'cube',
  Owner: 'identification-badge',
  Contact: 'envelope-simple',
  Site: 'globe-hemisphere-west',
  'Published through': 'git-branch',
  Funding: 'hand-coins',
  Next: 'arrow-right',
};

export const factIcon = (label: string): string | undefined => icons[label];
