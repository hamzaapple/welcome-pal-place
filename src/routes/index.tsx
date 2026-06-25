import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  Mail,
  Sparkles,
  Scissors,
  Palette,
  Headphones,
  PenTool,
  Lightbulb,
  MapPin,
  Clock,
  Zap,
  Instagram,
  Youtube,
  ArrowDown,
  Rocket,
} from "lucide-react";

import profileAsset from "@/assets/profile.jpeg.asset.json";
import { Reveal } from "@/components/Reveal";
import { ShortsCarousel } from "@/components/ShortsCarousel";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { CursorGlow } from "@/components/CursorGlow";
import { BackToTop } from "@/components/BackToTop";
import { VideoModal } from "@/components/VideoModal";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Nady Rabie | نادي ربيع — Video Editor & Content Creator" },
      {
        name: "description",
        content:
          "Cinematic video editing, motion graphics & color grading. Turning ideas into unforgettable visual stories.",
      },
      { property: "og:title", content: "Nady Rabie — Video Editor" },
      {
        property: "og:description",
        content: "Cinematic editing, motion graphics & color grading.",
      },
      { property: "og:image", content: profileAsset.url },
    ],
  }),
  component: PortfolioPage,
});

const typewriterWords = [
  "a Video Editor",
  "a Storyteller",
  "a Motion Designer",
  "a Colorist",
];

