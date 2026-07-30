import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.a
        href="https://wa.me/919601702883"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        title="WhatsApp Sales"
      >
        <MessageCircle size={26} />
      </motion.a>
      <motion.a
        href="tel:+919601702883"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 rounded-full bg-[#0A1628] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        title="Call Sales"
      >
        <Phone size={24} />
      </motion.a>
    </div>
  );
}
