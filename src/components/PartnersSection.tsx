import { useState } from "react";
import { Briefcase } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { CarouselDots, useCarouselAutoplay } from "@/components/CarouselDots";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { partners } from "@/data/media";

export function PartnersSection() {
  const [api, setApi] = useState<CarouselApi>();
  const autoplay = useCarouselAutoplay(api, 1700);

  return (
    <section id="partners" className="relative py-24">
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 pt-12">
        <Reveal className="mb-14 text-center">
          <div className="chip mb-4 inline-flex">
            <Briefcase className="h-3.5 w-3.5" />
            <span>My Partners</span>
          </div>
          <h2 className="font-display mb-3 text-3xl font-bold md:text-5xl">
            Trusted by <span className="gradient-text">Great Companies</span>
          </h2>
          <p dir="rtl" className="font-arabic text-muted-foreground mx-auto max-w-xl">
            الشركات التي وثقت بي لتقديم حلول إبداعية في المونتاج وصناعة المحتوى.
          </p>
        </Reveal>

        <Reveal>
          <Carousel setApi={setApi} opts={{ align: "start", loop: true }} {...autoplay}>
            {/* مش بنوصل لـ 1/5 عشان الكروت الخمسة ما تملاش العرض بالظبط
                وتوقف الحركة على الشاشات العريضة */}
            <CarouselContent className="py-2">
              {partners.map((p) => (
                <CarouselItem key={p.name} className="basis-1/2 sm:basis-1/3 lg:basis-1/4">
                  <div className="glass-card flex h-28 items-center justify-center px-5 text-center">
                    <span className="font-display text-base leading-snug font-bold md:text-lg">
                      {p.name}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Reveal>

        <CarouselDots api={api} className="mt-8" />
      </div>
    </section>
  );
}
