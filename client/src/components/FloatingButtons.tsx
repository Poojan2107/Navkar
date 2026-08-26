import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div
      className="fixed z-50 flex flex-col gap-3"
      style={{
        right: "max(0.75rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <motion.a
        href="https://wa.me/919601702883"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.1 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl sm:h-14 sm:w-14"
        title="WhatsApp Sales"
      >
        <MessageCircle size={24} />
      </motion.a>
      <motion.a
        href="tel:+919601702883"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.1 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A1628] text-white shadow-lg transition-shadow hover:shadow-xl sm:h-14 sm:w-14"
        title="Call Sales"
      >
        <Phone size={22} />
      </motion.a>
    </div>
  );
}
