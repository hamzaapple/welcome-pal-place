import { Film, Play, Youtube } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { longFormVideos, youtubeChannelUrl } from "@/data/media";

export function LongFormSection() {
  return (
    <section id="longform" className="relative py-24">
      <div className="section-divider" />
      <div className="mx-auto max-w-6xl px-6 pt-12">
        <Reveal className="mb-14 text-center">
          <div className="chip mb-4 inline-flex border-[#ff4d6d]/30 text-[#ff4d6d]">
            <Youtube className="h-3.5 w-3.5" />
            <span>Long Form Content</span>
          </div>
          <h2 className="font-display mb-3 text-3xl font-bold md:text-5xl">
            Long Form <span className="gradient-text">Videos</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl">
            Deep-dive content exploring professional video production and editing mastery.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {longFormVideos.map((v, i) => {
            const url = v.youtubeId
              ? `https://www.youtube.com/watch?v=${v.youtubeId}`
              : youtubeChannelUrl;

            return (
              <Reveal key={v.title} delay={i * 120}>
                <div className="glass-card h-full overflow-hidden">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-video overflow-hidden"
                  >
                    {v.youtubeId ? (
                      <img
                        src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                        alt={v.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="text-muted-foreground/50 flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,oklch(0.2_0.03_255),oklch(0.15_0.025_255))]">
                        <Film className="h-12 w-12" />
                      </div>
                    )}
                    <div className="from-background/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff0000] shadow-[0_0_35px_rgba(255,0,0,0.55)] transition-transform duration-500 group-hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6 fill-current text-white" />
                      </div>
                    </div>
                  </a>

                  <div className="p-6">
                    <h3 className="font-display mb-2 text-xl font-bold">{v.title}</h3>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{v.desc}</p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-youtube !px-6 !py-2.5 !text-sm"
                    >
                      <Youtube className="h-4 w-4" />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
