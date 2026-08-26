import { MessageCircle, Phone } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div
      className="pointer-events-none fixed z-50 isolate flex flex-col gap-3"
      style={{
        right: "max(0.75rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <a
        href="https://wa.me/919601702883"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg sm:h-14 sm:w-14"
        title="WhatsApp Sales"
        aria-label="WhatsApp Sales"
      >
        <MessageCircle size={22} />
      </a>
      <a
        href="tel:+919601702883"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0A1628] text-white shadow-lg sm:h-14 sm:w-14"
        title="Call Sales"
        aria-label="Call Sales"
      >
        <Phone size={20} />
      </a>
    </div>
  );
}
