"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FocusCard from "./focusareas/FocusCard";
import { focusAreas } from "./focusareas/focusData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Build an infinite looped array: clone last 2 + original + clone first 2
const VISIBLE = 4;
const buildLoop = (items) => [
  ...items.slice(-2).map((item) => ({ ...item, _key: `pre-${item.title}` })),
  ...items.map((item) => ({ ...item, _key: item.title })),
  ...items.slice(0, 2).map((item) => ({ ...item, _key: `post-${item.title}` })),
];

export default function FocusAreas() {
  const sectionRef = useRef(null);
  const OFFSET = 2; // number of prepended clones
  // activeIndex points to the REAL first visible card in the looped array
  const [activeIndex, setActiveIndex] = useState(OFFSET);
  const [animating, setAnimating] = useState(false);
  const looped = buildLoop(focusAreas);
  const total = focusAreas.length;

  // The two center positions in the 4-visible window are index 1 and 2
  const isCenterPosition = (pos) => pos === 1 || pos === 2;

  const slide = useCallback(
    (dir) => {
      if (animating) return;
      setAnimating(true);
      setActiveIndex((prev) => prev + dir);
      setTimeout(() => setAnimating(false), 450);
    },
    [animating]
  );

  // Loop jump: when we reach clone territory, silently reset to real item
  useEffect(() => {
    // Jumped into pre-clones
    if (activeIndex < OFFSET) {
      setTimeout(() => {
        setActiveIndex(OFFSET + total - (OFFSET - activeIndex));
      }, 450);
    }
    // Jumped into post-clones
    if (activeIndex > OFFSET + total - 1) {
      setTimeout(() => {
        setActiveIndex(OFFSET + (activeIndex - (OFFSET + total)));
      }, 450);
    }
  }, [activeIndex, total]);

  // The 4 cards to render
  const visibleItems = looped.slice(activeIndex - 1, activeIndex + VISIBLE - 1);

  // Real index for dot indicators (0-based within original array)
  const realActive = ((activeIndex - OFFSET) % total + total) % total;

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fa-heading", {
        y: 40, opacity: 0, duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".focus-card-wrap", {
        y: 60, opacity: 0, duration: 0.6,
        stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") slide(-1);
      if (e.key === "ArrowRight") slide(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slide]);

  return (
    <section
      ref={sectionRef}
      id="focus-areas"
      className="section-padding overflow-hidden"
      style={{ background: "#F5F5F0" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <h2
            className="fa-heading section-heading"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Focus Areas
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => slide(-1)}
              className="w-11 h-11 rounded-full border-2 border-green-700 text-green-700 flex items-center justify-center hover:bg-green-700 hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => slide(1)}
              className="w-11 h-11 rounded-full border-2 border-green-700 text-green-700 flex items-center justify-center hover:bg-green-700 hover:text-white transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* 4-card track */}
        <div
          className="flex items-center justify-center gap-5"
          style={{ minHeight: "420px" }}
        >
          {visibleItems.map((area, pos) => {
            const center = isCenterPosition(pos);
            return (
              <div
                key={area._key}
                className="focus-card-wrap transition-all duration-450 ease-out"
                style={{
                  opacity: center ? 1 : 0.5,
                  transform: center ? "scale(1)" : "scale(0.85)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
              >
                <FocusCard area={area} isCenter={center} />
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {focusAreas.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(OFFSET + i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === realActive || i === (realActive + 1) % total ? "24px" : "8px",
                height: "8px",
                background:
                  i === realActive || i === (realActive + 1) % total
                    ? "#16a34a"
                    : "#d1d5db",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
