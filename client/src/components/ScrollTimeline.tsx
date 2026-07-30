import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export type TimelineEvent = {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
  metric: string;
};

function MilestoneCard({
  item,
  isActive,
  index,
  total,
}: {
  item: TimelineEvent;
  isActive: boolean;
  index: number;
  total: number;
}) {
  return (
    <motion.article
      animate={{
        opacity: isActive ? 1 : 0.55,
        y: isActive ? 0 : 8,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-3xl border p-7 transition-shadow duration-500 sm:p-9 ${
        isActive
          ? "border-[#2D7A82]/40 bg-white shadow-xl shadow-[#2D7A82]/8"
          : "border-gray-200/80 bg-[#FAFAF8] shadow-sm"
      }`}
    >
      {/* Large year watermark */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-2 -top-4 select-none font-display text-7xl font-bold leading-none transition-colors duration-500 sm:text-8xl ${
          isActive ? "text-[#2D7A82]/[0.07]" : "text-gray-200/40"
        }`}
      >
        {item.year}
      </span>

      <div className="relative z-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`rounded-full px-3.5 py-1 text-[11px] font-mono font-bold tracking-wider transition-colors ${
                isActive ? "bg-[#2D7A82] text-white" : "bg-[#0A1628] text-white"
              }`}
            >
              {item.year}
            </span>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2D7A82]">
              {item.subtitle}
            </span>
          </div>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-mono font-bold uppercase text-gray-500">
            {item.metric}
          </span>
        </div>

        <h3
          className={`font-display mb-3 text-xl font-semibold transition-colors sm:text-2xl lg:text-[1.65rem] ${
            isActive ? "text-[#2D7A82]" : "text-[#0A1628]"
          }`}
        >
          {item.title}
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-gray-600">{item.desc}</p>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-gray-400">
          Milestone {index + 1} of {total}
        </p>
      </div>

      {/* Active left accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 top-0 w-1 rounded-l-3xl bg-[#2D7A82]"
        initial={false}
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ originY: 0.5 }}
      />
    </motion.article>
  );
}

export default function ScrollTimeline({ events }: { events: TimelineEvent[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.25"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });
  const lineScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  const updateActiveFromScroll = useCallback(() => {
    const viewportCenter = window.innerHeight * 0.42;
    let bestIdx = 0;
    let bestDist = Infinity;

    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const rowCenter = rect.top + rect.height * 0.35;
      const dist = Math.abs(rowCenter - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });

    setActiveIdx(bestIdx);
  }, []);

  useEffect(() => {
    updateActiveFromScroll();
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, [updateActiveFromScroll, events.length]);

  const scrollToMilestone = (idx: number) => {
    rowRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky progress header — mobile & desktop */}
      <div className="sticky top-[72px] z-20 mb-10 border-b border-gray-200/80 bg-white/90 py-4 backdrop-blur-md lg:top-[76px]">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
              Timeline · {events[activeIdx]?.year}
            </p>
            <p className="truncate font-display text-lg font-semibold text-[#0A1628] sm:text-xl">
              {events[activeIdx]?.title}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[#2D7A82]/10 px-3 py-1.5 font-mono text-xs font-bold text-[#2D7A82]">
            {activeIdx + 1}/{events.length}
          </span>
        </div>
        <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-[#2D7A82]"
            style={{
              scaleX: lineScale,
              transformOrigin: "left",
              width: "100%",
            }}
          />
        </div>
        {/* Year quick-jump pills */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {events.map((event, i) => (
            <button
              key={`${event.year}-${i}`}
              type="button"
              onClick={() => scrollToMilestone(i)}
              className={`shrink-0 rounded-full px-3 py-1 font-mono text-[10px] font-bold transition-all ${
                activeIdx === i
                  ? "bg-[#2D7A82] text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {event.year}
            </button>
          ))}
        </div>
      </div>

      {/* Unified spine + cards — dots align with each row */}
      <div className="relative">
        {/* Full-height track */}
        <div
          className="absolute bottom-0 left-[15px] top-0 w-px bg-gray-200 sm:left-[19px]"
          aria-hidden
        />
        <motion.div
          className="absolute left-[15px] top-0 w-0.5 origin-top bg-gradient-to-b from-[#2D7A82] to-[#5EAEB3] sm:left-[19px]"
          style={{ scaleY: lineScale, height: "100%" }}
          aria-hidden
        />

        <div className="space-y-10 sm:space-y-14 lg:space-y-16">
          {events.map((item, idx) => {
            const isActive = activeIdx === idx;
            const isLast = idx === events.length - 1;

            return (
              <div
                key={`${item.year}-${idx}`}
                id={`milestone-${idx}`}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                className="grid scroll-mt-40 grid-cols-[40px_1fr] items-start gap-5 sm:grid-cols-[48px_1fr] sm:gap-8"
              >
                {/* Spine node — vertically aligned with card top */}
                <div className="relative flex flex-col items-center pt-7 sm:pt-8">
                  <motion.button
                    type="button"
                    onClick={() => scrollToMilestone(idx)}
                    aria-label={`Go to ${item.year}: ${item.title}`}
                    animate={{
                      scale: isActive ? 1.35 : 1,
                      boxShadow: isActive
                        ? "0 0 0 6px rgba(45, 122, 130, 0.15)"
                        : "0 0 0 0px rgba(45, 122, 130, 0)",
                    }}
                    transition={{ duration: 0.35 }}
                    className={`relative z-10 h-4 w-4 rounded-full border-[3px] transition-colors ${
                      isActive
                        ? "border-white bg-[#2D7A82]"
                        : "border-gray-300 bg-white hover:border-[#2D7A82]/60"
                    }`}
                  />
                  {!isLast && (
                    <div
                      className={`mt-2 h-full min-h-[40px] w-px transition-colors ${
                        idx < activeIdx ? "bg-[#2D7A82]/40" : "bg-transparent"
                      }`}
                      aria-hidden
                    />
                  )}
                </div>

                <MilestoneCard
                  item={item}
                  isActive={isActive}
                  index={idx}
                  total={events.length}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
