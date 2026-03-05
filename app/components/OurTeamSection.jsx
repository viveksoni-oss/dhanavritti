"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers} from "./team/teamData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── LinkedIn SVG ──────────────────────────────────── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ── Single Team Card ──────────────────────────────── */
function TeamCard({ member }) {
  return (
    <div className="relative flex flex-col" style={{ paddingTop: "90px" }}>

      {/* ── Floating photo (pops out above card) ── */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{ top: 0 }}>
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "radial-gradient(circle, rgba(9,131,39,0.35) 0%, transparent 70%)",
            filter: "blur(12px)",
            transform: "scale(1.15)",
          }}
        />
        {/* Photo frame */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: "130px",
            height: "155px",
            border: "3px solid #ffffff",
            boxShadow: "0 12px 40px rgba(8,96,32,0.25), 0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle green shimmer at bottom of photo */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
            style={{
              background: "linear-gradient(0deg, rgba(8,96,32,0.5) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* ── Card body ── */}
      <div
        className="group relative flex flex-col rounded-3xl overflow-hidden flex-1 cursor-pointer transition-all duration-500"
        style={{
          background: "linear-gradient(175deg, #ffffff 0%, #f4faf4 60%, #eaf4ea 100%)",
          border: "1.5px solid rgba(8,96,32,0.12)",
          boxShadow: "0 2px 20px rgba(8,96,32,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 20px 60px rgba(8,96,32,0.18), 0 4px 16px rgba(0,0,0,0.08)";
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = "rgba(8,96,32,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 20px rgba(8,96,32,0.06), 0 1px 4px rgba(0,0,0,0.04)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(8,96,32,0.12)";
        }}
      >
        {/* Top green gradient bar */}
        <div
          className="h-1.5 w-full flex-shrink-0"
          style={{
            background: "linear-gradient(90deg, #086020 0%, #22c55e 50%, #086020 100%)",
          }}
        />

        {/* Decorative background pattern */}
        <div
          className="absolute top-0 right-0 w-40 h-40 pointer-events-none opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #086020 0%, transparent 70%)",
            transform: "translate(30%, -20%)",
          }}
        />

        <div className="px-6 pt-14 pb-6 flex flex-col gap-4 flex-1 relative z-10">

          {/* ── Name block ── */}
          <div className="text-center">
            <h3
              className="font-bold text-[15px] leading-snug"
              style={{ color: "#1A1A1A", fontFamily: "var(--font-display)" }}
            >
              {member.name}
            </h3>
            <p
              className="text-[11px] font-semibold mt-1 uppercase tracking-widest"
              style={{ color: "#086020" }}
            >
              {member.role}
            </p>
            <span
              className="inline-block mt-1.5 text-[10px] font-medium px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(8,96,32,0.08)",
                color: "#086020",
                border: "1px solid rgba(8,96,32,0.15)",
              }}
            >
              {member.org}
            </span>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: "rgba(8,96,32,0.1)" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: "rgba(8,96,32,0.3)" }} />
            <div className="flex-1 h-px" style={{ background: "rgba(8,96,32,0.1)" }} />
          </div>

          {/* ── Description ── */}
          <p className="text-[12.5px] leading-relaxed text-center flex-1" style={{ color: "#4B5563" }}>
            {member.description}
          </p>

          {/* ── LinkedIn CTA ── */}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 group-hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #086020 0%, #0d9c2e 100%)",
              color: "white",
              boxShadow: "0 4px 12px rgba(8,96,32,0.3)",
            }}
            aria-label={`${member.name} on LinkedIn`}
          >
            <LinkedInIcon />
            View LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ──────────────────────────────────── */
export default function OurTeamSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(cardsRef.current.filter(Boolean), {
        y: 80,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current[0], start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "#F5F5F0",
        paddingTop: "calc(var(--navbar-height, 64px) + 80px)",
        paddingBottom: "120px",
      }}
    >
      {/* Page background decorations */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(9,131,39,0.06) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(9,131,39,0.06) 0%, transparent 70%)",
          transform: "translate(20%, 20%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Page header ── */}
        <div ref={headingRef} className="text-center mb-24">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.12em]"
            style={{
              color: "#086020",
              background: "rgba(8,96,32,0.08)",
              border: "1px solid rgba(8,96,32,0.18)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Deep Tech Leadership Think Tank · DTLTT
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
          >
            Meet Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #086020 0%, #22c55e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Advisory Team
            </span>
          </h1>

          <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Visionaries, scientists, and nation-builders united by one mission —
            turning India's breakthrough research into globally scalable enterprises.
          </p>

          {/* Decorative line under heading */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, #086020)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#086020" }} />
            <div className="w-16 h-px" style={{ background: "linear-gradient(90deg, #086020, transparent)" }} />
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
