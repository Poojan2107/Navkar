import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type PageHeroProps = {
  badge?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  minHeight?: string;
};

export default function PageHero({
  badge,
  title,
  description,
  children,
  minHeight = "min-h-[48vh]",
}: PageHeroProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      className={`relative ${minHeight} overflow-hidden bg-[#0A1628] flex items-center justify-center pt-32 lg:pt-36 pb-14 lg:pb-18`}
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2D7A82_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/88 to-[#0A1628]" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-5xl px-6 text-center"
      >
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-[1.1] font-semibold tracking-tight"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/75 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {children}
      </motion.div>
    </section>
  );
}
