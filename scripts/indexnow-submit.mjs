#!/usr/bin/env node
// Submit sitemap URLs to Bing/IndexNow.
// Usage: node scripts/indexnow-submit.mjs [https://converterup.com/sitemap.xml]

const HOST = "converterup.com";
const KEY = "7f693347860fffbaefc4441d6ced8264";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const SITEMAP_URL = process.argv[2] || `https://${HOST}/sitemap.xml`;

async function fetchSitemapUrls(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sitemap ${url}: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submitBatch(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, body: text };
}

async function main() {
  const urls = await fetchSitemapUrls(SITEMAP_URL);
  console.log(`Fetched ${urls.length} URLs from ${SITEMAP_URL}`);
  const chunkSize = 10000;
  for (let i = 0; i < urls.length; i += chunkSize) {
    const batch = urls.slice(i, i + chunkSize);
    const result = await submitBatch(batch);
    console.log(`Batch ${i / chunkSize + 1}: HTTP ${result.status}`);
    if (result.body) console.log(result.body);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
