import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, FastForward, Rewind, Volume2, ChevronLeft, ChevronRight } from "lucide-react";

const PAIRS = [
  { before: "/sound_design/before/1.mp3", after: "/sound_design/after/2-.mp3", title: "Audio 1" },
  { before: "/sound_design/before/1 (1).mp3", after: "/sound_design/after/2- (21).mp3", title: "Audio 2" },
  { before: "/sound_design/before/11(1).mp3", after: "/sound_design/after/2.mp3", title: "Audio 3" }
];

export function SoundDesignModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAfter, setIsAfter] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const beforeAudioRef = useRef<HTMLAudioElement>(null);
  const afterAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsPlaying(false);
      setIsAfter(false);
      setCurrentTime(0);
      setCurrentIndex(0);
      if (beforeAudioRef.current) beforeAudioRef.current.currentTime = 0;
      if (afterAudioRef.current) afterAudioRef.current.currentTime = 0;
    } else {
      document.body.style.overflow = "auto";
      if (beforeAudioRef.current) beforeAudioRef.current.pause();
      if (afterAudioRef.current) afterAudioRef.current.pause();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    // When track changes
    if (beforeAudioRef.current) beforeAudioRef.current.currentTime = 0;
    if (afterAudioRef.current) afterAudioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  }, [currentIndex]);

  const nextPair = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % PAIRS.length);
  };

  const prevPair = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + PAIRS.length) % PAIRS.length);
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      beforeAudioRef.current?.pause();
      afterAudioRef.current?.pause();
    } else {
      if (isAfter) {
        afterAudioRef.current?.play();
      } else {
        beforeAudioRef.current?.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleToggleState = (targetState: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    if (targetState === isAfter) return;
    
    const newTime = isAfter ? (afterAudioRef.current?.currentTime || 0) : (beforeAudioRef.current?.currentTime || 0);

    if (targetState) {
      // Switch to After
      if (beforeAudioRef.current) beforeAudioRef.current.pause();
      if (afterAudioRef.current) {
        afterAudioRef.current.currentTime = newTime;
        if (isPlaying) afterAudioRef.current.play();
      }
    } else {
      // Switch to Before
      if (afterAudioRef.current) afterAudioRef.current.pause();
      if (beforeAudioRef.current) {
        beforeAudioRef.current.currentTime = newTime;
        if (isPlaying) beforeAudioRef.current.play();
      }
    }
    setIsAfter(targetState);
  };

  const handleTimeUpdate = () => {
    const activeRef = isAfter ? afterAudioRef.current : beforeAudioRef.current;
    if (activeRef) {
      setCurrentTime(activeRef.currentTime);
      setDuration(activeRef.duration || 0);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (beforeAudioRef.current) beforeAudioRef.current.currentTime = time;
    if (afterAudioRef.current) afterAudioRef.current.currentTime = time;
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
          {/* Audio Elements */}
          <audio
            ref={beforeAudioRef}
            src={PAIRS[currentIndex].before}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
          <audio
            ref={afterAudioRef}
            src={PAIRS[currentIndex].after}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />

          <div
            className="relative flex w-full max-w-xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 rounded-2xl bg-white/5 p-4 shadow-inner">
              <Volume2 className={`mx-auto h-16 w-16 ${isAfter ? "text-primary" : "text-white/50"}`} />
            </div>
            
            <h3 className="mb-2 text-xl font-bold text-white">Audio Comparison</h3>
            <p className="mb-8 text-sm text-white/60">
              Toggle between raw and edited audio while playing.
            </p>

            {/* Toggle Switch */}
            <div className="mb-8 flex rounded-full bg-white/5 p-1">
              <button
                onClick={(e) => handleToggleState(false, e)}
                className={`flex-1 rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                  !isAfter
                    ? "bg-white text-black shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Raw Audio
              </button>
              <button
                onClick={(e) => handleToggleState(true, e)}
                className={`flex-1 rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                  isAfter
                    ? "bg-primary text-white shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Sound Design
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4 w-full px-4">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="h-2 w-full appearance-none rounded-full bg-white/20 outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              <div className="mt-2 flex justify-between text-xs text-white/50">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const t = Math.max(0, currentTime - 5);
                  if (beforeAudioRef.current) beforeAudioRef.current.currentTime = t;
                  if (afterAudioRef.current) afterAudioRef.current.currentTime = t;
                  setCurrentTime(t);
                }}
                className="text-white/60 transition-colors hover:text-white"
              >
                <Rewind className="h-6 w-6" />
              </button>

              <button
                onClick={handlePlayPause}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white pl-1 text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 -ml-1 fill-black" />
                ) : (
                  <Play className="h-8 w-8 fill-black" />
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const t = Math.min(duration, currentTime + 5);
                  if (beforeAudioRef.current) beforeAudioRef.current.currentTime = t;
                  if (afterAudioRef.current) afterAudioRef.current.currentTime = t;
                  setCurrentTime(t);
                }}
                className="text-white/60 transition-colors hover:text-white"
              >
                <FastForward className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center gap-4">
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
