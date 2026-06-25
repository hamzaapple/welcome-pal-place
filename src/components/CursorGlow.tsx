import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = -400;
    let mouseY = -400;
    let currentX = -400;
    let currentY = -400;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    function animate() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      if (glow) {
        glow.style.left = `${currentX}px`;
        glow.style.top = `${currentY}px`;
      }
      animId = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[9998] hidden md:block"
      style={{
        width: 600,
        height: 600,
        background:
          "radial-gradient(circle, oklch(0.68 0.21 250 / 0.06) 0%, transparent 70%)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        willChange: "left, top",
      }}
      aria-hidden="true"
    />
  );
}
