"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const focusAreas = [
  {
    title: "Semiconductor & Fabless Chip Design",
    desc: "Next-gen chip architectures for AI, IoT, and edge computing",
    gradient: "linear-gradient(135deg, #086020, #098327)",
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="18" y="18" width="28" height="28" rx="4" fill="none" stroke="white" strokeWidth="2" />
        <rect x="24" y="24" width="16" height="16" rx="2" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1" />
        <path d="M18 28H12M18 36H12M46 28h6M46 36h6M28 18V12M36 18V12M28 46v6M36 46v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI and ML",
    desc: "Deep learning, NLP, computer vision, and intelligent automation",
    gradient: "linear-gradient(135deg, #098327, #0a9d30)",
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <circle cx="32" cy="32" r="18" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="6" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" />
        <path d="M32 14v10M32 40v10M14 32h10M40 32h10" stroke="white" strokeWidth="1" />
        <circle cx="24" cy="20" r="2" fill="white" opacity="0.6" />
        <circle cx="40" cy="20" r="2" fill="white" opacity="0.6" />
        <circle cx="24" cy="44" r="2" fill="white" opacity="0.6" />
        <circle cx="40" cy="44" r="2" fill="white" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Battery Technology & Energy Storage",
    desc: "Solid-state batteries, fuel cells, and grid-scale energy solutions",
    gradient: "linear-gradient(135deg, #065a1c, #098327)",
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <rect x="16" y="20" width="28" height="24" rx="4" fill="none" stroke="white" strokeWidth="2" />
        <rect x="44" y="28" width="4" height="8" rx="1" fill="white" opacity="0.5" />
        <path d="M28 28v8M32 32h-8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <rect x="20" y="24" width="20" height="16" rx="2" fill="rgba(255,255,255,0.08)" />
      </svg>
    ),
  },
  {
    title: "Cybersecurity",
    desc: "Zero-trust architectures, quantum-safe cryptography, and threat intelligence",
    gradient: "linear-gradient(135deg, #098327, #086020)",
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <path d="M32 8L12 18v14c0 14 8.5 22 20 28 11.5-6 20-14 20-28V18L32 8z" fill="none" stroke="white" strokeWidth="2" />
        <path d="M26 32l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Quantum Computing",
    desc: "Quantum processors, error correction, and quantum-safe applications",
    gradient: "linear-gradient(135deg, #0a9d30, #086020)",
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <circle cx="32" cy="32" r="6" fill="white" opacity="0.3" stroke="white" strokeWidth="1.5" />
        <ellipse cx="32" cy="32" rx="20" ry="10" fill="none" stroke="white" strokeWidth="1" transform="rotate(0 32 32)" />
        <ellipse cx="32" cy="32" rx="20" ry="10" fill="none" stroke="white" strokeWidth="1" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="20" ry="10" fill="none" stroke="white" strokeWidth="1" transform="rotate(120 32 32)" />
      </svg>
    ),
  },
  {
    title: "Advanced Materials",
    desc: "Metamaterials, composites, and nano-engineered surfaces for defense & space",
    gradient: "linear-gradient(135deg, #086020, #0a9d30)",
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16">
        <polygon points="32,12 52,28 46,50 18,50 12,28" fill="none" stroke="white" strokeWidth="1.5" />
        <polygon points="32,20 44,30 40,44 24,44 20,30" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1" />
        <circle cx="32" cy="34" r="3" fill="white" opacity="0.4" />
      </svg>
    ),
  },
];

export default function FocusAreas() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fa-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(".focus-card", {
        x: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="focus-areas"
      className="section-padding overflow-hidden"
      style={{ background: "#F5F5F0" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2
            className="fa-heading section-heading"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Focus Areas
          </h2>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll(-1)}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? "border-green-primary text-green-primary hover:bg-green-primary hover:text-white"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
              disabled={!canScrollLeft}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? "border-green-primary text-green-primary hover:bg-green-primary hover:text-white"
                  : "border-gray-300 text-gray-300 cursor-not-allowed"
              }`}
              disabled={!canScrollRight}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {focusAreas.map((area, i) => (
            <div
              key={i}
              className="focus-card snap-start rounded-2xl overflow-hidden shadow-lg group"
              style={{
                minWidth: "280px",
                maxWidth: "300px",
                height: "380px",
                flex: "0 0 auto",
              }}
            >
              {/* Card background gradient */}
              <div
                className="relative w-full h-full flex flex-col justify-between p-6"
                style={{ background: area.gradient }}
              >
                {/* Icon */}
                <div className="flex-1 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  {area.icon}
                </div>

                {/* Bottom gradient fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-2/5"
                  style={{
                    background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 100%)",
                  }}
                />

                {/* Text */}
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                    {area.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
