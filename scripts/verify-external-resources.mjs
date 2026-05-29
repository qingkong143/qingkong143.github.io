import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import https from 'node:https';

const siteConfigSource = await readFile(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const siteConfigModule = siteConfigSource.replace('export const siteConfig =', 'export default');
const { default: siteConfig } = await import(`data:text/javascript;base64,${Buffer.from(siteConfigModule).toString('base64')}`);

const resources = [
  {
    name: 'Twikoo',
    url: siteConfig.comments.twikoo.src,
    integrity: siteConfig.comments.twikoo.integrity,
    minBytes: 100_000,
    contentType: 'javascript'
  },
  {
    name: 'APlayer script',
    url: siteConfig.player.aplayer.src,
    integrity: siteConfig.player.aplayer.integrity,
    minBytes: 10_000,
    contentType: 'javascript'
  },
  {
    name: 'APlayer stylesheet',
    url: siteConfig.player.aplayer.css,
    integrity: siteConfig.player.aplayer.cssIntegrity,
    minBytes: 1_000,
    contentType: 'css'
  },
  {
    name: 'Meting',
    url: siteConfig.player.meting.src,
    integrity: siteConfig.player.meting.integrity,
    minBytes: 1_000,
    contentType: 'javascript'
  }
];

const fetchResource = (url, redirects = 5) => new Promise((resolve, reject) => {
  https.get(url, (response) => {
    const { statusCode, headers } = response;
    if ([301, 302, 303, 307, 308].includes(statusCode) && headers.location && redirects > 0) {
      response.resume();
      fetchResource(new URL(headers.location, url).toString(), redirects - 1).then(resolve, reject);
      return;
    }

    const chunks = [];
    response.on('data', (chunk) => chunks.push(chunk));
    response.on('end', () => resolve({
      statusCode,
      contentType: headers['content-type'] || '',
      body: Buffer.concat(chunks)
    }));
  }).on('error', reject);
});

const failures = [];

for (const resource of resources) {
  try {
    const response = await fetchResource(resource.url);
    const actualIntegrity = `sha384-${createHash('sha384').update(response.body).digest('base64')}`;

    if (response.statusCode !== 200) {
      failures.push(`${resource.name}: expected HTTP 200, got ${response.statusCode}`);
    }

    if (!response.contentType.toLowerCase().includes(resource.contentType)) {
      failures.push(`${resource.name}: expected ${resource.contentType} content, got ${response.contentType || 'unknown'}`);
    }

    if (response.body.length < resource.minBytes) {
      failures.push(`${resource.name}: expected at least ${resource.minBytes} bytes, got ${response.body.length}`);
    }

    if (actualIntegrity !== resource.integrity) {
      failures.push(`${resource.name}: integrity mismatch, expected ${resource.integrity}, got ${actualIntegrity}`);
    }
  } catch (error) {
    failures.push(`${resource.name}: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Verified ${resources.length} external resources.`);
