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
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const centerRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 72%" };

      gsap.from(".eco-heading", {
        y: 40, opacity: 0, duration: 0.9,
        ease: "power3.out", scrollTrigger: trigger,
      });

      gsap.from(centerRef.current, {
        scale: 0, opacity: 0, duration: 0.8, delay: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      // Pulse ring
      gsap.to(ringRef.current, {
        scale: 1.15, opacity: 0,
        duration: 2, ease: "power1.out",
        repeat: -1, repeatDelay: 0.5,
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scale: 0.85, opacity: 0, duration: 0.65,
          delay: 0.15 + i * 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        });
      });

      // Connector lines draw in
      gsap.from(".eco-line", {
        scaleX: 0, scaleY: 0, opacity: 0,
        duration: 0.6, delay: 0.5, stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="section-padding relative overflow-hidden"
      style={{ background: "#e9f5cf" }}
    >
      {/* Background texture blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(134,239,172,0.5) 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <h2
          className="eco-heading section-heading text-center mb-16"
          style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
        >
          <span
            className="inline-block mr-2 px-4 py-1 rounded-xl shadow-sm"
            style={{
              background: "white",
              border: "1.5px solid rgba(8,96,32,0.2)",
              transform: "rotate(-1.5deg)",
              display: "inline-block",
            }}
          >
            IIT Kanpur
          </span>
          <span className="gradient-text">Ecosystem</span>
        </h2>

        {/* Layout: 2-col cards with center badge between them */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_160px_1fr] gap-6 items-center">

          {/* LEFT cards */}
          <div className="flex flex-col gap-6">
            {quadrants.slice(0, 2).map((q, i) => (
              <EcoCard
                key={i}
                quadrant={q}
                cardRef={(el) => (cardRefs.current[i] = el)}
              />
            ))}
          </div>

          {/* CENTER badge */}
          <div className="flex items-center justify-center relative">
            {/* Pulse ring */}
            <div
              ref={ringRef}
              className="absolute w-32 h-32 rounded-full"
              style={{ border: "2px solid rgba(8,96,32,0.3)" }}
            />
            {/* Connector lines */}
            <div className="eco-line absolute left-0 right-0 h-[1.5px] -z-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(8,96,32,0.25), transparent)", top: "calc(50% - 60px)" }} />
            <div className="eco-line absolute left-0 right-0 h-[1.5px] -z-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(8,96,32,0.25), transparent)", top: "calc(50% + 60px)" }} />

            <div
              ref={centerRef}
              className="relative z-10 w-32 h-32 rounded-full bg-white flex items-center justify-center p-5 shadow-2xl"
              style={{ border: "2.5px solid #22c55e" }}
            >
              <img
                src="/IITK Logo.png"
                alt="IIT Kanpur"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* RIGHT cards */}
          <div className="flex flex-col gap-6">
            {quadrants.slice(2, 4).map((q, i) => (
              <EcoCard
                key={i + 2}
                quadrant={q}
                cardRef={(el) => (cardRefs.current[i + 2] = el)}
              />
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <p
          className="text-center mt-12 text-base font-medium"
          style={{ color: "#374151" }}
        >
          Backed by the full strength of{" "}
          <span className="font-bold" style={{ color: "#086020" }}>
            India's #1 technical institution
          </span>
        </p>
      </div>
    </section>
  );
}
