import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Video, Image as ImageIcon, MapPin, ArrowRight, ShieldCheck, Search, Sparkles, Layers, Eye } from "lucide-react";
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

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [showcaseMode, setShowcaseMode] = useState<"photos" | "video" | "inspection">("photos");
  const [filter, setFilter] = useState<string>("all");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteBatch, setQuoteBatch] = useState("");

  const allImages = [
    // Export dispatches (19 photos)
    ...IMG.export.map((src, i) => ({
      src,
      category: "export",
      title: `Export Container Loading #${i + 1}`,
      desc: "Port container loading of Jindal & Asian MS ERW pipes for international export dispatches from Ahmedabad."
    })),
    // Yard dispatches
    { src: IMG.yard1, category: "yard", title: "Ahmedabad Heavy Stock Yard", desc: "Overhead gantry crane handling 300mm OD steel pipe bundles in Ahmedabad." },
    { src: IMG.yard2, category: "yard", title: "Ahmedabad Dispatch Hub", desc: "Ready dispatch stock of GI square and rectangular hollow sections." },
    { src: IMG.yard03, category: "yard", title: "Spiral Pipe Inventory", desc: "Large diameter spiral welded pipes stored for water pipeline projects." },
    { src: IMG.yard04, category: "yard", title: "Jindal Certified Bundles", desc: "Original mill strapped pipe bundles awaiting trailer dispatch." },
    { src: IMG.yard22, category: "yard", title: "Ceramic Lancing Pipe Batch", desc: "Manufactured Ceramic Coated Lancing Pipes packaged for refinery delivery." },
  ];

  const inspectionItems = [
    {
      title: "Embossed Jindal & Asian Brand Stamp",
      desc: "Physical mill brand mark embossed every 1m on genuine pipe surface.",
      img: IMG.yard04,
      tag: "MILL EMBOSSING"
    },
    {
      title: "Stenciled Heat & Batch Code",
      desc: "Traceable heat number HT-202607 and IS standard stenciling.",
      img: IMG.yard03,
      tag: "HEAT NO. STENCIL"
    },
    {
      title: "End Caps & Beveled Edges",
      desc: "Protective plastic end caps and precision 30° beveling for welding.",
      img: IMG.yard22,
      tag: "PRECISION BEVELING"
    },
    {
      title: "Refractory Ceramic Coating",
      desc: "In-house ceramic and calorized coating for high thermal resistance.",
      img: IMG.lancingPipes,
      tag: "LANCING COATING"
    }
  ];

  const filteredImages = filter === "all"
    ? allImages
    : allImages.filter((img) => img.category === filter);

  const next = () => setSelected((prev) => prev !== null ? Math.min(prev + 1, filteredImages.length - 1) : null);
  const prev = () => setSelected((prev) => prev !== null ? Math.max(prev - 1, 0) : null);

  const handleInquireBatch = (batchTitle: string) => {
    setQuoteBatch(`Showcase Stock Inquiry: ${batchTitle}`);
    setQuoteOpen(true);
  };

  return (
    <PageShell darkNav={true}>
      {/* Creative Showcase Hero */}
      <section className="relative min-h-[50vh] overflow-hidden bg-[#0A1628] flex items-center justify-center pt-32 lg:pt-36 pb-16 lg:pb-20">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/90 to-[#0A1628]" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2D7A82]/20 text-[#5EAEB3] text-xs font-mono font-bold tracking-widest uppercase mb-6 border border-[#2D7A82]/40 shadow-sm"
          >
            <Sparkles size={14} /> VISUAL SHOWCASE • AHMEDABAD, GUJARAT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight font-semibold tracking-tight"
          >
            Products &amp; Operations Deck
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Browse live photo galleries, video tours of our Ahmedabad stock facilities, and macro quality inspection showcases.
          </motion.p>
        </div>
      </section>

      {/* Main Showcase Mode Switcher Bar */}
      <section className="bg-[#0A1628] border-t border-white/10 sticky top-[72px] z-30 shadow-md">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex justify-center sm:justify-start gap-3 py-4 overflow-x-auto">
            {[
              { id: "photos", label: `Dispatch & Export Media (${allImages.length})`, icon: <ImageIcon size={15} /> },
              { id: "video", label: "Live Yard Video Tour", icon: <Video size={15} /> },
              { id: "inspection", label: "Quality & Macro Inspection", icon: <ShieldCheck size={15} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setShowcaseMode(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  showcaseMode === tab.id
                    ? "bg-[#2D7A82] text-white shadow-lg shadow-[#2D7A82]/30"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE MODE 1: DISPATCH & EXPORT MEDIA */}
      {showcaseMode === "photos" && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            {/* Filter Sub-Bar */}
            <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Filter Category:</span>
              {[
                { id: "all", label: "All Media" },
                { id: "export", label: "Export Container Dispatches" },
                { id: "yard", label: "Ahmedabad Stock Yards" },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setFilter(sub.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    filter === sub.id
                      ? "bg-[#0A1628] text-[#2D7A82]"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Creative Bento-Style Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((img, i) => (
                <FadeUp key={i} delay={i * 0.02}>
                  <motion.div
                    className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200 bg-[#0A1628]"
                    onClick={() => setSelected(i)}
                    whileHover={{ y: -6 }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 left-3 bg-[#0A1628]/90 text-[#2D7A82] text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#2D7A82]/40 backdrop-blur-md">
                        {img.category.toUpperCase()}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 text-[#0A1628] p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        <Eye size={14} />
                      </div>
                    </div>

                    <div className="p-5 bg-[#0A1628] text-white flex flex-col justify-between">
                      <div>
                        <h4 className="font-display text-base text-white group-hover:text-[#2D7A82] transition-colors truncate font-semibold">
                          {img.title}
                        </h4>
                        <p className="text-white/60 text-xs truncate mt-1 line-clamp-1">{img.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#2D7A82]">
                        <span>INSPECT IMAGE</span>
                        <span>→</span>
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SHOWCASE MODE 2: LIVE YARD VIDEO TOUR */}
      {showcaseMode === "video" && (
        <section className="py-20 lg:py-28 bg-[#0A1628] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <SectionLabel text="Interactive Operations Video Deck" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-5">
                <h2 className="font-display text-4xl text-white mb-6 leading-tight font-semibold">
                  High-Definition Video Tour of Ahmedabad Stock Yards
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Inspect live operational footage from our stocking facilities in Ahmedabad, Gujarat. Watch heavy overhead gantry cranes handle 300mm OD pipe bundles, automatic trailer loading, and container strapping for exports.
                </p>

                <div className="space-y-4 text-xs font-mono text-white/80">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D7A82]" />
                    <span>Overhead Crane Handling • Ahmedabad Yard</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D7A82]" />
                    <span>Hollow Section & Lancing Pipe Storage • Ahmedabad</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D7A82]" />
                    <span>Export Container Strapping & Logistics</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black aspect-video">
                  <video
                    src={IMG.yardTour}
                    controls
                    poster={IMG.facility}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SHOWCASE MODE 3: QUALITY & MACRO INSPECTION */}
      {showcaseMode === "inspection" && (
        <section className="py-20 lg:py-28 bg-[#FAFAF8]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <SectionLabel text="Physical Product Authenticity Showcase" />
            <h2 className="font-display text-4xl text-[#0A1628] mb-4 font-semibold">
              Quality Marks & Physical Pipe Inspection
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mb-12">
              Every single pipe dispatched from Navkar Ahmedabad Yards undergoes strict physical inspection before customer loading.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {inspectionItems.map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden bg-gray-900 flex-shrink-0">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#2D7A82] uppercase bg-[#2D7A82]/10 px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <h3 className="font-display text-xl text-[#0A1628] mt-3 mb-2 font-semibold">{item.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-4">{item.desc}</p>
                    
                    <button
                      onClick={() => handleInquireBatch(item.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1628] hover:text-[#2D7A82] uppercase tracking-wider cursor-pointer"
                    >
                      INQUIRE PRODUCT SPECS →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selected !== null && filteredImages[selected] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0A1628]/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
            >
              <X size={22} />
            </button>

            {selected > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {selected < filteredImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <div className="max-w-4xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selected}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={filteredImages[selected].src}
                alt={filteredImages[selected].title}
                className="max-w-full max-h-[70vh] object-contain rounded-3xl shadow-2xl mb-6"
              />

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-3xl text-center max-w-xl w-full">
                <span className="text-[10px] font-mono text-[#2D7A82] uppercase tracking-[0.2em] font-bold bg-[#2D7A82]/20 px-3 py-1 rounded-full border border-[#2D7A82]/30">
                  {filteredImages[selected].category.toUpperCase()}
                </span>
                <h3 className="font-display text-xl text-white mt-2 mb-1">{filteredImages[selected].title}</h3>
                <p className="text-white/70 text-xs mb-4">{filteredImages[selected].desc}</p>
                
                <button
                  onClick={() => handleInquireBatch(filteredImages[selected].title)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2D7A82] text-white text-xs font-semibold tracking-wider rounded-full hover:bg-white hover:text-[#0A1628] transition-colors duration-300 cursor-pointer shadow-md"
                >
                  INQUIRE ABOUT THIS PRODUCT BATCH <ArrowRight size={14} />
                </button>
              </div>

              <p className="mt-4 text-white/40 text-xs font-mono">
                {selected + 1} / {filteredImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} defaultCategory={quoteBatch} />
    </PageShell>
  );
}
