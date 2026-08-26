import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Eye, Search, X, Layers, ExternalLink, ChevronDown } from "lucide-react";
import PageShell from "@/components/PageShell";
import QuoteModal, { PRODUCT_CATEGORIES, QUOTE_CATEGORY_BY_GROUP } from "@/components/QuoteModal";
import PipeCalculator from "@/components/PipeCalculator";
import PageHero from "@/components/layout/PageHero";
import SectionLabel from "@/components/layout/SectionLabel";
import { handleImgError } from "@/lib/assetFallback";
import { FadeUp } from "@/hooks/useScrollAnimation";
import { IMG } from "@/asset-map";

interface ProductItem {
  id: string;
  categoryGroup: string;
  category: string;
  title: string;
  subtitle: string;
  img: string;
  fallbackKey: string;
  desc: string;
  specs: { label: string; value: string }[];
  detailedTables?: { parameter: string; range: string; standard: string }[];
  chemicalComp?: { element: string; maxPct: string }[];
  tag: string;
  detailHref?: string;
}

export default function ProductsPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectingProduct, setInspectingProduct] = useState<ProductItem | null>(null);

  const openQuote = (cat: string) => {
    setQuoteCategory(cat);
    setQuoteOpen(true);
  };

  const productCategories = [
    { id: "all", label: "All Products", shortLabel: "All" },
    { id: "erw", label: "MS ERW Black Pipes", shortLabel: "ERW Black" },
    { id: "lancing", label: "Ceramic Lancing Pipes", shortLabel: "Lancing" },
    { id: "gi", label: "Galvanized GI Pipes", shortLabel: "GI Pipes" },
    { id: "hollow", label: "MS Hollow Sections (SHS/RHS)", shortLabel: "Hollow SHS/RHS" },
    { id: "spiral", label: "Spiral SAW Pipes", shortLabel: "Spiral SAW" },
    { id: "hydraulic", label: "Seamless Hydraulic Tubes", shortLabel: "Hydraulic" },
    { id: "flanges", label: "MS Forged Flanges", shortLabel: "Flanges" },
    { id: "fittings", label: "Butt-Weld Fittings", shortLabel: "Fittings" },
  ];

  const selectCategory = (catId: string) => {
    setActiveCategory(catId);
    if (catId !== "all") {
      requestAnimationFrame(() => {
        document.getElementById(`product-${catId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const productsList: ProductItem[] = [
    {
      id: "erw",
      categoryGroup: "erw",
      category: "Jindal & Asian Authorized Dealership",
      title: "MS ERW Black Pipes",
      subtitle: "15 MM to 500 MM OD • IS 1239 / IS 3589",
      img: IMG.productsErw,
      fallbackKey: "productsErw",
      desc: "Authorized Jindal Star & Asian MS ERW steel pipes engineered for high-pressure fluid conveyance, fire-fighting sprinkler networks, structural piling, HVAC chilled water loops, and heavy machinery.",
      specs: [
        { label: "OD Range", value: "15 MM – 500 MM (1/2\" to 20\" NB)" },
        { label: "Standard", value: "IS 1239 (Part 1) / IS 3589" },
        { label: "Tensile Strength", value: "≥ 415 MPa (Fe 410 Grade)" },
        { label: "Wall Thickness", value: "1.6 MM – 12.0 MM (Heavy/Medium)" },
      ],
      detailedTables: [
        { parameter: "Light Class (Yellow Band)", range: "1.6mm - 4.0mm", standard: "IS 1239" },
        { parameter: "Medium Class (Blue Band)", range: "2.0mm - 4.8mm", standard: "IS 1239" },
        { parameter: "Heavy Class (Red Band)", range: "2.6mm - 5.4mm", standard: "IS 1239" },
        { parameter: "Large OD ERW Line Pipes", range: "219mm - 508mm OD", standard: "IS 3589 / FE 410" },
      ],
      chemicalComp: [
        { element: "Carbon (C)", maxPct: "0.20% Max" },
        { element: "Manganese (Mn)", maxPct: "1.30% Max" },
        { element: "Phosphorus (P)", maxPct: "0.040% Max" },
        { element: "Sulfur (S)", maxPct: "0.040% Max" },
      ],
      tag: "JINDAL & ASIAN AUTHORIZED",
      detailHref: "/products/erw-pipes",
    },
    {
      id: "lancing",
      categoryGroup: "lancing",
      category: "In-House Manufacturing in Ahmedabad",
      title: "Ceramic & Special Coated Lancing Pipes",
      subtitle: "Refractory Coated & Calorized • Steel Melt Shops",
      img: IMG.lancingPipes,
      fallbackKey: "lancingPipes",
      desc: "Engineered and manufactured in Ahmedabad by Navkar Tubes & Tools. High-temperature refractory ceramic coated and calorized lancing pipes designed to resist extreme thermal oxidation in electric arc furnaces, oxygen lancing, and ladle refining.",
      specs: [
        { label: "Coating Type", value: "Refractory Ceramic / Calorized" },
        { label: "Thermal Limit", value: "Up to 1650°C" },
        { label: "OD Range", value: "6mm to 48.3 mm" },
        { label: "Application", value: "Steel Mills & Copper Refineries" },
      ],
      detailedTables: [
        { parameter: "6mm OD Ceramic Lancing Pipe", range: "6mm OD", standard: "Navkar Spec 1650°C" },
        { parameter: "3/8\" NB Ceramic Lancing Pipe", range: "17.2mm OD x 2.3mm Wall", standard: "Navkar Spec 1650°C" },
        { parameter: "1/2\" NB Ceramic Lancing Pipe", range: "21.3mm OD x 2.8mm Wall", standard: "Navkar Spec 1650°C" },
        { parameter: "3/4\" NB Ceramic Lancing Pipe", range: "26.9mm OD x 3.2mm Wall", standard: "Navkar Spec 1650°C" },
        { parameter: "1\" NB Heavy Lancing Pipe", range: "33.7mm OD x 4.0mm Wall", standard: "Navkar Spec 1650°C" },
      ],
      chemicalComp: [
        { element: "Refractory Layer", maxPct: "Alumina-Silicate Bonded" },
        { element: "Coating Thickness", maxPct: "1.2mm - 2.5mm Ceramic" },
        { element: "Calorized Layer", maxPct: "Fe-Al Intermetallic Alloy" },
      ],
      tag: "NAVKAR MANUFACTURED",
    },
    {
      id: "gi",
      categoryGroup: "gi",
      category: "Jindal & Asian Authorized Dealership",
      title: "Hot-Dip Galvanized (GI) Steel Pipes",
      subtitle: "Zinc Coated • IS 1239 / IS 4736",
      img: IMG.yard04,
      fallbackKey: "yard04",
      desc: "Direct mill-supplied Jindal & Asian GI steel pipes featuring uniform hot-dip zinc coating (min 550 g/m²) for outdoor water supply networks, greenhouse frames, solar mounting structures, and fire hydrants.",
      specs: [
        { label: "Zinc Coating", value: "≥ 550 g/m² (78 Microns)" },
        { label: "OD Range", value: "15 MM – 150 MM NB" },
        { label: "Standard", value: "IS 1239 / IS 4736" },
        { label: "End Finish", value: "Screwed & Socketed / Plain" },
      ],
      detailedTables: [
        { parameter: "1/2\" NB to 1\" NB GI Pipe", range: "21.3mm - 33.7mm OD", standard: "IS 1239 GI Class" },
        { parameter: "1.25\" NB to 2\" NB GI Pipe", range: "42.4mm - 60.3mm OD", standard: "IS 1239 GI Class" },
        { parameter: "2.5\" NB to 6\" NB GI Pipe", range: "76.1mm - 165.1mm OD", standard: "IS 1239 GI Class" },
      ],
      tag: "JINDAL & ASIAN GI",
    },
    {
      id: "hollow",
      categoryGroup: "hollow",
      category: "Jindal & Asian Pipes Dealership",
      title: "GI & MS Hollow Sections (SHS / RHS)",
      subtitle: "Square & Rectangular Structural Tubes • IS 4923 / IS 1161",
      img: IMG.hollowSections,
      fallbackKey: "hollowSections",
      desc: "Precision cold-formed square (SHS) and rectangular (RHS) hollow sections for industrial sheds, warehouse framing, solar structure mountings, and heavy machinery chassis.",
      specs: [
        { label: "Size Range", value: "20x20 MM – 300x300 MM" },
        { label: "Standard", value: "IS 4923 / IS 1161" },
        { label: "Zinc Coating", value: "Up to 550 g/m² (GI)" },
        { label: "Tolerance", value: "Strict ±10% Mass" },
      ],
      detailedTables: [
        { parameter: "Square Hollow Section (SHS)", range: "20x20mm to 250x250mm", standard: "IS 4923 YSt 210/240/310" },
        { parameter: "Rectangular Hollow Section (RHS)", range: "40x20mm to 300x200mm", standard: "IS 4923 YSt 210/240/310" },
      ],
      tag: "READY YARD STOCK",
      detailHref: "/products/ms-hollow-sections",
    },
    {
      id: "spiral",
      categoryGroup: "spiral",
      category: "Water Supply & Piling Infrastructure",
      title: "Large Diameter Spiral Welded Pipes",
      subtitle: "400 MM to 2000 MM OD • IS 5504 / API 5L",
      img: IMG.spiralPipes,
      fallbackKey: "spiralPipes",
      desc: "Submerged arc welded (SAW) spiral pipes engineered for municipal water supply trunklines, industrial effluent lines, and foundation piling projects across India.",
      specs: [
        { label: "OD Range", value: "400 MM – 2000 MM" },
        { label: "Grade", value: "Fe 410 / Fe 450 / API 5L" },
        { label: "Length", value: "Up to 12.5 Meters" },
        { label: "Test Pressure", value: "Up to 50 Bar Hydro test" },
      ],
      detailedTables: [
        { parameter: "Municipal Water SAW Pipe", range: "406mm - 1220mm OD", standard: "IS 5504" },
        { parameter: "Heavy Piling Spiral Tube", range: "610mm - 2032mm OD", standard: "API 5L X42 / X52" },
      ],
      tag: "HEAVY INFRASTRUCTURE",
      detailHref: "/products/spiral-pipes",
    },
    {
      id: "hydraulic",
      categoryGroup: "hydraulic",
      category: "Precision Machinery & Automotive",
      title: "Hydraulic Bush Pipes & Seamless Tubes",
      subtitle: "Cold Drawn Seamless (CDS) • High Precision OD/ID",
      img: IMG.hydraulic,
      fallbackKey: "hydraulic",
      desc: "Cold drawn seamless steel pipes and hydraulic bush tubes engineered for machine tool manufacturing, hydraulic cylinders, and high-pressure oil lines.",
      specs: [
        { label: "Surface Finish", value: "Honed ID / Smooth OD" },
        { label: "OD Range", value: "20 MM – 250 MM" },
        { label: "Grade", value: "ST 52 / EN 10305 / ASTM A106" },
        { label: "Tolerance", value: "ISO H8 / H9" },
      ],
      detailedTables: [
        { parameter: "Hydraulic Cylinder Bush Tube", range: "32mm - 200mm ID Honed", standard: "DIN 2391 / EN 10305" },
        { parameter: "ASTM A106 Gr B Seamless", range: "1/2\" to 14\" NB Sch 40/80", standard: "ASTM A106 / ASME SA106" },
      ],
      tag: "PRECISION ENGINEERED",
    },
    {
      id: "flanges",
      categoryGroup: "flanges",
      category: "High-Pressure Piping Connections",
      title: "MS Forged Flanges & Companion Flanges",
      subtitle: "ANSI B16.5 / BS 4504 • Class 150 to 2500",
      img: IMG.msFlanges,
      fallbackKey: "msFlanges",
      desc: "Forged mild steel slip-on, weld-neck, blind, and threaded flanges for high-pressure chemical lines, steam boilers, and water mains.",
      specs: [
        { label: "Pressure Class", value: "Class 150 / 300 / 600 / 1500" },
        { label: "PN Rating", value: "PN 6 / PN 10 / PN 16 / PN 40" },
        { label: "Facing Type", value: "Raised Face (RF) / Flat Face (FF)" },
        { label: "Standard", value: "ANSI B16.5 / BS 4504 / IS 6392" },
      ],
      detailedTables: [
        { parameter: "Slip-On Flanges (SORF)", range: "15mm - 600mm NB", standard: "ANSI B16.5 Class 150" },
        { parameter: "Weld Neck Flanges (WNRF)", range: "15mm - 600mm NB", standard: "ANSI B16.5 Class 300/600" },
        { parameter: "Blind Flanges (BLRF)", range: "15mm - 600mm NB", standard: "ANSI B16.5 Class 150/300" },
      ],
      tag: "FORGED FLANGES",
      detailHref: "/products/ms-flanges",
    },
    {
      id: "fittings",
      categoryGroup: "fittings",
      category: "Piping Accessories & Hardware",
      title: "MS Butt-Weld & Socket-Weld Fittings",
      subtitle: "Elbows, Tees, Reducers & Caps • ANSI B16.9",
      img: IMG.msFittings1,
      fallbackKey: "msFittings1",
      desc: "Comprehensive range of industrial MS butt-weld pipe fittings including long radius 90°/45° elbows, equal tees, concentric/eccentric reducers, and pipe caps.",
      specs: [
        { label: "Fitting Standard", value: "ANSI B16.9 / MSS SP-75" },
        { label: "Type", value: "Seamless & ERW Welded" },
        { label: "Schedule", value: "Sch 20 / Sch 40 / Sch 80 / STD" },
        { label: "Testing", value: "Hydro Tested & Ultrasonic Examined" },
      ],
      detailedTables: [
        { parameter: "90° Long Radius Elbow", range: "15mm - 500mm NB", standard: "ANSI B16.9 Sch 40" },
        { parameter: "Equal & Reducing Tees", range: "15mm - 500mm NB", standard: "ANSI B16.9 Sch 40" },
        { parameter: "Concentric Reducer", range: "25x15mm - 500x400mm", standard: "ANSI B16.9 Sch 40" },
      ],
      tag: "BUTT-WELD FITTINGS",
      detailHref: "/products/ms-fittings",
    },
  ];

  const filteredProducts = productsList.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.categoryGroup === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageShell darkNav>
      <PageHero
        badge={
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2D7A82]/40 bg-[#2D7A82]/20 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#5EAEB3] shadow-sm">
            <Layers size={14} /> Jindal & Asian Dealership · Ceramic Lancing Manufacturer
          </span>
        }
        title="Industrial Product Portfolio"
        description="Authorized Jindal & Asian MS ERW pipes, GI hollow sections, ceramic lancing tubes, and heavy fittings — ready stock dispatches from Ahmedabad, Gujarat."
      />

      {/* Search & category filter — single control strip */}
      <section className="sticky top-[72px] z-30 border-b border-white/10 bg-[#0A1628] shadow-lg">
        <div className="mx-auto max-w-[1440px] space-y-3 px-4 py-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1 sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={15} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search standards, grades, sizes…"
                className="w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-white/40 focus:border-[#2D7A82] focus:bg-white/15 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-white/50 hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="relative w-full sm:w-72">
              <label htmlFor="product-category" className="sr-only">
                Product category
              </label>
              <select
                id="product-category"
                value={activeCategory}
                onChange={(e) => selectCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/15 bg-white/10 py-2.5 pl-4 pr-10 text-sm font-semibold text-white focus:border-[#2D7A82] focus:bg-white/15 focus:outline-none"
              >
                {productCategories.map((cat) => {
                  const count =
                    cat.id === "all"
                      ? productsList.length
                      : productsList.filter((p) => p.categoryGroup === cat.id).length;
                  return (
                    <option key={cat.id} value={cat.id} className="bg-[#0A1628] text-white">
                      {cat.label} ({count})
                    </option>
                  );
                })}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50"
              />
            </div>

            <p className="shrink-0 text-xs font-mono text-white/50">
              <span className="font-bold text-[#5EAEB3]">{filteredProducts.length}</span>
              <span className="text-white/40"> / {productsList.length} products</span>
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <FadeUp>
            <h2 className="font-display mb-10 text-3xl font-semibold text-[#0A1628] sm:text-4xl">
              {activeCategory === "all" && !searchQuery
                ? "Full product catalogue"
                : `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} matched`}
            </h2>
          </FadeUp>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#FAFAF8] rounded-3xl border border-gray-200">
              <Search size={40} className="text-gray-400 mx-auto mb-4" />
              <h3 className="font-display text-2xl text-[#0A1628] mb-2 font-semibold">No Matching Products Found</h3>
              <p className="text-gray-500 text-xs max-w-md mx-auto mb-6">
                Try clearing your search query or switching product category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-6 py-2.5 bg-[#0A1628] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#2D7A82] transition-colors"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="space-y-16 lg:space-y-20">
              {filteredProducts.map((product, idx) => (
                <FadeUp key={product.id} delay={idx * 0.04}>
                  <article
                    id={`product-${product.id}`}
                    className="scroll-mt-44 overflow-hidden rounded-3xl border border-gray-200 bg-[#FAFAF8] shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
                      <div className={`relative lg:col-span-5 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                        <img
                          src={product.img}
                          alt={product.title}
                          onError={(e) => handleImgError(e, product.fallbackKey as keyof typeof import("@/lib/assetFallback").FALLBACK_IMAGES)}
                          className="h-full min-h-[260px] w-full object-cover lg:min-h-[380px]"
                        />
                        <div className="absolute left-4 top-4 rounded-full border border-[#2D7A82]/30 bg-[#0A1628]/90 px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#5EAEB3] backdrop-blur-md">
                          {product.tag}
                        </div>
                      </div>

                      <div className={`flex flex-col justify-center p-8 lg:col-span-7 lg:p-10 xl:p-12 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                        <SectionLabel text={product.category} className="mb-3" />
                        <h2 className="font-display mb-2 text-2xl font-semibold text-[#0A1628] sm:text-3xl lg:text-4xl">
                          {product.title}
                        </h2>
                        <p className="mb-5 text-xs font-mono font-bold uppercase tracking-wider text-[#2D7A82]">
                          {product.subtitle}
                        </p>
                        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-600">{product.desc}</p>

                        <div className="mb-8 grid grid-cols-2 gap-3">
                          {product.specs.map((spec, i) => (
                            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                              <p className="mb-1 text-[9px] font-mono uppercase tracking-wider text-gray-400">{spec.label}</p>
                              <p className="font-display text-sm font-semibold text-[#0A1628] sm:text-base">{spec.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => openQuote(QUOTE_CATEGORY_BY_GROUP[product.id] || product.title)}
                            className="inline-flex items-center gap-2 rounded-full bg-[#0A1628] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-[#2D7A82]"
                          >
                            Request Quote <ArrowRight size={14} />
                          </button>
                          <button
                            onClick={() => setInspectingProduct(product)}
                            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0A1628] transition-colors hover:border-[#2D7A82] hover:text-[#2D7A82]"
                          >
                            <Eye size={14} /> Spec Sheet
                          </button>
                          {product.detailHref && (
                            <a
                              href={product.detailHref}
                              className="inline-flex items-center gap-2 rounded-full border border-[#2D7A82]/30 bg-[#2D7A82]/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#2D7A82] transition-colors hover:bg-[#2D7A82] hover:text-white"
                            >
                              Full Page <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Embedded Pipe Weight Calculator */}
      <section className="border-t border-gray-200 bg-[#FAFAF8] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <SectionLabel text="Procurement Engineering Calculator" />
          <h2 className="font-display text-3xl sm:text-4xl text-[#0A1628] mb-8 font-semibold">
            Calculate pipe weight & batch tonnage
          </h2>
          
          <PipeCalculator />
        </div>
      </section>

      {/* Detailed Spec Inspector Modal */}
      {inspectingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 border border-gray-200 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setInspectingProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#2D7A82] uppercase bg-[#2D7A82]/10 px-3 py-1 rounded-full border border-[#2D7A82]/20">
              TECHNICAL SPECIFICATION SHEET
            </span>

            <h3 className="font-display text-3xl text-[#0A1628] mt-3 mb-1 font-semibold">{inspectingProduct.title}</h3>
            <p className="text-xs font-mono text-[#2D7A82] uppercase tracking-wider mb-6 font-bold">{inspectingProduct.subtitle}</p>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
              {inspectingProduct.desc}
            </p>

            {/* Dimensional Tables */}
            {inspectingProduct.detailedTables && (
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">Dimensional & Class Breakdown</h4>
                <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs">
                  <div className="bg-[#0A1628] text-white p-3 font-mono font-bold grid grid-cols-3">
                    <span>Specification Class</span>
                    <span>Range / Size</span>
                    <span>Standard Code</span>
                  </div>
                  {inspectingProduct.detailedTables.map((row, i) => (
                    <div key={i} className="p-3 border-t border-gray-200 grid grid-cols-3 text-gray-700 bg-white font-sans">
                      <span className="font-semibold">{row.parameter}</span>
                      <span>{row.range}</span>
                      <span className="font-mono text-[#2D7A82]">{row.standard}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chemical & Mechanical Bounds */}
            {inspectingProduct.chemicalComp && (
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">Chemical & Material Limits</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {inspectingProduct.chemicalComp.map((chem, i) => (
                    <div key={i} className="p-3 bg-[#FAFAF8] rounded-xl border border-gray-200">
                      <p className="text-[10px] font-mono text-gray-400 uppercase">{chem.element}</p>
                      <p className="font-bold text-[#0A1628] mt-0.5">{chem.maxPct}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200">
              <span className="text-xs font-mono text-gray-500">100% Original Mill Test Certificate (MTC) Included</span>
              <button
                onClick={() => {
                  setInspectingProduct(null);
                  openQuote(QUOTE_CATEGORY_BY_GROUP[inspectingProduct.id] || inspectingProduct.title);
                }}
                className="px-8 py-3.5 bg-[#0A1628] hover:bg-[#2D7A82] text-white font-semibold text-xs tracking-wider uppercase rounded-full transition-colors cursor-pointer shadow-md"
              >
                REQUEST QUOTE FOR THIS SPEC →
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Quality Assurance Banner */}
      <section className="py-16 bg-[#0A1628] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#2D7A82]/20 text-[#2D7A82] rounded-2xl border border-[#2D7A82]/30 mt-1">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="font-display text-2xl mb-1 text-white">Mill Test Certificates (MTC) Included</h3>
              <p className="text-white/60 text-xs sm:text-sm max-w-xl">
                Every batch dispatched from our Ahmedabad yards includes original factory MTC verifying heat number, tensile strength, yield stress, and chemical composition.
              </p>
            </div>
          </div>

          <button
            onClick={() => openQuote("Custom Specification & MTC Inquiry")}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2D7A82] text-white font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-white hover:text-[#0A1628] transition-colors duration-500 whitespace-nowrap cursor-pointer shadow-lg"
          >
            INQUIRE WITH MTC <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <QuoteModal
        key={quoteCategory}
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultCategory={quoteCategory}
      />
    </PageShell>
  );
}
