import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  text: string;
  centered?: boolean;
  className?: string;
};

export default function SectionLabel({ text, centered, className }: SectionLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0, x: centered ? 0 : -20, y: centered ? 12 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "text-[10px] font-mono font-semibold tracking-[0.35em] uppercase mb-4 text-[#2D7A82]",
        centered && "text-center",
        className
      )}
    >
      [ {text} ]
    </motion.p>
  );
}
