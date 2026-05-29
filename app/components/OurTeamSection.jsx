"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TeamCard from "./team/TeamCard";
import MentorCard from "./mentors/MentorCard";
import { mentors } from "./mentors/mentorsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
// ✅ Updated TeamCard to match the screenshot style

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
  const headerMentors = mentors;

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
        <div className="relative mt-16 px-8 sm:px-16 lg:px-32">
          <div
            ref={mentorCardsRef}
            className="grid grid-flow-col auto-cols-[210px] justify-center overflow-hidden"
          >
            {headerMentors.map((mentor, i) => (
              <div
                key={i}
                className="w-[210px]"
                style={{ marginTop: i % 2 === 0 ? "0" : "5.7vw" }}
              >
                <MentorCard
                  mentor={mentor}
                  priority={i === 0}
                  filter="grayscale(100%) brightness(0.58) contrast(1.06)"
                />
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
              Strategic Advisor
            </h3>
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
            Blending deep-tech expertise, policy insight, and commercialization
            access.
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
          
          <h3
            className="mt-4 text-3xl sm:text-4xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
          >
            Strategic{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #086020 0%, #22c55e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Advisory Board
            </span>
          </h3>
        </div>

        {/* DTLTT members grid */}
        <div className="max-w-7xl mx-auto px-6 py-20 pb-24">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-24">
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
