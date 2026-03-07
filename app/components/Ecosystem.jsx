"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Ecosystem() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.set(headingRef.current, { autoAlpha: 0, y: 30 });
    gsap.set(imgRef.current, { autoAlpha: 0, y: 40 });

    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.to(imgRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
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
            className="italic pr-2"
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

        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/ecosystem/image.png"
          alt="IIT Kanpur Ecosystem"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
