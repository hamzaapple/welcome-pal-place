import { useEffect, useRef, useState } from "react";
import { arcWords } from "@/data/media";

/**
 * الكلمات مكتوبة على قوس بعرض الصفحة وماشية من اليمين للشمال (زي حركة الشمس).
 *
 * مهم: طول الدورة بيتحسب رياضياً من طول القوس، فعنصر <animate> بيتبعت من
 * السيرفر مع الصفحة والقوس بيتحرك من أول فريم — مش مستني JavaScript يشتغل.
 * بعد ما الخط يتحمّل بنقيس الطول الحقيقي ونصحّح الرقم (فرق أقل من 1%) عشان
 * اللوب يبقى مضبوط، من غير `key` عشان الأنيميشن ما يعيدش من الأول.
 */

const UNIT = arcWords.join(" • ") + " • ";
const REPEATS = 3;
const DURATION = 34; // ثانية للدورة الواحدة
/** طول الدورة نسبةً لطول القوس — قريّب من 1 يعني التلات كلمات بيملوا القوس */
const CYCLE_RATIO = 0.96;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** طول منحنى بيزييه تربيعي بالتقريب — نفس النتيجة على السيرفر والمتصفح */
function quadraticLength(
  x0: number,
  y0: number,
  cx: number,
  cy: number,
  x1: number,
  y1: number,
  steps = 32,
) {
  let length = 0;
  let px = x0;
  let py = y0;

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    const x = u * u * x0 + 2 * u * t * cx + t * t * x1;
    const y = u * u * y0 + 2 * u * t * cy + t * t * y1;
    length += Math.hypot(x - px, y - py);
    px = x;
    py = y;
  }

  return length;
}

export function ArcMarquee({ className = "" }: { className?: string }) {
  const [width, setWidth] = useState(1440);
  const textRef = useRef<SVGTextElement>(null);
  const [measuredCycle, setMeasuredCycle] = useState<number | null>(null);

  // القوس بعرض الصفحة، فبنقيس عرض الـ viewport مباشرة (من غير الاسكرول بار)
  useEffect(() => {
    const sync = () => {
      const w = document.documentElement.clientWidth;
      if (w > 0) setWidth(w);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  // الحجم بيكبر مع عرض الشاشة عشان التلات كلمات تملا القوس تقريباً
  const fontSize = Math.round(clamp(width * 0.031, 14, 44));
  const wordSpacing = Math.round(fontSize * 2.3); // المسافة الواسعة بين الكلمات والنقط
  const height = Math.max(96, Math.round(fontSize * 4.2));

  // قوس ضحل ممتد برّه الحواف عشان الكلام يدخل ويخرج من غير ما يتقطع فجأة
  const overhang = width * 0.1;
  const yEnd = height - 12;
  const apex = Math.round(fontSize * 1.5);
  const yControl = 2 * apex - yEnd;
  const arcPath = `M ${-overhang} ${yEnd} Q ${width / 2} ${yControl} ${width + overhang} ${yEnd}`;

  const pathLength = quadraticLength(-overhang, yEnd, width / 2, yControl, width + overhang, yEnd);
  const estimatedCycle = Math.round(pathLength * CYCLE_RATIO);
  const cycle = measuredCycle ?? estimatedCycle;

  // تصحيح الطول بعد ما الخط يتحمّل — الأنيميشن نفسه شغال من الأول
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const measure = () => {
      const total = el.getComputedTextLength();
      if (total > 0) setMeasuredCycle(Math.round(total / REPEATS));
    };

    measure();
    if (typeof document !== "undefined" && "fonts" in document) {
      void document.fonts.ready.then(measure);
    }
  }, [width, fontSize, wordSpacing]);

  return (
    <div className={`pointer-events-none w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="block">
        <defs>
          <path id="arc-marquee-path" d={arcPath} fill="none" />

          <linearGradient id="arc-marquee-text" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.68 0.21 250)" />
            <stop offset="50%" stopColor="oklch(0.93 0.05 230)" />
            <stop offset="100%" stopColor="oklch(0.78 0.18 220)" />
          </linearGradient>

          <linearGradient id="arc-marquee-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.68 0.21 250)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.78 0.18 220)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="oklch(0.68 0.21 250)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* خط القوس الخافت تحت الكلام */}
        <use
          href="#arc-marquee-path"
          stroke="url(#arc-marquee-line)"
          strokeWidth="1"
          fill="none"
          transform={`translate(0 ${Math.round(fontSize * 0.35)})`}
        />

        <text
          ref={textRef}
          fill="url(#arc-marquee-text)"
          className="font-display"
          style={{
            fontSize,
            wordSpacing,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#arc-marquee-path" startOffset="0">
            <animate
              attributeName="startOffset"
              from="0"
              to={`-${cycle}`}
              dur={`${DURATION}s`}
              repeatCount="indefinite"
            />
            {UNIT.repeat(REPEATS)}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
