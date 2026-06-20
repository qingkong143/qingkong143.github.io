import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const SITE_URL = 'https://blog.318670.xyz';

// IndexNow API key — generate your own at https://www.bing.com/webmasters/indexnow
// Place the key file at public/<your-key>.txt so engines can verify it.
// If you leave INDEXNOW_KEY empty, the script prints the payload but skips the request.
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '';

const INDEXNOW_ENDPOINT = 'https://www.bing.com/indexnow';

/**
 * Read the sitemap, extract all <loc> URLs, and submit them to IndexNow.
 * Usage:  node scripts/indexnow.mjs            # submits all URLs
 *         INDEXNOW_KEY=xxx node scripts/indexnow.mjs   # with key
 */
async function main() {
  // Parse sitemap URLs (supports both sitemap.xml and sitemap-index.xml)
  const sitemapIndexPath = fileURLToPath(new URL('../dist/sitemap-index.xml', import.meta.url));
  let sitemapFile = '';

  try {
    const index = readFileSync(sitemapIndexPath, 'utf-8');
    // sitemap index contains <sitemap><loc>.../sitemap-0.xml</loc></sitemap>
    const match = index.match(/<loc>(.+)<\/loc>/);
    if (match) {
      const childPath = fileURLToPath(new URL('../dist/sitemap-0.xml', import.meta.url));
      sitemapFile = readFileSync(childPath, 'utf-8');
    }
  } catch (e) {
    console.error('Failed to read sitemap:', e.message);
    process.exit(1);
  }

  const urls = [...sitemapFile.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (!urls.length) {
    console.log('No URLs found in sitemap.');
    return;
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  if (!INDEXNOW_KEY) {
    console.log('INDEXNOW_KEY not set — here is the payload that would be sent:');
    console.log(JSON.stringify({ host: new URL(SITE_URL).host, key: INDEXNOW_KEY, urlList: urls }, null, 2));
    console.log('\nSet INDEXNOW_KEY env var or hard-code the key to actually submit.');
    return;
  }

  const body = JSON.stringify({
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    urlList: urls,
  });

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });

  if (res.ok || res.status === 202) {
    console.log(`IndexNow accepted (status ${res.status}). ${urls.length} URLs submitted.`);
  } else {
    const text = await res.text();
    console.error(`IndexNow rejected (status ${res.status}): ${text}`);
    process.exit(1);
  }
}

main();
