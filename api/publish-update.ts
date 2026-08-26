import type { IncomingMessage, ServerResponse } from "http";
import { getSiteUrl, INDEXNOW_KEY, latestUpdate } from "../shared/yard-feed";

function json(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

function isAuthorized(req: IncomingMessage) {
  if (process.env.NODE_ENV !== "production") return true;
  if (req.headers["x-vercel-cron"] === "1") return true;
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.authorization === `Bearer ${secret}`;
}

async function pingIndexNow(urls: string[]) {
  const host = new URL(getSiteUrl()).host;
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${getSiteUrl()}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  return { ok: response.ok, status: response.status };
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method && req.method !== "GET" && req.method !== "POST") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  if (!isAuthorized(req)) {
    json(res, 401, { error: "Unauthorized" });
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

  json(res, 200, {
    ok: true,
    published: update.id,
    title: update.title,
    publishedAt: update.publishedAt,
    urls,
    indexNow,
  });
}
