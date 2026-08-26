import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Shield, Award, Sun,
  FlaskConical, Ruler, MapPin, Download,
  Sparkles, CheckCircle2, ShieldCheck, Gauge, ChevronRight,
  Star, Droplets, Weight, Factory, HelpCircle
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import QuoteModal from "@/components/QuoteModal";
import { GoogleMapEmbed } from "@/components/Map";
import { handleImgError } from "@/lib/assetFallback";
import { FadeUp } from "@/hooks/useScrollAnimation";
import { IMG } from "@/asset-map";
import { VATVA_YARD, RAKHIAL_OFFICE } from "@/lib/company";

function SectionLabel({ text, dark = false, centered = false }: { text: string; dark?: boolean; centered?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: centered ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-4 inline-flex items-center gap-2 ${centered ? "mx-auto" : ""}`}
    >
      <span className={`w-2 h-2 rounded-full ${dark ? "bg-[#5EAEB3]" : "bg-[#2D7A82]"}`} />
      <span className={`text-[11px] font-mono font-bold tracking-[0.3em] uppercase ${dark ? "text-[#5EAEB3]" : "text-[#2D7A82]"}`}>
        [ {text} ]
      </span>
    </motion.div>
  );
}

function AnimatedCounter({ target, speed = 600 }: { target: number; speed?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let frame: number;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / speed, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) frame = requestAnimationFrame(animate);
      else setCount(target);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target, speed]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {count.toLocaleString()}
    </motion.span>
  );
}

function ParallaxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y }} className="w-full h-full object-cover" />
    </div>
  );
}

/* ─── 1. HERO ─── DARK */
function HeroSection({ onRequestQuote }: { onRequestQuote: () => void }) {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  return (
    <section className="relative h-screen min-h-[750px] overflow-hidden bg-[#0A1628]">
      <motion.div style={{ scale: heroScale }} className="absolute inset-0">
        <img
          src={IMG.heroYard}
          alt="Navkar Tubes industrial pipe yard"
          onError={(e) => handleImgError(e, "heroYard")}
          className="h-full w-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/50 via-[#0A1628]/75 to-[#0A1628]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
      </motion.div>

      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-20">
        <motion.div style={{ y: textY }} className="text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D7A82]/20 border border-[#2D7A82]/40 text-[#5EAEB3] text-[11px] font-mono font-bold tracking-[0.25em] uppercase mb-6"
          >
            <Sparkles size={13} /> Since 1995 · Ahmedabad, Gujarat
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.92] mb-8 font-semibold tracking-tight"
          >
            Built for what
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5EAEB3] via-[#86CACC] to-[#2D7A82]">
              industry
            </span> demands.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Authorized Jindal pipe stock from Ahmedabad. MS ERW, GI hollow sections,
            Ceramic Lancing tubes, and project logistics — 15 MM to 500 MM, certified &amp; available for immediate dispatch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={onRequestQuote}
              className="group px-8 py-4 bg-[#2D7A82] text-white font-mono font-bold text-xs tracking-[0.2em] uppercase rounded-full hover:bg-[#5EAEB3] hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-lg shadow-[#2D7A82]/30 cursor-pointer"
            >
              VIEW PRODUCTS &amp; GET QUOTE
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="/catalogue"
              className="group px-8 py-4 bg-white/5 text-white border border-white/20 font-mono font-semibold text-xs tracking-[0.2em] uppercase rounded-full hover:bg-white/15 transition-all duration-300 flex items-center gap-3"
            >
              <Download size={14} className="text-[#5EAEB3]" />
              CATALOGUE &amp; SPECS
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto pt-6 border-t border-white/10"
          >
            {[
              { label: "DEALERSHIP", value: "Jindal Authorized Partner" },
              { label: "READY STOCK", value: "1,000+ MT Ahmedabad Stock" },
              { label: "PIPE SIZES", value: "15 MM to 500 MM OD" },
            ].map((m, i) => (
              <div key={i} className="p-3 bg-white/[0.04] backdrop-blur rounded-xl border border-white/[0.08]">
                <span className="block text-[10px] font-mono text-[#5EAEB3] uppercase tracking-[0.2em] font-bold mb-0.5">{m.label}</span>
                <span className="text-white text-xs font-semibold">{m.value}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  );
}

/* ─── 2. MARQUEE ─── DARK (thin) */
function Marquee() {
  const items = [
    "AUTHORIZED JINDAL CHANNEL PARTNER",
    "MS ERW BLACK PIPES 15MM — 500MM",
    "GI SQUARE & RECTANGULAR HOLLOW SECTIONS",
    "CERAMIC LANCING PIPES UP TO 1650°C",
    "AHMEDABAD — ONE STOP STEEL HUB SINCE 1995",
    "100% FACTORY MILL TEST CERTIFICATES (MTC)",
    "NATIONWIDE PROJECT DISPATCH",
  ];

  return (
    <div className="bg-[#0F2238] py-3.5 overflow-hidden border-y border-white/[0.06]">
      <div className="flex animate-marquee whitespace-nowrap w-max">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center mx-6 shrink-0">
            <span className="text-white/80 text-[11px] font-mono font-bold tracking-[0.2em] uppercase">{item}</span>
            <span className="ml-6 text-[#5EAEB3]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── 3. TRUST HUB ─── LIGHT */
function TrustMosaicTile({
  src,
  alt,
  fallback,
  label,
  title,
  subtitle,
  className = "",
  imageClassName = "",
  focal = "center",
}: {
  src: string;
  alt: string;
  fallback: string;
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
  imageClassName?: string;
  focal?: string;
}) {
  return (
    <div className={`group relative min-h-[140px] overflow-hidden rounded-2xl border border-[#0A1628]/[0.06] bg-[#0A1628] shadow-sm ring-1 ring-black/[0.04] ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={(e) => handleImgError(e, fallback as any)}
        style={{ objectPosition: focal }}
        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] ${imageClassName}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/35 to-[#0A1628]/10" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#5EAEB3] sm:text-[10px]">{label}</p>
        <p className="font-display text-base font-semibold leading-tight text-white sm:text-lg">{title}</p>
        {subtitle ? <p className="mt-0.5 text-xs text-white/60">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function TrustHub({ onOpenCert }: { onOpenCert: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0A1628_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#2D7A82]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[#2D7A82]/[0.05] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionLabel text="Est. 1995 · Ahmedabad Stock Hub" />

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <FadeUp className="lg:col-span-5">
            <div className="max-w-xl">
              <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl">
                Steel stock &amp; manufacturing{" "}
                <span className="relative inline-block text-[#2D7A82]">
                  three decades
                  <span className="absolute -bottom-1 left-0 h-2.5 w-full -skew-x-3 rounded bg-[#2D7A82]/10" />
                </span>{" "}
                of trust.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
                From a single Ahmedabad yard in 1995 to a full-service industrial pipe supply and
                ceramic lancing manufacturing hub — serving procurement teams across India with
                genuine Jindal material and complete documentation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/about"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#0A1628] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-[#0A1628]/15 transition-all duration-300 hover:bg-[#2D7A82]"
                >
                  Our Story
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  type="button"
                  onClick={onOpenCert}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[#0A1628] shadow-sm transition-all duration-300 hover:border-[#2D7A82] hover:text-[#2D7A82]"
                >
                  <ShieldCheck size={14} className="text-[#2D7A82]" />
                  View Certification
                </button>
              </div>

            </div>
          </FadeUp>

          <FadeUp delay={0.08} className="lg:col-span-7">
            <div className="grid min-h-[460px] grid-cols-12 grid-rows-2 gap-3 sm:gap-4 lg:min-h-[520px]">
              <TrustMosaicTile
                className="col-span-12 row-span-2 sm:col-span-7"
                src={IMG.yardPanoramic}
                alt="Navkar Tubes pipe stock yard Ahmedabad"
                fallback="yardPanoramic"
                label="Ahmedabad Stock Yard"
                title="1,000+ MT Ready Stock"
                subtitle="Crane-assisted loading infrastructure"
                focal="center 40%"
                imageClassName="min-h-[220px] sm:min-h-0"
              />
              <TrustMosaicTile
                className="col-span-12 sm:col-span-5"
                src={IMG.erwPipes}
                alt="ERW black pipe stock"
                fallback="erw"
                label="ERW Black Pipes"
                title="15MM–500MM OD"
                subtitle="Jindal authorized range"
                focal="center 50%"
              />
              <div className="col-span-12 grid grid-cols-2 gap-3 sm:col-span-5 sm:gap-4">
                <TrustMosaicTile
                  className="h-full"
                  src={IMG.export[8]}
                  alt="Crane loading at yard"
                  fallback="yard22"
                  label="Heavy Lift"
                  title="Crane Loading"
                  subtitle="Same-day dispatch"
                  focal="center 60%"
                />
                <TrustMosaicTile
                  className="h-full"
                  src={IMG.yard04}
                  alt="Project pipe bundles"
                  fallback="yard04"
                  label="Project Supply"
                  title="Cut-to-Length"
                  subtitle="Bundled & tagged"
                  focal="center 45%"
                />
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.12} className="mt-12 lg:mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A1628] p-6 text-white shadow-2xl sm:p-10">
            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute left-1/2 top-0 h-px w-64 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2D7A82]/60 to-transparent" />
            <div className="relative z-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
              {[
                { val: <><AnimatedCounter target={30} speed={600} />+</>, label: "Years Experience", accent: "Est. 1995" },
                { val: <><AnimatedCounter target={1000} speed={600} />+</>, label: "MT Ready Stock", accent: "Ahmedabad Yards" },
                { val: <><AnimatedCounter target={500} speed={600} />+</>, label: "Corporate Clients", accent: "PSUs & Private" },
                { val: "100%", label: "Factory MTC", accent: "Batch Verified" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`px-2 py-2 text-center md:px-4 md:py-4 ${i > 0 ? "md:border-l md:border-white/10" : ""}`}
                >
                  <span className="mb-1 block bg-gradient-to-b from-white to-white/75 bg-clip-text font-display text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
                    {stat.val}
                  </span>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#5EAEB3] sm:text-[11px]">
                    {stat.label}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] tracking-wider text-white/30">{stat.accent}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── 4. PRODUCTS SPECTRUM ─── DARK */
const CSS_EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const REVEAL_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const REVEAL_EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const showcaseRevealItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: REVEAL_EASE },
  },
};

/** Grid 0fr→1fr avoids height:auto jank and clips overflow during the open/close. */
function ShowcaseClip({
  open,
  duration = 700,
  className = "",
  children,
}: {
  open: boolean;
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`grid min-h-0 ${className}`}
      style={{
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: `grid-template-rows ${duration}ms ${REVEAL_EASE_CSS}`,
      }}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

const PRODUCTS = [
  {
    id: "erw", title: "MS ERW Black Steel Pipes", shortTitle: "ERW Black Pipes",
    tag: "IS 1239 / IS 3589 • 15MM TO 500MM OD",
    desc: "Authorized Jindal MS ERW steel pipes for high-pressure industrial fluid conveyance, fire-fighting networks, and foundation structural piling.",
    badge: "JINDAL AUTHORIZED DEALER",
    img: IMG.productsErw,
    specs: ["Heavy Wall & Standard Gauges", "Hydrotested up to 5 MPa", "Beveled & Threaded Ends"],
  },
  {
    id: "hollow", title: "GI & MS Hollow Sections", shortTitle: "Hollow Sections",
    tag: "SHS & RHS SECTIONS • IS 4923",
    desc: "Square and rectangular structural hollow tubes engineered for industrial warehouse framing, solar structure mountings, and heavy machinery chassis.",
    badge: "ZINC COATING ≥ 360 g/m²",
    img: IMG.productsHollow,
    specs: ["High Torsional Rigidity", "Galvanized & Black Finish", "Custom Length Cutting"],
  },
  {
    id: "lancing", title: "Ceramic Coated Lancing Tubes", shortTitle: "Lancing Tubes",
    tag: "6MM TO 48.3 MM • HEAT RESISTANT 1650°C",
    desc: "Refractory ceramic calorized lancing pipes manufactured in our specialized Ahmedabad plant for steel melt shop furnace blowing and copper refining.",
    badge: "PROPRIETARY PLANT",
    img: IMG.lancingPipes,
    specs: ["Refractory Ceramic Layer", "Extends Pipe Life 6x-8x", "Rapid Melt Shop Blowing"],
  },
  {
    id: "spiral", title: "Spiral SAW Welded Pipes", shortTitle: "Spiral Pipes",
    tag: "400MM TO 2000MM OD • API 5L / IS 5504",
    desc: "Large diameter submerged arc welded spiral steel pipes designed for cross-country water trunklines, sewer mainlines, and bridge foundations.",
    badge: "LARGE DIAMETER STOCK",
    img: IMG.spiral,
    specs: ["Submerged Arc Welded", "Internal & External Coating", "Project Lengths up to 12m"],
  },
];

function ProductsSection() {
  const [active, setActive] = useState<number | null>(null);
  const [contentReady, setContentReady] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    if (revealTimer.current) clearTimeout(revealTimer.current);
  }, []);

  useEffect(() => {
    if (revealTimer.current) clearTimeout(revealTimer.current);
    if (active === null) {
      setContentReady(null);
      return;
    }
    setContentReady(null);
    revealTimer.current = setTimeout(() => setContentReady(active), 280);
    return () => {
      if (revealTimer.current) clearTimeout(revealTimer.current);
    };
  }, [active]);

  return (
    <section id="products" className="relative overflow-hidden bg-[#0A1628] py-24 text-white lg:py-32">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionLabel text="Core Product Spectrum" dark />
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Product Range Overview
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
              Browse through our product categories — click any card to view detailed specifications.
            </p>
          </div>
          <a href="/products" className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-[#2D7A82] px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-white hover:text-[#0A1628] lg:self-auto">
            VIEW ALL PRODUCTS <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div
          onMouseLeave={() => {
            if (timer.current) { clearTimeout(timer.current); timer.current = null; }
            setActive(null);
          }}
          className="flex flex-col gap-4 lg:h-[520px] lg:flex-row"
        >
          {PRODUCTS.map((p, i) => {
            const isA = active === i;
            const isDim = active !== null && active !== i;
            const showBody = contentReady === i;
            return (
              <div
                key={p.id}
                onMouseEnter={() => {
                  if (timer.current) clearTimeout(timer.current);
                  timer.current = setTimeout(() => setActive(i), 120);
                }}
                style={{
                  flex: isA ? "3 1 0%" : "1 1 0%",
                  minWidth: 0,
                  transition: `flex ${isA ? "0.5s" : "0.35s"} ${CSS_EASE}, border-color 0.5s ${CSS_EASE}, opacity 0.4s ${CSS_EASE}, transform 0.4s ${CSS_EASE}`,
                }}
                className={`relative min-w-0 overflow-hidden rounded-3xl border flex flex-col justify-end p-6 sm:p-8 cursor-pointer ${
                  isA
                    ? "border-[#5EAEB3]/80 bg-[#0F2238] z-10 shadow-[0_0_40px_rgba(94,174,179,0.15)]"
                    : isDim
                      ? "border-white/[0.06] bg-[#091524] opacity-55 saturate-[0.35]"
                      : "border-white/[0.12] bg-[#0C1B2E] hover:border-white/40"
                }`}
              >
                <img
                  src={p.img} alt={p.title}
                  onError={(e) => handleImgError(e, p.id as any)}
                  style={{
                    opacity: isA ? 0.9 : 0.35,
                    transform: isA ? "scale(1.28) translateY(-4px)" : "scale(1) translateY(0)",
                    transition: `opacity 0.5s ${CSS_EASE}, transform 0.5s ${CSS_EASE}`,
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {!isA && !isDim && (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#5EAEB3,transparent_70%)] opacity-[0.06]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/70 to-transparent" />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#2D7A82]/0 to-transparent transition-opacity duration-500"
                  style={{ opacity: isA ? 0.15 : 0 }}
                />

                <div className={`relative z-10 min-w-0 max-w-full overflow-hidden transition-transform duration-500 ${isDim ? "translate-y-0.5" : "translate-y-0"}`}>
                  <ShowcaseClip open={isA || !isDim} duration={isDim ? 320 : 480} className={isA || !isDim ? "mb-3" : ""}>
                    <motion.div
                      initial={false}
                      animate={{ opacity: isA || !isDim ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: REVEAL_EASE }}
                    >
                      <span className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider mb-3 transition-all duration-500 ${
                        isA
                          ? "bg-[#2D7A82]/50 border border-[#5EAEB3]/70 text-white shadow-[0_0_12px_rgba(94,174,179,0.2)]"
                          : "bg-white/10 border border-white/20 text-white/70"
                      }`}>{p.badge}</span>
                      <p className="text-[10px] font-mono font-semibold tracking-[0.2em] text-[#86CACC] uppercase line-clamp-2">{p.tag}</p>
                    </motion.div>
                  </ShowcaseClip>

                  <h3
                    className={`font-display font-bold mb-2 leading-snug transition-all duration-500 ${
                      isA
                        ? "text-2xl sm:text-3xl text-white"
                        : isDim
                          ? "text-base sm:text-lg text-white/70 line-clamp-4"
                          : "text-xl sm:text-2xl text-white line-clamp-3"
                    }`}
                  >
                    {isA ? p.title : isDim ? p.shortTitle : p.title}
                  </h3>

                  <ShowcaseClip open={isA} duration={720}>
                    <div className={`pt-2 ${isA ? "pointer-events-auto" : "pointer-events-none"}`}>
                      <motion.div
                        initial="hidden"
                        animate={showBody ? "visible" : "hidden"}
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
                        }}
                        className="space-y-4"
                      >
                        <motion.p
                          variants={showcaseRevealItem}
                          className="max-w-xl text-sm leading-relaxed text-white/80"
                        >
                          {p.desc}
                        </motion.p>
                        <motion.div
                          variants={showcaseRevealItem}
                          className="flex flex-wrap gap-2 font-mono text-xs text-[#5EAEB3]"
                        >
                          {p.specs.map((s) => (
                            <span
                              key={s}
                              className="rounded border border-white/[0.12] bg-white/[0.08] px-3 py-1"
                            >
                              ✓ {s}
                            </span>
                          ))}
                        </motion.div>
                        <motion.a
                          variants={showcaseRevealItem}
                          href="/products"
                          className="group/cta inline-flex items-center gap-2 rounded-full bg-[#2D7A82] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-white hover:text-[#0A1628] hover:shadow-lg hover:shadow-[#2D7A82]/30"
                        >
                          VIEW PRODUCT RANGE
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                        </motion.a>
                      </motion.div>
                    </div>
                  </ShowcaseClip>

                  <ShowcaseClip open={!isA} duration={380}>
                    <motion.span
                      initial={false}
                      animate={{ opacity: isA ? 0 : 1 }}
                      transition={{ duration: 0.3, ease: REVEAL_EASE }}
                      className="mt-2 block text-[10px] font-mono tracking-wider text-white/30"
                    >
                      CLICK FOR DETAILS
                    </motion.span>
                  </ShowcaseClip>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. WHY NAVKAR ─── LIGHT */
const easeOut = [0.23, 1, 0.32, 1] as [number, number, number, number];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

function WhyNavkarSection() {
  const features = [
    { icon: <Shield size={22} />, tag: "MILL PARTNER", title: "Authorized Jindal Dealership", desc: "Direct mill channel partnership for MS ERW black & GI hollow sections." },
    { icon: <Award size={22} />, tag: "QUALITY MTC", title: "Mill Test Certificate Batch", desc: "Every bundle delivered with original Mill Test Certificates." },
    { icon: <Star size={22} />, tag: "LONG LIFE", title: "Corrosion Protection", desc: "Corrosion-resistant GI & heavy-duty MS ERW built for decades." },
    { icon: <Droplets size={22} />, tag: "5 MPA TESTED", title: "Hydro Pressure Verified", desc: "100% hydrostatic pressure testing on factory production lines." },
    { icon: <Ruler size={22} />, tag: "GAUGE CHECK", title: "Calibrated Thickness", desc: "Wall thickness and outer diameter checked with precision calipers." },
    { icon: <Sun size={22} />, tag: "SINCE 1995", title: "Three Decades of Trust", desc: "Established in Ahmedabad in 1995, supplying nationwide projects." },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#FAFAF8] relative overflow-hidden border-y border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <SectionLabel text="Proven Advantage" />
        <FadeUp>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0A1628] font-semibold">
                Why Navkar Tubes
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl text-base leading-relaxed">
                Six pillars of trust backing three decades of industrial steel distribution in Ahmedabad, Gujarat.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2D7A82] uppercase tracking-[0.15em] bg-[#2D7A82]/10 px-4 py-2 rounded-full border border-[#2D7A82]/20 shrink-0">
              <CheckCircle2 size={15} /> 100% Factory Certified Supply
            </div>
          </div>
        </FadeUp>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10"
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={itemVariants}>
              <div className="group flex items-start gap-5 p-5 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:border hover:border-gray-200 -m-5">
                <div className="w-14 h-14 rounded-2xl bg-[#2D7A82]/10 border border-[#2D7A82]/20 flex items-center justify-center text-[#2D7A82] group-hover:bg-[#2D7A82] group-hover:text-white transition-all duration-300 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#2D7A82] uppercase block mb-1">{f.tag}</span>
                  <h3 className="font-display text-xl text-[#0A1628] font-bold mb-1.5 group-hover:text-[#2D7A82] transition-colors">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 6. INDUSTRIES SERVED ─── DARK */
function IndustrySection({ onRequestQuote }: { onRequestQuote: () => void }) {
  const industries = [
    {
      img: IMG.cement, fallbackKey: "cement",
      name: "Cement & Infrastructure",
      desc: "Structural steel for plants, silos, and heavy machinery foundations across major construction projects.",
      stat: "15,000+ MT Supplied",
      statIcon: <Weight size={14} />,
    },
    {
      img: IMG.chemical, fallbackKey: "chemical",
      name: "Chemical Processing",
      desc: "Corrosion-resistant piping for refineries, acid plants, and high-temperature process lines in hazardous environments.",
      stat: "IS 1239 / 3589 Certified",
      statIcon: <FlaskConical size={14} />,
    },
    {
      img: IMG.oilgas, fallbackKey: "oilgas",
      name: "Oil & Gas",
      desc: "High-pressure ERW and seamless pipes for transmission lines, wellhead piping, and offshore platform infrastructure.",
      stat: "Up to 5 MPa Hydrotested",
      statIcon: <Gauge size={14} />,
    },
    {
      img: IMG.refinery, fallbackKey: "refinery",
      name: "Refinery & Energy",
      desc: "Heavy-wall pipes for steam lines, heat exchangers, and boiler feed systems in power generation and petrochemical plants.",
      stat: "100% MTC Traceable",
      statIcon: <ShieldCheck size={14} />,
    },
  ];

  return (
    <section className="py-28 lg:py-40 bg-[#0A1628] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#2D7A82]/[0.05] blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#5EAEB3]/[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <SectionLabel text="Industries Served" dark />
            <FadeUp>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white font-semibold leading-[0.9] tracking-tight">
                Steel that powers<br />
                <span className="text-[#5EAEB3]">industry.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-white/50 text-base leading-relaxed mt-5 max-w-lg">
                From cement plants to offshore platforms — Navkar pipes and hollow sections are specified by engineers across India&apos;s core industrial sectors for their reliability and certified quality.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <button
              onClick={onRequestQuote}
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#2D7A82] text-white font-mono text-xs font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-white hover:text-[#0A1628] transition-all duration-300 shrink-0 cursor-pointer shadow-lg shadow-[#2D7A82]/25"
            >
              REQUEST SPEC & QUOTE
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] hover:border-[#2D7A82]/60 transition-all duration-500 shadow-xl"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={ind.img}
                alt={ind.name}
                onError={(e) => handleImgError(e, ind.fallbackKey as any)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-[#0A1628]/60 to-[#0A1628]/10" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2D7A82]/0 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700" />

              <div className="absolute top-6 left-6">
                <span className="font-display text-[72px] font-bold text-white/[0.06] leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <motion.span
                  initial={{ x: -12, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
                  className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#5EAEB3] uppercase block mb-3"
                >
                  INDUSTRY {String(i + 1).padStart(2, "0")}
                </motion.span>
                <h3 className="font-display text-2xl lg:text-3xl text-white font-semibold leading-tight mb-3">{ind.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300 mb-5">
                  {ind.desc}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#5EAEB3] tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5EAEB3]" />
                  {ind.stat}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. JINDAL AUTHORIZATION ─── DARK */
function JindalSection({ onOpenCert }: { onOpenCert: () => void }) {
  return (
    <section className="py-24 lg:py-32 bg-[#0A1628] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel text="Official Mill Partner" dark />
            <FadeUp>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight font-semibold">
                Genuine Jindal supply,<br />
                <span className="text-[#5EAEB3]">documented.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-white/60 mb-10 max-w-md text-base leading-relaxed">
                MS ERW black pipes and GI hollow sections from 15 MM to 500 MM, with mill test certificates (MTC) available on request.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <button
                onClick={onOpenCert}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D7A82] text-white font-mono text-xs font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-[#5EAEB3] transition-all duration-300 cursor-pointer shadow-lg"
              >
                VIEW AUTHORIZATION <ArrowRight size={14} />
              </button>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative cursor-pointer"
              onClick={onOpenCert}
            >
              <div className="bg-white/[0.05] backdrop-blur p-6 rounded-3xl border border-white/10 shadow-xl hover:border-[#2D7A82]/40 transition-colors">
                <img
                  src={IMG.cert}
                  alt="Jindal Authorization Certificate"
                  onError={(e) => handleImgError(e, "cert")}
                  className="w-full rounded-xl"
                />
              </div>
              <p className="mt-4 text-white/40 text-xs flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5EAEB3] animate-pulse" />
                Click to inspect full authorization certificate
              </p>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── 8. FAQ ─── DARK */
function FAQSection() {
  const faqs = [
    { q: "Is Navkar Tubes an authorized Jindal pipes dealer?", a: "Yes. Navkar Tubes & Tools is an authorized channel partner of Jindal (India) Limited for MS ERW black pipes and GI hollow sections, operating from Ahmedabad since 1995." },
    { q: "Which pipe sizes and products do you stock?", a: "We stock MS ERW black pipes from 15 MM to 500 MM OD, GI square & rectangular hollow sections (SHS/RHS), and Ceramic Lancing pipes. Full range available at our Ahmedabad yards." },
    { q: "Where is Navkar Tubes located?", a: "Our stock yard is at Plot No. 1426/B, Trikampura Patiya, Phase-3, GIDC Vatva, Ahmedabad 382445. The sales office is at No. 8, Jaymangal Estate, Near Gujarat Bottling, Rakhial, Ahmedabad 380023. We also handle nationwide project logistics." },
    { q: "How do I get a free quotation for MS pipes?", a: "Request a quote by clicking 'GET QUOTE' on the website, calling +91 9601702883 or emailing navkartube@gmail.com. Specify OD, wall thickness, length, and quantity." },
    { q: "Do you supply for industrial projects?", a: "Absolutely. We supply genuine Jindal ERW pipes and hollow sections for government, public, and private sector projects across India, with crane-assisted loading and project logistics support." },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#0A1628] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#2D7A82]/[0.06] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-gradient-radial from-[#2D7A82]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: decorative header */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <SectionLabel text="FAQ" />
              <FadeUp>
                <div className="relative">
                  <span className="absolute -top-8 -left-4 text-[180px] lg:text-[220px] font-display font-bold text-[#2D7A82]/[0.06] select-none leading-none pointer-events-none">
                    ?
                  </span>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-semibold leading-[0.9] tracking-tight relative z-10 pt-8">
                    Questions<br />
                    <span className="text-[#2D7A82]">buyers ask first.</span>
                  </h2>
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-white/40 text-sm leading-relaxed mt-6 max-w-sm">
                  Clear answers to common queries about our products, stock, certifications, and procurement process.
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.3} className="mt-10 lg:mt-0">
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur">
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-2">Still have questions?</p>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">Our team can help with specific requirements, bulk orders, or project inquiries.</p>
                <a href="/contact" className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#2D7A82] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#5EAEB3] hover:shadow-lg hover:shadow-[#2D7A82]/30 transition-all duration-300">
                  Contact Our Team <ArrowRight size={14} />
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right: accordion list */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <AccordionItem
                      value={`item-${i}`}
                      className="group bg-white/[0.04] backdrop-blur rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-300
                        hover:border-[#2D7A82]/30
                        data-[state=open]:border-[#2D7A82]/40 data-[state=open]:bg-white/[0.06]
                        data-[state=open]:shadow-lg data-[state=open]:shadow-[#2D7A82]/5"
                    >
                      <AccordionTrigger className="flex items-center gap-4 px-6 lg:px-8 py-6 text-left font-display text-base lg:text-lg text-white/90 hover:text-white font-semibold [&[data-state=open]>svg]:rotate-180">
                        <span className="w-8 h-8 rounded-lg bg-[#2D7A82]/10 border border-[#2D7A82]/20 flex items-center justify-center text-[#2D7A82] shrink-0 group-hover:bg-[#2D7A82]/20 group-data-[state=open]:bg-[#2D7A82]/20 transition-all duration-300">
                          <HelpCircle size={15} />
                        </span>
                        <span className="flex-1 leading-snug">{faq.q}</span>
                        <ChevronDown size={16} className="text-[#2D7A82] shrink-0 transition-transform duration-300" />
                      </AccordionTrigger>
                      <AccordionContent className="text-white/50 text-sm leading-relaxed px-6 lg:px-8 pb-6 pl-[4.25rem]">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 11. LOCATION ─── LIGHT */
function LocationSection() {
  return (
    <section className="py-28 lg:py-36 bg-white relative overflow-hidden">
      {/* Accent corner gradient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#2D7A82]/[0.05] to-transparent rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <SectionLabel text="Visit Our Yards" centered />
          <FadeUp>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#0A1628] font-semibold leading-[0.95] tracking-tight">
              Stock yards in{" "}
              <span className="text-[#2D7A82]">Ahmedabad, Gujarat</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
              Strategically located in Ahmedabad&apos;s premier industrial zones for rapid dispatch
              across Gujarat and nationwide. Two operational yards with crane-assisted loading.
            </p>
          </FadeUp>
        </div>

        {/* Two-column: location cards left, map right */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/* Yard card 1 */}
            <FadeUp delay={0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-3xl border border-gray-200 bg-[#FAFAF8] p-7 transition-all duration-300 hover:border-[#2D7A82]/40 hover:shadow-xl"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D7A82]/10 border border-[#2D7A82]/20 flex items-center justify-center text-[#2D7A82] shrink-0 group-hover:bg-[#2D7A82] group-hover:text-white transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-mono font-bold text-[#2D7A82] uppercase tracking-[0.2em] mb-1">Stocking Hub 1 · 1,000+ MT</p>
                    <p className="font-display text-xl text-[#0A1628] font-semibold mb-1">GIDC Vatva Stock Yard</p>
                    <p className="text-gray-500 text-sm mb-3">
                      {VATVA_YARD.lines[0]}, {VATVA_YARD.lines[1]}, {VATVA_YARD.lines[2]}
                    </p>
                    <div className="flex items-center gap-4">
                      <a href="tel:+919601702883" className="inline-flex items-center gap-1.5 text-[#2D7A82] text-sm font-mono font-bold hover:underline">
                        +91 9601702883
                      </a>
                      <span className="text-gray-200 text-xs">|</span>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Crane Loading</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Yard card 2 */}
            <FadeUp delay={0.15}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-3xl border border-gray-200 bg-[#FAFAF8] p-7 transition-all duration-300 hover:border-[#2D7A82]/40 hover:shadow-xl"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D7A82]/10 border border-[#2D7A82]/20 flex items-center justify-center text-[#2D7A82] shrink-0 group-hover:bg-[#2D7A82] group-hover:text-white transition-all duration-300">
                    <Factory size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-mono font-bold text-[#2D7A82] uppercase tracking-[0.2em] mb-1">Manufacturing Plant · Est. 2018</p>
                    <p className="font-display text-xl text-[#0A1628] font-semibold mb-1">Ceramic Lancing · Rakhial</p>
                    <p className="text-gray-500 text-sm mb-3">
                      {RAKHIAL_OFFICE.lines[0]}, {RAKHIAL_OFFICE.lines[1]}, {RAKHIAL_OFFICE.lines[2]}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D7A82]/10 border border-[#2D7A82]/20 text-[10px] font-mono font-bold text-[#2D7A82] uppercase">
                      6mm – 48.3 mm Pipes
                    </span>
                  </div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Quick contact CTA */}
            <FadeUp delay={0.2}>
              <div className="p-6 rounded-3xl bg-[#0A1628] text-white border border-white/10">
                <p className="text-[10px] font-mono font-bold text-[#5EAEB3] uppercase tracking-[0.2em] mb-2">Direct Procurement Line</p>
                <p className="font-display text-lg font-semibold mb-1">Stock available — dispatched from Ahmedabad</p>
                <p className="text-white/50 text-xs mb-4">Call for bulk requirements, project logistics, or export enquiries.</p>
                <div className="flex gap-3">
                  <a href="tel:+919601702883"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D7A82] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#5EAEB3] transition-colors"
                  >
                    +91 96017 02883
                  </a>
                  <a href="mailto:navkartube@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/15 transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Map */}
          <FadeUp delay={0.2} className="lg:col-span-7">
            <div className="h-full min-h-[420px] overflow-hidden rounded-3xl border border-gray-200 shadow-2xl lg:min-h-[520px]">
              <GoogleMapEmbed className="h-full w-full" zoom={16} />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── 12. CTA ─── DARK */
function CTASection({ onRequestQuote }: { onRequestQuote: () => void }) {
  const [dots] = useState(() => Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 3,
  })));

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden bg-[#0A1628]">
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <img
          src={IMG.exportMain}
          alt="Pipe stock dispatch"
          onError={(e) => handleImgError(e, "export")}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#0A1628]/80" />
        {dots.map((d, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#5EAEB3]"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
            animate={{ opacity: [0, 0.5, 0], y: [0, -20, 0] }}
            transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
      <div className="relative z-10 text-center px-6">
        <FadeUp>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl text-white mb-10 leading-tight font-semibold">
            Put your requirement<br />in capable hands.
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <button
            onClick={onRequestQuote}
            className="group inline-flex items-center gap-3 px-12 py-5 bg-[#2D7A82] text-white font-mono font-semibold text-xs tracking-[0.2em] uppercase rounded-full hover:bg-white hover:text-[#0A1628] transition-all duration-300 cursor-pointer shadow-2xl hover:scale-105"
          >
            REQUEST A QUOTE
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── PAGE LOADER ─── */
function PageLoader() {
  const [phase, setPhase] = useState<"entering" | "visible" | "exiting">("entering");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("visible"), 200);
    const t2 = setTimeout(() => setPhase("exiting"), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "exiting" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="fixed inset-0 z-[100] bg-[#0A1628] flex items-center justify-center"
        >
          {/* Background glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: easeOut }}
            className="absolute w-[600px] h-[600px] rounded-full bg-[#2D7A82]/[0.08] blur-[120px]"
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* Pulsing ring */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.1, 0.4],
              }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
              className="absolute w-52 h-52 rounded-full border border-[#2D7A82]/20"
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.05, 0.2],
              }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
              className="absolute w-52 h-52 rounded-full border border-[#2D7A82]/10"
            />

            {/* Emblem */}
            <motion.img
              initial={{ opacity: 0, scale: 0.3 }}
              animate={
                phase === "entering"
                  ? { opacity: 0, scale: 1.3 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.7, ease: easeOut }}
              src={IMG.emblem}
              alt="Navkar"
              onError={(e) => handleImgError(e, "cert")}
              className="w-40 h-40 object-contain relative z-10"
            />

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: easeOut }}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-display text-white text-2xl font-semibold tracking-tight">Navkar Tubes &amp; Tools</span>
              <span className="text-[#2D7A82] text-[10px] font-mono tracking-[0.3em] uppercase">Ahmedabad, Gujarat</span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 1.2, delay: 0.5, ease: easeOut }}
              className="h-[2px] bg-[#2D7A82]/30 rounded-full overflow-hidden relative"
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, delay: 0.6 }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#2D7A82] to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── MAIN ─── */
export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [calcSpec, setCalcSpec] = useState<{ od?: number; wall?: number; length?: number }>({});

  const handleOpenQuote = useCallback((spec?: { od?: number; wall?: number; length?: number }) => {
    if (spec) setCalcSpec(spec);
    setQuoteModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <PageLoader />
      <HeroSection onRequestQuote={() => handleOpenQuote()} />
      <Marquee />
      <TrustHub onOpenCert={() => setShowCert(true)} />
      <ProductsSection />
      <WhyNavkarSection />
      <IndustrySection onRequestQuote={() => handleOpenQuote()} />
      <JindalSection onOpenCert={() => setShowCert(true)} />
      <FAQSection />
      <LocationSection />
      <CTASection onRequestQuote={() => handleOpenQuote()} />
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultSpec={calcSpec}
      />

      <AnimatePresence>
        {showCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0A1628]/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowCert(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={IMG.cert} alt="Jindal Certificate Full" onError={(e) => handleImgError(e, "cert")} className="w-full" />
              <div className="p-4 flex justify-end">
                <button onClick={() => setShowCert(false)} className="w-10 h-10 rounded-full bg-[#0A1628] text-white flex items-center justify-center hover:bg-[#2D7A82] transition-colors cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
