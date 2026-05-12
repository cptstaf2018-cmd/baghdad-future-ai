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
    positions: { top: string; left: string; scale: number }[];
    mobilePositions?: { top: string; left: string; scale: number }[];
  };
  className?: string;
}

const defaultGlobeConfig = {
  positions: [
    { top: "50%", left: "75%", scale: 1.4 },
    { top: "25%", left: "50%", scale: 0.9 },
    { top: "15%", left: "90%", scale: 2   },
    { top: "50%", left: "50%", scale: 1.8 },
  ],
};

const parsePercent = (str: string): number => parseFloat(str.replace("%", ""));

const toTransform = (pos: { top: number; left: number; scale: number }) =>
  `translate3d(${pos.left}vw, ${pos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${pos.scale}, ${pos.scale}, 1)`;

export function ScrollGlobe({
  sections,
  globeConfig = defaultGlobeConfig,
  className,
}: ScrollGlobeProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [globeTransform, setGlobeTransform] = useState(() => {
    const p = globeConfig.positions[0];
    if (!p) return "";
    return toTransform({ top: parsePercent(p.top), left: parsePercent(p.left), scale: p.scale });
  });
  const [heroVisible, setHeroVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activePositions = useMemo(() => {
    const src = (isMobile && globeConfig.mobilePositions) ? globeConfig.mobilePositions : globeConfig.positions;
    return src.map((pos) => ({
      top: parsePercent(pos.top),
      left: parsePercent(pos.left),
      scale: pos.scale,
    }));
  }, [isMobile, globeConfig.positions, globeConfig.mobilePositions]);

  const calculatedPositions = activePositions;

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
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [updateScrollPosition]);

  useEffect(() => {
    const initialPos = calculatedPositions[0];
    if (initialPos) setGlobeTransform(toTransform(initialPos));
  }, [calculatedPositions]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-screen overflow-x-hidden min-h-screen bg-background text-foreground",
        className,
      )}
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(29,78,216,0.06),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(147,197,253,0.1),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(29,78,216,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(29,78,216,.3)_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-50 h-0.5 w-full bg-blue-100">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 will-change-transform"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left center",
            transition: "transform 0.15s ease-out",
          }}
        />
      </div>

      {/* Side nav dots */}
      <div className="hidden sm:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 lg:gap-6 items-center">
        {sections.map((section, index) => (
          <div key={section.id} className="group relative">
            <div
              className={cn(
                "absolute right-6 lg:right-8 top-1/2 -translate-y-1/2",
                "rounded-lg border border-blue-200 bg-white/95 px-3 py-1.5 text-xs font-medium text-blue-800 shadow-lg backdrop-blur-md whitespace-nowrap",
                activeSection === index ? "animate-fadeOut" : "opacity-0",
              )}
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>{section.badge || `Section ${index + 1}`}</span>
              </div>
            </div>
            <button
              onClick={() =>
                sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className={cn(
                "relative h-2.5 w-2.5 lg:h-3 lg:w-3 rounded-full border-2 transition-all duration-300 hover:scale-125",
                "before:absolute before:inset-0 before:rounded-full before:transition-all before:duration-300",
                activeSection === index
                  ? "border-blue-600 bg-blue-600 shadow-lg shadow-blue-600/30 before:animate-ping before:bg-blue-600/20"
                  : "border-blue-300 bg-transparent hover:border-blue-500 hover:bg-blue-100",
              )}
              aria-label={`Go to ${section.badge || `section ${index + 1}`}`}
            />
          </div>
        ))}
        <div className="absolute left-1/2 top-0 bottom-0 -z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-300/40 to-transparent" />
      </div>

      {/* Globe — visible on all screens, smaller on mobile */}
      <div
        className="fixed z-10 pointer-events-none will-change-transform"
        style={{
          top: 0,
          left: 0,
          width: isMobile ? 180 : 250,
          height: isMobile ? 180 : 250,
          transform: globeTransform,
          opacity: heroVisible ? (activeSection === sections.length - 1 ? 0.35 : isMobile ? 0.55 : 0.85) : 0,
          transition: "transform 1.4s cubic-bezier(0.23,1,0.32,1), opacity 0.6s ease",
        }}
      >
        <div className={isMobile ? "scale-75 origin-top-left" : "scale-90 lg:scale-100 origin-top-left"}>
          <Globe />
        </div>
      </div>

      {/* Sections */}
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
            className="relative z-20 flex w-full flex-col justify-center px-6 py-16 md:items-start md:px-14 lg:px-20"
            style={{ minHeight: index === 0 ? '88vh' : '72vh' }}
          >
            <div
              className={cn(
                "relative w-full max-w-3xl transition-all duration-700",
                textAlign,
                section.align === "center" && "mx-auto",
              )}
              dir={dir}
            >
              {section.badge && (
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {section.badge}
                </span>
              )}

              <h1
                className="mb-4 font-black leading-tight tracking-tight"
                style={{ fontSize: "clamp(28px, 3.2vw, 48px)" }}
              >
                <span className="block text-blue-900 whitespace-nowrap">
                  {section.title}
                </span>
                {section.subtitle && (
                  <span
                    className="mt-1 block font-semibold text-blue-500"
                    style={{ fontSize: "clamp(16px, 1.8vw, 26px)" }}
                  >
                    {section.subtitle}
                  </span>
                )}
              </h1>

              <div
                className={cn(
                  "mb-7 text-sm leading-7 text-blue-600 sm:text-base",
                  section.align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
                )}
              >
                <p>{section.description}</p>
                {index === 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-blue-400">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span>{dir === "rtl" ? "تجربة تفاعلية" : "Interactive Experience"}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      <span>{dir === "rtl" ? "مرر للاستكشاف" : "Scroll to Explore"}</span>
                    </div>
                  </div>
                )}
              </div>

              {section.features && (
                <div className="mb-8 grid gap-3">
                  {section.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="group rounded-xl border border-blue-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1 text-base font-bold text-blue-900 sm:text-lg">{feature.title}</h3>
                          <p className="text-sm leading-7 text-blue-600 sm:text-base">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.actions && (
                <div className={cn("flex flex-col gap-3 md:flex-row md:gap-4", actionAlign)}>
                  {section.actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={action.onClick}
                      className={cn(
                        "group relative w-full overflow-hidden rounded-xl px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-auto sm:px-8 sm:text-base",
                        action.variant === "primary"
                          ? "bg-blue-700 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-800"
                          : "border border-blue-200 bg-white text-blue-700 hover:border-blue-400 hover:bg-blue-50",
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
