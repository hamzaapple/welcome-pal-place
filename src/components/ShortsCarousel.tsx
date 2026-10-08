import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import { shortsList } from "@/data/media";

const SLOT_COUNT = 5;
const CENTER_SLOT = 2;

type Props = {
  onPlay?: (src: string, isMuted?: boolean) => void;
};

export function ShortsCarousel({ onPlay }: Props) {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const n = shortsList.length;
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const prevOffsets = useRef<Record<number, number>>({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // For Desktop Fan
  const visibleIndices = Array.from(
    { length: SLOT_COUNT },
    (_, slot) => (activeIndex + slot - CENTER_SLOT + n) % n,
  );

  // الفيديو اللي في النص بس هو اللي بيشتغل — في effect مش في ref callback
  // عشان ميتناديش play/pause مع كل render
  useEffect(() => {
    if (isMobile) return;
    for (const [key, el] of Object.entries(videoRefs.current)) {
      if (!el) continue;
      if (Number(key) === activeIndex) el.play().catch(() => {});
      else el.pause();
    }
  }, [activeIndex, isMobile]);

  // بنسجّل مكان كل كارت بعد كل تحديث عشان نعرف مين اللي "لفّ" حوالين الفان
  useEffect(() => {
    visibleIndices.forEach((originalIndex, slot) => {
      prevOffsets.current[originalIndex] = slot - CENTER_SLOT;
    });
  });

  if (isMobile) {
    return (
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 pt-2 px-2 w-full hide-scrollbar -mx-2">
        {shortsList.map((s, idx) => (
          <motion.div
            key={idx}
            className="flex-none w-[65vw] sm:w-[45vw] relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group shadow-xl border border-white/10 bg-black/40 snap-center"
            onClick={() => onPlay?.(s.src, true)}
            whileTap={{ scale: 0.95 }}
          >
            <img src={s.thumb} alt={s.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-white shadow-[0_0_30px_oklch(0.68_0.21_250/0.6)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="h-6 w-6 ml-1 fill-current" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="text-[10px] uppercase tracking-wider text-glow mb-1">{s.label}</div>
              <div className="text-base font-bold text-white font-display">{s.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Desktop Fan Carousel
  return (
    <div className="shorts-fan-wrap">
      <div className="shorts-fan">
        {visibleIndices.map((originalIndex, slotIndex) => {
          const s = shortsList[originalIndex];
          const offset = slotIndex - CENTER_SLOT;
          const isFeatured = offset === 0;

          // الكارت اللي بيلف من آخر الفان للناحية التانية بينط على طول
          // بدل ما يطير عبر الشاشة كلها
          const prevOffset = prevOffsets.current[originalIndex];
          const wrapped = prevOffset !== undefined && Math.abs(offset - prevOffset) > 1;
          const rotate = offset * 12;
          const z = 5 - Math.abs(offset);
          const rotateZ = offset * 4;

          // خلفية بتبان وقت تحميل الفيديو — بتدرجات على نفس palette الموقع
          const slotColors = [
            "linear-gradient(135deg, oklch(0.3 0.12 280), oklch(0.18 0.06 280))",
            "linear-gradient(135deg, oklch(0.32 0.13 250), oklch(0.19 0.06 250))",
            "linear-gradient(135deg, oklch(0.34 0.14 240), oklch(0.2 0.07 240))",
            "linear-gradient(135deg, oklch(0.32 0.13 235), oklch(0.19 0.06 235))",
            "linear-gradient(135deg, oklch(0.3 0.12 220), oklch(0.18 0.06 220))",
          ];

          return (
            <motion.div
              key={originalIndex}
              onClick={() => {
                if (isFeatured) {
                  onPlay?.(s.src, true);
                } else {
                  setActiveIndex(originalIndex);
                }
              }}
              className={`shorts-glass group cursor-pointer ${isFeatured ? "is-featured" : ""}`}
              style={{ 
                background: slotColors[slotIndex],
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
              initial={{
                x: `calc(-50% + ${offset * 164}px)`,
                y: "-50%",
                rotateY: rotate,
                rotateZ: rotateZ,
                zIndex: z,
                scale: Math.abs(offset) === 2 ? 0.85 : 1,
              }}
              animate={{
                x: `calc(-50% + ${offset * 164}px)`,
                y: "-50%",
                rotateY: rotate,
                rotateZ: rotateZ,
                zIndex: z,
                scale: Math.abs(offset) === 2 ? 0.85 : 1,
              }}
              whileHover={{ 
                x: `calc(-50% + ${offset * 164}px)`,
                y: "-50%",
                scale: 1.04,
                rotateY: rotate,
                rotateZ: rotateZ
              }}
              whileTap={{
                x: `calc(-50% + ${offset * 164}px)`,
                y: "-50%",
                scale: 0.98,
                rotateY: rotate,
                rotateZ: rotateZ
              }}
              transition={
                wrapped ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 25 }
              }
            >
              <video
                src={s.src + "#t=0.1"}
                loop
                muted={true}
                playsInline
                preload="metadata"
                className="shorts-glass-video pointer-events-none"
                ref={(el) => {
                  videoRefs.current[originalIndex] = el;
                  if (el) {
                    el.muted = true;
                    el.defaultMuted = true;
                    el.volume = 0;
                  }
                }}
              />

              <div className="shorts-glass-overlay" />


              {!isFeatured && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 whitespace-nowrap shadow-lg">
                  Click to Focus
                </div>
              )}

              <div className="shorts-glass-meta">
                <div className="shorts-glass-label">{s.label}</div>
                <div className="shorts-glass-title">{s.title}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
