"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutUs() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    gsap.set(
      [tagRef.current, headingRef.current, descRef.current, imageRef.current],
      {
        autoAlpha: 0,
        y: 30,
      },
    );

    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 72%" };

      gsap.to(tagRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.to(descRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.to(imageRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-24 px-6"
      style={{
        background:
          "linear-gradient(150deg, #0f5c28 0%, #1a7a3a 50%, #0e4d22 100%)",
      }}
    >
      {/* Background texture dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 2px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(193,255,114,0.08) 0%, transparent 70%)",
          transform: "translate(20%, -20%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          transform: "translate(-25%, 25%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top tag */}
        <div ref={tagRef} className="flex justify-start mb-5">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(193,255,114,0.12)",
              color: "#c1ff72",
              border: "1px solid rgba(193,255,114,0.25)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c1ff72] animate-pulse" />
            Who We Are
          </span>
        </div>

        {/* Heading + desc: two-column on large */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 items-end">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl font-bold leading-[1.1] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built on Science.
            <br />
            <span style={{ color: "#c1ff72" }}>Backed by Conviction.</span>
          </h2>

          <div ref={descRef}>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
             <strong> Dhanavritti Ventures (DV) </strong> is an IIT Kanpur–anchored
              deep-tech investment platform focused on building
              globally competitive science-driven companies from
              India.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              DV combines <strong>scientific evaluation</strong> with <strong>commercial
              venture underwriting</strong> to identify technologies at the
              inflection point between research breakthrough and
              scalable commercialization.
            </p>
          </div>
        </div>

        {/* Pillar image */}
        <div
          ref={imageRef}
          className="relative w-full overflow-hidden rounded-3xl"
          style={{
            boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
            // start slightly scaled for the GSAP entrance
            transform: "scale(0.97)",
          }}
        >
          <img
            src="/About us/image.png"
            alt="Science-First Evaluation → Ecosystem Leverage → IIT Kanpur Access → Hands-on Scale Support"
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>
    </section>
  );
}
