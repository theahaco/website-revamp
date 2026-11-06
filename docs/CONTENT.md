# Publishing on theaha.co

Articles, case studies and team members are text files in this repository.
You add them from the GitHub website: nothing to install, no code. Every
change goes through a pull request: you see a preview, someone checks it,
then it goes live.

## Before you start

- **Ask Enzo for Write access** to `theahaco/website`. Without it, GitHub
  saves your work in a copy of the site (a "fork") and there is no preview.
- **This repository is public.** Anyone can read every file, every pull
  request and every older version, even after a file is deleted or set to
  `draft: true`. Never write a client under NDA, a price or anything
  confidential here, not even for a minute.

## Publish an article

### 1. Prepare the text in Google Docs

- Style section headings as **Heading 2**. Do not keep the title in the
  text: it goes in a field.
- Once: **Tools > Preferences**, tick **Enable Markdown**.
- Select the text from the first section to the end, right-click, **Copy as
  Markdown**. Images do not come across: you upload them separately.

### 2. Choose the file name

A few words in lowercase, joined by hyphens: `what-a-bank-should-ask`. It
becomes the address, theaha.co/blog/what-a-bank-should-ask. On your
computer, give the cover image the same name: `what-a-bank-should-ask.jpg`
(or `.png`: LinkedIn previews may not show `.webp`), 2520 x 1080 px, under
300 KB. GitHub cannot rename a file while uploading it.

### 3. Create the article

1. Open [the article template](templates/article.md) and click **Copy raw
   file** (two squares, top right of the file).
2. Open [src/content/blog](../src/content/blog/) and click **Add file >
   Create new file**.
3. In **Name your file...**, type `what-a-bank-should-ask.md`, then paste.
4. Between the two `---` lines, replace each example value and keep the
   double quotes. The lines starting with `#` explain each field.
5. Below the second `---`, replace the example text with your article.
6. Click **Commit changes...**, choose **Create a new branch for this commit
   and start a pull request**, click **Propose changes**, then **Create pull
   request**.

### 4. Add the cover

1. On the pull request, click the branch name after "from" (for example
   `jane-patch-1`).
2. Open `public/images/covers/`, click **Add file > Upload files** and drop
   the image.
3. Keep **Commit directly to the jane-patch-1 branch**, click **Commit
   changes**.

### 5. Check the preview

After about two minutes the pull request shows:

- the checks: a green tick, or a red cross (see "If the check fails");
- a preview link from Cloudflare Pages (in its comment, or next to the
  checks: Cloudflare Pages, Details). Open it and add
  `/blog/what-a-bank-should-ask` to the address. The preview shows the
  article even when its date is in the future. Numbered outlines and the
  notes panel are Enzo's review notes: ignore them.

Until theaha.co runs on Cloudflare Pages (see `docs/LAUNCH.md`) there is no
preview link: the article shows on https://theahaco.github.io/website/ a few
minutes after the merge.

### 6. Ask for a review, then publish

GitHub asks Enzo to review automatically. Once he approves, click **Merge
pull request**, then **Confirm merge**. About two minutes later the article
is on theaha.co: its own page, the home page (the three most recent
articles), the Work page (Articles), the author's team page and the sitemap.

## Schedule an article

Set `date` to the publication day. theaha.co shows the article from 05:30
UTC that day (6:30 in Paris in winter, 7:30 in summer); the preview shows it
at once. To postpone it, change the date.

## Change or remove a published article

- **Change:** open the file, click the pencil, edit, **Commit changes...**,
  with a pull request as above for anything more than a typo.
- **Remove:** set `draft: true` and commit. The page disappears in about two
  minutes and its address shows "page not found". Tell Enzo if the link was
  shared.
- **Undo a merged pull request:** open it, click **Revert**, then merge the
  pull request GitHub creates.
- **Confidential content published by mistake:** remove it as above and tell
  Enzo at once. The old version stays readable on GitHub until he deletes it
  from the history.

## If the check fails

On the pull request, click **Details** next to the red cross. Each problem
is written in plain words, with the file and the line, for example:

`ERROR in src/content/blog/what-a-bank-should-ask.md, line 7: This text
contains a colon (:). Put the whole text between double quotes...`

The **Files changed** tab shows the same message under the line. To fix it
there: **...** (top right of the file), **Edit file**, correct the line,
**Commit changes**. The checks run again. Nothing goes live while a check is
red.

## Images inside an article

Name each image after the article, with a number
(`what-a-bank-should-ask-1.webp`), upload it to `public/images/blog/` on your
branch (as in step 4), and write this on its own line in the article:

`![What the image shows](/images/blog/what-a-bank-should-ask-1.webp)`

## Add a team member

Same steps with [the team template](templates/team-member.md): the file
`src/content/team/jane-doe.md` (first and last name), the photo
`public/images/team/jane-doe.webp` (square, at least 400 x 400 px). The
person then appears on About and on every team page.

## Add a case study

Same steps with [the case study template](templates/case-study.md): the
file in `src/content/case-studies/`, the share image in
`public/images/cases/` (2520 x 1080 px: shown when the link is shared on
LinkedIn or X; the page itself shows the case's visual, drawn from its facts
in `src/lib/caseVisuals.ts`, which the web team adds). Keep the spaces at the start of
each line exactly as in the template. A case study always waits for Enzo's
review (NDA). It appears on the Work page; Enzo decides whether it goes on
the home page.

## Writing rules

- **Clients under NDA stay anonymous**: no name, logo, city or figure that
  identifies them, in the text, the file name, an image or its description.
- **No prices**, rates, budgets, proposal amounts or grant amounts.
- **PwC US**: only a co-selling alliance, never a partner.
- **Figures carry a date or a source** ("111 projects, November 2, 2026").
- **Title** 60 characters or fewer, **description** 120 to 160 characters,
  with the words a prospect would type in Google.
- **House style**: US English, short sentences, no em-dash (use a colon, a
  comma or a new sentence), "onchain" in one word.
- **Links to our own pages** start with `/` (`/networks/stellar`).

## Share image (optional)

LinkedIn and X show the cover. For a better one, add a 1200 x 630 PNG named
like the article to `public/images/og/` (`what-a-bank-should-ask.png`).

## What decides the order

- Articles: newest first, by `date`.
- Case studies on the Work page: the list `workOrder` in
  `src/data/curation.ts`, then any case not listed there, by its `order`
  field (lower first). Open-source tools on the Work page: their `order`
  field.
- The people on a case study: its `team` list, in that order.
- The home page selection and the team order on team pages:
  `src/data/curation.ts` (ask Enzo).
