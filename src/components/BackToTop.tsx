import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-7 right-7 z-[900] flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground transition-all duration-400 ${
        visible
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-80 translate-y-5 opacity-0"
      }`}
      style={{
        background: "var(--gradient-primary)",
        boxShadow: "var(--shadow-glow)",
      }}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
