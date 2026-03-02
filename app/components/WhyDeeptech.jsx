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
    desc: "World-class research institutions and scientific founders driving breakthrough innovation",
  },
  {
    title: "Market & Manufacturing",
    desc: "Large domestic demand with cost-competitive engineering and manufacturing capabilities",
  },
  {
    title: "Strategic Autonomy",
    desc: "Urgent need for trusted, domestic technology supply in critical sectors",
  },
  {
    title: "Resilience",
    desc: "Building robust, self-reliant tech ecosystems for national and global impact",
  },
];

export default function WhyDeeptech() {
  const sectionRef = useRef(null);
  const dotsRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wdt-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Timeline items
      reasons.forEach((_, i) => {
        gsap.from(`.wdt-item-${i}`, {
          x: -40,
          opacity: 0,
          duration: 0.7,
          delay: 0.2 + i * 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        });

        // Dot pulse
        if (dotsRef.current[i]) {
          gsap.from(dotsRef.current[i], {
            scale: 0,
            duration: 0.4,
            delay: 0.3 + i * 0.18,
            ease: "back.out(2)",
            scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          });
        }

        // Line draw
        if (linesRef.current[i]) {
          gsap.from(linesRef.current[i], {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.5,
            delay: 0.4 + i * 0.18,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          });
        }
      });

      // India map image
      gsap.from(".wdt-map", {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-deeptech"
      className="section-padding"
      style={{ background: "#F5F5F0" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="wdt-heading section-heading text-center mb-16"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Why <span className="gradient-text italic">Deeptech</span>, Why{" "}
          <span className="italic">Now</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Timeline */}
          <div className="relative">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className={`wdt-item-${i} flex gap-5 relative`}
                style={{ marginBottom: i < reasons.length - 1 ? "0" : "0" }}
              >
                {/* Dot + Line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    ref={(el) => (dotsRef.current[i] = el)}
                    className="timeline-dot flex-shrink-0"
                  />
                  {i < reasons.length - 1 && (
                    <div
                      ref={(el) => (linesRef.current[i] = el)}
                      className="timeline-line flex-1 min-h-[50px]"
                      style={{ opacity: 0.5 }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <h3 className="font-bold text-lg text-charcoal mb-1">{reason.title}</h3>
                  <p className="text-gray-muted text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* India Map Visual */}
          <div className="wdt-map relative">
            <div
              className="rounded-2xl overflow-hidden aspect-square max-w-md mx-auto shadow-xl"
              style={{
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a2a1a 100%)",
              }}
            >
              {/* Stylized India map with tech overlay */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute w-full"
                      style={{
                        top: `${(i / 12) * 100}%`,
                        height: "1px",
                        background: "#098327",
                      }}
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute h-full"
                      style={{
                        left: `${(i / 12) * 100}%`,
                        width: "1px",
                        background: "#098327",
                      }}
                    />
                  ))}
                </div>

                {/* India outline (simplified SVG) */}
                <svg viewBox="0 0 200 250" className="w-full h-full max-w-[200px] relative z-10">
                  <path
                    d="M100 20 L115 25 L130 35 L140 50 L145 65 L155 80 L160 95 L165 110 L170 130 L165 150 L155 165 L140 178 L125 190 L110 200 L100 210 L95 220 L90 230 L85 225 L80 210 L70 195 L60 180 L50 165 L45 150 L40 135 L38 120 L40 105 L45 90 L55 75 L65 60 L75 45 L85 33 L95 25 Z"
                    fill="none"
                    stroke="#098327"
                    strokeWidth="1.5"
                    className="drop-shadow-lg"
                  />
                  <path
                    d="M100 20 L115 25 L130 35 L140 50 L145 65 L155 80 L160 95 L165 110 L170 130 L165 150 L155 165 L140 178 L125 190 L110 200 L100 210 L95 220 L90 230 L85 225 L80 210 L70 195 L60 180 L50 165 L45 150 L40 135 L38 120 L40 105 L45 90 L55 75 L65 60 L75 45 L85 33 L95 25 Z"
                    fill="url(#indiaGrad)"
                    opacity="0.3"
                  />
                  <defs>
                    <radialGradient id="indiaGrad" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#098327" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Glowing dots for tech hubs */}
                  {[
                    { cx: 100, cy: 80 },
                    { cx: 75, cy: 120 },
                    { cx: 120, cy: 100 },
                    { cx: 90, cy: 160 },
                    { cx: 130, cy: 140 },
                  ].map((dot, i) => (
                    <g key={i}>
                      <circle cx={dot.cx} cy={dot.cy} r="4" fill="#22d3ee" opacity="0.8" />
                      <circle cx={dot.cx} cy={dot.cy} r="8" fill="#22d3ee" opacity="0.2" />
                    </g>
                  ))}
                </svg>

                {/* Glow effect */}
                <div
                  className="absolute w-32 h-32 rounded-full"
                  style={{
                    top: "40%",
                    left: "45%",
                    background: "radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
