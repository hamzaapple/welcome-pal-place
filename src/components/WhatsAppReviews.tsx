import { useState } from "react";
import { MessageSquareQuote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  CarouselDots,
  useCarouselAutoplay,
  useCarouselSelection,
} from "@/components/CarouselDots";

export interface WhatsAppReview {
  id: number;
  name: string;
  screenshot: string;
}

export const whatsappReviews: WhatsAppReview[] = [
  {
    id: 1,
    name: "عميل ١",
    screenshot: "/reviews/WhatsApp_Image_2026-08-11_at_10.12.39_PM.jpeg",
  },
  {
    id: 2,
    name: "عميل ٢",
    screenshot: "/reviews/imag.png",
  },
  {
    id: 3,
    name: "عميل ٣",
    screenshot: "/reviews/WhatsApp_Image_2026-08-05_at_3.03.28_PM.jpeg",
  },
  {
    id: 4,
    name: "عميل ٤",
    screenshot: "/reviews/WhatsApp_Image_2026-08-05_at_3.03.08_PM.jpeg",
  },
  {
    id: 5,
    name: "عميل ٥",
    screenshot: "/reviews/WhatsApp_Image_2026-08-05_at_3.03.55_PM.jpeg",
  },
  {
    id: 6,
    name: "عميل ٦",
    screenshot: "/reviews/WhatsApp_Image_2026-08-05_at_3.04.37_PM.jpeg",
  },
  {
    id: 7,
    name: "عميل ٧",
    screenshot: "/reviews/WhatsApp_Image_2026-08-05_at_3.06.06_PM.jpeg",
  },
  {
    id: 8,
    name: "عميل ٨",
    screenshot: "/reviews/ima.png",
  },
  {
    id: 9,
    name: "عميل ٩",
    screenshot: "/reviews/image.png",
  },
  {
    id: 10,
    name: "عميل ١٠",
    screenshot: "/reviews/imag.png",
  },
  {
    id: 11,
    name: "عميل ١١",
    screenshot: "/reviews/WhatsApp_Image_2026-08-05_at_3.02.31_PM.jpeg",
  },
];

/* ──────────────────────────────────────────────────
   Floating WhatsApp Icons Background
   ────────────────────────────────────────────────── */
function FloatingIcons() {
  return (
    <div className="wa-floating-icons" aria-hidden="true">
      {["💬", "✅", "⭐", "🔥", "💯", "❤️", "🎬", "👍"].map((e, i) => (
        <span
          key={i}
          className="wa-float-icon"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${5 + Math.random() * 4}s`,
            fontSize: `${1.2 + Math.random() * 1}rem`,
          }}
        >
          {e}
        </span>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────
   Main Section — What Clients Say (Screenshots Only)
   ────────────────────────────────────────────────── */
export function WhatsAppReviewsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const { selected } = useCarouselSelection(api);
  const autoplay = useCarouselAutoplay(api, 3500);

  return (
    <section id="clients" className="relative py-24 overflow-hidden">
      <div className="section-divider" />
      <FloatingIcons />

      <div className="mx-auto max-w-7xl px-6 pt-12 relative z-10">
        <Reveal className="text-center mb-14">
          <div className="chip mb-4 inline-flex">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            <span>Testimonials</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <div
            className="mx-auto mb-5 h-1 w-16 rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
          <p dir="rtl" className="font-arabic text-muted-foreground mx-auto max-w-xl">
            آراء عملائي الذين وثقوا بي لتحويل أفكارهم إلى محتوى مرئي احترافي.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="mx-auto max-w-5xl">
            <Carousel setApi={setApi} opts={{ align: "center", loop: true }} {...autoplay}>
              <CarouselContent className="py-8">
                {whatsappReviews.map((review, i) => {
                  const isActive = selected === i;
                  return (
                    <CarouselItem key={review.id} className="basis-[85%] sm:basis-[70%] lg:basis-[50%] flex justify-center items-center">
                      <div
                        className={`relative transition-all duration-500 w-full max-w-[500px] ${
                          isActive
                            ? "scale-100 opacity-100 blur-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] -translate-y-2"
                            : "scale-90 opacity-40 blur-[3px]"
                        }`}
                      >
                        <img
                          src={review.screenshot}
                          alt={`Screenshot of review from ${review.name}`}
                          loading="lazy"
                          className="block w-full h-auto rounded-2xl object-contain"
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
            <CarouselDots api={api} className="mt-8" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
