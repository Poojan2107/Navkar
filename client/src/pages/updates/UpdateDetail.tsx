import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import NotFound from "@/pages/NotFound";
import UpdateDetailView from "@/components/UpdateDetail";
import { loadYardUpdate, loadYardUpdates, type DispatchUpdate } from "@/lib/updatesGenerator";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getSiteUrl } from "@shared/yard-feed";

export default function UpdateDetailPage() {
  const [, params] = useRoute("/updates/:id");
  const id = params?.id;
  const [update, setUpdate] = useState<DispatchUpdate | null | undefined>(undefined);
  const [neighbors, setNeighbors] = useState<{ prev?: string; next?: string }>({});

  useEffect(() => {
    if (!id) {
      setUpdate(null);
      return;
    }
    let cancelled = false;
    void Promise.all([loadYardUpdate(id), loadYardUpdates()]).then(([found, all]) => {
      if (cancelled) return;
      setUpdate(found ?? null);
      const idx = found ? all.findIndex((u) => u.id === found.id) : -1;
      setNeighbors({
        prev: idx > 0 ? `/updates/${all[idx - 1].id}` : undefined,
        next: idx >= 0 && idx < all.length - 1 ? `/updates/${all[idx + 1].id}` : undefined,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  usePageTitle(update ? `${update.title} | Ahmedabad` : "Batch Dispatch Report");

  if (update === undefined) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white pt-28">
        <p className="font-mono text-xs uppercase tracking-wider text-gray-400">Loading batch report…</p>
      </div>
    );
  }

  if (!update) {
    return <NotFound />;
  }

  const origin = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: update.title,
    datePublished: update.publishedAt,
    dateModified: update.publishedAt,
    image: `${origin}${update.mainImage}`,
    author: { "@type": "Organization", name: "Navkar Tubes & Tools" },
    publisher: { "@type": "Organization", name: "Navkar Tubes & Tools" },
    mainEntityOfPage: `${origin}/updates/${update.id}`,
    description: update.summary,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UpdateDetailView update={update} prevHref={neighbors.prev} nextHref={neighbors.next} />
    </>
  );
}
