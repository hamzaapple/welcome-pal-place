import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  canvasW: number;
  canvasH: number;

  constructor(w: number, h: number) {
    this.canvasW = w;
    this.canvasH = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.hue = 220 + Math.random() * 30;
  }

  reset(w: number, h: number) {
    this.canvasW = w;
    this.canvasH = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.hue = 220 + Math.random() * 30;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (
      this.x < 0 ||
      this.x > this.canvasW ||
      this.y < 0 ||
      this.y > this.canvasH
    ) {
      this.reset(this.canvasW, this.canvasH);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
    ctx.fill();
  }
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    resize();

    const count = window.innerWidth < 768 ? 25 : 50;
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    function loop() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }
      animId = requestAnimationFrame(loop);
    }

    // IntersectionObserver to pause when offscreen
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (!animId) loop();
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      },
      { threshold: 0.1 },
    );
    io.observe(canvas);

    const onResize = () => {
      resize();
      for (const p of particles) {
        p.canvasW = canvas.width;
        p.canvasH = canvas.height;
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
