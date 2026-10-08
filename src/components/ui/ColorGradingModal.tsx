import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PAIRS = [
  { before: "/color_correction/before/1--.png", after: "/color_correction/after/4---.png" },
  { before: "/color_correction/before/1-.png", after: "/color_correction/after/3---.png" },
  { before: "/color_correction/before/1110.png", after: "/color_correction/after/2--.png" },
  { before: "/color_correction/before/11111.png", after: "/color_correction/after/-4-.png" },
  { before: "/color_correction/before/13123123123.png", after: "/color_correction/after/-2-.png" },
  { before: "/color_correction/before/1313123.png", after: "/color_correction/after/-3-.png" },
  { before: "/color_correction/before/2.png", after: "/color_correction/after/--5.png" },
  { before: "/color_correction/before/33.png", after: "/color_correction/after/--3.png" },
  { before: "/color_correction/before/5.png", after: "/color_correction/after/-5-.png" },
  { before: "/color_correction/before/before.png", after: "/color_correction/after/--1.png" },
  { before: "/color_correction/before/1313123132.png", after: "/color_correction/after/ChatGPT_Image_Jul_29_2026_12_37_48_AM.png" }
];

export function ColorGradingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSliderPosition(50); // Reset on open
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const nextPair = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % PAIRS.length);
    setSliderPosition(50);
  };

  const prevPair = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + PAIRS.length) % PAIRS.length);
    setSliderPosition(50);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
          onClick={onClose}
        >
          <div
            className="relative flex h-full max-h-[80vh] w-full max-w-5xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -right-2 -top-12 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:-right-12 sm:top-0"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Slider Container */}
            <div
              ref={containerRef}
              dir="ltr"
              className="relative h-full aspect-[9/16] max-h-[80vh] select-none overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              style={{ touchAction: "none" }}
            >
              {/* After Image (Base) */}
              <img
                src={PAIRS[currentIndex].after}
                alt="After Color Grading"
                className="pointer-events-none h-full w-full object-cover"
                draggable={false}
              />

              {/* Before Image (Overlay) */}
              <img
                ref={beforeImageRef}
                src={PAIRS[currentIndex].before}
                alt="Before Color Grading"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                draggable={false}
              />

              {/* Slider Handle */}
              <div
                className="absolute inset-y-0 flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="h-full w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                <div className="absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black/50 shadow-lg backdrop-blur-md">
                  <div className="flex gap-1">
                    <ChevronLeft className="h-4 w-4 text-white" />
                    <ChevronRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-md bg-black/60 px-3 py-1 text-sm font-semibold text-white backdrop-blur-md">
                Before
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 rounded-md bg-primary/80 px-3 py-1 text-sm font-semibold text-white backdrop-blur-md">
                After
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={prevPair}
                className="rounded-full bg-white/5 p-3 text-white transition-colors hover:bg-white/15"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-sm font-medium text-white/70">
                {currentIndex + 1} / {PAIRS.length}
              </div>
              <button
                onClick={nextPair}
                className="rounded-full bg-white/5 p-3 text-white transition-colors hover:bg-white/15"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
