"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M16 24l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="14" r="3" stroke="white" strokeWidth="1.5" />
        <path d="M14 34h20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Science First Evaluation",
    desc: "Rigorous technical due diligence led by domain experts",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="16" r="4" stroke="white" strokeWidth="1.5" />
        <circle cx="14" cy="28" r="3" stroke="white" strokeWidth="1.5" />
        <circle cx="34" cy="28" r="3" stroke="white" strokeWidth="1.5" />
        <circle cx="24" cy="36" r="3" stroke="white" strokeWidth="1.5" />
        <line x1="24" y1="20" x2="14" y2="25" stroke="white" strokeWidth="1" />
        <line x1="24" y1="20" x2="34" y2="25" stroke="white" strokeWidth="1" />
        <line x1="14" y1="31" x2="24" y2="33" stroke="white" strokeWidth="1" />
        <line x1="34" y1="31" x2="24" y2="33" stroke="white" strokeWidth="1" />
      </svg>
    ),
    title: "Ecosystem Leverage",
    desc: "Deep institutional and industry connections for scale",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="2" fill="white" />
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
    title: "IIT Kanpur Access",
    desc: "Preferred access to world-class research infrastructure",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M16 36l4-8 4 4 4-12 4 8 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 40h24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="14" r="4" stroke="white" strokeWidth="1.5" />
        <path d="M34 14l4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Hands-on Scale Support",
    desc: "Active involvement in go-to-market and operational growth",
  },
];

export default function AboutUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".about-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Description
      gsap.from(".about-desc", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Stagger cards
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          delay: 0.3 + i * 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      });

      // Arrow animations
      arrowRefs.current.forEach((arrow, i) => {
        if (arrow) {
          gsap.from(arrow, {
            scaleX: 0,
            opacity: 0,
            duration: 0.5,
            delay: 0.6 + i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #086020 0%, #065a1c 50%, #098327 100%)" }}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, white, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, white, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <h2
          className="about-heading section-heading text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          About Us
        </h2>

        {/* Description */}
        <div className="about-desc max-w-3xl mb-16">
          <p className="text-white/90 text-lg leading-relaxed">
            Dhanavritti Ventures (DV) is a{" "}
            <span className="text-green-light font-semibold italic">
              deep-tech investment and venture support
            </span>{" "}
            initiative focused on backing science-driven startups built on strong
            intellectual property. We combine technical diligence with commercial
            insight to support founders building globally competitive technologies
            from India.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {pillars.map((pillar, i) => (
            <div key={i} className="relative flex items-stretch">
              {/* Card */}
              <div
                ref={(el) => (cardsRef.current[i] = el)}
                className="glass-card-dark p-6 flex flex-col items-center text-center gap-4 flex-1"
                style={{
                  border: "1px solid rgba(233, 245, 207, 0.25)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(233, 245, 207, 0.12)",
                    border: "1px solid rgba(233, 245, 207, 0.2)",
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-white font-semibold text-base">{pillar.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{pillar.desc}</p>
              </div>

              {/* Arrow connector (hidden on last card, hidden on mobile) */}
              {i < pillars.length - 1 && (
                <div
                  ref={(el) => (arrowRefs.current[i] = el)}
                  className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 z-10 items-center"
                  style={{ transformOrigin: "left center" }}
                >
                  <div className="w-full h-0.5" style={{ background: "rgba(233, 245, 207, 0.4)" }} />
                  <div
                    className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] flex-shrink-0"
                    style={{ borderLeftColor: "rgba(233, 245, 207, 0.4)" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
