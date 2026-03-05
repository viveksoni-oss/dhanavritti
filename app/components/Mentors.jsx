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
  const headingRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const bottomTextRef = useRef(null);

  useEffect(() => {
    gsap.set([headingRef.current, bottomTextRef.current], {
      autoAlpha: 0,
      y: 40,
    });
    gsap.set(cardsWrapRef.current?.children ?? [], { autoAlpha: 0, y: 60 });

    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      gsap.to(cardsWrapRef.current?.children ?? [], {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      gsap.to(bottomTextRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: bottomTextRef.current, start: "top 90%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mentors"
      className="relative overflow-hidden"
      style={{ background: "#F0F0EB" }}
    >
      {/* ── Cards strip — no gap, flush together ── */}
      <div className="relative">
        <div
          ref={cardsWrapRef}
          className="flex items-end justify-center"
          style={{ gap: "2px" }} // almost flush
        >
          {mentors.map((mentor, i) => (
            <MentorCard key={i} mentor={mentor} />
          ))}
        </div>

        {/* ── Heading overlay — centred on cards ── */}
        <div
          ref={headingRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "white",
              textShadow:
                "0 4px 40px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Deep Tech Leadership
            <br />
            Think Tank
          </h2>
          <p
            className="mt-3 text-2xl font-semibold italic"
            style={{
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            (DTLTT)
          </p>
        </div>
      </div>

      {/* ── Bottom description text ── */}
      <div
        ref={bottomTextRef}
        className="max-w-4xl mx-auto px-8 py-12 text-center"
      >
        <p
          className="text-base sm:text-lg leading-relaxed font-medium"
          style={{ color: "#086020" }}
        >
          DTLTT is a national strategic council founded by FIRST–IIT Kanpur that
          provides independent, high-credibility guidance to align industry,
          government, and academia on long-term deep-tech strategy and to
          accelerate the translation of research into scalable national
          outcomes.
        </p>
      </div>
    </section>
  );
}
