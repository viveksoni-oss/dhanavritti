"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MentorCard from "./mentors/MentorCard";
import { mentors } from "./mentors/mentorsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Mentors() {
  const sectionRef = useRef(null);
  const overlayTextRef = useRef(null);
  const cardsWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overlay text fades in from below
      gsap.from(overlayTextRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Cards slide up staggered
      gsap.from(cardsWrapRef.current.children, {
        y: 80,
        opacity: 0,
        duration: 0.85,
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
      id="mentors"
      className="relative overflow-hidden"
      style={{ background: "#F0F0EB", minHeight: "520px" }}
    >
      {/* ── Cards strip ── */}
      <div
        ref={cardsWrapRef}
        className="flex items-end justify-center gap-4 px-8 pt-16 pb-0"
        style={{ minHeight: "420px" }}
      >
        {mentors.map((mentor, i) => (
          <MentorCard key={i} mentor={mentor} />
        ))}
      </div>

      {/* ── Overlay text centred on top of cards ── */}
      <div
        ref={overlayTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ paddingBottom: "60px" }}
      >
        <h2
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center leading-tight drop-shadow-2xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "white",
            textShadow: "0 4px 32px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          Deep Tech Leadership
          <br />
          Think Tank
        </h2>
        <p
          className="mt-4 text-2xl sm:text-3xl font-semibold italic drop-shadow-xl"
          style={{
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          (DTLTT)
        </p>
      </div>

      {/* ── Bottom name strip ── */}
      <div
        className="relative z-10 flex items-center justify-center gap-4 px-8 py-5 flex-wrap"
        style={{ background: "rgba(8,96,32,0.06)", borderTop: "1px solid rgba(8,96,32,0.1)" }}
      >
        {mentors.map((mentor, i) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(8,96,32,0.12)" }}
          >
            <span className="text-xs font-bold" style={{ color: "#086020" }}>{mentor.name}</span>
            <span className="text-[10px] text-gray-400">·</span>
            <span className="text-[10px] text-gray-500">{mentor.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
