// Run after npm run build: node --test scripts/network-marks.test.mjs
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const dist = new URL('../dist/', import.meta.url);
const page = (path) => readFile(new URL(`${path}/index.html`, dist), 'utf8');
const marks = (html) => [...html.matchAll(/<img\b[^>]*>/g)]
  .map(([tag]) => Object.fromEntries(
    [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]),
  ))
  .filter((attrs) => attrs.class?.split(/\s+/).includes('netmark'));

function checkSize(mark, width, height) {
  assert.ok(mark, 'network symbol is rendered');
  assert.equal(mark.width, String(width));
  assert.equal(mark.height, String(height));
  assert.match(mark.style, new RegExp(`(?:^|;)width:${width}px(?:;|$)`));
  assert.match(mark.style, new RegExp(`(?:^|;)height:${height}px(?:;|$)`));
  assert.equal(mark.alt, '');
}

test('case-study facts render the complete Stellar symbol and preserve the review hook', async () => {
  const mark = marks(await page('case-studies/societe-generale-forge'))
    .find((mark) => mark['data-cs'] === 'netmark');
  checkSize(mark, 20, 16);
  assert.ok(mark.class.split(/\s+/).includes('cs_netmark'));
});

test('multi-network tool facts retain proportional Stellar and XRPL crops', async () => {
  const facts = marks(await page('open-source/ghostsig'))
    .filter((mark) => mark.class.split(/\s+/).includes('cs_netmark'));
  assert.equal(facts.length, 2);
  checkSize(facts.find((mark) => mark.src.includes('stellar')), 20, 16);
  checkSize(facts.find((mark) => mark.src.includes('xrpl')), 21, 16);
});

test('network jump links and all four network cards use proportional symbols', async () => {
  const icons = marks(await page('networks'));
  const jump = icons.filter((mark) => mark.class.split(/\s+/).includes('cs_netmark'));
  assert.equal(jump.length, 2);
  checkSize(jump.find((mark) => mark.src.includes('stellar')), 20, 16);
  checkSize(jump.find((mark) => mark.src.includes('xrpl')), 21, 16);
  for (const [network, width] of [['stellar', 30], ['xrpl', 32], ['canton', 22], ['ethereum', 16]]) {
    checkSize(icons.find((mark) => mark.height === '24' && mark.src.includes(network)), width, 24);
  }
});
