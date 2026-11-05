# Tool screens

Real screens of our tools' own sites, shown in phone frames:

- `<tool>-phone-300.webp`, `-450.webp`, `-600.webp`: the phone alone, on a
  transparent background, cut at the bottom. The home page and other pages
  stack three of them (`src/components/vx/PhoneStack.astro`).
- `<tool>.webp` (990 x 1830 px): the phone on a deep-blue panel, shown on the
  tool's page when its file says `visual: kind: image`.

`<tool>` is the tool's file name in `src/content/tools/` (`nido`,
`moonlight`...), except Stellar Scaffold, whose images are `scaffold-stellar-*`.

To add or refresh one: take a screenshot of the tool's site on a phone, 400 x
818 CSS pixels at 2x (800 x 1636 px), plus a full-length one if you have it,
then run `python3 scripts/frame-phone.py <screenshot.png> public/images/tools <tool> [<full-length.png>]`.
Only real screens of the real site: no mock-ups or edited text.
