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
        <div className="min-h-[80vh] flex items-center justify-center px-6 pt-24 pb-16 bg-[#F5F5F5]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-lg w-full bg-white p-10 rounded-3xl border border-gray-200 text-center shadow-xl"
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
      {/* Hero */}
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
            <Sparkles size={14} /> AHMEDABAD, GUJARAT • DIRECT SALES DESK
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight font-semibold tracking-tight"
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

      {/* Main Contact Section */}
      <section className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Contact Info Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <SectionLabel text="Reach Our Sales Desk" />
                <h2 className="font-display text-3xl sm:text-4xl text-[#0A1628] mb-4 font-semibold">
                  Discuss your steel pipe requirements
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  Call, WhatsApp, or email our Ahmedabad office for immediate pricing, ready stock inspection, and dispatch coordinates.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm flex items-start gap-4 hover:border-[#2D7A82] transition-colors">
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

                <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm flex items-start gap-4 hover:border-[#2D7A82] transition-colors">
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
                  className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm flex items-start gap-4 hover:border-[#2D7A82] transition-colors"
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
                  className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm flex items-start gap-4 hover:border-[#2D7A82] transition-colors"
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

              {/* External Profile Links */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="https://www.indiamart.com/navkartubesandtools/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-mono font-semibold text-gray-700 hover:bg-[#2D7A82] hover:text-white transition-all shadow-sm"
                >
                  <Building2 size={14} className="text-[#2D7A82]" /> IndiaMART Verified Profile <ExternalLink size={12} />
                </a>

                <a
                  href="https://www.linkedin.com/company/navkar-tubes-&-tools/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-mono font-semibold text-gray-700 hover:bg-[#0077B5] hover:text-white transition-all shadow-sm"
                >
                  <Linkedin size={14} className="text-[#0077B5]" /> Official LinkedIn Page <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Right Column: High-End Contact Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl">
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
            <div className="bg-[#0A1628] text-white rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
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
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2D7A82] text-white font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-white hover:text-[#0A1628] transition-colors cursor-pointer shadow-lg"
                  >
                    <NavIcon size={14} /> OPEN NAVKAR TUBES ON GOOGLE MAPS <ExternalLink size={14} />
                  </a>
                </div>

                <div className="h-[340px] overflow-hidden rounded-3xl border border-white/15 bg-gray-900 shadow-xl lg:col-span-7">
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
