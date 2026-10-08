import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AudioLines, Clapperboard, Palette, Sparkles, UserRound, Play, Pause, FastForward, Rewind, ChevronLeft, ChevronRight } from "lucide-react";
import type { ComponentType } from "react";

import { Reveal } from "@/components/Reveal";
import { aboutIntro, craftSkills, editingStyles, softwareSkills } from "@/data/media";

const CRAFT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  audio: AudioLines,
  palette: Palette,
  clapper: Clapperboard,
};

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="text-glow text-[11px] font-semibold tracking-[0.22em] uppercase">
        {children}
      </span>
      <span className="from-border h-px flex-1 bg-gradient-to-r to-transparent" />
    </div>
  );
}

const TABS = [
  { id: "skills", label: "Skills" },
  { id: "styles", label: "Styles" },
] as const;

/* ─── Sound Design inline data ─── */
const SOUND_PAIRS = [
  { before: "/sound_design/before/1.mp3", after: "/sound_design/after/2-.mp3", title: "Audio 1" },
  { before: "/sound_design/before/1 (1).mp3", after: "/sound_design/after/2- (21).mp3", title: "Audio 2" },
  { before: "/sound_design/before/11(1).mp3", after: "/sound_design/after/2.mp3", title: "Audio 3" },
];

/* ─── Color Grading inline data ─── */
const COLOR_PAIRS = [
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
  { before: "/color_correction/before/1313123132.png", after: "/color_correction/after/ChatGPT_Image_Jul_29_2026_12_37_48_AM.png" },
];

/* ─── Sound Design content (embedded inside card) ─── */
function SoundDesignContent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAfter, setIsAfter] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const beforeAudioRef = useRef<HTMLAudioElement>(null);
  const afterAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (beforeAudioRef.current) beforeAudioRef.current.currentTime = 0;
    if (afterAudioRef.current) afterAudioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  }, [currentIndex]);

  const handlePlayPause = () => {
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

  const handleToggleState = (targetState: boolean) => {
    if (targetState === isAfter) return;
    const newTime = isAfter
      ? (afterAudioRef.current?.currentTime || 0)
      : (beforeAudioRef.current?.currentTime || 0);

    if (targetState) {
      if (beforeAudioRef.current) beforeAudioRef.current.pause();
      if (afterAudioRef.current) {
        afterAudioRef.current.currentTime = newTime;
        if (isPlaying) afterAudioRef.current.play();
      }
    } else {
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
    <div className="mt-2">
      <audio
        ref={beforeAudioRef}
        src={SOUND_PAIRS[currentIndex].before}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <audio
        ref={afterAudioRef}
        src={SOUND_PAIRS[currentIndex].after}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Waveform Visual Area */}
      <div className="mb-5 flex h-32 items-end justify-center gap-[3px] rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-4 overflow-hidden">
        {Array.from({ length: 48 }).map((_, i) => {
          const barHeight = 20 + Math.sin(i * 0.5 + currentTime * 2) * 30 + Math.cos(i * 0.3) * 25;
          return (
            <motion.div
              key={i}
              className="w-1.5 rounded-full"
              style={{
                background: isAfter
                  ? `linear-gradient(to top, #34d399, #34d39960)`
                  : `linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0.15))`,
              }}
              animate={{
                height: isPlaying ? `${Math.max(8, barHeight)}%` : `${15 + Math.sin(i * 0.7) * 10}%`,
              }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            />
          );
        })}
      </div>

      {/* Toggle Switch */}
      <div className="mb-4 flex rounded-full bg-white/5 p-1.5 max-w-xs mx-auto">
        <button
          type="button"
          onClick={() => handleToggleState(false)}
          className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            !isAfter
              ? "bg-white text-black shadow-md"
              : "text-white/70 hover:text-white"
          }`}
        >
          Raw
        </button>
        <button
          type="button"
          onClick={() => handleToggleState(true)}
          className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            isAfter
              ? "bg-[#34d399] text-black shadow-md"
              : "text-white/70 hover:text-white"
          }`}
        >
          Edited
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 w-full px-2">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="h-1.5 w-full appearance-none rounded-full bg-white/20 outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
        />
        <div className="mt-1 flex justify-between text-[11px] text-white/50">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => {
            const t = Math.max(0, currentTime - 5);
            if (beforeAudioRef.current) beforeAudioRef.current.currentTime = t;
            if (afterAudioRef.current) afterAudioRef.current.currentTime = t;
            setCurrentTime(t);
          }}
          className="text-white/60 transition-colors hover:text-white"
        >
          <Rewind className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={handlePlayPause}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white pl-0.5 text-black shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 -ml-0.5 fill-black" />
          ) : (
            <Play className="h-5 w-5 fill-black" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            const t = Math.min(duration, currentTime + 5);
            if (beforeAudioRef.current) beforeAudioRef.current.currentTime = t;
            if (afterAudioRef.current) afterAudioRef.current.currentTime = t;
            setCurrentTime(t);
          }}
          className="text-white/60 transition-colors hover:text-white"
        >
          <FastForward className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => (prev - 1 + SOUND_PAIRS.length) % SOUND_PAIRS.length)}
          className="rounded-full bg-white/5 p-1.5 text-white transition-colors hover:bg-white/15"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-medium text-white/60 min-w-[3rem] text-center">
          {currentIndex + 1}/{SOUND_PAIRS.length}
        </span>
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % SOUND_PAIRS.length)}
          className="rounded-full bg-white/5 p-1.5 text-white transition-colors hover:bg-white/15"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Color Grading content (embedded inside card) ─── */
function ColorGradingContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number, force = false) => {
    if (!containerRef.current || (!isDragging && !force)) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  return (
    <div className="mt-2">
      {/* Comparison Slider — Before base, After overlay from left (grows as you drag right) */}
      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden rounded-xl border border-white/10 shadow-xl"
        onPointerDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX, true);
        }}
        onPointerMove={(e) => handleMove(e.clientX)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
        style={{ touchAction: "none", minHeight: "320px" }}
      >
        {/* Before Image (Base — full width, visible when slider is at left) */}
        <img
          src={COLOR_PAIRS[currentIndex].before}
          alt="Before Color Grading"
          className="pointer-events-none h-full w-full object-cover"
          style={{ minHeight: "320px" }}
          draggable={false}
        />

        {/* After Image (Overlay from left — grows as you drag right) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={COLOR_PAIRS[currentIndex].after}
            alt="After Color Grading"
            className="pointer-events-none absolute top-0 left-0 h-full max-w-none object-cover"
            style={{
              width: containerRef.current
                ? `${containerRef.current.clientWidth}px`
                : "100%",
            }}
            draggable={false}
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute inset-y-0 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="h-full w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]" />
          <div className="absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-black/50 shadow-xl backdrop-blur-md">
            <div className="flex gap-0.5">
              <ChevronLeft className="h-3 w-3 text-white" />
              <ChevronRight className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-primary/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
          After
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
          Before
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setCurrentIndex((prev) => (prev - 1 + COLOR_PAIRS.length) % COLOR_PAIRS.length);
            setSliderPosition(50);
          }}
          className="rounded-full bg-white/5 p-1.5 text-white transition-colors hover:bg-white/15"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-xs font-medium text-white/60 min-w-[3rem] text-center">
          {currentIndex + 1}/{COLOR_PAIRS.length}
        </span>
        <button
          type="button"
          onClick={() => {
            setCurrentIndex((prev) => (prev + 1) % COLOR_PAIRS.length);
            setSliderPosition(50);
          }}
          className="rounded-full bg-white/5 p-1.5 text-white transition-colors hover:bg-white/15"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function AboutSection() {
  const [tab, setTab] = useState(0);

  return (
    <section id="about" className="relative py-24">
      <div className="section-divider" />
      <div className="mx-auto max-w-5xl px-6 pt-12">
        <Reveal>
          <div className="chip mb-5 inline-flex">
            <UserRound className="h-3.5 w-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            About <span className="gradient-text">Me</span>
          </h2>
          <div
            className="mt-5 h-1 w-16 rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
          <p
            dir="rtl"
            className="font-arabic text-muted-foreground mt-8 text-base leading-loose md:text-lg"
          >
            {aboutIntro}
          </p>
        </Reveal>

        <Reveal delay={120}>
          {/* Tabs */}
          <div className="border-border/40 mt-10 flex gap-7 border-b">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(i)}
                className={`relative pb-3 text-sm font-semibold transition-colors ${
                  tab === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
                {tab === i && (
                  <motion.span
                    layoutId="about-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full"
                    style={{ background: "var(--gradient-primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {tab === 0 ? (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* المجموعة الأولى — البرامج */}
                  <GroupLabel>Software</GroupLabel>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {softwareSkills.map((s, i) => (
                      <motion.div
                        key={s.name}
                        initial={{ opacity: 0, y: 24, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.08 + i * 0.09,
                          type: "spring",
                          stiffness: 260,
                          damping: 22,
                        }}
                        className="glass-card group flex items-center gap-4 p-5"
                      >
                        <div
                          className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold transition-transform duration-500 group-hover:scale-110"
                          style={{
                            color: s.color,
                            background: `color-mix(in oklab, ${s.color} 16%, transparent)`,
                            border: `1px solid color-mix(in oklab, ${s.color} 38%, transparent)`,
                            boxShadow: `0 0 26px color-mix(in oklab, ${s.color} 22%, transparent)`,
                          }}
                        >
                          {s.short}
                        </div>
                        <div className="min-w-0">
                          <div className="font-display truncate text-base font-semibold">
                            {s.name}
                          </div>
                          <div className="text-muted-foreground mt-0.5 text-xs tracking-wide uppercase">
                            {s.role}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* المجموعة التانية — مهارات ما بعد الإنتاج */}
                  <div className="mt-10">
                    <GroupLabel>Post-Production Craft</GroupLabel>
                    {/* صف الكروت الصغيرة — بس VFX & Motion و Storytelling */}
                    <div className="grid gap-3 grid-cols-2">
                      {craftSkills
                        .filter((c) => c.name !== "Sound Design" && c.name !== "Color Grading")
                        .map((c, i) => {
                          const Icon = CRAFT_ICONS[c.icon] ?? Sparkles;
                          return (
                            <motion.div
                              key={c.name}
                              initial={{ opacity: 0, y: 24, scale: 0.94 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{
                                delay: 0.44 + i * 0.09,
                                type: "spring",
                                stiffness: 260,
                                damping: 22,
                              }}
                              className="glass-card group p-4"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                                  style={{
                                    color: c.color,
                                    background: `color-mix(in oklab, ${c.color} 16%, transparent)`,
                                    border: `1px solid color-mix(in oklab, ${c.color} 38%, transparent)`,
                                    boxShadow: `0 0 26px color-mix(in oklab, ${c.color} 22%, transparent)`,
                                  }}
                                >
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-display truncate text-sm font-semibold">
                                    {c.name}
                                  </div>
                                  <div className="text-muted-foreground mt-0.5 text-[10px] tracking-wide uppercase">
                                    {c.role}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>

                    {/* بانلات الأمثلة الكبيرة — ساوند ديزاين و كولر جريدنج */}
                    <div className="mt-6 grid gap-5 grid-cols-1 lg:grid-cols-2">
                      {/* Sound Design Panel */}
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 240, damping: 24 }}
                        className="glass-card p-6"
                      >
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                            style={{
                              color: "#34d399",
                              background: "color-mix(in oklab, #34d399 16%, transparent)",
                              border: "1px solid color-mix(in oklab, #34d399 38%, transparent)",
                              boxShadow: "0 0 26px color-mix(in oklab, #34d399 22%, transparent)",
                            }}
                          >
                            <AudioLines className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-display text-base font-semibold">Sound Design</div>
                            <div className="text-muted-foreground text-[10px] tracking-wide uppercase">Before & After Examples</div>
                          </div>
                        </div>
                        <SoundDesignContent />
                      </motion.div>

                      {/* Color Grading Panel */}
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 240, damping: 24 }}
                        className="glass-card p-6"
                      >
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                            style={{
                              color: "#f472b6",
                              background: "color-mix(in oklab, #f472b6 16%, transparent)",
                              border: "1px solid color-mix(in oklab, #f472b6 38%, transparent)",
                              boxShadow: "0 0 26px color-mix(in oklab, #f472b6 22%, transparent)",
                            }}
                          >
                            <Palette className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-display text-base font-semibold">Color Grading</div>
                            <div className="text-muted-foreground text-[10px] tracking-wide uppercase">Before & After Examples</div>
                          </div>
                        </div>
                        <ColorGradingContent />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="styles"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {editingStyles.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, y: 24, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.08 + i * 0.09,
                        type: "spring",
                        stiffness: 260,
                        damping: 22,
                      }}
                      className="glass-card p-5"
                    >
                      <div className="mb-1.5 flex items-center gap-2.5">
                        <span className="bg-primary shadow-[0_0_12px_oklch(0.68_0.21_250/0.9)] h-1.5 w-1.5 rounded-full" />
                        <span className="font-display text-base font-semibold">{s.name}</span>
                      </div>
                      <p className="text-muted-foreground pl-[18px] text-sm leading-relaxed">
                        {s.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
