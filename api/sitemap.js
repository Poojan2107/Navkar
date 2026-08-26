import { getSiteUrl, listYardUpdates } from "./_lib/yard-feed.js";

const SITE = "https://navkar-tubes-and-pipes.vercel.app";

const STATIC_PATHS = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/products", changefreq: "weekly", priority: "0.9" },
  { path: "/products/erw-pipes", changefreq: "monthly", priority: "0.7" },
  { path: "/products/ms-hollow-sections", changefreq: "monthly", priority: "0.7" },
  { path: "/products/spiral-pipes", changefreq: "monthly", priority: "0.7" },
  { path: "/products/ms-fittings", changefreq: "monthly", priority: "0.7" },
  { path: "/products/ms-flanges", changefreq: "monthly", priority: "0.7" },
  { path: "/gallery", changefreq: "monthly", priority: "0.6" },
  { path: "/updates", changefreq: "daily", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/jindal", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/catalogue", changefreq: "monthly", priority: "0.9" },
];

function xmlEscape(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildXml(origin, today, updates) {
  const urls = [
    ...STATIC_PATHS.map(
      (item) => `  <url>
    <loc>${xmlEscape(origin + item.path)}</loc>
    <lastmod>${item.path === "/" || item.path === "/updates" ? updates[0]?.publishedAt.slice(0, 10) ?? today : today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    ),
    ...updates.map(
      (update) => `  <url>
    <loc>${xmlEscape(`${origin}/updates/${update.id}`)}</loc>
    <lastmod>${update.publishedAt.slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

export default function handler(_req, res) {
  try {
    const origin = getSiteUrl();
    const now = new Date();
    const xml = buildXml(origin, now.toISOString().slice(0, 10), listYardUpdates(now));
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(xml);
  } catch (err) {
    console.error("sitemap failed:", err);
    const today = new Date().toISOString().slice(0, 10);
    const xml = buildXml(SITE, today, []);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(xml);
  }
}
