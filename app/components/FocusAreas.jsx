"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import FocusCard from "./focusareas/FocusCard";
import { focusAreas } from "./focusareas/focusData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slides = [...focusAreas, ...focusAreas, ...focusAreas];
const TOTAL = focusAreas.length;

export default function FocusAreas() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(TOTAL);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    startIndex: TOTAL,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Track selected index
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  // Scroll-triggered fade-in
  useEffect(() => {
    gsap.set([headingRef.current, trackRef.current], { autoAlpha: 0, y: 30 });
    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.to(trackRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // A slide is "focused" if it's the selected or the one right after
  const isFocused = (i) => {
    const mod = i % TOTAL;
    return mod === selectedIndex % TOTAL || mod === (selectedIndex + 1) % TOTAL;
  };

  // First of the focused pair nudges left, second nudges right → gap between them
  const isFirst = (i) => i % TOTAL === selectedIndex % TOTAL;

  return (
    <section
      ref={sectionRef}
      id="focus-areas"
      className="relative py-24"
      style={{ background: "#F5F5F0" }}
    >
      <h2
        ref={headingRef}
        className="text-center text-4xl sm:text-5xl font-bold mb-14"
        style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
      >
        Focus Areas
      </h2>

      <div
        ref={trackRef}
        className="flex items-center"
        style={{ minHeight: "480px" }}
      >
        {/* Left Arrow */}
        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                     transition-all duration-300 hover:scale-110 active:scale-95 z-10 mx-3"
          style={{
            background: "linear-gradient(135deg, #22c55e, #086020)",
            boxShadow: "0 4px 18px rgba(8,96,32,0.35)",
            color: "white",
          }}
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden mx-12 flex-1">
          <div className="flex items-center py-14">
            {slides.map((area, i) => {
              const focused = isFocused(i);
              const first = isFirst(i);

              return (
                <div
                  key={i}
                  className="flex-shrink-0 flex justify-center
                             w-full sm:w-1/2 md:w-1/4" // ✅ 1 on mobile, 2 on sm, 4 on md+
                  style={{
                    padding: "0 8px",
                  }}
                  onClick={() => !focused && emblaApi?.scrollTo(i)}
                >
                  <div
                    className="w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      // focused pair: scale up + nudge apart for gap
                      transform: focused
                        ? `scale(1.08) translateX(${first ? "-10px" : "10px"})`
                        : "scale(0.84)",
                      opacity: focused ? 1 : 0.45,
                      filter: focused ? "none" : "blur(0.6px)",
                      cursor: focused ? "default" : "pointer",
                    }}
                  >
                    <FocusCard area={area} isCenter={focused} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                     transition-all duration-300 hover:scale-110 active:scale-95 z-10 mx-3"
          style={{
            background: "linear-gradient(135deg, #22c55e, #086020)",
            boxShadow: "0 4px 18px rgba(8,96,32,0.35)",
            color: "white",
          }}
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}
