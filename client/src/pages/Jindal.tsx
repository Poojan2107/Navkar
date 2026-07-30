import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Shield, Award, FileText, CheckCircle2, Search, Download, Sparkles, Layers, ShieldCheck, ExternalLink } from "lucide-react";
import PageShell from "@/components/PageShell";
import QuoteModal from "@/components/QuoteModal";
import { FadeUp } from "@/hooks/useScrollAnimation";
import { handleImgError } from "@/lib/assetFallback";
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

export default function Jindal() {
  const [showCert, setShowCert] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("Jindal Star MS ERW Black Pipes");

  const authenticitySteps = [
    {
      step: "01",
      title: "Embossed Mill Brand Mark",
      desc: "Every genuine Jindal Star or Asian pipe features physical mill brand name embossing stamped into the pipe body at regular 1-meter intervals."
    },
    {
      step: "02",
      title: "Stenciled Heat & Batch Code",
      desc: "Look for durable white stencil marking displaying the exact Heat Number, Nominal Bore (NB), Schedule Wall Thickness, and Indian Standard (IS 1239 / IS 3589)."
    },
    {
      step: "03",
      title: "Traceable Mill Test Certificate (MTC)",
      desc: "Supplied with every shipment from Ahmedabad. Cross-verify chemical composition (Carbon, Manganese, Sulfur) and hydrostatic pressure test results against the stenciled heat number."
    },
    {
      step: "04",
      title: "Factory Color Band Striping",
      desc: "Standard grade identification stripes applied at mill ends to confirm Light (Yellow), Medium (Blue), or Heavy (Red) schedule thickness."
    }
  ];

  const jindalProducts = [
    {
      title: "Jindal Star MS ERW Black Pipes",
      subtitle: "15 MM to 500 MM OD • IS 1239 / IS 3589",
      desc: "Genuine Jindal Star MS ERW pipes for high-pressure water lines, fire-fighting systems, structural piling, and HVAC networks in Ahmedabad & Gujarat.",
      specs: ["IS 1239 (Part 1) / IS 3589", "Fe 330 / Fe 410 Grade", "Length: 6m / 12m", "Hydrostatic Tested"]
    },
    {
      title: "Jindal Galvanized (GI) Pipes",
      subtitle: "Hot-Dip Galvanized • Corrosion Resistant",
      desc: "Hot-dip galvanized steel pipes engineered for domestic & industrial water supply, outdoor structures, and plumbing systems with heavy zinc coating.",
      specs: ["Zinc Coating: ≥ 360 g/m²", "IS 1239 Heavy/Medium Class", "Threaded & Socketed", "Rust Resistant"]
    },
    {
      title: "Jindal Structural Hollow Sections",
      subtitle: "SHS & RHS Structural Tubes • IS 4923",
      desc: "Square and rectangular cold-formed structural steel tubes for industrial sheds, warehouses, solar mountings, and heavy equipment frames.",
      specs: ["20x20mm to 300x300mm", "IS 4923 YST 210/310", "High Tensile Strength", "Uniform Wall Thickness"]
    },
    {
      title: "Jindal Seamless Steel Pipes",
      subtitle: "High Pressure Boilers & Oil/Gas Lines",
      desc: "Seamless steel pipes manufactured for extreme pressure applications, high-temperature steam lines, chemical refineries, and hydraulic systems.",
      specs: ["ASTM A106 / API 5L", "Schedule 40 / 80 / 160", "Zero Weld Seam Risk", "100% Ultrasonic Tested"]
    }
  ];

  return (
    <PageShell darkNav={true}>
      {/* High-Authority Jindal Hero */}
      <section className="relative min-h-[50vh] overflow-hidden bg-[#0A1628] flex items-center justify-center pt-32 lg:pt-36 pb-16 lg:pb-20">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/90 to-[#0A1628]" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-[#2D7A82]/20 text-[#5EAEB3] text-xs font-mono font-bold tracking-widest uppercase mb-6 border border-[#2D7A82]/40 shadow-sm"
          >
            <ShieldCheck size={16} /> OFFICIAL CHANNEL PARTNER • JINDAL (INDIA) LIMITED &amp; ASIAN PIPES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight font-semibold tracking-tight"
          >
            Authorized Jindal Steel Pipe Partnership
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Direct mill supply guaranteed with 100% factory Mill Test Certificates (MTC), original mill embossing, and ready stock dispatches in Ahmedabad, Gujarat.
          </motion.p>
        </div>
      </section>

      {/* Partnership Metrics Strip */}
      <section className="bg-[#2D7A82] text-white py-6">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono text-xs">
          <div>
            <span className="block font-display text-3xl font-bold text-white mb-1">30+ Years</span>
            <span className="text-white/80 uppercase">Authorized Channel Partner</span>
          </div>
          <div>
            <span className="block font-display text-3xl font-bold text-white mb-1">100% Genuine</span>
            <span className="text-white/80 uppercase">Factory MTC Guaranteed</span>
          </div>
          <div>
            <span className="block font-display text-3xl font-bold text-white mb-1">15 - 500 MM</span>
            <span className="text-white/80 uppercase">OD Ready Stock</span>
          </div>
          <div>
            <span className="block font-display text-3xl font-bold text-white mb-1">50 Bar</span>
            <span className="text-white/80 uppercase">Hydrostatic Test Certified</span>
          </div>
        </div>
      </section>

      {/* Main Partnership & Certificate Inspector Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
            <div className="lg:col-span-6">
              <SectionLabel text="Official Mill Authorization" />
              <FadeUp>
                <h2 className="font-display text-4xl sm:text-5xl text-[#0A1628] mb-6 leading-tight font-semibold">
                  Direct Jindal & Asian mill supply, <br />
                  <span className="text-[#2D7A82]">100% documented.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  <strong>Navkar Tubes & Tools</strong> holds an official authorized channel partnership with <strong>Jindal (India) Limited</strong> and <strong>Asian Pipes</strong> in Ahmedabad, Gujarat. For over three decades, our partnership ensures procurement engineers receive zero counterfeit material — only original factory pipes with matching Mill Test Certificates.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  We maintain ready stock inventories across MS ERW black pipes, GI pipes, structural hollow sections, and seamless pipes ranging from 15 MM to 500 MM OD.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowCert(true)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0A1628] text-white font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-[#2D7A82] transition-colors duration-500 cursor-pointer shadow-md"
                  >
                    INSPECT AUTHORIZATION CERTIFICATE <Search size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProduct("Jindal Authorized Pipe Price List Inquiry");
                      setQuoteOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 border border-gray-300 text-[#0A1628] font-semibold text-xs tracking-wider uppercase rounded-full hover:border-[#2D7A82] hover:text-[#2D7A82] transition-colors duration-300 cursor-pointer"
                  >
                    REQUEST JINDAL PRICE LIST <ArrowRight size={14} />
                  </button>
                </div>
              </FadeUp>
            </div>

            {/* Certificate Card */}
            <div className="lg:col-span-6">
              <FadeUp delay={0.15}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="relative cursor-pointer group"
                  onClick={() => setShowCert(true)}
                >
                  <div className="bg-[#FAFAF8] p-6 rounded-3xl border border-gray-200 shadow-xl group-hover:border-[#2D7A82] transition-colors">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                      <span className="text-[10px] font-mono font-bold text-[#2D7A82] uppercase tracking-wider bg-[#2D7A82]/10 px-3 py-1 rounded-full">
                        OFFICIAL DOCUMENT • JINDAL (INDIA) LTD
                      </span>
                      <span className="text-xs text-gray-400 font-mono">Click to Zoom</span>
                    </div>

                    <img
                      src={IMG.cert}
                      alt="Jindal Authorization Certificate"
                      onError={(e) => handleImgError(e, "cert")}
                      className="w-full rounded-2xl shadow-sm"
                    />
                  </div>
                  <p className="mt-4 text-gray-500 text-xs flex items-center justify-center gap-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#2D7A82] animate-pulse" />
                    Inspect verified Jindal Channel Partner Certificate
                  </p>
                </motion.div>
              </FadeUp>
            </div>
          </div>

          {/* Jindal Product Lineup Cards */}
          <div className="pt-16 border-t border-gray-200">
            <SectionLabel text="Jindal Certified Range" />
            <h2 className="font-display text-3xl sm:text-4xl text-[#0A1628] mb-12 font-semibold">
              Authorized Jindal Steel Pipe Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jindalProducts.map((prod, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className="bg-[#FAFAF8] p-8 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#2D7A82] uppercase bg-[#2D7A82]/10 px-3 py-1 rounded-full">
                        JINDAL CERTIFIED
                      </span>
                      <h3 className="font-display text-2xl text-[#0A1628] mt-3 mb-1 font-semibold">{prod.title}</h3>
                      <p className="text-xs font-mono text-[#2D7A82] uppercase tracking-wider mb-4 font-bold">{prod.subtitle}</p>
                      <p className="text-gray-600 text-xs leading-relaxed mb-6">{prod.desc}</p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-white p-4 rounded-2xl border border-gray-200 mb-6">
                        {prod.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5 text-gray-700">
                            <CheckCircle2 size={12} className="text-[#2D7A82]" /> {spec}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProduct(prod.title);
                        setQuoteOpen(true);
                      }}
                      className="w-full py-3 bg-[#0A1628] hover:bg-[#2D7A82] text-white text-xs font-semibold tracking-wider uppercase rounded-2xl transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      REQUEST {prod.title.toUpperCase()} QUOTE <ArrowRight size={14} />
                    </button>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* 4-Step Physical Authenticity Protocol */}
          <div className="mt-24 pt-16 border-t border-gray-200">
            <SectionLabel text="Quality Protocol" />
            <h2 className="font-display text-3xl sm:text-4xl text-[#0A1628] mb-4 font-semibold">
              How to verify genuine Jindal pipes on site
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mb-12">
              Protect your engineering project from unbranded steel. Follow this 4-step physical inspection protocol on every delivery:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {authenticitySteps.map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.1}>
                  <div className="p-8 bg-[#FAFAF8] rounded-3xl border border-gray-200/80 h-full flex flex-col justify-between">
                    <div>
                      <span className="font-display text-4xl text-[#2D7A82] mb-4 block font-bold">
                        {item.step}
                      </span>
                      <h3 className="font-display text-xl text-[#0A1628] mb-3 font-semibold">{item.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-1.5 text-[10px] font-mono text-[#2D7A82] uppercase tracking-wider font-semibold">
                      <CheckCircle2 size={12} /> Standard Protocol
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Inspector Fullscreen Modal */}
      <AnimatePresence>
        {showCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0A1628]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowCert(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <div>
                  <span className="text-[10px] font-mono text-[#2D7A82] uppercase tracking-wider font-bold">Official Document</span>
                  <h3 className="font-display text-xl text-[#0A1628] font-semibold">Jindal Channel Partner Authorization Certificate</h3>
                </div>
                <button
                  onClick={() => setShowCert(false)}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <img
                src={IMG.cert}
                alt="Jindal Certificate Full"
                onError={(e) => handleImgError(e, "cert")}
                className="w-full max-h-[70vh] object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} defaultCategory={selectedProduct} />
    </PageShell>
  );
}
