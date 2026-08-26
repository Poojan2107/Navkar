import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send, Phone, Mail, MapPin, CheckCircle2, MessageCircle, Building2, Linkedin, ExternalLink, ShieldCheck, Sparkles, Navigation as NavIcon } from "lucide-react";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/submitInquiry";
import { isValidEmail, isValidIndianPhone } from "@/lib/validation";
import PageShell from "@/components/PageShell";
import { GoogleMapEmbed, NAVKAR_MAP_LINK } from "@/components/Map";
import { FadeUp } from "@/hooks/useScrollAnimation";
import { VATVA_YARD, RAKHIAL_OFFICE, mapsSearchUrl } from "@/lib/company";

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

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", city: "", message: "" });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }
    if (!isValidIndianPhone(form.phone)) {
      toast.error("Enter a valid 10-digit Indian mobile number");
      return;
    }
    if (!isValidEmail(form.email)) {
      toast.error("Enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      await submitInquiry({
        type: "contact",
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        company: form.company.trim() || undefined,
        city: form.city.trim() || undefined,
        message: form.message.trim() || undefined,
      });
      setSubmitted(true);
      toast.success("Message Sent!", { description: "Our sales desk will contact you shortly." });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <PageShell darkNav={true}>
        <div className="flex min-h-[80vh] items-center justify-center bg-[#F5F5F5] px-5 pt-24 pb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-xl sm:p-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#2D7A82]/10 text-[#2D7A82] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="font-display text-3xl text-[#0A1628] mb-3 font-semibold">Thank You!</h2>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
              Your inquiry has been received by our sales team. We will call you back within 30 minutes with stock availability and current pricing.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", phone: "", email: "", company: "", city: "", message: "" });
              }}
              className="px-8 py-3.5 bg-[#0A1628] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#2D7A82] transition-colors cursor-pointer"
            >
              SEND ANOTHER MESSAGE
            </button>
          </motion.div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell darkNav={true}>
      <section className="relative overflow-hidden bg-[#0A1628] flex items-center justify-center pt-[calc(5.75rem+env(safe-area-inset-top))] pb-12 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/90 to-[#0A1628]" />

        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#2D7A82]/40 bg-[#2D7A82]/20 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#5EAEB3] sm:mb-6 sm:px-4 sm:text-xs sm:tracking-widest"
          >
            <Sparkles size={14} className="shrink-0" />
            <span>Ahmedabad, Gujarat · Direct Sales Desk</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 font-display text-[1.85rem] font-semibold leading-tight tracking-tight text-white sm:mb-6 sm:text-5xl lg:text-6xl"
          >
            Contact Sales &amp; Logistics
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/75 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Connect directly with our sales managers in Ahmedabad for stock verification, Mill Test Certificates (MTC), or instant container dispatch quotes.
          </motion.p>
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-12 sm:py-16 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Direct Contact Info Cards */}
            <div className="order-2 space-y-8 lg:order-1 lg:col-span-5">
              <div>
                <SectionLabel text="Reach Our Sales Desk" />
                <h2 className="mb-3 font-display text-2xl font-semibold text-[#0A1628] sm:mb-4 sm:text-4xl">
                  Discuss your steel pipe requirements
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  Call, WhatsApp, or email our Ahmedabad office for immediate pricing, ready stock inspection, and dispatch coordinates.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-[#2D7A82] sm:rounded-3xl sm:p-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D7A82]/10 text-[#2D7A82] flex items-center justify-center shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">PHONE / WHATSAPP</span>
                    <a href="tel:+919601702883" className="font-display text-xl text-[#0A1628] font-bold hover:text-[#2D7A82] transition-colors block">
                      +91 9601702883
                    </a>
                    <a
                      href="https://wa.me/919601702883"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#25D366] font-semibold mt-1 hover:underline"
                    >
                      <MessageCircle size={14} /> Open WhatsApp Chat →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-[#2D7A82] sm:rounded-3xl sm:p-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D7A82]/10 text-[#2D7A82] flex items-center justify-center shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">EMAIL SALES DESK</span>
                    <a href="mailto:navkartube@gmail.com" className="font-display text-lg text-[#0A1628] font-bold hover:text-[#2D7A82] transition-colors block">
                      navkartube@gmail.com
                    </a>
                  </div>
                </div>

                {/* Addresses */}
                <a
                  href={mapsSearchUrl(VATVA_YARD)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-[#2D7A82] sm:rounded-3xl sm:p-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#2D7A82]/10 text-[#2D7A82] flex items-center justify-center shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      {VATVA_YARD.role}
                    </span>
                    <p className="font-display text-base text-[#0A1628] font-semibold mb-1">
                      GIDC Vatva Stock Yard
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {VATVA_YARD.lines[0]}
                      <br />
                      {VATVA_YARD.lines[1]}
                      <br />
                      {VATVA_YARD.lines[2]}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-[#2D7A82] font-semibold mt-2">
                      Get directions <ExternalLink size={12} />
                    </span>
                  </div>
                </a>

                <a
                  href={mapsSearchUrl(RAKHIAL_OFFICE)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-[#2D7A82] sm:rounded-3xl sm:p-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#2D7A82]/10 text-[#2D7A82] flex items-center justify-center shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      {RAKHIAL_OFFICE.role}
                    </span>
                    <p className="font-display text-base text-[#0A1628] font-semibold mb-1">
                      Rakhial Office
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {RAKHIAL_OFFICE.lines[0]}
                      <br />
                      {RAKHIAL_OFFICE.lines[1]}
                      <br />
                      {RAKHIAL_OFFICE.lines[2]}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-[#2D7A82] font-semibold mt-2">
                      Get directions <ExternalLink size={12} />
                    </span>
                  </div>
                </a>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                <a
                  href="https://www.indiamart.com/navkartubesandtools/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-mono font-semibold text-gray-700 shadow-sm transition-all hover:bg-[#2D7A82] hover:text-white sm:w-auto"
                >
                  <Building2 size={14} className="shrink-0 text-[#2D7A82]" /> IndiaMART Verified Profile <ExternalLink size={12} />
                </a>

                <a
                  href="https://www.linkedin.com/company/navkar-tubes-&-tools/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-mono font-semibold text-gray-700 shadow-sm transition-all hover:bg-[#0077B5] hover:text-white sm:w-auto"
                >
                  <Linkedin size={14} className="shrink-0 text-[#0077B5]" /> Official LinkedIn Page <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-7">
              <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xl sm:p-12">
                <h3 className="font-display text-2xl text-[#0A1628] mb-2 font-semibold">Send Direct Message</h3>
                <p className="text-gray-500 text-xs mb-8">Fill out your pipe specification requirements below for instant sales desk attention.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-4.5 py-3.5 bg-[#FAFAF8] border border-gray-200 rounded-2xl text-sm focus:border-[#2D7A82] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9+\s-]{10,15}"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4.5 py-3.5 bg-[#FAFAF8] border border-gray-200 rounded-2xl text-sm focus:border-[#2D7A82] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4.5 py-3.5 bg-[#FAFAF8] border border-gray-200 rounded-2xl text-sm focus:border-[#2D7A82] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Company / Firm Name
                    </label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="e.g. Gujarat Infra Pvt Ltd"
                      className="w-full px-4.5 py-3.5 bg-[#FAFAF8] border border-gray-200 rounded-2xl text-sm focus:border-[#2D7A82] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      City / Project Location
                    </label>
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="e.g. Ahmedabad / Hazira"
                      className="w-full px-4.5 py-3.5 bg-[#FAFAF8] border border-gray-200 rounded-2xl text-sm focus:border-[#2D7A82] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Pipe Specification & Quantity Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Specify pipe OD, wall thickness, grade (Jindal MS ERW, GI Hollow Section, Ceramic Lancing), tonnage needed, and required delivery date..."
                      className="w-full px-4.5 py-3.5 bg-[#FAFAF8] border border-gray-200 rounded-2xl text-sm focus:border-[#2D7A82] focus:bg-white focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#0A1628] hover:bg-[#2D7A82] disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest rounded-2xl transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send size={15} /> {submitting ? "SENDING…" : "SEND INQUIRY TO SALES DESK"}
                </button>
              </form>
            </div>
          </div>

          {/* Interactive Map Pinning NAVKAR TUBES & TOOLS strictly */}
          <div className="mt-20">
            <SectionLabel text="Map Location Pin" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A1628] p-5 text-white shadow-2xl sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5">
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#2D7A82] uppercase bg-[#2D7A82]/20 px-3 py-1 rounded-full border border-[#2D7A82]/30">
                    PINPOINT LOCATION
                  </span>
                  <h3 className="font-display text-3xl text-white mt-4 mb-3 font-semibold">
                    Navkar Tubes & Tools
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-2">
                    {VATVA_YARD.lines.join(", ")}
                  </p>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
                    Direct map pin for our GIDC Vatva stock yard. Visit for physical pipe inspection, mill test certificate verification, and same-day truck loading. Sales office also at Jaymangal Estate, Rakhial.
                  </p>

                  <a
                    href={NAVKAR_MAP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2D7A82] px-5 py-3.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-white hover:text-[#0A1628] sm:w-auto sm:px-6 sm:text-xs"
                  >
                    <NavIcon size={14} className="shrink-0" />
                    Open on Google Maps
                    <ExternalLink size={14} className="shrink-0" />
                  </a>
                </div>

                <div className="h-[240px] overflow-hidden rounded-2xl border border-white/15 bg-gray-900 shadow-xl sm:h-[340px] sm:rounded-3xl lg:col-span-7">
                  <GoogleMapEmbed className="h-full w-full" zoom={16} showOpenLink={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
