import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, FileText, CheckCircle2, ShieldCheck, BookOpen, Layers, Sparkles, ExternalLink } from "lucide-react";
import PageShell from "@/components/PageShell";
import QuoteModal from "@/components/QuoteModal";
import { FadeUp } from "@/hooks/useScrollAnimation";
import { IMG } from "@/asset-map";

function SectionLabel({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-[10px] font-mono font-semibold tracking-[0.35em] uppercase mb-4 text-[#2D7A82]"
    >
      [ {text} ]
    </motion.p>
  );
}

export default function Catalogue() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("");

  const chapters = [
    {
      num: "01",
      title: "MS ERW Black Pipes",
      subtitle: "IS 1239 (Part 1) / IS 3589 • Jindal & Asian Authorized",
      desc: "Detailed dimensions, wall thickness tolerances, mass per meter tables, hydrostatic pressure test ratings, and chemical composition bounds.",
      specs: ["15 MM to 500 MM OD", "Light, Medium & Heavy Class", "Plain & Beveled Ends", "100% Mill Test Certificates"]
    },
    {
      num: "02",
      title: "Ceramic Coated Lancing Pipes",
      subtitle: "Refractory Coated & Calorized • Manufactured in Ahmedabad",
      desc: "High-temperature ceramic coated lancing pipe dimensions, thermal oxidation limits, slag resistance data, and furnace application guides.",
      specs: ["6mm to 48.3 mm Sizes", "Thermal Limit Up to 1650°C", "Threaded & Socketed", "Steel Mills & Refineries"]
    },
    {
      num: "03",
      title: "GI & MS Structural Hollow Sections",
      subtitle: "SHS & RHS Square & Rectangular Tubes • IS 4923 / IS 1161",
      desc: "Sectional properties, moment of inertia, weight per meter tables for square and rectangular structural steel tubes.",
      specs: ["20x20 MM to 300x300 MM", "Zinc Coating up to 550 g/m²", "Cold Formed Structural", "Warehouse & Solar Mounts"]
    },
    {
      num: "04",
      title: "Spiral Welded & Piling Pipes",
      subtitle: "SAW Large Diameter Pipes • IS 5504 / API 5L",
      desc: "Submerged arc welded spiral pipe specifications for municipal water supply trunklines, industrial effluent lines, and foundation piling.",
      specs: ["400 MM to 2000 MM OD", "API 5L / Fe 410 / Fe 450", "Hydrotest Up to 50 Bar", "Beveled End Prep"]
    },
    {
      num: "05",
      title: "MS Flanges & Butt-Weld Fittings",
      subtitle: "ANSI B16.5 / BS 4504 • Forged Flanges & Fittings",
      desc: "Dimensional tables for slip-on, weld-neck, blind, and socket-weld flanges alongside elbows, tees, and reducers.",
      specs: ["Class 150 to Class 2500", "PN 10 / PN 16 / PN 40", "NACE Compliance", "Matching Pipe Schedule"]
    }
  ];

  return (
    <PageShell darkNav={true}>
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden bg-[#0A1628] flex items-center justify-center pt-32 lg:pt-36 pb-16 lg:pb-20">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/90 to-[#0A1628]" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D7A82]/20 text-[#5EAEB3] text-xs font-mono font-bold tracking-widest uppercase mb-6 border border-[#2D7A82]/40 shadow-sm"
          >
            <Sparkles size={14} /> OFFICIAL TECHNICAL PUBLICATION • 2026 EDITION
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight font-semibold tracking-tight"
          >
            Technical Product Catalogue &amp; Reference Guide
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Complete engineering reference for IS standards, weight charts, tolerance tables, and material specifications for MS ERW pipes, GI hollow sections, and Ceramic Lancing tubes.
          </motion.p>
        </div>
      </section>

      {/* Main Download Banner Deck */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="overflow-visible rounded-3xl border border-white/10 bg-[#0A1628] p-8 text-white shadow-2xl lg:p-12">
            <div className="flex flex-col items-center gap-8 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
            <div className="flex min-w-0 flex-col items-center gap-8 sm:flex-row">
              {/* 3D Elevated Brochure Cover Mockup */}
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#2D7A82] to-[#5EAEB3] opacity-50 blur-lg group-hover:opacity-80 transition duration-500" />
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  className="relative w-36 sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#0F2238] transition-all"
                >
                  <img
                    src={IMG.brochureCover}
                    alt="Navkar 2026 Technical Brochure Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent" />
                </motion.div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#2D7A82] uppercase bg-[#2D7A82]/20 px-3 py-1 rounded-full border border-[#2D7A82]/30">
                  OFFICIAL PUBLICATION
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-white mt-3 mb-2 font-semibold">
                  Complete Navkar Technical Brochure
                </h2>
                <p className="text-white/70 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Full PDF specification manual featuring MS ERW pipes, GI hollow sections, Ceramic Lancing pipes, spiral welded tubes, and forged flanges.
                </p>
              </div>
            </div>

            <div className="flex w-full min-w-0 shrink-0 flex-col gap-3 sm:max-w-md xl:w-[280px]">
              <a
                href={IMG.brochure}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2D7A82] px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-colors duration-300 hover:bg-white hover:text-[#0A1628]"
              >
                <Download size={15} className="shrink-0" /> DOWNLOAD FULL CATALOG PDF
              </a>

              <button
                onClick={() => {
                  setSelectedChapter("Printed Hardcopy Request");
                  setQuoteOpen(true);
                }}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white/10"
              >
                REQUEST HARDCOPY / SAMPLES
              </button>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Chapter Breakdown Cards */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionLabel text="Catalogue Chapter Index" />
          <h2 className="font-display text-3xl sm:text-4xl text-[#0A1628] mb-12 font-semibold">
            Product Sections Included in Brochure
          </h2>

          <div className="space-y-6">
            {chapters.map((chap, idx) => (
              <FadeUp key={idx} delay={idx * 0.06}>
                <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-8 lg:flex-row lg:items-center lg:gap-8">
                  <div className="flex items-start gap-6">
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[#2D7A82] shrink-0">
                      {chap.num}
                    </span>

                    <div>
                      <h3 className="font-display text-2xl text-[#0A1628] mb-1 font-semibold">{chap.title}</h3>
                      <p className="text-xs font-mono text-[#2D7A82] uppercase tracking-wider mb-3 font-bold">{chap.subtitle}</p>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-2xl">{chap.desc}</p>
                    </div>
                  </div>

                  <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start lg:items-end gap-4 shrink-0">
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#FAFAF8] p-3 rounded-2xl border border-gray-200/80">
                      {chap.specs.map((s, i) => (
                        <div key={i} className="flex items-center gap-1 text-gray-700">
                          <CheckCircle2 size={11} className="text-[#2D7A82]" /> {s}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedChapter(chap.title);
                        setQuoteOpen(true);
                      }}
                      className="px-6 py-3 bg-[#0A1628] hover:bg-[#2D7A82] text-white text-xs font-semibold uppercase tracking-wider rounded-2xl transition-colors cursor-pointer whitespace-nowrap"
                    >
                      INQUIRE THIS CHAPTER →
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} defaultCategory={selectedChapter || "Catalog Inquiry"} />
    </PageShell>
  );
}
