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

// 3× repeat so Embla always has enough slides for true infinite loop
const slides = [...focusAreas, ...focusAreas, ...focusAreas];
const TOTAL = focusAreas.length;

export default function FocusAreas() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(TOTAL); // start in middle set

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    containScroll: false,
    startIndex: TOTAL,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

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

  // Only the exact selected slide is in focus
  const isCenter = (i) => i % TOTAL === selectedIndex % TOTAL;

  const ArrowBtn = ({ onClick, label, children }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-10"
      style={{
        background: "linear-gradient(135deg, #22c55e, #086020)",
        boxShadow: "0 4px 18px rgba(8,96,32,0.35)",
        color: "white",
      }}
    >
      {children}
    </button>
  );

  return (
    <section
      ref={sectionRef}
      id="focus-areas"
      className="relative overflow-hidden py-24"
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
        className="flex items-center gap-4 px-6"
        style={{ minHeight: "480px" }}
      >
        <ArrowBtn onClick={scrollPrev} label="Previous">
          <ChevronLeft size={22} strokeWidth={2.5} />
        </ArrowBtn>

        {/* Embla viewport */}
        <div ref={emblaRef} className="overflow-hidden flex-1">
          <div
            className="flex items-center"
            style={{ paddingTop: "52px", paddingBottom: "52px" }}
          >
            {slides.map((area, i) => {
              const center = isCenter(i);
              return (
                <div
                  key={i}
                  className="flex-shrink-0 flex justify-center"
                  style={{
                    // All slides same fixed width — critical for Embla loop
                    flexBasis: "300px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                  onClick={() => {
                    if (!center) emblaApi?.scrollTo(i);
                  }}
                >
                  <div
                    className="w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      transform: center ? "scale(1.12)" : "scale(0.85)",
                      opacity: center ? 1 : 0.5,
                      filter: center ? "blur(0px)" : "blur(0.5px)",
                      cursor: center ? "default" : "pointer",
                    }}
                  >
                    <FocusCard area={area} isCenter={center} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ArrowBtn onClick={scrollNext} label="Next">
          <ChevronRight size={22} strokeWidth={2.5} />
        </ArrowBtn>
      </div>
    </section>
  );
}
