"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const quadrants = [
  {
    title: "Research Infrastructure",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="6" y="8" width="28" height="20" rx="2" stroke="#098327" strokeWidth="1.5" />
        <path d="M6 14h28" stroke="#098327" strokeWidth="1.5" />
        <circle cx="20" cy="22" r="3" stroke="#098327" strokeWidth="1.5" />
        <path d="M14 32h12" stroke="#098327" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    items: [
      "25+ advanced research centres",
      "National Cybersecurity Hub (C3iHub)",
      "National Drone Hub",
    ],
    position: "top-left",
  },
  {
    title: "Dhanavritti",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="14" stroke="#098327" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#098327" fontSize="14" fontWeight="bold">₹</text>
      </svg>
    ),
    items: [
      "Part of IITK ecosystem",
      "Preferred ecosystem access",
    ],
    position: "top-right",
  },
  {
    title: "Mentors & Alumni Network",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="14" r="5" stroke="#098327" strokeWidth="1.5" />
        <circle cx="10" cy="26" r="4" stroke="#098327" strokeWidth="1.5" />
        <circle cx="30" cy="26" r="4" stroke="#098327" strokeWidth="1.5" />
        <path d="M15 18l-3 5M25 18l3 5" stroke="#098327" strokeWidth="1" />
      </svg>
    ),
    items: [
      "45K+ global alumni network",
      "Access to professors & PhDs",
      "IITK unicorn founders (~20%)",
    ],
    position: "bottom-left",
  },
  {
    title: "Incubator",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M12 32V18l8-10 8 10v14H12z" stroke="#098327" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="17" y="24" width="6" height="8" stroke="#098327" strokeWidth="1.5" />
        <circle cx="20" cy="17" r="2" stroke="#098327" strokeWidth="1.5" />
      </svg>
    ),
    items: [
      "500+ startups nurtured",
      "Grant support available",
      "MOUs with DRDO, BEL, HAL",
    ],
    position: "bottom-right",
  },
];

export default function Ecosystem() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".eco-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Center badge
      gsap.from(".eco-center", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      // Quadrant cards
      gsap.from(".eco-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      // Connector dots
      gsap.from(".eco-dot", {
        scale: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.6,
        ease: "back.out(2)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="section-padding"
      style={{ background: "#e9f5cf" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="eco-heading section-heading text-center mb-20"
          style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
        >
          <span className="bg-white px-4 py-1 rounded-lg border border-green-primary/20 shadow-sm inline-block rotate-[-2deg] mr-2">IIT Kanpur</span> 
          <span className="gradient-text">Ecosystem</span>
        </h2>

        {/* Grid with center badge */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center badge */}
          <div className="eco-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-36 h-36 rounded-full bg-white shadow-2xl flex items-center justify-center p-6"
            style={{ border: "2px solid #098327" }}
          >
            <img 
              src="/IITK Logo.png" 
              alt="IIT Kanpur" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Ring around center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full z-10"
            style={{ border: "2px solid rgba(9, 131, 39, 0.2)" }}
          />

          {/* Connector dots */}
          {["top-1/2 left-[calc(50%-72px)] -translate-y-1/2",
            "top-1/2 left-[calc(50%+64px)] -translate-y-1/2",
            "top-[calc(50%-64px)] left-1/2 -translate-x-1/2",
            "top-[calc(50%+56px)] left-1/2 -translate-x-1/2",
          ].map((pos, i) => (
            <div
              key={i}
              className={`eco-dot absolute ${pos} w-3 h-3 rounded-full z-20`}
              style={{ background: "#098327" }}
            />
          ))}

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quadrants.map((q, i) => (
              <div
                key={i}
                className="eco-card glass-card p-6"
                style={{
                  minHeight: "200px",
                  border: "1px solid rgba(9, 131, 39, 0.12)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(9, 131, 39, 0.08)" }}
                  >
                    {q.icon}
                  </div>
                  <h3
                    className="font-bold text-sm uppercase tracking-wider"
                    style={{ color: "#086020" }}
                  >
                    {q.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {q.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-charcoal">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-primary mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
