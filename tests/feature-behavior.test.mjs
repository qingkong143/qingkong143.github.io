import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('BaseLayout fetches a JSON search index instead of inlining post data', () => {
  const layout = read('src/layouts/BaseLayout.astro');

  assert.match(layout, /fetch\(searchIndexUrl\)/);
  assert.match(layout, /document\.createElement\('a'\)/);
  assert.match(layout, /title\.textContent = post\.title/);
  assert.match(layout, /searchResults\.replaceChildren/);
  assert.doesNotMatch(layout, /searchResults\.innerHTML\s*=\s*results\.length/);
  assert.doesNotMatch(layout, /define:vars=\{\{ searchPosts/);
  assert.doesNotMatch(layout, /const allPosts = await getCollection\('blog'\)/);
});

test('search index endpoint emits JSON from the blog collection', () => {
  const endpoint = read('src/pages/search-index.json.ts');

  assert.match(endpoint, /getCollection\('blog'\)/);
  assert.match(endpoint, /JSON\.stringify\(searchPosts\)/);
  assert.match(endpoint, /['"]content-type['"]:\s*['"]application\/json/);
});

test('remote image helpers proxy with sizing and srcset while preserving local paths', () => {
  const paths = read('src/utils/paths.ts');

  assert.match(paths, /export const getProxiedImage/);
  assert.match(paths, /export const getImageSrcset/);
  assert.match(paths, /withBase\(src\)/);

  const friendPage = read('src/pages/friend.astro');
  assert.match(friendPage, /getProxiedImage\(friend\.image/);
  assert.match(friendPage, /getImageSrcset\(friend\.image/);
  assert.match(friendPage, /sizes="58px"/);
});

test('first screen imagery is prioritized explicitly', () => {
  const layout = read('src/layouts/BaseLayout.astro');
  const component = read('src/components/PostCard.astro');

  assert.match(layout, /globalBackgroundPreload/);
  assert.match(layout, /rel="preload"/);
  assert.match(layout, /fetchpriority="high"/);
  assert.match(layout, /as="image"/);
  assert.match(component, /loading=\{isPriorityCover \? 'eager' : 'lazy'\}/);
  assert.match(component, /fetchpriority=\{isPriorityCover \? 'high' : 'auto'\}/);
});
test('PostCard prioritizes first cover and centers title when no summary exists', () => {
  const component = read('src/components/PostCard.astro');
  const css = read('src/styles/global.css');

  assert.match(component, /const hasSummary = Boolean\(summary\)/);
  assert.match(component, /const isPriorityCover = index === 0/);
  assert.match(component, /fetchpriority=\{isPriorityCover \? 'high' : 'auto'\}/);
  assert.match(component, /withBase\(getPostPath\(post, postPathMap\)\)/);
  assert.match(component, /class:list=\{\['post-info', summaryOnly && 'summary-only', !hasSummary && 'title-only'\]\}/);
  assert.match(css, /\.post-info\.title-only/);
  assert.match(css, /justify-content: center/);
  assert.match(css, /\.post-info\.title-only \.post-meta/);
  assert.match(css, /position: absolute/);
  assert.match(css, /\.post-info\.title-only \.post-title/);
  assert.match(css, /text-align: center/);
});

