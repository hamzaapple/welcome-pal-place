import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "motion/react";

const shortsData = [
  { label: "Short", title: "Video -1-", src: "https://cdn.pixabay.com/video/2024/03/15/204306-924613396_large.mp4" },
  { label: "Reel", title: "Video -2-", src: "https://cdn.pixabay.com/video/2023/10/05/183032-872065752_large.mp4" },
  { label: "Short", title: "Video -3-", src: "https://cdn.pixabay.com/video/2022/11/30/141050-777832367_large.mp4" },
  { label: "Reel", title: "Video -4-", src: "https://cdn.pixabay.com/video/2024/02/26/202298-916310403_large.mp4" },
  { label: "Short", title: "Video -5-", src: "https://cdn.pixabay.com/video/2023/11/19/189813-885095773_large.mp4" },
  { label: "Reel", title: "Video 1-1", src: "https://cdn.pixabay.com/video/2024/03/15/204306-924613396_large.mp4" },
  { label: "Short", title: "Video R2", src: "https://cdn.pixabay.com/video/2023/10/05/183032-872065752_large.mp4" },
  { label: "Reel", title: "Video Extra 1", src: "https://cdn.pixabay.com/video/2022/11/30/141050-777832367_large.mp4" },
  { label: "Short", title: "Video Extra 2", src: "https://cdn.pixabay.com/video/2024/02/26/202298-916310403_large.mp4" },
  { label: "Reel", title: "Video Extra 3", src: "https://cdn.pixabay.com/video/2023/11/19/189813-885095773_large.mp4" },
];

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

          return (
            <motion.div
              layout
              key={originalIndex}
              onClick={() => setActiveIndex(originalIndex)}
              className={`shorts-glass group cursor-pointer ${isFeatured ? "is-featured" : ""}`}
              animate={{
                rotateY: rotate,
                zIndex: z,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
            >
              <video
                src={s.src}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="shorts-glass-video"
              />
              <div className="shorts-glass-overlay" />
              {isFeatured && (
                <div className="shorts-featured-badge">Featured</div>
              )}
              <button
                type="button"
                aria-label="Play"
                className="shorts-glass-play"
              >
                <Play className="h-5 w-5 fill-current text-primary-foreground" />
              </button>
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

