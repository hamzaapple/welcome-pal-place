import { useEffect, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function VideoModal({ open, onClose, children }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-400 ${
        open
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none"
      }`}
      style={{
        background: "oklch(0.05 0.02 250 / 0.88)",
        backdropFilter: "blur(16px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:rotate-90 hover:scale-110"
        style={{
          background: "oklch(1 0 0 / 0.1)",
          backdropFilter: "blur(8px)",
        }}
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className={`transition-transform duration-500 ${
          open ? "scale-100 translate-y-0" : "scale-88 translate-y-5"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
