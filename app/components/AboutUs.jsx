"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillarCard from "./about/PillarCard";
import { pillars } from "./about/aboutData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggerConfig = { trigger: sectionRef.current, start: "top 75%" };

      gsap.from(".about-heading", {
        y: 40, opacity: 0, duration: 0.9,
        ease: "power3.out", scrollTrigger: triggerConfig,
      });

      gsap.from(".about-desc", {
        y: 25, opacity: 0, duration: 0.8, delay: 0.15,
        ease: "power3.out", scrollTrigger: triggerConfig,
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 50, opacity: 0, scale: 0.93,
          duration: 0.65, delay: 0.25 + i * 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        });
      });

      arrowRefs.current.forEach((arrow, i) => {
        if (!arrow) return;
        gsap.from(arrow, {
          scaleX: 0, opacity: 0,
          duration: 0.4, delay: 0.55 + i * 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #2d8a4e 0%, #1e7a3e 45%, #27964a 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white, transparent 70%)", transform: "translate(25%, -25%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white, transparent 70%)", transform: "translate(-25%, 25%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="about-heading section-heading text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          About Us
        </h2>

        <div className="about-desc max-w-3xl mb-14">
          <p className="text-white/90 text-lg leading-relaxed">
            Dhanavritti Ventures (DV) is a{" "}
            <span className="font-semibold italic" style={{ color: "#d4f5a0" }}>
              deep-tech investment and venture support
            </span>{" "}
            initiative focused on backing science-driven startups built on strong
            intellectual property. We combine technical diligence with commercial
            insight to support founders building globally competitive technologies
            from India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard
              key={i}
              pillar={pillar}
              cardRef={(el) => (cardsRef.current[i] = el)}
              arrowRef={(el) => (arrowRefs.current[i] = el)}
              isLast={i === pillars.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
