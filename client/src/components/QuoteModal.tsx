import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ShieldCheck, CheckCircle2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/submitInquiry";
import { isValidEmail, isValidIndianPhone } from "@/lib/validation";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultSpec?: { od?: number; wall?: number; length?: number };
}

export const PRODUCT_CATEGORIES = [
  "MS ERW Black Pipes (15mm - 500mm)",
  "Ceramic Lancing Pipes",
  "Galvanized GI Pipes (15mm - 150mm)",
  "GI & MS Hollow Sections (SHS/RHS)",
  "Large OD Spiral Welded Pipes",
  "Seamless Hydraulic Tubes",
  "MS Forged Flanges",
  "Butt-Weld Fittings",
];

export const QUOTE_CATEGORY_BY_GROUP: Record<string, string> = {
  erw: "MS ERW Black Pipes (15mm - 500mm)",
  lancing: "Ceramic Lancing Pipes",
  gi: "Galvanized GI Pipes (15mm - 150mm)",
  hollow: "GI & MS Hollow Sections (SHS/RHS)",
  spiral: "Large OD Spiral Welded Pipes",
  hydraulic: "Seamless Hydraulic Tubes",
  flanges: "MS Forged Flanges",
  fittings: "Butt-Weld Fittings",
};

export default function QuoteModal({
  isOpen,
  onClose,
  defaultCategory = "MS ERW Black Pipes (15mm - 500mm)",
  defaultSpec,
}: QuoteModalProps) {
  const [category, setCategory] = useState(defaultCategory);

  const categoryOptions = useMemo(() => {
    if (defaultCategory && !PRODUCT_CATEGORIES.includes(defaultCategory)) {
      return [defaultCategory, ...PRODUCT_CATEGORIES];
    }
    return PRODUCT_CATEGORIES;
  }, [defaultCategory]);

  useEffect(() => {
    if (isOpen) {
      setCategory(defaultCategory);
    }
  }, [isOpen, defaultCategory]);
  const [od, setOd] = useState(defaultSpec?.od ? String(defaultSpec.od) : "");
  const [thickness, setThickness] = useState(defaultSpec?.wall ? String(defaultSpec.wall) : "");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Meters");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Ahmedabad");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }
    if (!category.trim()) {
      toast.error("Please select a product category");
      return;
    }
    if (!isValidIndianPhone(phone)) {
      toast.error("Enter a valid 10-digit Indian mobile number");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      await submitInquiry({
        type: "quote",
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        company: company.trim() || undefined,
        city: city.trim() || undefined,
        category: category.trim(),
        od: od.trim() || undefined,
        thickness: thickness.trim() || undefined,
        quantity: quantity.trim() || undefined,
        unit,
        notes: notes.trim() || undefined,
      });
      setSubmitted(true);
      toast.success("Quotation Request Sent!", {
        description: "Our sales desk will contact you within 30 minutes with stock availability & pricing.",
      });

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit quote request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100"
          >
            {/* Modal Header */}
            <div className="bg-[#0A1628] text-white p-6 sm:p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <p className="text-[10px] font-mono font-semibold tracking-[0.3em] text-[#5EAEB3] uppercase mb-2">
                [ DIRECT YARD DISPATCH QUOTE ]
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-white">
                Request Specifications & Pricing
              </h2>
              <p className="text-white/50 text-xs sm:text-sm mt-2">
                Authorized Jindal Pipe Stockist &middot; Same-day quote from Ahmedabad yards
              </p>
            </div>

            {/* Modal Body */}
            {submitted ? (
              <div className="p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
                <div className="w-16 h-16 rounded-full bg-[#2D7A82]/10 text-[#2D7A82] flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display text-2xl text-[#0A1628] mb-2">Requirement Received!</h3>
                <p className="text-gray-500 text-sm max-w-md">
                  Thank you, <span className="font-semibold text-[#0A1628]">{name}</span>. Our sales desk in Ahmedabad is preparing your formal estimate with MTC documentation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Product Category Selection */}
                <div>
                  <label htmlFor="quote-product-category" className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Product Category *
                  </label>
                  <div className="relative">
                    <select
                      id="quote-product-category"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 bg-[#FAFAF8] border border-gray-200 rounded-xl text-sm font-sans text-[#0A1628] focus:border-[#2D7A82] focus:outline-none transition-colors"
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      OD / Size (mm)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 50 mm"
                      value={od}
                      onChange={(e) => setOd(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-gray-200 rounded-xl text-sm focus:border-[#2D7A82] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Wall Thickness (mm)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3.2 mm"
                      value={thickness}
                      onChange={(e) => setThickness(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-gray-200 rounded-xl text-sm focus:border-[#2D7A82] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Quantity
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Qty"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-2/3 px-3 py-2.5 bg-[#FAFAF8] border border-gray-200 rounded-l-xl text-sm focus:border-[#2D7A82] focus:outline-none transition-colors"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-1/3 px-2 py-2.5 bg-gray-100 border border-l-0 border-gray-200 rounded-r-xl text-xs focus:outline-none"
                      >
                        <option value="Meters">Mtr</option>
                        <option value="Tons">Tons</option>
                        <option value="Pieces">Pcs</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Buyer Details */}
                <div className="border-t border-gray-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-gray-200 rounded-xl text-sm focus:border-[#2D7A82] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 96017..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-gray-200 rounded-xl text-sm focus:border-[#2D7A82] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Industrial / EPC Firm"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-gray-200 rounded-xl text-sm focus:border-[#2D7A82] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="procurement@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-gray-200 rounded-xl text-sm focus:border-[#2D7A82] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Delivery Location / City
                    </label>
                    <input
                      type="text"
                      placeholder="Ahmedabad, Vadodara, Rajkot, Surat, etc."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-gray-200 rounded-xl text-sm focus:border-[#2D7A82] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Project Notes / Special Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need Mill Test Certificate, specific length requirements, or urgent crane loading..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-gray-200 rounded-xl text-sm focus:border-[#2D7A82] focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Footer submit & badge */}
                <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <ShieldCheck size={16} className="text-[#2D7A82]" />
                    <span>Jindal Mill Authorized Stock &middot; Original MTC Supplied</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#0A1628] disabled:opacity-60 text-white font-semibold text-xs tracking-wider rounded-full hover:bg-[#2D7A82] transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    {submitting ? "SUBMITTING…" : "SUBMIT INQUIRY"}
                    <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
