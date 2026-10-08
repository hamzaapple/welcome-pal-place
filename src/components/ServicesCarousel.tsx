import { useState, type ComponentType } from "react";
import { AudioLines, Captions, Palette, Scissors, Sparkles } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import {
  CarouselDots,
  useCarouselAutoplay,
  useCarouselSelection,
} from "@/components/CarouselDots";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { services } from "@/data/media";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  scissors: Scissors,
  audio: AudioLines,
  captions: Captions,
  palette: Palette,
};

export function ServicesSection() {
  const [api, setApi] = useState<CarouselApi>();
  const { selected } = useCarouselSelection(api);
  const autoplay = useCarouselAutoplay(api, 3400);

  return (
    <section id="services" className="relative py-24">
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 pt-12">
        <Reveal className="mb-14 text-center">
          <div className="chip mb-4 inline-flex">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Services</span>
          </div>
          <h2 className="font-display mb-3 text-3xl font-bold md:text-5xl">
            What I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl">
            End-to-end editing that turns your raw footage into content people actually finish.
          </p>
        </Reveal>

        <Reveal>
          <Carousel setApi={setApi} opts={{ align: "center", loop: true }} {...autoplay}>
            <CarouselContent className="py-4">
              {services.map((s, i) => {
                const Icon = ICONS[s.icon] ?? Sparkles;
                const isActive = selected === i;

                return (
                  <CarouselItem key={s.title} className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <div
                      className={`glass-card h-full p-8 text-center transition-all duration-500 ${
                        isActive
                          ? "-translate-y-1 border-primary/50 shadow-[0_0_45px_oklch(0.68_0.21_250/0.18)]"
                          : ""
                      }`}
                    >
                      <div
                        className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500 ${
                          isActive
                            ? "bg-primary/20 text-glow shadow-[0_0_28px_oklch(0.68_0.21_250/0.35)]"
                            : "bg-secondary/60 text-accent"
                        }`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3
                        className={`font-display mb-3 text-xl font-bold transition-colors duration-500 ${
                          isActive ? "text-glow" : ""
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </Reveal>

        <CarouselDots api={api} className="mt-8" />
      </div>
    </section>
  );
}
