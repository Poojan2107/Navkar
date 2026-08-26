import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Menu, Phone, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import QuoteModal from "./QuoteModal";
import { IMG } from "@/asset-map";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Updates", href: "/updates" },
    { label: "Jindal", href: "/jindal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Catalogue", href: "/catalogue" },
  ];

  const navBg = scrolled || mobileOpen
    ? "bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/15 shadow-2xl py-3"
    : "bg-[#0A1628]/90 backdrop-blur-lg border-b border-white/10 shadow-xl py-3.5";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${navBg}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center relative z-10 group shrink-0 py-1">
              <img
                src={IMG.logoFullWhite}
                alt="Navkar Tubes & Tools"
                className="h-8 sm:h-9 lg:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute("src", IMG.logo);
                }}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1.5">
              {links.map((link) => {
                const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative px-3 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 ${
                      isActive
                        ? "text-[#5EAEB3]"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#2D7A82]" />
                    )}
                  </a>
                );
              })}

              <a
                href="tel:+919601702883"
                className="ml-3 px-3.5 py-1.5 text-xs font-mono font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 rounded-full flex items-center gap-2 transition-all"
              >
                <Phone size={12} className="text-[#5EAEB3]" />
                +91 9601702883
              </a>

              <button
                onClick={() => setQuoteOpen(true)}
                className="ml-2 px-4.5 py-2 text-xs font-semibold text-white uppercase tracking-wider bg-[#2D7A82] hover:bg-[#236067] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                GET QUOTE <ArrowRight size={13} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setQuoteOpen(true)}
                className="px-3.5 py-1.5 bg-[#2D7A82] text-white font-mono font-semibold text-[11px] uppercase tracking-wider rounded-full shadow-md"
              >
                Quote
              </button>

              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-x-visible bg-[#0A1628] text-white border-t border-white/10 px-5 py-6 sm:px-6"
            >
              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between border-b border-white/5 py-2.5 pl-1 text-sm font-mono uppercase tracking-wider"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} className="text-[#2D7A82]" />
                  </a>
                ))}

                <div className="pt-4 flex flex-col gap-3">
                  <a
                    href="tel:+919601702883"
                    className="py-3 px-4 bg-white/5 rounded-xl text-xs font-mono flex items-center gap-2"
                  >
                    <Phone size={14} className="text-[#2D7A82]" />
                    +91 9601702883
                  </a>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setQuoteOpen(true);
                    }}
                    className="py-3 px-4 bg-[#2D7A82] text-white text-xs font-bold uppercase tracking-wider rounded-xl text-center"
                  >
                    REQUEST INSTANT QUOTE
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
