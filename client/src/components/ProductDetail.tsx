import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight, Phone, FileText, ArrowLeft } from "lucide-react";
import PageShell from "@/components/PageShell";
import QuoteModal from "@/components/QuoteModal";
import SectionLabel from "@/components/layout/SectionLabel";
import { handleImgError } from "@/lib/assetFallback";
import { FadeUp } from "@/hooks/useScrollAnimation";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductHighlight {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface ProductDetailProps {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  specs: ProductSpec[];
  highlights: ProductHighlight[];
  image: string;
  imageFallback: string;
  category: string;
  breadcrumb: { label: string; href: string }[];
  applications?: string[];
  standards?: string[];
  relatedProducts?: { label: string; href: string }[];
}

const DEFAULT_RELATED = [
  { label: "All Products", href: "/products" },
  { label: "MS ERW Black Pipes", href: "/products/erw-pipes" },
  { label: "Hollow Sections", href: "/products/ms-hollow-sections" },
  { label: "Yard Updates", href: "/updates" },
];

export default function ProductDetail({
  title,
  subtitle,
  tagline,
  description,
  specs,
  highlights,
  image,
  imageFallback,
  category,
  breadcrumb,
  applications = ["Industrial sheds", "Fire-fighting networks", "Structural piling", "HVAC & chilled water"],
  standards = ["IS 1239", "IS 3589", "Mill Test Certificate included"],
  relatedProducts = DEFAULT_RELATED,
}: ProductDetailProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.4]);

  return (
    <PageShell darkNav>
      {/* Hero */}
      <section className="relative min-h-[58vh] overflow-hidden bg-[#0A1628]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={image}
            alt={title}
            onError={(e) => handleImgError(e, imageFallback as "hero")}
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/75 to-[#0A1628]/40" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto flex min-h-[58vh] max-w-[1440px] flex-col justify-end px-6 pb-12 pt-36 lg:px-12 lg:pb-16"
        >
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-mono text-white/50">
            <a href="/" className="transition-colors hover:text-[#5EAEB3]">Home</a>
            <ChevronRight size={12} />
            <a href="/products" className="transition-colors hover:text-[#5EAEB3]">Products</a>
            {breadcrumb.map((cr, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight size={12} />
                <a href={cr.href} className="text-white/80 transition-colors hover:text-[#5EAEB3]">{cr.label}</a>
              </span>
            ))}
          </nav>

          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-[#2D7A82]/40 bg-[#2D7A82]/20 px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#5EAEB3]">
            {subtitle}
          </span>

          <h1 className="font-display max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">{tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setQuoteOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#2D7A82] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-white hover:text-[#0A1628]"
            >
              Request Quote <ArrowRight size={14} />
            </button>
            <a
              href="tel:+919601702883"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Phone size={14} /> +91 9601702883
            </a>
          </div>
        </motion.div>
      </section>

      {/* Main content + sticky sidebar */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-8">
            <FadeUp>
              <SectionLabel text="Product Overview" />
              <h2 className="font-display mb-6 text-3xl font-semibold text-[#0A1628] sm:text-4xl">{tagline}</h2>
              <p className="mb-10 max-w-3xl text-base leading-relaxed text-gray-600">{description}</p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className="relative mb-12 overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                <img
                  src={image}
                  alt={title}
                  onError={(e) => handleImgError(e, imageFallback as "hero")}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#0A1628]/85 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  Yard Stock · Ahmedabad
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <h3 className="font-display mb-5 text-2xl font-semibold text-[#0A1628]">Key Specifications</h3>
              <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-200 bg-[#FAFAF8] p-5 transition-colors hover:border-[#2D7A82]/30"
                  >
                    <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-gray-400">{spec.label}</p>
                    <p className="font-display text-xl font-semibold text-[#0A1628]">{spec.value}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.16}>
              <h3 className="font-display mb-5 text-2xl font-semibold text-[#0A1628]">Why Navkar</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-100 bg-[#FAFAF8] p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2D7A82]/10 text-[#2D7A82]">
                      {item.icon}
                    </div>
                    <h4 className="font-display mb-2 text-lg font-semibold text-[#0A1628]">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-3xl border border-gray-200 bg-[#FAFAF8] p-6 shadow-sm">
                <p className="mb-4 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2D7A82]">
                  Quick Enquiry
                </p>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  Share OD range, quantity (MT), and delivery city — our desk responds within 30 minutes with stock and MTC availability.
                </p>
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="mb-3 w-full rounded-full bg-[#0A1628] py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#2D7A82]"
                >
                  Get Quote for {title}
                </button>
                <a
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-3 text-xs font-semibold uppercase tracking-wider text-[#0A1628] transition-colors hover:border-[#2D7A82] hover:text-[#2D7A82]"
                >
                  <FileText size={14} /> Contact Sales Desk
                </a>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <p className="mb-3 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Standards</p>
                <ul className="space-y-2">
                  {standards.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-[#0A1628]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2D7A82]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6">
                <p className="mb-3 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Applications</p>
                <div className="flex flex-wrap gap-2">
                  {applications.map((app) => (
                    <span
                      key={app}
                      className="rounded-full border border-[#2D7A82]/20 bg-[#2D7A82]/5 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wide text-[#2D7A82]"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related + back */}
      <section className="border-t border-gray-200 bg-[#FAFAF8] py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel text="View More" />
              <h3 className="font-display text-2xl font-semibold text-[#0A1628] sm:text-3xl">Related products & updates</h3>
            </div>
            <a
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D7A82] transition-colors hover:text-[#0A1628]"
            >
              <ArrowLeft size={14} /> Back to catalogue
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {relatedProducts.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-gray-200 bg-white px-4 py-5 text-center transition-all hover:border-[#2D7A82]/40 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0A1628] transition-colors group-hover:text-[#2D7A82]">
                  {item.label}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} defaultCategory={category} />
    </PageShell>
  );
}
