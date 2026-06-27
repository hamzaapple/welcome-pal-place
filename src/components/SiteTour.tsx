import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, X, MapPin, ArrowDown } from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  duration: number; // in milliseconds
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "hero",
    title: "مرحباً بك!",
    description: "أهلاً بك في موقعي. هذا هو القسم الرئيسي حيث أقدم لك لمحة سريعة عن أعمالي وموهبتي في المونتاج.",
    duration: 5000,
  },
  {
    id: "shorts",
    title: "فيديوهات قصيرة (Shorts)",
    description: "هنا تجد أفضل الفيديوهات القصيرة التي قمت بمونتاجها بأسلوب عصري وسريع ومناسب للسوشيال ميديا.",
    duration: 6000,
  },
  {
    id: "ads",
    title: "إعلانات البراندات",
    description: "مشاريع الإعلانات التجارية للبراندات المختلفة، نركز فيها على إبراز المنتج بأسلوب احترافي.",
    duration: 5000,
  },
  {
    id: "cars",
    title: "مونتاج السيارات",
    description: "مونتاج سينمائي خاص بالسيارات، إيقاع سريع متناغم مع الصوت، وتصحيح ألوان مميز.",
    duration: 5000,
  },
  {
    id: "arabic",
    title: "محتوى عربي (Talking Head)",
    description: "فيديوهات التحدث للكاميرا باللغة العربية مع مؤثرات بصرية تبقي المشاهد مهتماً.",
    duration: 5000,
  },
  {
    id: "english",
    title: "محتوى إنجليزي",
    description: "مشاريع احترافية ومونتاج راقي لمحتوى صناع المحتوى باللغة الإنجليزية.",
    duration: 5000,
  },
];

export function SiteTour() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Show prompt after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle tour logic
  useEffect(() => {
    if (!isTourActive) return;

    const step = TOUR_STEPS[currentStepIndex];
    if (step) {
      // Scroll to the element
      const element = document.getElementById(step.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // Set timeout for next step
      const timer = setTimeout(() => {
        if (currentStepIndex < TOUR_STEPS.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          // Tour finished
          setIsTourActive(false);
          // Scroll back to top
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, step.duration);

      return () => clearTimeout(timer);
    }
  }, [isTourActive, currentStepIndex]);

  const startTour = () => {
    setShowPrompt(false);
    setIsTourActive(true);
    setCurrentStepIndex(0);
  };

  const endTour = () => {
    setIsTourActive(false);
  };

  return (
    <>
      {/* Prompt Dialog */}
      <AnimatePresence>
        {showPrompt && !isTourActive && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 glass-card p-5 flex items-start gap-4 max-w-sm shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-primary/30"
            dir="rtl"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary mt-1">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-arabic font-bold text-lg mb-1">خذ جولة في موقعي :)</h4>
              <p className="text-sm text-muted-foreground font-arabic leading-relaxed mb-4">
                هل ترغب في أن آخذك في جولة سريعة للتعرف على أفضل أقسام الموقع وتفاصيلها؟
              </p>
              <div className="flex gap-3">
                <button
                  onClick={startTour}
                  className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-arabic font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/30 cursor-pointer"
                >
                  نعم، لنبدأ!
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="bg-secondary text-secondary-foreground px-5 py-2 rounded-full text-sm font-arabic font-semibold hover:bg-secondary/80 transition cursor-pointer"
                >
                  لا شكراً
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Tour Overlay UI */}
      <AnimatePresence>
        {isTourActive && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md pointer-events-auto"
            dir="rtl"
          >
            <div className="glass-card p-6 border-primary/50 shadow-[0_0_40px_oklch(0.68_0.21_250/0.4)] backdrop-blur-xl bg-background/60">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <MapPin className="h-4 w-4" />
                  <span className="font-bold text-xs tracking-wider font-arabic">
                    القسم {currentStepIndex + 1} من {TOUR_STEPS.length}
                  </span>
                </div>
                <button
                  onClick={endTour}
                  className="text-muted-foreground hover:text-white transition bg-secondary/50 p-1.5 rounded-full cursor-pointer"
                  title="إنهاء الجولة"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-2xl font-bold font-arabic mb-2 gradient-text">
                {TOUR_STEPS[currentStepIndex].title}
              </h3>
              <p className="text-muted-foreground font-arabic text-sm leading-relaxed mb-5">
                {TOUR_STEPS[currentStepIndex].description}
              </p>

              <div className="flex items-center justify-between gap-3 mb-4">
                <button
                  onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentStepIndex === 0}
                  className="px-4 py-1.5 rounded-full text-xs font-arabic font-semibold border border-primary/30 text-primary hover:bg-primary/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  السابق
                </button>
                <button
                  onClick={() => {
                    if (currentStepIndex < TOUR_STEPS.length - 1) {
                      setCurrentStepIndex(prev => prev + 1);
                    } else {
                      endTour();
                    }
                  }}
                  className="px-4 py-1.5 rounded-full text-xs font-arabic font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition"
                >
                  {currentStepIndex === TOUR_STEPS.length - 1 ? "إنهاء الجولة" : "التالي"}
                </button>
              </div>

              <div className="w-full bg-secondary/80 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  key={currentStepIndex}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: TOUR_STEPS[currentStepIndex].duration / 1000, ease: "linear" }}
                  className="h-full bg-gradient-primary"
                />
              </div>
            </div>

            {/* Bouncing Arrow Pointing Down */}
            <motion.div 
              className="flex justify-center mt-4 text-primary"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="h-10 w-10 drop-shadow-[0_0_15px_oklch(0.68_0.21_250/0.8)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
