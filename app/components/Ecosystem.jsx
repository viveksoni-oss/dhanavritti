"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EcoCard from "./ecosystem/EcoCard";
import { quadrants } from "./ecosystem/ecosystemData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Ecosystem() {
  const sectionRef  = useRef(null);
  const cardRefs    = useRef([]);
  const centerRef   = useRef(null);
  const ringRef     = useRef(null);
  const headingRef  = useRef(null);

  useEffect(() => {
    gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
    gsap.set(centerRef.current, { autoAlpha: 0, scale: 0 });
    gsap.set(cardRefs.current.filter(Boolean), { autoAlpha: 0, scale: 0.9 });

    const ctx = gsap.context(() => {
      const trigger   = { trigger: sectionRef.current, start: "top 72%" };
      const trigger65 = { trigger: sectionRef.current, start: "top 65%" };

      gsap.to(headingRef.current, {
        autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.to(centerRef.current, {
        autoAlpha: 1, scale: 1, duration: 0.8, delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: trigger65,
      });

      gsap.to(cardRefs.current.filter(Boolean), {
        autoAlpha: 1, scale: 1, duration: 0.65, stagger: 0.1, delay: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: trigger65,
      });

      // Pulse ring loop
      gsap.to(ringRef.current, {
        scale: 1.2, opacity: 0, duration: 2,
        ease: "power1.out", repeat: -1, repeatDelay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "#f0f7e0" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(134,239,172,0.5) 0%, transparent 70%)",
            transform: "translate(20%,-20%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)",
            transform: "translate(-20%,20%)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(8,96,32,0.08)",
              color: "#086020",
              border: "1px solid rgba(8,96,32,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            India's #1 Technical Institution
          </span>

          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
          >
            IIT Kanpur{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #086020 0%, #22c55e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ecosystem
            </span>
          </h2>
        </div>

        {/* 2×2 grid with IITK center */}
        <div className="relative">

          {/* 2×2 card grid */}
          <div className="grid grid-cols-2 gap-4">
            {quadrants.map((q, i) => (
              <EcoCard
                key={q.id}
                quadrant={q}
                position={i < 2 ? "top" : "bottom"}
                cardRef={(el) => (cardRefs.current[i] = el)}
              />
            ))}
          </div>

          {/* IITK center badge — absolutely over the grid intersection */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            {/* Pulse ring */}
            <div
              ref={ringRef}
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(8,96,32,0.35)" }}
            />
            {/* Circle */}
            <div
              ref={centerRef}
              className="w-36 h-36 rounded-full bg-white flex items-center justify-center p-4 shadow-2xl"
              style={{ border: "3px solid #22c55e" }}
            >
              <img
                src="/Icons/IITK Logo.png"
                alt="IIT Kanpur"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>

        {/* Bottom tagline */}
        <p className="text-center mt-10 text-sm font-medium" style={{ color: "#374151" }}>
          Backed by the full strength of{" "}
          <span className="font-bold" style={{ color: "#086020" }}>
            India&apos;s #1 technical institution
          </span>
        </p>

      </div>
    </section>
  );
}
