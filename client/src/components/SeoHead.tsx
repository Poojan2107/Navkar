import { useEffect } from "react";
import { useLocation } from "wouter";
import { canonicalUrl, graphJsonLd, OG_IMAGE, SITE_NAME, seoForPath } from "@/lib/seo";

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) {
    el = document.createElement(selector.startsWith("link") || attrs.rel ? "link" : "meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

export default function SeoHead() {
  const [location] = useLocation();
  const path = location.split("?")[0] || "/";
  const seo = seoForPath(path);
  const url = canonicalUrl(path);
  const title = `${seo.title} | ${SITE_NAME}`;

  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: seo.keywords });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: url });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: OG_IMAGE });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: path.startsWith("/updates/") ? "article" : "website" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: OG_IMAGE });

    const id = "navkar-seo-graph";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graphJsonLd(path));
  }, [path, seo.description, seo.keywords, title, url]);

  return null;
}
