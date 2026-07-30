import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  ShieldCheck,
  Download,
  Truck,
  ChevronRight,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import QuoteModal from "@/components/QuoteModal";
import SectionLabel from "@/components/layout/SectionLabel";
import { handleImgError } from "@/lib/assetFallback";
import { FadeUp } from "@/hooks/useScrollAnimation";
import type { DispatchUpdate } from "@/lib/updatesGenerator";

type UpdateDetailViewProps = {
  update: DispatchUpdate;
  prevHref?: string;
  nextHref?: string;
};

export default function UpdateDetailView({ update, prevHref, nextHref }: UpdateDetailViewProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const images = update.additionalImages.length > 0 ? update.additionalImages : [update.mainImage];

  return (
    <PageShell darkNav>
      {/* Hero strip */}
      <section className="border-b border-white/10 bg-[#0A1628] pt-28 pb-10 lg:pt-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-mono text-white/50">
            <a href="/" className="hover:text-[#5EAEB3]">Home</a>
            <ChevronRight size={12} />
            <a href="/updates" className="hover:text-[#5EAEB3]">Yard Updates</a>
            <ChevronRight size={12} />
            <span className="text-white/80">{update.batchId}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#2D7A82]/40 bg-[#2D7A82]/20 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#5EAEB3]">
                  {update.batchId}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white/70">
                  {update.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-white/50">
                  <Calendar size={12} className="text-[#5EAEB3]" /> {update.timestamp}
                </span>
              </div>
              <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                {update.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/60">
                <MapPin size={14} className="text-[#5EAEB3]" /> {update.location} · {update.timeAgo}
              </p>
            </div>

            <button
              onClick={() => setQuoteOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#2D7A82] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[#0A1628] lg:self-auto"
            >
              Reserve Batch <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="relative mb-4 overflow-hidden rounded-3xl border border-gray-200 bg-gray-900 shadow-lg">
                <motion.img
                  key={activeImageIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  src={images[activeImageIdx]}
                  alt={update.title}
                  onError={(e) => handleImgError(e, "yard03")}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#0A1628]/85 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  {update.mtcStatus}
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                        activeImageIdx === i
                          ? "border-[#2D7A82] ring-2 ring-[#2D7A82]/20"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${update.title} — yard photo ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mt-10 space-y-6">
                <div>
                  <h2 className="font-display mb-3 text-xl font-semibold text-[#0A1628]">Summary & Quality Report</h2>
                  <p className="rounded-2xl border border-gray-100 bg-[#FAFAF8] p-5 text-sm leading-relaxed text-gray-600">
                    {update.summary}
                  </p>
                </div>
                <div>
                  <h2 className="font-display mb-3 text-xl font-semibold text-[#0A1628]">QC Verification</h2>
                  <p className="rounded-2xl border border-gray-100 bg-[#FAFAF8] p-5 text-sm leading-relaxed text-gray-600">
                    {update.inspectionNotes}
                  </p>
                </div>
                <div>
                  <h2 className="font-display mb-3 flex items-center gap-2 text-xl font-semibold text-[#0A1628]">
                    <Truck size={18} className="text-[#2D7A82]" /> Dispatch Logistics
                  </h2>
                  <p className="rounded-2xl border border-gray-100 bg-[#FAFAF8] p-5 text-sm leading-relaxed text-gray-600">
                    {update.dispatchDetails}
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Spec sidebar */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-3xl border border-gray-200 bg-[#FAFAF8] p-6">
                <SectionLabel text="Batch Specifications" className="mb-3" />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Heat Number", value: update.heatNumber },
                    { label: "Standard", value: update.standard },
                    { label: "OD / Size Range", value: update.sizeRange },
                    { label: "Wall Thickness", value: update.wallThickness },
                    { label: "Tonnage", value: update.tonnage },
                    { label: "Location", value: update.location },
                  ].map((row) => (
                    <div key={row.label} className="rounded-xl border border-gray-200 bg-white p-4">
                      <p className="mb-1 text-[9px] font-mono uppercase tracking-wider text-gray-400">{row.label}</p>
                      <p className="text-sm font-semibold text-[#0A1628]">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#2D7A82]/25 bg-[#2D7A82]/5 p-6">
                <div className="mb-4 flex items-center gap-2 text-[#2D7A82]">
                  <ShieldCheck size={20} />
                  <span className="font-display text-lg font-semibold text-[#0A1628]">Verified Consignment</span>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  Original mill test certificate available for heat {update.heatNumber}. Hydrostatic and dimensional checks completed at yard.
                </p>
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="mb-3 w-full rounded-full bg-[#0A1628] py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#2D7A82]"
                >
                  Reserve This Batch
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.info("Sample MTC request", {
                      description: `Quote form opened — mention heat ${update.heatNumber}.`,
                    });
                    setQuoteOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-3 text-xs font-semibold uppercase tracking-wider text-[#0A1628] transition-colors hover:border-[#2D7A82] hover:text-[#2D7A82]"
                >
                  <Download size={14} /> Sample MTC
                </button>
              </div>

              <a
                href="tel:+919601702883"
                className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-4 text-xs font-semibold uppercase tracking-wider text-[#0A1628] transition-colors hover:border-[#2D7A82] hover:text-[#2D7A82]"
              >
                <Phone size={14} /> Call Yard Desk
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Prev / next */}
      <section className="border-t border-gray-200 bg-[#FAFAF8] py-10">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 lg:px-12">
          {prevHref ? (
            <a href={prevHref} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D7A82] hover:text-[#0A1628]">
              <ArrowLeft size={14} /> Previous Batch
            </a>
          ) : (
            <a href="/updates" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D7A82] hover:text-[#0A1628]">
              <ArrowLeft size={14} /> All Updates
            </a>
          )}
          {nextHref && (
            <a href={nextHref} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D7A82] hover:text-[#0A1628]">
              Next Batch <ArrowRight size={14} />
            </a>
          )}
        </div>
      </section>

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultCategory={`${update.batchId} (${update.category})`}
      />
    </PageShell>
  );
}
