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
          <div className="wdt-map relative flex items-center justify-center">
            <div className="relative max-w-md mx-auto w-full">
              {/* Soft glow behind the map */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(9,131,39,0.15) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.1)",
                }}
              />
              <img
                src="/india_map.png"
                alt="India Map – Deeptech Ecosystem"
                className="relative z-10 w-full h-auto object-contain drop-shadow-xl"
                style={{ maxHeight: "480px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
