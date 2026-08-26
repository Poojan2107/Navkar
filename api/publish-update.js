import { getSiteUrl, INDEXNOW_KEY, latestUpdate } from "./_lib/yard-feed.js";

function isAuthorized(req) {
  if (process.env.NODE_ENV !== "production") return true;
  if (req.headers?.["x-vercel-cron"] === "1") return true;
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers?.authorization === `Bearer ${secret}`;
}

async function pingIndexNow(urls) {
  const origin = getSiteUrl();
  const host = new URL(origin).host;
  const payload = JSON.stringify({
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  });
  const endpoints = ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow"];
  const results = [];
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: payload,
      });
      results.push({ endpoint, ok: response.ok, status: response.status });
    } catch (err) {
      results.push({ endpoint, ok: false, status: 0, error: String(err) });
    }
  }
  return results;
}

export default async function handler(req, res) {
  try {
    if (req.method && req.method !== "GET" && req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    if (!isAuthorized(req)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const update = latestUpdate();
    const origin = getSiteUrl();
    const urls = [
      `${origin}/`,
      `${origin}/products`,
      `${origin}/updates/${update.id}`,
      `${origin}/updates`,
      `${origin}/sitemap.xml`,
    ];

    let indexNow = { ok: false, status: 0 };
    try {
      indexNow = await pingIndexNow(urls);
    } catch (err) {
      console.error("IndexNow ping failed:", err);
    }

    res.status(200).json({
      ok: true,
      published: update.id,
      title: update.title,
      publishedAt: update.publishedAt,
      urls,
      indexNow,
    });
  } catch (err) {
    console.error("publish-update failed:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : "Publish failed" });
  }
}
