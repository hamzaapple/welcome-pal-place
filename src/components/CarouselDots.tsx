import { useCallback, useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

/** يتابع السلايد الحالي وعدد السلايدات في أي embla carousel */
export function useCarouselSelection(api?: CarouselApi) {
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => {
      setSnaps(api.scrollSnapList());
      onSelect();
    };

    onReInit();
    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  return { snaps, selected };
}

const RESUME_AFTER = 6000;
/** أول حركة بتيجي بدري عشان المستخدم يعرف إن ده بيتحرك، من غير ما يستنى دورة كاملة */
const FIRST_MOVE_AFTER = 1100;

/**
 * حركة تلقائية للـ carousel.
 *
 * مهم للموبايل: التفاعل بيوقف الحركة **مؤقتاً** بس وبترجع لوحدها بعد شوية.
 * لو وقفناها نهائياً كانت بتفضل واقفة على التلفون، لأن أي سحب بالصباع فوق
 * الـ carousel بيشغّل pointerDown، والمتصفح بيبعت mouseenter من غير mouseleave
 * بعدها — فمفيش حاجة كانت بتشغّلها تاني.
 */
export function useCarouselAutoplay(api: CarouselApi | undefined, delay = 3200) {
  const [paused, setPaused] = useState(false);
  // هاندلرز الماوس بتتركب بس على الأجهزة اللي فيها هوفر حقيقي
  const [hoverCapable, setHoverCapable] = useState(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setHoverCapable(window.matchMedia?.("(hover: hover)").matches ?? false);
    return () => window.clearTimeout(resumeTimer.current);
  }, []);

  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_AFTER);
  }, []);

  useEffect(() => {
    if (!api || paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const onPointerDown = () => pauseTemporarily();
    api.on("pointerDown", onPointerDown);

    const advance = () => {
      if (document.hidden) return;
      api.scrollNext();
    };

    let intervalId = 0;
    const firstId = window.setTimeout(() => {
      advance();
      intervalId = window.setInterval(advance, delay);
    }, FIRST_MOVE_AFTER);

    return () => {
      window.clearTimeout(firstId);
      window.clearInterval(intervalId);
      api.off("pointerDown", onPointerDown);
    };
  }, [api, delay, paused, pauseTemporarily]);

  if (!hoverCapable) return {};

  return {
    onMouseEnter: () => {
      window.clearTimeout(resumeTimer.current);
      setPaused(true);
    },
    onMouseLeave: () => setPaused(false),
  };
}

export function CarouselDots({
  api,
  className = "",
}: {
  api?: CarouselApi;
  className?: string;
}) {
  const { snaps, selected } = useCarouselSelection(api);

  if (snaps.length < 2) return null;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {snaps.map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => api?.scrollTo(i)}
          aria-label={`Slide ${i + 1}`}
          aria-current={selected === i}
          className={`h-2 rounded-full transition-all duration-300 ${
            selected === i
              ? "w-7 bg-primary shadow-[0_0_14px_oklch(0.68_0.21_250/0.8)]"
              : "w-2 bg-border hover:bg-muted-foreground/60"
          }`}
        />
      ))}
    </div>
  );
}
