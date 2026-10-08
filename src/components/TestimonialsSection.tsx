import { MessageSquareQuote, Quote, Star } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/data/media";

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="glass-card relative flex w-[300px] shrink-0 snap-center flex-col overflow-hidden p-7 sm:w-[360px]">
      {/* الشريط المضيء تحت الكارت */}
      <span
        className="absolute inset-x-0 bottom-0 h-[3px]"
        style={{ background: "var(--gradient-primary)" }}
      />
      <Quote className="text-primary/25 absolute top-6 right-6 h-9 w-9 fill-current" strokeWidth={0} />

      <div className="mb-5 flex items-center gap-4">
        <div className="border-primary/60 text-glow font-display bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold shadow-[0_0_22px_oklch(0.68_0.21_250/0.35)]">
          {t.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="font-display truncate text-base font-bold">{t.name}</div>
          <div className="text-glow truncate text-xs font-medium">{t.role}</div>
        </div>
      </div>

      <div className="mb-4 flex gap-1" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < t.rating ? "fill-[#facc15] text-[#facc15]" : "text-border"}`}
          />
        ))}
      </div>

      <p dir="rtl" className="font-arabic text-muted-foreground text-sm leading-loose">
        {t.quote}
      </p>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="clients" className="relative py-24">
      <div className="section-divider" />
      <div className="pt-12">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <div className="chip mb-4 inline-flex">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              <span>Testimonials</span>
            </div>
            <h2 className="font-display mb-4 text-3xl font-bold md:text-5xl">
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
        </div>

        {/*
          ساكن لو الكروت داخلة في عرض الشاشة، وبيتسحب بالإيد لو زادت — زي الموبايل.
          `safe center` بتوسّط الكروت وهي داخلة، وبترجع للبداية وقت الزيادة عشان
          أول كارت ما يتقصّش.
        */}
        <Reveal>
          <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 py-4 [justify-content:safe_center]">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
