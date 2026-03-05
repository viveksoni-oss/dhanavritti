"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers } from "./team/teamData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function TeamCard({ member }) {
  const imgRef     = useRef(null);
  const cardRef    = useRef(null);
  const contentRef = useRef(null);

  const handleEnter = () => {
    gsap.to(imgRef.current, {
      y: -32,
      scale: 1.04,
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(cardRef.current, {
      boxShadow: "0 24px 60px rgba(8,96,32,0.2), 0 4px 16px rgba(0,0,0,0.08)",
      duration: 0.35,
      overwrite: true,
    });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(cardRef.current, {
      boxShadow: "0 4px 20px rgba(8,96,32,0.08), 0 1px 4px rgba(0,0,0,0.04)",
      duration: 0.35,
      overwrite: true,
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-visible cursor-pointer flex flex-col"
      style={{
        background: "white",
        border: "1.5px solid rgba(8,96,32,0.1)",
        boxShadow: "0 4px 20px rgba(8,96,32,0.08), 0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image — overflows top on hover */}
      <div
        className="relative w-full overflow-hidden rounded-t-2xl flex-shrink-0"
        style={{ height: "280px" }}
      >
        <img
          ref={imgRef}
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover object-top"
          style={{ transformOrigin: "top center" }}
        />
        {/* Bottom fade into card */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, white)",
          }}
        />
      </div>

      {/* Content — max 2 lines */}
      <div
        ref={contentRef}
        className="px-5 pt-2 pb-5 flex items-center justify-between gap-3"
      >
        <div className="min-w-0">
          <h3
            className="font-bold text-sm truncate"
            style={{ color: "#1A1A1A", fontFamily: "var(--font-display)" }}
          >
            {member.name}
          </h3>
          <p
            className="text-xs font-medium truncate mt-0.5"
            style={{ color: "#086020" }}
          >
            {member.role}
          </p>
        </div>

        {/* LinkedIn icon button */}
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
          style={{
            background: "rgba(8,96,32,0.08)",
            color: "#086020",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#086020";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(8,96,32,0.08)";
            e.currentTarget.style.color = "#086020";
          }}
          aria-label={`${member.name} on LinkedIn`}
          onClick={(e) => e.stopPropagation()}
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}

export default function OurTeamSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    gsap.set(headingRef.current, { autoAlpha: 0, y: 40 });
    gsap.set(cardsRef.current.filter(Boolean), { autoAlpha: 0, y: 50 });

    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      gsap.to(cardsRef.current.filter(Boolean), {
        autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mentors"
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "#F5F5F0" }}
    >
      {/* Background glow blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(9,131,39,0.06) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(9,131,39,0.06) 0%, transparent 70%)",
          transform: "translate(25%, 25%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest"
            style={{
              color: "#086020",
              background: "rgba(8,96,32,0.08)",
              border: "1px solid rgba(8,96,32,0.18)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Deep Tech Leadership
          </span>

          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
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
          </h2>

          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Visionaries and nation-builders united by one mission — turning India's
            breakthrough research into globally scalable enterprises.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              // padding-top gives space for image to peek out on hover
              style={{ paddingTop: "8px" }}
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
