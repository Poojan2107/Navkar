import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Menu, Phone } from "lucide-react";
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

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
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <a href="/" className="group relative z-10 flex shrink-0 items-center py-1">
              <img
                src={IMG.logoFullWhite}
                alt="Navkar Tubes & Tools"
                className="h-8 w-auto sm:h-9 lg:h-10"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute("src", IMG.logo);
                }}
              />
            </a>

            <div className="hidden items-center gap-1.5 lg:flex">
              {links.map((link) => {
                const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                      isActive ? "text-[#5EAEB3]" : "text-white/75 hover:text-white"
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
                className="ml-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs font-medium text-white/90 transition-all hover:bg-white/15 hover:text-white"
              >
                <Phone size={12} className="text-[#5EAEB3]" />
                +91 9601702883
              </a>

              <button
                onClick={() => setQuoteOpen(true)}
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-[#2D7A82] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-105 hover:bg-[#236067] hover:shadow-xl"
              >
                GET QUOTE <ArrowRight size={13} />
              </button>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="tap-44 min-h-11 rounded-full bg-[#2D7A82] px-4 text-[11px] font-mono font-semibold uppercase tracking-wider text-white shadow-md"
              >
                Quote
              </button>

              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="tap-44 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#0A1628] lg:hidden"
            style={{ paddingTop: "var(--nav-offset)", background: "#0A1628" }}
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#0A1628] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4"
            >
              <div className="flex flex-col">
                {links.map((link) => {
                  const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`flex min-h-12 items-center justify-between border-b border-white/[0.07] py-3.5 text-[15px] font-mono uppercase tracking-[0.14em] ${
                        isActive ? "text-[#5EAEB3]" : "text-white"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={14} className="text-[#2D7A82]" />
                    </a>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="tel:+919601702883"
                  className="flex min-h-12 items-center gap-2 rounded-xl bg-white/5 px-4 py-3 font-mono text-sm"
                >
                  <Phone size={16} className="text-[#2D7A82]" />
                  +91 9601702883
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setQuoteOpen(true);
                  }}
                  className="min-h-12 rounded-xl bg-[#2D7A82] px-4 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white"
                >
                  Request Instant Quote
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
