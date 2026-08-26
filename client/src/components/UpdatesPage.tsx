import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Filter,
  Eye,
  Truck,
  Package,
  Factory,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import QuoteModal from "@/components/QuoteModal";
import PageHero from "@/components/layout/PageHero";
import SectionLabel from "@/components/layout/SectionLabel";
import { handleImgError } from "@/lib/assetFallback";
import { FadeUp } from "@/hooks/useScrollAnimation";
import { loadYardUpdates, type DispatchUpdate } from "@/lib/updatesGenerator";
import { getSiteUrl } from "@shared/yard-feed";

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<DispatchUpdate[]>([]);
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState("General Stock Reservation");

  useEffect(() => {
    void loadYardUpdates().then(setUpdates);
  }, []);

  const openQuoteForBatch = (batchInfo: string) => {
    setQuoteCategory(batchInfo);
    setQuoteOpen(true);
  };

  const filteredUpdates = useMemo(
    () =>
      locationFilter === "all"
        ? updates
        : updates.filter((u) => u.location.toLowerCase().includes(locationFilter.toLowerCase())),
    [updates, locationFilter]
  );

  const featured = filteredUpdates[0];
  const rest = filteredUpdates.slice(1);

  const totalTonnage = useMemo(() => {
    return filteredUpdates.reduce((sum, u) => {
      const n = parseInt(u.tonnage, 10);
      return sum + (Number.isNaN(n) ? 0 : n);
    }, 0);
  }, [filteredUpdates]);

  const origin = getSiteUrl();
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Navkar Tubes yard dispatch updates",
    itemListElement: updates.slice(0, 20).map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${origin}/updates/${item.id}`,
      name: item.title,
    })),
  };

  return (
    <PageShell darkNav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }} />
      <PageHero
        badge={
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#2D7A82]/40 bg-[#2D7A82]/20 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#5EAEB3] shadow-sm">
            <span className="h-2 w-2 animate-ping rounded-full bg-[#5EAEB3]" />
            Live Yard Dispatch Stream · Ahmedabad
          </span>
        }
        title="Yard Dispatch & Stock Updates"
        description="Real-time stock arrivals, quality inspections, and trailer dispatches from our Ahmedabad stocking facilities and Ceramic Lancing plant."
      />

      {/* Live alert */}
      <div className="border-y border-white/10 bg-[#2D7A82] py-3.5 text-white shadow-sm">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 text-xs font-mono sm:flex-row lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
            <span className="font-bold uppercase tracking-wider">Live:</span>
            <span>Fresh 500 MM OD Jindal MS ERW batch at Ahmedabad Central Yard — ready for trailer loading.</span>
          </div>
          <button
            onClick={() => openQuoteForBatch("Latest 500mm OD Jindal Batch")}
            className="cursor-pointer whitespace-nowrap underline hover:text-white/80"
          >
            Reserve Batch →
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <section className="border-b border-gray-200 bg-[#FAFAF8] py-8">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-6 sm:grid-cols-4 lg:px-12">
          {[
            { icon: Package, label: "Active Batches", value: String(filteredUpdates.length) },
            { icon: Truck, label: "Est. Tonnage Listed", value: `${totalTonnage}+ MT` },
            { icon: Factory, label: "Facilities", value: "4 Yards" },
            { icon: Calendar, label: "Latest Update", value: featured?.timeAgo ?? "—" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-gray-200 bg-white p-5 text-center">
              <stat.icon size={18} className="mx-auto mb-2 text-[#2D7A82]" />
              <p className="font-display text-2xl font-semibold text-[#0A1628]">{stat.value}</p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[var(--nav-offset)] z-30 border-t border-white/10 bg-[#0A1628] shadow-md">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="scrollbar-none flex items-center gap-3 overflow-x-auto py-3 sm:py-4">
            <span className="mr-2 flex shrink-0 items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/50">
              <Filter size={14} /> Filter:
            </span>
            {[
              { id: "all", label: `All (${updates.length})` },
              { id: "central", label: "Central Yard" },
              { id: "dispatch", label: "Dispatch Hub" },
              { id: "lancing", label: "Lancing Plant" },
              { id: "mundra", label: "Mundra Export" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLocationFilter(tab.id)}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  locationFilter === tab.id
                    ? "bg-[#2D7A82] text-white shadow-md shadow-[#2D7A82]/30"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Featured latest */}
          {featured && (
            <FadeUp>
              <SectionLabel text="Latest Arrival" />
              <a
                href={`/updates/${featured.id}`}
                className="group mb-16 block overflow-hidden rounded-3xl border border-gray-200 bg-[#FAFAF8] shadow-sm transition-all hover:border-[#2D7A82]/40 hover:shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative min-h-[280px] overflow-hidden bg-gray-900 lg:min-h-[360px]">
                    <img
                      src={featured.mainImage}
                      alt={featured.title}
                      onError={(e) => handleImgError(e, "yard03")}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full border border-[#2D7A82]/30 bg-[#0A1628]/90 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#5EAEB3] backdrop-blur-md">
                      {featured.category}
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A1628] backdrop-blur-md">
                      {featured.timeAgo}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] font-mono text-gray-500">
                      <span className="font-bold text-[#2D7A82]">{featured.batchId}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-[#2D7A82]" /> {featured.location}
                      </span>
                    </div>
                    <h2 className="font-display mb-4 text-3xl font-semibold text-[#0A1628] transition-colors group-hover:text-[#2D7A82] lg:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">{featured.summary}</p>
                    <div className="mb-6 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <p className="text-[9px] font-mono uppercase text-gray-400">Tonnage</p>
                        <p className="font-semibold text-[#0A1628]">{featured.tonnage}</p>
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <p className="text-[9px] font-mono uppercase text-gray-400">OD Range</p>
                        <p className="font-semibold text-[#2D7A82]">{featured.sizeRange}</p>
                      </div>
                    </div>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0A1628] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors group-hover:bg-[#2D7A82]">
                      View Full Batch Report <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            </FadeUp>
          )}

          <FadeUp delay={0.05}>
            <SectionLabel text="Consignment Stream" />
            <h2 className="font-display mb-10 text-3xl font-semibold text-[#0A1628] sm:text-4xl">
              All yard dispatches & inspections
            </h2>
          </FadeUp>

          {rest.length === 0 && !featured ? (
            <div className="rounded-3xl border border-gray-200 bg-[#FAFAF8] py-20 text-center">
              <p className="font-display text-xl text-[#0A1628]">No updates match this filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.03}>
                  <a
                    href={`/updates/${item.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-[#FAFAF8] shadow-sm transition-all hover:border-[#2D7A82]/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                      <img
                        src={item.mainImage}
                        alt={item.title}
                        onError={(e) => handleImgError(e, "yard03")}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 rounded-full border border-[#2D7A82]/30 bg-[#0A1628]/90 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#5EAEB3] backdrop-blur-md">
                        {item.category}
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A1628] backdrop-blur-md">
                        <Calendar size={11} className="text-[#2D7A82]" /> {item.timeAgo}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-gray-500">
                        <span className="font-bold text-[#2D7A82]">{item.batchId}</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-[#2D7A82]" /> {item.location.split(" ")[0]}
                        </span>
                      </div>
                      <h3 className="font-display mb-2 text-lg font-semibold text-[#0A1628] transition-colors group-hover:text-[#2D7A82]">
                        {item.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 flex-1 text-xs leading-relaxed text-gray-600">{item.summary}</p>

                      <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-gray-200 bg-white p-3 text-[11px] font-mono">
                        <div>
                          <span className="block text-[9px] uppercase text-gray-400">Tonnage</span>
                          <span className="font-semibold text-[#0A1628]">{item.tonnage}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase text-gray-400">OD Range</span>
                          <span className="font-semibold text-[#2D7A82]">{item.sizeRange}</span>
                        </div>
                      </div>

                      <span className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors group-hover:bg-[#2D7A82]">
                        <Eye size={14} /> Open Batch Report
                      </span>
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} defaultCategory={quoteCategory} />
    </PageShell>
  );
}
