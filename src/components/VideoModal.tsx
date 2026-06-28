import { useEffect, useCallback, useState, type ReactNode } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  videos: { videoSrc: string; title: string; desc: string }[];
  initialIndex: number;
};

export function VideoModal({ open, onClose, videos, initialIndex }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
    },
    [videos.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
    },
    [videos.length]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [onClose, handlePrev, handleNext]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  if (!videos.length) return null;
  const currentVideo = videos[currentIndex];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-400 ${
        open
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none"
      }`}
      style={{
        background: "oklch(0.05 0.02 250 / 0.88)",
        backdropFilter: "blur(16px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:rotate-90 hover:scale-110"
        style={{
          background: "oklch(1 0 0 / 0.1)",
          backdropFilter: "blur(8px)",
        }}
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev Button */}
      <button
        className="absolute left-2 md:left-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 border border-white/10 text-white transition-all hover:bg-black/80 hover:scale-110"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next Button */}
      <button
        className="absolute right-2 md:right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 border border-white/10 text-white transition-all hover:bg-black/80 hover:scale-110"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className={`transition-all duration-500 relative flex flex-col items-center justify-center w-full max-w-5xl px-12 ${
          open ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex items-center justify-center bg-black/50 rounded-2xl overflow-hidden" style={{ boxShadow: "0 25px 50px oklch(0 0 0 / 0.5)" }}>
          <video
            key={currentVideo.videoSrc}
            src={currentVideo.videoSrc}
            className="max-w-full max-h-[75vh] w-auto object-contain"
            controls
            autoPlay
            playsInline
          />
        </div>
        <div className="mt-6 text-center text-white w-full">
          <h3 className="text-2xl font-bold font-display">{currentVideo.title}</h3>
          <p className="text-base text-gray-300 mt-2">{currentVideo.desc}</p>
          <div className="text-xs text-gray-500 mt-2 tracking-widest uppercase">
            {currentIndex + 1} / {videos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
