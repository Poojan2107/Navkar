import { motion } from "framer-motion";
import { Shield, Award, MapPin, Factory, History, FileCheck, CheckCircle2, ArrowRight, Phone, Sparkles, Linkedin, ExternalLink, Building2, Quote, UserCheck, Layers, Cpu, Flame, Eye } from "lucide-react";
import PageShell from "@/components/PageShell";
import QuoteModal from "@/components/QuoteModal";
import { useState } from "react";
import ScrollTimeline from "@/components/ScrollTimeline";
import { FadeUp } from "@/hooks/useScrollAnimation";
import { handleImgError } from "@/lib/assetFallback";
import { IMG } from "@/asset-map";

function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-[10px] font-mono font-semibold tracking-[0.35em] uppercase mb-4 ${dark ? "text-[#5EAEB3]" : "text-[#2D7A82]"}`}
    >
      [ {text} ]
    </motion.p>
  );
}

export default function About() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const foundationSlides = [
    {
      id: "yard1",
      label: "Ahmedabad Stock Yard",
      title: "10,000+ MT Ready Stock Capacity",
      desc: "Equipped with heavy-duty overhead gantry cranes for instant trailer loading of MS ERW black and GI pipes.",
      img: IMG.facility,
      badge: "AHMEDABAD STOCK YARD"
    },
    {
      id: "plant",
      label: "Ceramic Lancing Plant",
      title: "In-House Coated Lancing Unit",
      desc: "Specialized manufacturing plant in Ahmedabad producing ceramic & calorized lancing tubes (up to 1650°C limit).",
      img: IMG.lancingPipes,
      badge: "MANUFACTURING PLANT"
    },
    {
      id: "dispatch",
      label: "Ready Dispatch Hub",
      title: "Rapid Dispatch Infrastructure",
      desc: "Dedicated container loading and long-distance transport logistics serving EPC contractors across India.",
      img: IMG.yard2,
      badge: "DISPATCH HUB"
    },
    {
      id: "mtc",
      label: "100% Genuine MTC",
      title: "Mill Test Certificate Guarantee",
      desc: "Original factory chemical and mechanical test reports supplied with every single bundle dispatched.",
      img: IMG.cert,
      badge: "QUALITY CERTIFICATION"
    }
  ];

  const timelineEvents = [
    {
      year: "1995",
      title: "Inception in Ahmedabad",
      subtitle: "Industrial Steel Trading",
      desc: "Founded by Mr. Shripal Shah as a dedicated industrial steel trading enterprise catering to local engineering, construction, and manufacturing projects in Gujarat.",
      metric: "Day 1 Commitment"
    },
    {
      year: "2004",
      title: "Jindal & Asian Pipes Dealership",
      subtitle: "Official Mill Authorization",
      desc: "Appointed as an Authorized Channel Partner for Jindal (India) Limited & Asian Pipes, establishing a direct mill line for genuine MS ERW and GI pipes.",
      metric: "100% Factory MTC"
    },
    {
      year: "2012",
      title: "Stock Yard Capacity Expansion",
      subtitle: "Heavy Logistics Hub",
      desc: "Commissioned heavy-duty stock yard infrastructure in Ahmedabad equipped with overhead gantry cranes, expanding ready stock capacity to over 10,000 Metric Tons.",
      metric: "10,000+ MT Capacity"
    },
    {
      year: "2018",
      title: "Ceramic Lancing Manufacturing Setup",
      subtitle: "Specialized Plant Production",
      desc: "Established a specialized manufacturing plant in Ahmedabad for Ceramic & Special Coated Lancing Pipes, supplying steel melt shops and copper refineries nationwide.",
      metric: "1650°C Heat Limit"
    },
    {
      year: "2022",
      title: "Global Container Exports Expansion",
      subtitle: "Overseas Project Supply",
      desc: "Initiated direct container loading and export dispatches of Jindal pipes and ceramic lancing tubes for international engineering projects.",
      metric: "Global Shipments"
    },
    {
      year: "2026",
      title: "30+ Years of Industrial Leadership",
      subtitle: "Trusted Engineering Partner",
      desc: "Serving over 500+ corporate clients, public sector undertakings, and EPC contractors with 100% MTC-backed steel pipes, fittings, and verified digital procurement.",
      metric: "500+ Clients"
    }
  ];

  return (
    <PageShell darkNav={true}>
      {/* Hero Section */}
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
            <Sparkles size={14} /> AHMEDABAD, GUJARAT • ESTABLISHED 1995
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight font-semibold tracking-tight"
          >
            Three Decades of Steel, <br />
            <span className="text-[#5EAEB3]">Authenticity &amp; Vision</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Authorized Jindal &amp; Asian Pipes Partner and Premier Manufacturer of Ceramic &amp; Special Coated Lancing Pipes in Ahmedabad, Gujarat.
          </motion.p>
        </div>
      </section>

      {/* STORY CHAPTER 1: THE ORIGIN & PURPOSE - INTERACTIVE SHOWCASE FRAME */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <SectionLabel text="Chapter I • The Foundation" />
              <h2 className="font-display text-4xl sm:text-5xl text-[#0A1628] mb-6 leading-tight font-semibold">
                Built on an unshakeable promise of <span className="text-[#2D7A82]">material integrity</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Founded in 1995 in Ahmedabad, <strong>Navkar Tubes & Tools</strong> began with a clear mission: to provide Indian industrial procurement managers with genuine, mill-certified steel pipes backed by dependable yard logistics.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Over 30 years, our enterprise has grown into a dual-capability power house — serving as an <strong>Authorized Channel Partner for Jindal (India) Limited & Asian Pipes</strong> while operating an in-house <strong>Manufacturing Unit for Ceramic & Special Coated Lancing Pipes</strong> in Ahmedabad, Gujarat.
              </p>

              {/* Stat Highlights */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-[#FAFAF8] rounded-3xl border border-gray-200/80 mb-8 shadow-sm">
                <div>
                  <p className="font-display text-3xl sm:text-4xl text-[#2D7A82] font-bold">30+</p>
                  <p className="text-[11px] font-mono text-gray-500 uppercase mt-1 font-semibold">Years Track Record</p>
                </div>
                <div>
                  <p className="font-display text-3xl sm:text-4xl text-[#0A1628] font-bold">500+</p>
                  <p className="text-[11px] font-mono text-gray-500 uppercase mt-1 font-semibold">Active Corporate Clients</p>
                </div>
                <div>
                  <p className="font-display text-3xl sm:text-4xl text-[#2D7A82] font-bold">10K+</p>
                  <p className="text-[11px] font-mono text-gray-500 uppercase mt-1 font-semibold">MT Ready Stock</p>
                </div>
              </div>

              {/* External Verified Badges */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://www.indiamart.com/navkartubesandtools/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-[#FAFAF8] border border-gray-200 text-gray-700 text-xs font-mono font-semibold hover:bg-[#2D7A82] hover:text-white transition-all shadow-sm"
                >
                  <Building2 size={14} className="text-[#2D7A82]" /> IndiaMART Verified Trust Supplier <ExternalLink size={12} />
                </a>

                <a
                  href="https://www.linkedin.com/company/navkar-tubes-&-tools/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-[#FAFAF8] border border-gray-200 text-gray-700 text-xs font-mono font-semibold hover:bg-[#0077B5] hover:text-white transition-all shadow-sm"
                >
                  <Linkedin size={14} className="text-[#0077B5]" /> Official Company LinkedIn <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Interactive Master Visual Showcase Stage */}
            <div className="lg:col-span-6 space-y-4">
              {/* Interactive Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#FAFAF8] p-2 rounded-2xl border border-gray-200">
                {foundationSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveTab(idx)}
                    className={`py-2 px-3 rounded-xl text-[10px] font-mono font-bold uppercase transition-all duration-300 ${
                      activeTab === idx
                        ? "bg-[#0A1628] text-white shadow-md"
                        : "text-gray-500 hover:text-[#0A1628] hover:bg-gray-200/50"
                    }`}
                  >
                    {slide.label}
                  </button>
                ))}
              </div>

              {/* Main Visual Display Stage */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 h-[380px] bg-[#0A1628] group">
                <img
                  src={foundationSlides[activeTab].img}
                  alt={foundationSlides[activeTab].title}
                  onError={(e) => handleImgError(e, "facility")}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />

                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider bg-[#2D7A82] px-3 py-1 rounded-full border border-white/20">
                    {foundationSlides[activeTab].badge}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-display text-2xl text-white mb-1 font-semibold">
                    {foundationSlides[activeTab].title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed max-w-xl">
                    {foundationSlides[activeTab].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 2: FOUNDERS & LEADERS - CREATIVE ZIG-ZAG GRID */}
      <section className="py-24 bg-[#FAFAF8] border-b border-gray-200/80">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <SectionLabel text="Chapter II • Executive Leadership" />
            <h2 className="font-display text-4xl sm:text-5xl text-[#0A1628] mt-2 mb-4 font-semibold">
              Meet the Founders
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              The visionary leadership steering Navkar Tubes & Tools — combining three decades of steel trade mastery with modern manufacturing and international supply logistics.
            </p>
          </div>

          <div className="space-y-24">
            {/* ZIG 1: FOUNDER 1 - MR. SHRIPAL SHAH (Left: Image | Right: Content) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl">
              {/* Left Column: Full Size Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#0A1628] to-[#1B2E3B] group border border-gray-200">
                  <img
                    src={IMG.shripalShah}
                    alt="Mr. Shripal Shah - Founder & Managing Director"
                    onError={(e) => handleImgError(e, "shripalShah")}
                    className="w-full h-[480px] lg:h-[540px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#2D7A82] uppercase bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                      FOUNDER & MANAGING DIRECTOR
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Founder Details & Identity */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-3 text-[#2D7A82] text-xs font-mono font-bold uppercase tracking-wider">
                  <UserCheck size={16} /> 30+ Years Steel Trade Pioneer
                </div>

                <h3 className="font-display text-3xl sm:text-5xl text-[#0A1628] mb-3 font-semibold">
                  Mr. Shripal Shah
                </h3>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
                  Founder & Managing Director • Navkar Tubes & Tools
                </p>

                {/* Quote Box */}
                <div className="p-6 bg-[#FAFAF8] rounded-2xl border-l-4 border-[#2D7A82] border-y border-r border-gray-200/80 mb-8 relative">
                  <Quote className="text-[#2D7A82]/20 absolute top-4 right-4" size={40} />
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic font-sans relative z-10">
                    "For over 30 years, our core rule has remained unchanged: never compromise on material specification. When a client orders Jindal or Asian pipes from Navkar, they receive 100% genuine mill material with complete peace of mind."
                  </p>
                </div>

                <div className="space-y-3 text-xs text-gray-600 font-sans leading-relaxed mb-8">
                  <p>
                    Mr. Shripal Shah established Navkar Tubes & Tools in 1995 with an uncompromising commitment to steel pipe authenticity. Under his leadership, Navkar secured authorized channel partnerships with Jindal (India) Limited and Asian Pipes, building an enduring reputation across Gujarat and India.
                  </p>
                </div>

                {/* Badges & Social Link */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2D7A82]" />
                    <span className="text-xs font-mono text-gray-500 font-semibold">Strategic Lead & Mill Partnerships</span>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/shripal-shah-19b2b529a/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077B5] text-white text-xs font-mono font-semibold hover:bg-[#0A1628] transition-colors shadow-md cursor-pointer"
                  >
                    <Linkedin size={14} /> Shripal Shah LinkedIn <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* ZAG 2: FOUNDER 2 - MR. HARSH KOTHARI (Left: Content | Right: Image) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl">
              {/* Left Column: Founder Details & Identity */}
              <div className="lg:col-span-7 lg:order-1 order-2">
                <div className="flex items-center gap-3 mb-3 text-[#2D7A82] text-xs font-mono font-bold uppercase tracking-wider">
                  <UserCheck size={16} /> Operations & Manufacturing Lead
                </div>

                <h3 className="font-display text-3xl sm:text-5xl text-[#0A1628] mb-3 font-semibold">
                  Mr. Harsh Kothari
                </h3>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
                  Director & Operations Head • Navkar Tubes & Tools
                </p>

                {/* Quote Box */}
                <div className="p-6 bg-[#FAFAF8] rounded-2xl border-l-4 border-[#2D7A82] border-y border-r border-gray-200/80 mb-8 relative">
                  <Quote className="text-[#2D7A82]/20 absolute top-4 right-4" size={40} />
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic font-sans relative z-10">
                    "Driving operational modernizations across our Ahmedabad stocking yards, expanding our Ceramic Coated Lancing Pipe manufacturing unit, and streamlining global container dispatches for infrastructure projects across India and overseas."
                  </p>
                </div>

                <div className="space-y-3 text-xs text-gray-600 font-sans leading-relaxed mb-8">
                  <p>
                    Mr. Harsh Kothari drives operational innovation at Navkar Tubes & Tools. He spearheaded the setup of the Ceramic & Special Coated Lancing Pipe manufacturing unit in Ahmedabad and oversees heavy stockyard logistics, quality compliance, and direct international container exports.
                  </p>
                </div>

                {/* Badges & Social Link */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2D7A82]" />
                    <span className="text-xs font-mono text-gray-500 font-semibold">Ceramic Lancing Production & Container Exports</span>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/harsh-kothari-159a95262/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077B5] text-white text-xs font-mono font-semibold hover:bg-[#0A1628] transition-colors shadow-md cursor-pointer"
                  >
                    <Linkedin size={14} /> Harsh Kothari LinkedIn <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Right Column: Full Size Image */}
              <div className="lg:col-span-5 lg:order-2 order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#0A1628] to-[#1B2E3B] group border border-gray-200">
                  <img
                    src={IMG.harshKothari}
                    alt="Mr. Harsh Kothari - Director & Operations Head"
                    onError={(e) => handleImgError(e, "facility")}
                    className="w-full h-[480px] lg:h-[540px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#2D7A82] uppercase bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                      DIRECTOR & OPERATIONS HEAD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 3: SCROLL-DRIVEN MILESTONE TIMELINE */}
      <section className="border-b border-gray-100 bg-[#FAFAF8] py-24 lg:py-28">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12">
          <SectionLabel text="Chapter III • Chronological Milestones" />
          <h2 className="font-display mb-4 text-4xl font-semibold text-[#0A1628] sm:text-5xl">
            Pivotal moments in our evolution
          </h2>
          <p className="mb-10 max-w-xl text-base text-gray-500">
            Three decades of milestones — scroll to walk through our history. The active chapter updates as you move.
          </p>

          <ScrollTimeline events={timelineEvents} />
        </div>
      </section>

      {/* STORY CHAPTER 4: ASYMMETRIC INDUSTRIAL CAPABILITY MATRIX */}
      <section className="py-24 bg-[#0A1628] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionLabel text="Chapter IV • Infrastructure & Manufacturing" dark={true} />
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4 font-semibold">
            Stocking Hubs & Manufacturing Plant
          </h2>
          <p className="text-white/60 text-base max-w-2xl mb-16">
            Strategically located physical assets in Ahmedabad, Gujarat ensuring ready inventory and rapid truck loading.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* FLAGSHIP SPOTLIGHT (Span 7): Ceramic & Special Coated Lancing Plant */}
            <div className="lg:col-span-7 bg-[#2D7A82] rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
              <img
                src={IMG.lancingPipes}
                alt="Ceramic Coated Lancing Plant"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#2D7A82]/85 to-transparent" />

              <div className="relative z-10 mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider mb-6 border border-white/30">
                  <Flame size={14} className="text-amber-300" /> IN-HOUSE MANUFACTURING UNIT • AHMEDABAD
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-white mb-3 font-semibold">
                  Ceramic & Special Coated Lancing Plant
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
                  Engineered in Ahmedabad, Gujarat for electric arc furnace steelmaking, ladle refining, and copper smelting. Manufactured with multi-layer refractory ceramic coating resisting operational temperatures up to <strong>1650°C</strong>.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/20">
                <div>
                  <span className="text-[10px] font-mono text-white/70 uppercase block">THERMAL LIMIT</span>
                  <span className="font-display text-2xl text-white font-bold">1650°C</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/70 uppercase block">PIPE SIZES</span>
                  <span className="font-display text-2xl text-white font-bold">3/8" - 1.5" NB</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/70 uppercase block">QUALITY COMPLIANCE</span>
                  <span className="font-display text-xl text-white font-bold">ISO Certified</span>
                </div>
              </div>
            </div>

            {/* SIDE CARDS (Span 5): Ahmedabad Central Yard & Dispatch Hub */}
            <div className="lg:col-span-5 space-y-8">
              {/* Central Yard Card */}
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-[#2D7A82] transition-colors relative overflow-hidden group shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#2D7A82] uppercase bg-[#2D7A82]/20 px-3 py-1 rounded-full border border-[#2D7A82]/30">
                    STOCKING HUB 1
                  </span>
                  <span className="text-xs font-mono text-[#2D7A82] font-bold">10,000+ MT</span>
                </div>
                <h3 className="font-display text-2xl text-white mb-2 font-semibold">Ahmedabad Central Yard</h3>
                <p className="text-white/70 text-xs leading-relaxed mb-4">
                  Heavy-duty stock yard equipped with overhead gantry cranes, holding ready stocks of Jindal MS ERW black & GI pipes (15mm to 500mm OD).
                </p>
                <div className="text-xs font-mono text-white/50 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#2D7A82]" /> Ahmedabad, Gujarat
                </div>
              </div>

              {/* Dispatch Hub Card */}
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-[#2D7A82] transition-colors relative overflow-hidden group shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#2D7A82] uppercase bg-[#2D7A82]/20 px-3 py-1 rounded-full border border-[#2D7A82]/30">
                    STOCKING HUB 2
                  </span>
                  <span className="text-xs font-mono text-[#2D7A82] font-bold">Rapid Logistics</span>
                </div>
                <h3 className="font-display text-2xl text-white mb-2 font-semibold">Ahmedabad Dispatch Hub</h3>
                <p className="text-white/70 text-xs leading-relaxed mb-4">
                  Storage facility handling large diameter spiral pipes, piling tubes, square/rectangular hollow sections, and fast trailer dispatches.
                </p>
                <div className="text-xs font-mono text-white/50 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#2D7A82]" /> Ahmedabad, Gujarat
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 5: CALL TO ACTION BANNER */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="bg-[#FAFAF8] rounded-3xl p-8 lg:p-12 border border-gray-200 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#2D7A82] uppercase block mb-2">
                [ AUTHENTICITY ASSURANCE ]
              </span>
              <h3 className="font-display text-3xl text-[#0A1628] mb-2 font-semibold">
                Need genuine Jindal or Asian Pipes for your project?
              </h3>
              <p className="text-gray-600 text-sm max-w-2xl">
                Get mill-certified steel pipes delivered straight from our Ahmedabad stock yards with 100% original MTC documentation.
              </p>
            </div>

            <button
              onClick={() => setQuoteOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A1628] text-white font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-[#2D7A82] transition-colors duration-300 cursor-pointer whitespace-nowrap shadow-md"
            >
              REQUEST INSTANT QUOTE <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} defaultCategory="About Us Story Inquiry" />
    </PageShell>
  );
}
