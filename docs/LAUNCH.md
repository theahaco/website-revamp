# Deployment: theaha.co on GitHub Pages

The production repository is `theahaco/theahaco.github.io`. GitHub Pages
serves https://theaha.co/; Cloudflare Pages is not the production deployment.

## Repository settings

- Settings → Pages → Build and deployment → Source: **GitHub Actions**.
- Custom domain: **theaha.co**.
- Enable **Enforce HTTPS** once GitHub has issued the domain certificate.
- Keep DNS configured for GitHub Pages. Preserve unrelated mail and domain
  verification records when changing DNS.

The Actions-based deployment uses the custom domain saved in repository
settings; it does not require a `CNAME` file in `public/`.

## Builds and publishing

`.github/workflows/deploy.yml` runs on every push to `main`, including merges,
on demand, and daily at 05:30 UTC so scheduled articles become available.
Scheduled Actions runs can be delayed.

The workflow uses Node 24, installs with `npm ci`, builds with
`SITE_URL=https://theaha.co` and `BASE_PATH=/`, then checks internal links,
images, anchors, indexability, robots.txt and the homepage canonical URL.
It uploads `dist/` and deploys through the `github-pages` environment.
If a build or check fails, the previous site remains live.

Pull requests run production and preview-mode builds and link checks.
They do not create hosted previews. Developers can inspect future articles
locally with `SITE_URL=http://localhost:4321 npm run dev`.

## Verify a deployment

- In Actions, check that both **build** and **deploy** succeeded for the
  expected `main` commit.
- `https://theaha.co/` should return 200, have no `noindex`, and use
  `https://theaha.co/` as its canonical URL.
- HTTP should redirect to HTTPS; `https://www.theaha.co/` should redirect
  to `https://theaha.co/`.
- An unknown path should return the custom 404 page with status 404.
- `https://theaha.co/robots.txt` should say `Allow: /` and name the sitemap.
- Check the contact form, Calendly and any configured analytics separately.

GitHub Pages ignores `public/_headers` and `public/_redirects`, which remain
as legacy Cloudflare configuration. Existing redirect stubs in `src/pages/`
handle page redirects rather than server-side 301 rules. New redirects need
equivalent page stubs, not just entries in `_redirects`.

## Search engines

Verify the `theaha.co` Domain property in Search Console using a DNS TXT
record, submit `https://theaha.co/sitemap-index.xml`, and import the property
into Bing Webmaster Tools. Watch indexing and missing-page reports after
content or URL changes.
