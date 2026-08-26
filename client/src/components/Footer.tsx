import { IMG } from "@/asset-map";
import { Linkedin, ExternalLink, Building2, ArrowUpToLine, Mail, Phone, MapPin, ShieldCheck, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { VATVA_YARD, RAKHIAL_OFFICE, mapsSearchUrl } from "@/lib/company";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const productLinks = [
    { label: "ERW Black Pipes", href: "/products" },
    { label: "GI Hollow Sections", href: "/products" },
    { label: "Ceramic Lancing Pipes", href: "/products" },
    { label: "Spiral Pipes", href: "/products" },
    { label: "MS Flanges & Fittings", href: "/products" },
    { label: "All Products", href: "/products" },
  ];

  const companyLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Updates", href: "/updates" },
    { label: "Jindal", href: "/jindal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Catalogue", href: "/catalogue" },
  ];

  return (
    <footer className="bg-[#060E1A] text-white relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#2D7A82]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#2D7A82] text-white shadow-lg shadow-[#2D7A82]/30 transition-opacity duration-300 hover:bg-[#5EAEB3] ${
          showBackToTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          left: "max(0.75rem, env(safe-area-inset-left))",
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
      >
        <ArrowUpToLine size={16} />
      </button>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pt-14 pb-[max(5.75rem,calc(env(safe-area-inset-bottom)+5.25rem))] sm:px-6 sm:pb-8 lg:px-12 lg:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img src={IMG.logo} alt="Navkar Tubes & Tools" className="h-11 w-auto mb-5" />
            <p className="text-white/40 text-xs leading-relaxed max-w-xs mb-5">
              Authorized Jindal &amp; Asian Channel Partner. Manufacturer of Ceramic &amp; Special Coated Lancing Pipes in Ahmedabad, Gujarat — serving India since 1995.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/919601702883"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#25D366] text-[10px] font-mono font-bold tracking-wider rounded-full hover:bg-[#25D366] hover:text-white transition-all duration-300 border border-[#25D366]/20"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Sales
              </a>
              <a
                href="https://www.indiamart.com/navkartubesandtools/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-[#2D7A82] font-mono hover:text-[#5EAEB3] transition-colors"
              >
                <Building2 size={13} /> IndiaMART <ExternalLink size={10} />
              </a>
            </div>
            <div className="flex items-center gap-2 mt-5 text-[10px] font-mono text-white/30 border-t border-white/[0.06] pt-5">
              <ShieldCheck size={12} className="text-[#2D7A82]" />
              Verified channel partner since 1995
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#2D7A82] uppercase mb-6">Company</p>
            <nav className="space-y-3">
              {companyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-white/50 text-sm hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  <ChevronRight size={10} className="text-[#2D7A82] opacity-0 -ml-4 group-hover:opacity-100 transition-all" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#2D7A82] uppercase mb-6">Products</p>
            <nav className="space-y-3">
              {productLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-white/50 text-sm hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A82]/40 shrink-0" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#2D7A82] uppercase mb-6">Contact &amp; Social</p>
            <div className="space-y-4">
              <a href="tel:+919601702883" className="flex items-start gap-3 group">
                <span className="w-8 h-8 rounded-lg bg-[#2D7A82]/10 border border-[#2D7A82]/20 flex items-center justify-center text-[#2D7A82] shrink-0 group-hover:bg-[#2D7A82] group-hover:text-white transition-all duration-300">
                  <Phone size={13} />
                </span>
                <div>
                  <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-white text-sm font-semibold group-hover:text-[#2D7A82] transition-colors">+91 9601702883</p>
                </div>
              </a>
              <a href="mailto:navkartube@gmail.com" className="flex items-start gap-3 group">
                <span className="w-8 h-8 rounded-lg bg-[#2D7A82]/10 border border-[#2D7A82]/20 flex items-center justify-center text-[#2D7A82] shrink-0 group-hover:bg-[#2D7A82] group-hover:text-white transition-all duration-300">
                  <Mail size={13} />
                </span>
                <div>
                  <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-white/60 text-sm group-hover:text-white transition-colors">navkartube@gmail.com</p>
                </div>
              </a>
              <a
                href={mapsSearchUrl(VATVA_YARD)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <span className="w-8 h-8 rounded-lg bg-[#2D7A82]/10 border border-[#2D7A82]/20 flex items-center justify-center text-[#2D7A82] shrink-0 group-hover:bg-[#2D7A82] group-hover:text-white transition-all duration-300">
                  <MapPin size={13} />
                </span>
                <div>
                  <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-0.5">Vatva Stock Yard</p>
                  <p className="text-white/70 text-sm leading-relaxed group-hover:text-white transition-colors">
                    {VATVA_YARD.lines[0]}
                    <br />
                    {VATVA_YARD.lines[1]}
                    <br />
                    {VATVA_YARD.lines[2]}
                  </p>
                </div>
              </a>
              <a
                href={mapsSearchUrl(RAKHIAL_OFFICE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <span className="w-8 h-8 rounded-lg bg-[#2D7A82]/10 border border-[#2D7A82]/20 flex items-center justify-center text-[#2D7A82] shrink-0 group-hover:bg-[#2D7A82] group-hover:text-white transition-all duration-300">
                  <MapPin size={13} />
                </span>
                <div>
                  <p className="text-white/30 text-[10px] font-mono uppercase tracking-wider mb-0.5">Rakhial Office</p>
                  <p className="text-white/70 text-sm leading-relaxed group-hover:text-white transition-colors">
                    {RAKHIAL_OFFICE.lines[0]}
                    <br />
                    {RAKHIAL_OFFICE.lines[1]}
                    <br />
                    {RAKHIAL_OFFICE.lines[2]}
                  </p>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/[0.06]">
              <a
                href="https://www.linkedin.com/company/navkar-tubes-&-tools/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-300"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://wa.me/919601702883"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a
                href="https://www.indiamart.com/navkartubesandtools/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#2D7A82] hover:text-white hover:border-[#2D7A82] transition-all duration-300"
              >
                <Building2 size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[11px] font-mono">
            &copy; 2026 Navkar Tubes &amp; Tools &middot; Ahmedabad, Gujarat
          </p>
          <div className="flex items-center gap-5">
            <a href="/contact" className="text-white/40 text-[11px] font-mono hover:text-white transition-colors">Get Quote</a>
            <span className="text-white/10 text-xs">|</span>
            <a href="https://www.indiamart.com/navkartubesandtools/" target="_blank" rel="noreferrer" className="text-white/40 text-[11px] font-mono hover:text-white transition-colors">IndiaMART Profile</a>
            <span className="text-white/10 text-xs">|</span>
            <button onClick={scrollToTop} className="text-white/40 text-[11px] font-mono hover:text-white transition-colors cursor-pointer">Back to Top ↑</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
