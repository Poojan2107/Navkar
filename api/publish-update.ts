import { getSiteUrl, INDEXNOW_KEY, latestUpdate } from "./_lib/yard-feed";

type VercelRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
};

function isAuthorized(req: VercelRequest) {
  if (process.env.NODE_ENV !== "production") return true;
  if (req.headers?.["x-vercel-cron"] === "1") return true;
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers?.authorization === `Bearer ${secret}`;
}

async function pingIndexNow(urls: string[]) {
  const host = new URL(getSiteUrl()).host;
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${getSiteUrl()}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });
  return { ok: response.ok, status: response.status };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
  const urls = [`${origin}/updates/${update.id}`, `${origin}/updates`, `${origin}/sitemap.xml`];

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
}
