"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    title: "Science & IP Supply",
    desc: "World-class research institutions and scientific founders driving breakthrough innovation.",
  },
  {
    title: "Market & Manufacturing",
    desc: "Large domestic demand with cost-competitive engineering and manufacturing capabilities.",
  },
  {
    title: "Strategic Autonomy",
    desc: "Urgent need for trusted, domestic technology supply in critical sectors.",
  },
  {
    title: "Resilience",
    desc: "Building robust, self-reliant tech ecosystems for national and global impact.",
  },
];

export default function WhyDeeptech() {
  const sectionRef = useRef(null);
  const tagRef     = useRef(null);
  const headingRef = useRef(null);
  const mapRef     = useRef(null);
  const cardRefs   = useRef([]);
  const dotRefs    = useRef([]);
  const lineRefs   = useRef([]);

  useEffect(() => {
    gsap.set(tagRef.current,     { autoAlpha: 0, y: 20 });
    gsap.set(headingRef.current, { autoAlpha: 0, y: 36 });
    gsap.set(mapRef.current,     { autoAlpha: 0, x: 60 });
    gsap.set(cardRefs.current.filter(Boolean), { autoAlpha: 0, x: -40 });
    gsap.set(dotRefs.current.filter(Boolean),  { autoAlpha: 0, scale: 0 });
    gsap.set(lineRefs.current.filter(Boolean), { scaleY: 0, transformOrigin: "top center" });

    const ctx = gsap.context(() => {
      const trigger   = { trigger: sectionRef.current, start: "top 72%" };
      const trigger65 = { trigger: sectionRef.current, start: "top 65%" };

      gsap.to(tagRef.current, {
        autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.to(headingRef.current, {
        autoAlpha: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power3.out",
        scrollTrigger: trigger,
      });

      // Each item: dot → line → card
      reasons.forEach((_, i) => {
        const base = 0.2 + i * 0.18;

        gsap.to(dotRefs.current[i], {
          autoAlpha: 1, scale: 1, duration: 0.4, delay: base,
          ease: "back.out(2)", scrollTrigger: trigger65,
        });

        if (lineRefs.current[i]) {
          gsap.to(lineRefs.current[i], {
            scaleY: 1, duration: 0.45, delay: base + 0.1,
            ease: "power2.out", scrollTrigger: trigger65,
          });
        }

        gsap.to(cardRefs.current[i], {
          autoAlpha: 1, x: 0, duration: 0.65, delay: base,
          ease: "power3.out", scrollTrigger: trigger65,
        });
      });

      // Map
      gsap.to(mapRef.current, {
        autoAlpha: 1, x: 0, duration: 1.1, delay: 0.2,
        ease: "power3.out", scrollTrigger: trigger65,
      });

      gsap.to(mapRef.current, {
        y: -12, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-deeptech"
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "#F5F5F0" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#086020 1px, transparent 1px), linear-gradient(90deg, #086020 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Tag */}
        <div ref={tagRef} className="flex justify-center mb-5">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(8,96,32,0.07)",
              color: "#086020",
              border: "1px solid rgba(8,96,32,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            The Opportunity
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl font-bold text-center mb-16 leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
        >
          Why{" "}
          <span
          className=""
            style={{
              background: "linear-gradient(135deg, #086020 0%, #22c55e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
            }}
          >
            Deep-Tech
          </span>
          , Why <span style={{ fontStyle: "italic" }}>Now</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: timeline ── */}
          <div className="relative">
            {reasons.map((reason, i) => (
              <div key={i} className="flex gap-5 relative">

                {/* Dot + line column */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Dot — bigger, with ring */}
                  <div
                    ref={(el) => (dotRefs.current[i] = el)}
                    className="relative flex-shrink-0 flex items-center justify-center"
                    style={{ width: 36, height: 36 }}
                  >
                    {/* Outer ring */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(8,96,32,0.12)" }}
                    />
                    {/* Inner dot */}
                    <div
                      className="w-4 h-4 rounded-full relative z-10"
                      style={{
                        background: "linear-gradient(135deg, #086020, #22c55e)",
                        boxShadow: "0 0 8px rgba(8,96,32,0.4)",
                      }}
                    />
                  </div>

                  {/* Connector line */}
                  {i < reasons.length - 1 && (
                    <div
                      className="w-[2px] rounded-full flex-1 min-h-[40px]"
                      style={{ background: "rgba(8,96,32,0.1)" }}
                    >
                      <div
                        ref={(el) => (lineRefs.current[i] = el)}
                        className="w-full h-full rounded-full"
                        style={{ background: "linear-gradient(180deg, #086020, #22c55e)" }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="pb-10 pt-1">
                  <h3
                    className="font-bold text-lg mb-1.5"
                    style={{ color: "#1A1A1A" }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {reason.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* ── RIGHT: India map with rounded corners ── */}
          <div
            ref={mapRef}
            className="relative flex items-center justify-center"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(9,131,39,0.12) 0%, transparent 70%)",
                filter: "blur(32px)",
              }}
            />
            <div className="rounded-2xl overflow-hidden">


            <img
              src="/india_map.png"
              alt="India Map – Deeptech Ecosystem"
              className="relative   z-10 w-full h-auto object-contain"
              style={{
                maxHeight: "480px",
                filter: "drop-shadow(0 20px 40px rgba(8,96,32,0.18))",
              }}
            />
          </div>
          
            </div>

        </div>
      </div>
    </section>
  );
}