function useTypewriter(words: string[], typeSpeed = 90, eraseSpeed = 45, hold = 1500) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timer = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.substring(0, t.length - 1) : current.substring(0, t.length + 1),
          );
        },
        deleting ? eraseSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, wordIdx, words, typeSpeed, eraseSpeed, hold]);

  return text;
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1800;
          const start = performance.now();
          let raf = 0;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(target * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const longForm = [
  {
    title: "Commercial Ad Production",
    desc: "Full production — shoot, edit, color grade & deliver.",
    tag: "Cinematic Edit",
    duration: "12:34",
    thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "Product Explainer — Motion Graphics",
    desc: "Animated product video with a sleek, modern style.",
    tag: "Motion Graphics",
    duration: "08:45",
    thumb: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    title: "Short Documentary",
    desc: "Cinematic storytelling with professional grade footage.",
    tag: "Documentary",
    duration: "15:20",
    thumb: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    href: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    title: "Music Video — Visual Effects",
    desc: "Directed and edited with innovative VFX and color work.",
    tag: "VFX",
    duration: "04:42",
    thumb: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
    href: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
  },
  {
    title: "Editing Masterclass Tutorial",
    desc: "Comprehensive course on professional editing workflow.",
    tag: "Tutorial",
    duration: "20:15",
    thumb: "https://img.youtube.com/vi/RgKAFK5djSk/maxresdefault.jpg",
    href: "https://www.youtube.com/watch?v=RgKAFK5djSk",
  },
  {
    title: "Brand Story Film",
    desc: "Emotive brand film with bespoke color and sound.",
    tag: "Brand Film",
    duration: "06:18",
    thumb: "https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg",
    href: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
  },
];

const skills = [
  {
    icon: Scissors,
    title: "Video Editing",
    desc: "Professional editing for short & long-form content.",
    tags: ["Premiere Pro", "Final Cut Pro", "CapCut"],
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    desc: "Eye-catching animations and visual effects.",
    tags: ["After Effects", "Cinema 4D", "Blender"],
  },
  {
    icon: Palette,
    title: "Color Grading",
    desc: "Cinematic color correction and look development.",
    tags: ["DaVinci Resolve", "Lumetri", "LUTs"],
  },
  {
    icon: Headphones,
    title: "Sound Design",
    desc: "Professional audio mixing and SFX layering.",
    tags: ["Adobe Audition", "SFX", "Mixing"],
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    desc: "Thumbnails, posters & visual identity.",
    tags: ["Photoshop", "Illustrator", "Canva"],
  },
  {
    icon: Lightbulb,
    title: "Content Strategy",
    desc: "Planning & producing content that drives results.",
    tags: ["YouTube", "TikTok", "Instagram"],
  },
];

const featuredVideos = [
  {
    title: "Professional Cinematic Montage",
    desc: "Full production — Editing, Color Grading & VFX",
    ar: "مونتاج سينمائي احترافي",
    tag: "Cinematic Edit",
    videoSrc:
      "https://cdn.coverr.co/videos/coverr-a-girl-using-her-phone-on-the-couch-4615/1080p.mp4",
  },
  {
    title: "Creative Visual Content",
    desc: "Motion Graphics & Visual Effects",
    ar: "محتوى إبداعي بصري",
    tag: "Creative Content",
    videoSrc:
      "https://cdn.coverr.co/videos/coverr-a-girl-using-her-phone-on-the-couch-4615/1080p.mp4",
  },
];

function PortfolioPage() {
  const typed = useTypewriter(typewriterWords);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const featuredRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const openModal = useCallback((src: string) => {
    setModalSrc(src);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setTimeout(() => setModalSrc(""), 400);
  }, []);

  const toggleFeaturedPlay = useCallback(
    (idx: number) => {
      const vid = featuredRefs.current[idx];
      if (!vid) return;
      if (playingIdx === idx) {
        vid.pause();
        setPlayingIdx(null);
      } else {
        // Pause any other playing video
        if (playingIdx !== null && featuredRefs.current[playingIdx]) {
          featuredRefs.current[playingIdx]!.pause();
        }
        vid.muted = false;
        vid.play();
        setPlayingIdx(idx);
      }
    },
    [playingIdx],
  );

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute("href")!.slice(1);
        const el = document.getElementById(id);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Global background: grid + radial glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <div
          className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.21 250 / 0.55), transparent 60%)" }}
        />
        <div
          className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full opacity-30 blur-[140px]"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.25 280 / 0.5), transparent 60%)" }}
        />
        <div
          className="absolute -bottom-40 left-0 h-[500px] w-[700px] rounded-full opacity-25 blur-[140px]"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.18 220 / 0.5), transparent 60%)" }}
        />
      </div>

      <CursorGlow />
      <BackToTop />
      <Navbar />

      {/* ============ HERO ============ */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center pt-28 pb-20"
      >
        <ParticleCanvas />

        <div className="mx-auto w-full max-w-7xl px-6 relative z-10">
          <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
            <Reveal className="flex-1 text-center md:text-left">
              <div className="chip mb-6 font-arabic" dir="rtl">
                <span>🎬</span>
                <span>صانع محتوى ومونتير فيديو</span>
              </div>
              <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block text-muted-foreground/80 text-2xl sm:text-3xl md:text-4xl font-medium mb-3">
                  Hi, I&apos;m
                </span>
                <span className="gradient-text block mb-2">Nady Rabie</span>
                <span className="block text-2xl sm:text-3xl md:text-4xl font-medium text-foreground/90">
                  {typed}
                  <span className="ml-1 inline-block h-[1em] w-[3px] -mb-1 animate-pulse bg-primary align-middle" />
                </span>
              </h1>

              <p className="mt-8 max-w-lg mx-auto md:mx-0 text-base md:text-lg text-muted-foreground leading-relaxed">
                I transform ideas into stunning visual stories — cinematic editing, motion graphics,
                and color grading that don&apos;t fade with the scroll.
              </p>
              <p
                className="mt-3 max-w-lg mx-auto md:mx-0 font-arabic text-sm md:text-base text-muted-foreground/80"
                dir="rtl"
              >
                أحوّل أفكارك إلى قصص بصرية مذهلة تبقى في الذاكرة ✨
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a href="#contact" className="btn-glow">
                  <Mail className="h-5 w-5" />
                  Get in Touch
                </a>
                <a href="#shorts" className="btn-ghost">
                  <Play className="h-5 w-5" />
                  View Work
                </a>
              </div>

              <div className="mt-12 flex items-center justify-center md:justify-start gap-10">
                {[
                  { n: 50, suffix: "+", label: "Projects" },
                  { n: 30, suffix: "+", label: "Clients" },
                  { n: 3, suffix: "y", label: "Experience" },
                ].map((s, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div className="font-display text-3xl font-bold text-glow">
                      <Counter target={s.n} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={250} className="flex-shrink-0">
              <div className="animate-float relative h-72 w-72 sm:h-80 sm:w-80 md:h-[380px] md:w-[380px]">
                <div className="aura-core" />
                <div className="aura-ring" />
                <div className="aura-ring aura-ring-2" />
                <div className="profile-ring relative h-full w-full">
                  <img
                    src={profileAsset.url}
                    alt="Nady Rabie — Video Editor"
                    className="h-full w-full rounded-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <a
          href="#shorts"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-glow transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* ============ SHORTS ============ */}
      <section id="shorts" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center mb-12">
            <div className="chip mb-4 font-arabic inline-flex" dir="rtl">
              <span>📱</span>
              <span>ريلز وشورتس</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Short-Form <span className="gradient-text">Content</span>
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Scroll-stopping reels &amp; shorts designed to captivate in seconds.
            </p>
          </Reveal>

          <Reveal>
            <ShortsCarousel />
          </Reveal>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      <section id="featured" className="relative py-24">
        <div className="section-divider" />
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <Reveal className="text-center mb-14">
            <div className="chip mb-4 inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Featured Work</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Top <span className="gradient-text">Projects</span>
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground">
              A curated selection of my most impactful work.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredVideos.map((f, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="glass-card video-card overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <video
                      ref={(el) => { featuredRefs.current[i] = el; }}
                      src={f.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <button
                      type="button"
                      onClick={() => toggleFeaturedPlay(i)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/85 backdrop-blur-sm transition-all duration-400 hover:scale-115"
                      style={{
                        boxShadow: "0 0 40px oklch(0.68 0.21 250 / 0.6)",
                      }}
                    >
                      {playingIdx === i ? (
                        <Pause className="h-7 w-7 fill-current text-primary-foreground" />
                      ) : (
                        <Play className="h-7 w-7 fill-current text-primary-foreground" />
                      )}
                    </button>
                    <div className="absolute bottom-4 left-4">
                      <span className="chip text-xs">{f.tag}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold mb-1.5">{f.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{f.desc}</p>
                    <p className="font-arabic text-xs text-glow" dir="rtl">
                      {f.ar}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LONG-FORM ============ */}
      <section id="longform" className="relative py-24">
        <div className="section-divider" />
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <Reveal className="text-center mb-14">
            <div className="chip mb-4 inline-flex">
              <Youtube className="h-3.5 w-3.5" />
              <span>Long-Form Content</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Full <span className="gradient-text">Videos</span>
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground">
              In-depth content that showcases the depth of my craft.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {longForm.map((v, i) => (
              <Reveal key={i} delay={i * 80}>
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card video-card block overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={v.thumb}
                      alt={v.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 chip text-[11px]">{v.duration}</span>
                    <div className="play-overlay">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-[0_0_30px_oklch(0.68_0.21_250/0.6)]">
                        <Play className="h-5 w-5 fill-current text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] uppercase tracking-widest text-glow mb-2">
                      {v.tag}
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-1.5">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section id="skills" className="relative py-24">
        <div className="section-divider" />
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <Reveal className="text-center mb-14">
            <div className="chip mb-4 inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tools &amp; Skills</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Creative <span className="gradient-text">Arsenal</span>
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Mastering industry-standard tools to deliver exceptional results.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 70}>
                  <div className="glass-card p-7 h-full">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-glow shadow-[inset_0_0_20px_oklch(0.68_0.21_250/0.2)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="relative py-24">
        <div className="section-divider" />
        <div className="mx-auto max-w-3xl px-6 pt-12">
          <Reveal>
            <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
              <div
                className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-[80px] opacity-50"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div className="relative">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-glow shadow-[0_0_30px_oklch(0.68_0.21_250/0.4)]">
                  <Rocket className="h-8 w-8" />
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
                  Ready to <span className="gradient-text">Start?</span>
                </h2>
                <p className="font-arabic text-xl text-glow mb-6 font-bold" dir="rtl">
                  جاهز لبدء مشروعك؟ 🚀
                </p>
                <p className="mx-auto mb-10 max-w-md text-muted-foreground leading-relaxed">
                  Whether you need a cinematic edit, motion graphics, or a full content package —
                  let&apos;s make it happen.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  <a
                    href="https://wa.me/9647700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-whatsapp"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                  <a href="mailto:nadi@example.com" className="btn-glow">
                    <Mail className="h-5 w-5" />
                    Email Me
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </a>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-glow" /> Iraq
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-glow" /> Available Daily
                  </span>
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-glow" /> Reply within 24h
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-border/40 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold gradient-text">NR</span>
            <span className="text-border">|</span>
            <span className="font-arabic text-sm font-bold text-muted-foreground">نادي ربيع</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nady Rabie. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-glow"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted-foreground transition-colors hover:text-glow"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-muted-foreground transition-colors hover:text-glow"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.79a4.84 4.84 0 01-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-7xl px-6 text-center">
          <p className="text-xs text-muted-foreground/70">
            Developed by{" "}
            <span className="font-semibold text-glow">Hamza Mohsen</span>
            <span className="mx-2 text-border">·</span>
            <a
              href="tel:+201125208207"
              className="hover:text-glow transition-colors"
            >
              +201125208207
            </a>
          </p>
        </div>
      </footer>

      {/* ============ VIDEO MODAL ============ */}
      <VideoModal open={modalOpen} onClose={closeModal}>
        {modalSrc && (
          <video
            ref={modalVideoRef}
            src={modalSrc}
            controls
            playsInline
            autoPlay
            className="max-w-[92vw] max-h-[88vh] rounded-2xl"
            style={{ boxShadow: "0 25px 50px oklch(0 0 0 / 0.5)" }}
          />
        )}
      </VideoModal>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#hero", label: "Home" },
    { href: "#shorts", label: "Reels" },
    { href: "#featured", label: "Featured" },
    { href: "#longform", label: "Videos" },
    { href: "#skills", label: "Skills" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/70 backdrop-blur-xl py-3"
          : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#hero" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold gradient-text">Nady Rabie</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="hidden md:inline-flex btn-glow !py-2 !px-5 !text-sm">
          Contact
        </a>
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      {open && (
        <div className="md:hidden mt-3 mx-6 rounded-2xl glass-card p-4 flex flex-col gap-2">
          {[...links, { href: "#contact", label: "Contact" }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
