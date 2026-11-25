// node --test scripts/authors.test.mjs
// Build fixtures in a temporary project, leaving real content and dist untouched.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('standalone authors render independently of team membership', async (t) => {
  const dir = await mkdtemp(join(tmpdir(), 'aha-authors-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  for (const path of ['src', 'scripts', 'integrations', 'astro.config.mjs', 'package.json']) {
    await cp(new URL(path, root), join(dir, path), { recursive: true });
  }
  for (const path of ['node_modules', 'public']) {
    await symlink(new URL(path, root).pathname, join(dir, path), 'dir');
  }
  const put = (path, text) => writeFile(join(dir, 'src/content', path), text);
  const run = (...args) => spawnSync(process.execPath, args, {
    cwd: dir,
    encoding: 'utf8',
    env: { ...process.env, SITE_URL: 'https://theaha.co', BASE_PATH: '/', CF_PAGES: '0' },
  });
  const successful = (result) => assert.equal(result.status, 0, result.stdout + result.stderr);
  const page = (path) => readFile(join(dir, 'dist', path, 'index.html'), 'utf8');
  const articleAuthor = (html) => {
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    return scripts.map(([, json]) => JSON.parse(json)).find((ld) => ld['@type'] === 'BlogPosting').author;
  };
  await put('authors/test-guest.md', '---\nname: Test Guest\nlink: https://example.com/guest\n---\n');
  // Moving a former teammate's file preserves the author ID and accepts old fields.
  await put('team/test-former.md', '---\nname: Test Former\nlocation: France\n---\n');
  await cp(join(dir, 'src/content/team/test-former.md'), join(dir, 'src/content/authors/test-former.md'));
  await rm(join(dir, 'src/content/team/test-former.md'));
  for (const [slug, author] of [['test-company', 'the-aha-company'], ['test-guest', 'test-guest'], ['test-former', 'test-former'], ['test-team', 'enzo-soyer']]) {
    await put(`blog/${slug}.md`, `---\ntitle: ${slug}\nauthor: ${author}\ndate: January 1, 2026\n---\nTest article.\n`);
  }
  successful(run('scripts/check-content.mjs'));
  successful(run('node_modules/astro/bin/astro.mjs', 'build'));

  await t.test('company uses its logo, homepage links, and Organization metadata without a role', async () => {
    const html = await page('blog/test-company');
    assert.equal((html.match(/<a href="\/">The Aha Company<\/a>/g) || []).length, 2);
    assert.match(html, /class="art_avatar" src="\/images\/brand\/author-avatar.png"/);
    assert.match(html, /class="art_avatar48" src="\/images\/brand\/author-avatar.png"/);
    // Keep the dedicated tight crop, not the padded 512px general-purpose logo.
    const avatar = await readFile(new URL('public/images/brand/author-avatar.png', root));
    assert.equal(avatar.readUInt32BE(16), 280);
    assert.equal(avatar.readUInt32BE(20), 280);
    assert.doesNotMatch(html, /class="art_author-role"/);
    assert.deepEqual(articleAuthor(html), { '@type': 'Organization', name: 'The Aha Company', url: 'https://theaha.co/' });
  });
  await t.test('guests can link externally and omit portraits', async () => {
    const html = await page('blog/test-guest');
    assert.equal((html.match(/<a href="https:\/\/example.com\/guest">Test Guest<\/a>/g) || []).length, 2);
    assert.doesNotMatch(html, /class="art_avatar(?:48)?"/);
    assert.deepEqual(articleAuthor(html), { '@type': 'Person', name: 'Test Guest', url: 'https://example.com/guest' });
  });
  await t.test('former teammates can have unlinked bylines', async () => {
    const html = await page('blog/test-former');
    assert.equal((html.match(/class="art_author-name">Test Former<\/p>/g) || []).length, 2);
    assert.deepEqual(articleAuthor(html), { '@type': 'Person', name: 'Test Former' });
  });
  await t.test('standalone authors have no team routes or team cards', async () => {
    const routes = await readdir(join(dir, 'dist/team'));
    for (const id of ['the-aha-company', 'test-guest', 'test-former']) {
      assert.ok(!routes.includes(id));
      assert.ok(!(await page('about')).includes(`/team/${id}`));
    }
    assert.ok(/data-row="author"[^>]*>The Aha Company<\/span>/.test(await page('work')), 'article lists resolve the company author name');
    const html = await page('blog/test-team');
    assert.equal(articleAuthor(html)['@type'], 'Person');
    assert.match(articleAuthor(html).url, /\/team\//);
  });
  await t.test('collisions fail explicitly, including draft authors', async () => {
    const member = (await readdir(join(dir, 'src/content/team'))).find((f) => f.endsWith('.md') && f !== 'README.md');
    const id = member.slice(0, -3);
    await put(`authors/${member}`, '---\nname: Duplicate\ndraft: true\n---\n');
    for (const result of [run('scripts/check-content.mjs'), run('node_modules/astro/bin/astro.mjs', 'build')]) {
      assert.notEqual(result.status, 0);
      const output = result.stdout + result.stderr;
      assert.ok(output.includes(`Author ID collision: "${id}"`), output);
      assert.ok(output.includes('src/content/team/'), output);
      assert.ok(output.includes('src/content/authors/'), output);
    }
  });
});
