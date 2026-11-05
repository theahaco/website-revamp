# Launch: moving theaha.co from Webflow to Cloudflare Pages

theaha.co is served by Cloudflare Pages, built from `main`. GitHub Pages keeps
serving the preview at https://theahaco.github.io/website/ and never gets a
custom domain: a custom domain there would publish the preview build (noindex,
review notes) on theaha.co.

## Two days before

1. **Cloudflare zone.** Add `theaha.co` to Cloudflare (Free plan). Compare the
   imported DNS records with the current ones, record by record: every `MX`, and
   every `TXT` for SPF, DKIM, DMARC and domain verifications. If DNSSEC is on at
   the registrar, turn it off. Switch the nameservers at the registrar and wait
   until the zone shows "Active".
2. **Pages project.** Workers & Pages, Create, Pages, Connect to Git:
   `theahaco/website`, branch `main`, preset Astro.
   - Build command: `npm run build && npm run check`
   - Output directory: `dist`
   - Environment variable (Production and Preview): `NODE_VERSION` = `24`
   - Do not set `SITE_URL` or `BASE_PATH`: the defaults are theaha.co.

   Check the site on `<project>.pages.dev` (it is not indexable, see
   `public/_headers`).
3. **Daily rebuild.** Pages settings, Builds, Deploy hooks: create a hook for
   `main`. In GitHub, repository Settings, Secrets and variables, Actions: add it
   as `CF_PAGES_DEPLOY_HOOK`. Run "Daily production rebuild" from the Actions
   tab once and check that a Cloudflare build starts. Scheduled articles go live
   with this 05:30 UTC build.
4. **Contact form.** Create a Formspree form that delivers to hello@theaha.co,
   confirm the address, paste the form URL in `src/data/site.ts`
   (`contact.formEndpoint`), push, and send a test from the pages.dev address.
5. **Calendly.** Check that the event type is active and reusable (not one-off),
   the availability and time zone, that notifications reach an inbox someone
   reads, and that no Google Analytics or Meta pixel is connected to it.
6. **Umami.** Website domain `theaha.co`, data region EU.

## Launch day

7. **Custom domain.** Pages, Custom domains: add `theaha.co`. If it reports a
   conflict, delete the Webflow apex records. Wait for the certificate.
8. **www and HTTPS.** DNS: a proxied `CNAME` `www` to `theaha.co`. Rules,
   Redirect Rules: the template "Redirect from WWW to root" (301, keep the query
   string). SSL/TLS: turn on Always Use HTTPS.
9. **Checks.**
   - `https://theaha.co/` answers 200, has no `noindex` and loads Umami.
   - `http://theaha.co/` and `https://www.theaha.co/` answer 301 to
     `https://theaha.co/`; `/blog` answers 301.
   - An unknown path shows the 404 page with status 404.
   - `https://theaha.co/robots.txt` says `Allow: /` and names the sitemap.
   - /contact shows the full calendar: book and cancel a test slot. A test
     message from the form arrives.
   - Umami's realtime view shows the visit, then the "Call booked" and "Contact
     form sent" events.
10. **Webflow.** Remove the custom domain from the Webflow project, archive the
    project without deleting it, then end its hosting. In both Webflow projects,
    turn on Site settings, SEO, "Disable Webflow subdomain indexing", or
    unpublish the staging site.

## Search engines

11. **Search Console.** Add a Domain property for `theaha.co`, verified by a DNS
    `TXT` record (it covers www, http and https). Submit
    `https://theaha.co/sitemap-index.xml`. Import the property into Bing
    Webmaster Tools.
12. **Request indexing** (URL Inspection, live test, then Request indexing) for
    the home page, /services, /networks/stellar, /networks/xrpl, /work, /about,
    /open-source, the Société Générale-FORGE, LI.FI and money-market fund case
    studies, and the Stellar Scaffold and Stellar Registry pages.
13. **Links to the site.** Point the LinkedIn company page, the GitHub
    organization, each tool's README and site, and the ecosystem directory
    entries at `https://theaha.co/` or the tool's page
    (`https://theaha.co/open-source/<tool>/`).
14. **First two weeks.** In Search Console, the indexed page count should rise
    toward about 40, and "Excluded by noindex" should list only the 404 page and
    the redirect stubs. Watch 404s (Umami logs them by path) and add a line to
    `public/_redirects` for each old address that still gets visits. After each
    article date (November 4, 9 and 13), check that the article is in the
    sitemap and request its indexing.
