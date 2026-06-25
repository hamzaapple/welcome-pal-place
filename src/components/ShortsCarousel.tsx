import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import { shortsList } from "@/data/media";

const shortsData = shortsList;

export function ShortsCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const n = shortsData.length;

  // Reorder array so the activeIndex is always in the physical middle (slot 2)
  const visibleIndices = [
    (activeIndex - 2 + n) % n,
    (activeIndex - 1 + n) % n,
    activeIndex,
    (activeIndex + 1) % n,
    (activeIndex + 2) % n,
  ];

  return (
    <div className="shorts-fan-wrap">
      <div className="shorts-fan">
        {visibleIndices.map((originalIndex, slotIndex) => {
          const s = shortsData[originalIndex];
          const offset = slotIndex - 2; // -2, -1, 0, 1, 2
          const isFeatured = offset === 0;
          const rotate = offset * 12; // slightly more rotation for better fan effect
          const z = 5 - Math.abs(offset);
          const rotateZ = offset * 4; // Fan tilt angle

          // Array of vibrant colors for the fixed slots to create a perfect static rainbow fan (matching the image)
          const slotColors = [
            "linear-gradient(135deg, #d900ff, #8b00a5)", // Slot 0: Pink/Magenta
            "linear-gradient(135deg, #00527c, #002d4d)", // Slot 1: Deep Blue
            "transparent",                               // Slot 2: Center (Glass)
            "linear-gradient(135deg, #5a186b, #320c3d)", // Slot 3: Purple
            "linear-gradient(135deg, #00605a, #003632)", // Slot 4: Teal
          ];

          return (
            <motion.div
              layout
              key={originalIndex}
              onClick={() => setActiveIndex(originalIndex)}
              className={`shorts-glass group cursor-pointer ${isFeatured ? "is-featured" : ""}`}
              animate={{
                rotateY: rotate,
                rotateZ: rotateZ,
                zIndex: z,
                scale: Math.abs(offset) === 2 ? 0.85 : 1,
              }}
              whileHover={{ scale: 1.04 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
            >
              <video
                src={s.src}
                poster={s.thumb}
                loop
                muted
                playsInline
                preload="metadata"
                className="shorts-glass-video"
                ref={(el) => {
                  if (el) {
                    if (isFeatured) el.play().catch(() => {});
                    else el.pause();
                  }
                }}
              />

              {/* Solid gradient overlay for inactive cards to exactly match the mockup rainbow */}
              <motion.div
                className="absolute inset-0 z-10"
                initial={false}
                animate={{ opacity: isFeatured ? 0 : 1 }}
                style={{ background: slotColors[slotIndex] }}
                transition={{ duration: 0.3 }}
              />

              <div className="shorts-glass-overlay z-10" />

              {isFeatured && (
                <div className="shorts-featured-badge">Featured</div>
              )}

              {!isFeatured && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 whitespace-nowrap shadow-lg">
                  Click to Focus
                </div>
              )}

              {/* Only show text on the active center card */}
              <motion.div 
                className="shorts-glass-meta z-20"
                initial={false}
                animate={{ opacity: isFeatured ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="shorts-glass-label">{s.label}</div>
                <div className="shorts-glass-title">{s.title}</div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

