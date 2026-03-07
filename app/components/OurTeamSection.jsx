"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin } from "lucide-react";
import MentorCard from "./mentors/MentorCard";
import { mentors } from "./mentors/mentorsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ✅ Updated TeamCard to match the screenshot style
function TeamCard({ member }) {
  const cardRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: "0 24px 60px rgba(8,96,32,0.25)",
      duration: 0.35,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 4px 20px rgba(8,96,32,0.08)",
      duration: 0.35,
      ease: "power3.out",
      overwrite: true,
    });
  };

  return (
    <div
      ref={cardRef}
      className="flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "white",
        border: "2px solid #22c55e", // ✅ green border like screenshot
        boxShadow: "0 4px 20px rgba(8,96,32,0.08)",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image — top section, fixed height */}
      <div
        className="w-full overflow-hidden flex-shrink-0"
        style={{ height: "260px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Green gradient bottom strip — name + LinkedIn */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #086020 0%, #22c55e 100%)",
        }}
      >
        <div className="min-w-0 flex-1 mr-2">
          <p className="text-white font-bold text-sm leading-tight truncate">
            {member.name}
          </p>
          {member.role ? (
            <p className="text-green-100 text-xs mt-0.5 truncate">
              {member.role}
            </p>
          ) : null}
        </div>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.45)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
          }
          onClick={(e) => e.stopPropagation()}
        >
          <Linkedin size={16} strokeWidth={2} />
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
      gsap.to(mainHeadingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.to(dividerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });
      gsap.to(dtlttLabelRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: dtlttLabelRef.current, start: "top 85%" },
      });
      gsap.to(dtlttHeadingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: mentorCardsRef.current, start: "top 72%" },
      });
      gsap.to(mentorCardsRef.current?.children ?? [], {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: mentorCardsRef.current, start: "top 65%" },
      });
      gsap.to(dtlttDescRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: dtlttDescRef.current, start: "top 90%" },
      });
      gsap.to(teamLabelRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: teamLabelRef.current, start: "top 85%" },
      });
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
      {/* Background blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(9,131,39,0.06) 0%, transparent 70%)",
          transform: "translate(-30%,-30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(9,131,39,0.06) 0%, transparent 70%)",
          transform: "translate(25%,25%)",
        }}
      />

      <div className="relative z-10">
        {/* Main heading */}

        {/* Mentor strip + overlay heading */}
        <div className="relative mt-16">
          <div
            ref={mentorCardsRef}
            className="flex items-start justify-center" // ← items-start NOT items-end
            style={{ gap: "0px" }}
          >
            {mentors.map((mentor, i) => (
              <div
                key={i}
                style={{ marginTop: i % 2 === 0 ? "0px" : "60px" }} // ✅ only here
              >
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>

          <div
            ref={dtlttHeadingRef}
            className="absolute  inset-0 flex flex-col items-center justify-center pointer-events-none"
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

        {/* Divider rule */}
        <div className="max-w-5xl mx-auto px-6 pb-10">
          <div
            className="w-full h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(8,96,32,0.2), transparent)",
            }}
          />
        </div>

        {/* DTLTT Members grid label */}
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
            Deep Tech Leadership Think Tank
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
              DTLTT Members
            </span>
          </h3>
        </div>

        {/* DTLTT members grid */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mentors.map((member, i) => (
              <div key={i} ref={(el) => (teamCardsRef.current[i] = el)}>
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
