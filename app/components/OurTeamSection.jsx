"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MentorCard from "./mentors/MentorCard";
import { mentors } from "./mentors/mentorsData";
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
  const imgRef = useRef(null);
  const cardRef = useRef(null);

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
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, white)",
          }}
        />
      </div>

      <div className="px-5 pt-2 pb-5 flex items-center justify-between gap-3">
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
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
          style={{ background: "rgba(8,96,32,0.08)", color: "#086020" }}
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
  const mainHeadingRef = useRef(null);
  const dividerRef = useRef(null);
  const dtlttLabelRef = useRef(null);
  const mentorCardsRef = useRef(null);
  const dtlttHeadingRef = useRef(null);
  const dtlttDescRef = useRef(null);
  const teamLabelRef = useRef(null);
  const teamCardsRef = useRef([]);

  useEffect(() => {
    const allFade = [
      mainHeadingRef.current,
      dividerRef.current,
      dtlttLabelRef.current,
      dtlttHeadingRef.current,
      dtlttDescRef.current,
      teamLabelRef.current,
    ].filter(Boolean);

    gsap.set(allFade, { autoAlpha: 0, y: 36 });
    gsap.set(mentorCardsRef.current?.children ?? [], { autoAlpha: 0, y: 60 });
    gsap.set(teamCardsRef.current.filter(Boolean), { autoAlpha: 0, y: 50 });

    const ctx = gsap.context(() => {
      // Main heading
      gsap.to(mainHeadingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      // Divider
      gsap.to(dividerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      // DTLTT label
      gsap.to(dtlttLabelRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: dtlttLabelRef.current, start: "top 85%" },
      });

      // DTLTT heading overlay (on cards)
      gsap.to(dtlttHeadingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: mentorCardsRef.current, start: "top 72%" },
      });

      // Mentor cards
      gsap.to(mentorCardsRef.current?.children ?? [], {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: mentorCardsRef.current, start: "top 65%" },
      });

      // DTLTT description
      gsap.to(dtlttDescRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: dtlttDescRef.current, start: "top 90%" },
      });

      // Advisory team label
      gsap.to(teamLabelRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: teamLabelRef.current, start: "top 85%" },
      });

      // Advisory team cards
      gsap.to(teamCardsRef.current.filter(Boolean), {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: teamLabelRef.current, start: "top 72%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-team"
      className="relative overflow-hidden"
      style={{ background: "#F5F5F0" }}
    >
      {/* Background glow blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(9,131,39,0.06) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(9,131,39,0.06) 0%, transparent 70%)",
          transform: "translate(25%, 25%)",
        }}
      />

      <div className="relative z-10">
        {/* ── SECTION MAIN HEADING ── */}
        <div ref={mainHeadingRef} className="text-center pt-20 pb-4 px-6">
          <h2
            className="text-5xl sm:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #086020 0%, #22c55e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Team
            </span>
          </h2>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="flex items-center justify-center pb-10 px-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400" />
          <div className="mx-3 w-2 h-2 rounded-full bg-green-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-400" />
        </div>

        {/* ════════════════════════════════════
            BLOCK 1 — DTLTT Mentor Cards Strip
            ════════════════════════════════════ */}

        {/* DTLTT sub-label */}
        <div ref={dtlttLabelRef} className="text-center mb-6 px-6">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest"
            style={{
              color: "#086020",
              background: "rgba(8,96,32,0.08)",
              border: "1px solid rgba(8,96,32,0.18)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Deep Tech Leadership Think Tank · DTLTT
          </span>
        </div>

        {/* Cards strip + heading overlay */}
        <div className="relative">
          <div
            ref={mentorCardsRef}
            className="flex items-end justify-center"
            style={{ gap: "2px" }}
          >
            {mentors.map((mentor, i) => (
              <MentorCard key={i} mentor={mentor} />
            ))}
          </div>

          {/* DTLTT heading overlay centred on mentor cards */}
          <div
            ref={dtlttHeadingRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <h3
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
            </h3>
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

        {/* DTLTT description */}
        <div
          ref={dtlttDescRef}
          className="max-w-4xl mx-auto px-8 py-12 text-center"
        >
          <p
            className="text-base sm:text-lg leading-relaxed font-medium"
            style={{ color: "#086020" }}
          >
            DTLTT is a national strategic council founded by FIRST–IIT Kanpur
            that provides independent, high-credibility guidance to align
            industry, government, and academia on long-term deep-tech strategy
            and to accelerate the translation of research into scalable national
            outcomes.
          </p>
        </div>

        {/* Horizontal rule between blocks */}
        <div className="max-w-5xl mx-auto px-6 pb-10">
          <div
            className="w-full h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(8,96,32,0.2), transparent)",
            }}
          />
        </div>

        {/* ════════════════════════════════════
            BLOCK 2 — Advisory Team Cards Grid
            ════════════════════════════════════ */}

        {/* Advisory sub-label */}
        <div ref={teamLabelRef} className="text-center mb-10 px-6">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest"
            style={{
              color: "#086020",
              background: "rgba(8,96,32,0.08)",
              border: "1px solid rgba(8,96,32,0.18)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Advisory &amp; Leadership
          </span>

          <h3
            className="mt-4 text-3xl sm:text-4xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
          >
            Meet the{" "}
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
          </h3>

          <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Visionaries and nation-builders united by one mission — turning
            India's breakthrough research into globally scalable enterprises.
          </p>
        </div>

        {/* Advisory team cards grid */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                ref={(el) => (teamCardsRef.current[i] = el)}
                style={{ paddingTop: "8px" }}
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
