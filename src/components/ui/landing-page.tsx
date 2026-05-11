import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Globe from "@/components/ui/globe";
import { cn } from "@/lib/utils";

interface ScrollGlobeProps {
  sections: {
    id: string;
    badge?: string;
    title: string;
    subtitle?: string;
    description: string;
    align?: "left" | "center" | "right";
    dir?: "ltr" | "rtl";
    features?: { title: string; description: string }[];
    actions?: { label: string; variant: "primary" | "secondary"; onClick?: () => void }[];
  }[];
  globeConfig?: {
    positions: {
      top: string;
      left: string;
      scale: number;
    }[];
  };
  className?: string;
}

const defaultGlobeConfig = {
  positions: [
    { top: "48%", left: "72%", scale: 1.35 },
    { top: "26%", left: "78%", scale: 0.9 },
    { top: "60%", left: "74%", scale: 1.55 },
    { top: "48%", left: "68%", scale: 1.85 },
  ],
};

const parsePercent = (str: string): number => parseFloat(str.replace("%", ""));

const toTransform = (position: { top: number; left: number; scale: number }) =>
  `translate3d(${position.left}vw, ${position.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${position.scale}, ${position.scale}, 1)`;

export function ScrollGlobe({ sections, globeConfig = defaultGlobeConfig, className }: ScrollGlobeProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [globeTransform, setGlobeTransform] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameId = useRef<number>();

  const calculatedPositions = useMemo(
    () =>
      globeConfig.positions.map((pos) => ({
        top: parsePercent(pos.top),
        left: parsePercent(pos.left),
        scale: pos.scale,
      })),
    [globeConfig.positions],
  );

  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    setScrollProgress(Math.min(Math.max(scrollTop / docHeight, 0), 1));

    const viewportCenter = window.innerHeight / 2;
    let newActiveSection = 0;
    let minDistance = Infinity;

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        newActiveSection = index;
      }
    });

    const currentPos = calculatedPositions[newActiveSection] ?? calculatedPositions[0];
    setGlobeTransform(toTransform(currentPos));
    setActiveSection(newActiveSection);
  }, [calculatedPositions]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      animationFrameId.current = requestAnimationFrame(() => {
        updateScrollPosition();
        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateScrollPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [updateScrollPosition]);

  useEffect(() => {
    const initialPos = calculatedPositions[0];
    if (initialPos) {
      setGlobeTransform(toTransform(initialPos));
    }
  }, [calculatedPositions]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-screen overflow-x-hidden min-h-screen bg-background text-foreground",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_80%_42%,rgba(20,184,166,0.14),transparent_30%),linear-gradient(180deg,rgba(0,8,19,0)_0%,rgba(0,8,19,0.78)_100%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <div className="fixed top-0 left-0 z-50 h-0.5 w-full bg-gradient-to-r from-border/20 via-border/40 to-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 shadow-sm will-change-transform"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left center",
            transition: "transform 0.15s ease-out",
            filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))",
          }}
        />
      </div>

      <div className="hidden sm:flex fixed right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {sections.map((section, index) => (
            <div key={section.id} className="group relative">
              <div
                className={cn(
                  "absolute right-5 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2",
                  "rounded-lg border border-white/10 bg-[#071225]/90 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-md",
                  activeSection === index ? "animate-fadeOut" : "opacity-0",
                )}
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{section.badge || `Section ${index + 1}`}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sectionRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className={cn(
                  "relative h-3 w-3 rounded-full border-2 transition-all duration-300 hover:scale-125",
                  "before:absolute before:inset-0 before:rounded-full before:transition-all before:duration-300",
                  activeSection === index
                    ? "border-cyan-300 bg-cyan-300 shadow-lg shadow-cyan-300/30 before:animate-ping before:bg-cyan-300/20"
                    : "border-white/35 bg-transparent hover:border-cyan-300/70 hover:bg-cyan-300/10",
                )}
                aria-label={`Go to ${section.badge || `section ${index + 1}`}`}
              />
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 top-0 bottom-0 -z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent" />
      </div>

      <div
        className="fixed z-30 h-[250px] w-[250px] pointer-events-none will-change-transform transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          transform: globeTransform,
          filter: `opacity(${activeSection === sections.length - 1 ? 0.42 : 0.88})`,
        }}
      >
        <div className="scale-[0.72] sm:scale-90 lg:scale-100">
          <Globe />
        </div>
      </div>

      {sections.map((section, index) => {
        const dir = section.dir || "ltr";
        const textAlign =
          section.align === "center" ? "text-center" : dir === "rtl" ? "text-right" : "text-left";
        const actionAlign =
          section.align === "center" ? "justify-center" : "justify-start";

        return (
          <section
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            dir="ltr"
            className="relative z-20 grid min-h-screen w-full grid-cols-1 items-center overflow-hidden px-4 py-24 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.78fr)] lg:px-14"
          >
            <div
              className={cn(
                "relative w-full max-w-5xl rounded-none transition-all duration-700",
                textAlign,
                section.align === "center" && "mx-auto",
              )}
              dir={dir}
            >
              {section.badge && (
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold text-cyan-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.8)]" />
                  {section.badge}
                </span>
              )}

              <h1
                className={cn(
                  "mb-6 font-black leading-[1.08]",
                  index === 0
                    ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                    : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
                )}
              >
                <span className="block bg-gradient-to-r from-white via-cyan-100 to-white/75 bg-clip-text text-transparent">
                  {section.title}
                </span>
                {section.subtitle && (
                  <span className="mt-2 block text-[0.55em] font-semibold leading-tight text-slate-300">
                    {section.subtitle}
                  </span>
                )}
              </h1>

              <div
                className={cn(
                  "mb-8 text-base font-light leading-8 text-slate-300 sm:text-lg lg:text-xl",
                  section.align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl",
                )}
              >
                <p>{section.description}</p>
                {index === 0 && (
                  <div className={cn("mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400", actionAlign)}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      <span>{dir === "rtl" ? "تجربة تفاعلية" : "Interactive Experience"}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{dir === "rtl" ? "مرر للاستكشاف" : "Scroll to Explore"}</span>
                    </div>
                  </div>
                )}
              </div>

              {section.features && (
                <div className="mb-8 grid gap-3 sm:gap-4">
                  {section.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="group rounded-xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.08] sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300 transition-colors group-hover:bg-emerald-300" />
                        <div className="min-w-0 flex-1 space-y-1">
                          <h3 className="text-base font-bold text-white sm:text-lg">{feature.title}</h3>
                          <p className="text-sm leading-7 text-slate-400 sm:text-base">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.actions && (
                <div className={cn("flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4", actionAlign)}>
                  {section.actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={action.onClick}
                      className={cn(
                        "group relative w-full overflow-hidden rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-300/30 sm:w-auto sm:px-8 sm:text-base",
                        action.variant === "primary"
                          ? "bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-300/20 hover:bg-white hover:shadow-cyan-300/35"
                          : "border border-white/15 bg-white/5 text-white backdrop-blur-sm hover:border-cyan-300/35 hover:bg-white/10",
                      )}
                    >
                      <span className="relative z-10">{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden lg:block" aria-hidden="true" />
          </section>
        );
      })}
    </div>
  );
}

export default ScrollGlobe;
