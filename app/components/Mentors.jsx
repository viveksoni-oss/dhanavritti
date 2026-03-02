"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const mentors = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Lead Technology Advisor",
    bio: "Former CTO at a Tier-1 semiconductor firm. 20+ years in chip design and deep-tech strategy.",
    linkedin: "https://linkedin.com",
    initials: "RK",
    color: "#098327",
  },
  {
    name: "Prof. Anita Sharma",
    role: "Academic Mentor",
    bio: "Professor of Computer Science at IIT Kanpur. Pioneer in AI/ML research with 150+ publications.",
    linkedin: "https://linkedin.com",
    initials: "AS",
    color: "#086020",
  },
  {
    name: "Vikram Mehta",
    role: "Industry Partner",
    bio: "Serial entrepreneur & angel investor. Built and exited 3 deep-tech startups in energy sector.",
    linkedin: "https://linkedin.com",
    initials: "VM",
    color: "#0a7025",
  },
  {
    name: "Dr. Priya Nair",
    role: "Venture Strategist",
    bio: "Ex-McKinsey consultant specializing in deep-tech commercialization and IP monetization.",
    linkedin: "https://linkedin.com",
    initials: "PN",
    color: "#098327",
  },
  {
    name: "Sanjay Gupta",
    role: "Investment Director",
    bio: "15+ years in venture capital. Deep expertise in semiconductor and defense tech investments.",
    linkedin: "https://linkedin.com",
    initials: "SG",
    color: "#065a1c",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Science Advisor",
    bio: "DRDO veteran with 25 years in materials science. Expert in advanced composites and nano-materials.",
    linkedin: "https://linkedin.com",
    initials: "MI",
    color: "#086020",
  },
];

export default function Mentors() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mentors-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(".mentors-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(".mentor-card-wrapper", {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mentors"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #086020 0%, #065a1c 50%, #098327 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, white, transparent 70%)" }} />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full" style={{ background: "radial-gradient(circle, white, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2
            className="mentors-heading section-heading text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Mentors
          </h2>
          <p className="mentors-subtitle text-white/70 text-lg max-w-2xl mx-auto">
            Backed by industry leaders, academic pioneers, and seasoned investors who guide
            our portfolio companies to global success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {mentors.map((mentor, i) => (
            <div key={i} className="mentor-card-wrapper">
              <div className="mentor-card glass-card-dark p-6 pt-16 text-center relative">
                {/* Pop-out image */}
                <div
                  className="mentor-image flex items-center justify-center text-white text-2xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${mentor.color}, ${mentor.color}dd)`,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {mentor.initials}
                </div>

                {/* Name */}
                <h3 className="text-white font-bold text-lg mb-1">{mentor.name}</h3>

                {/* Role */}
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: "#e9f5cf" }}
                >
                  {mentor.role}
                </p>

                {/* Bio */}
                <p className="text-white/60 text-sm leading-relaxed mb-5">{mentor.bio}</p>

                {/* LinkedIn Button */}
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(233, 245, 207, 0.12)",
                    border: "1px solid rgba(233, 245, 207, 0.2)",
                    color: "#e9f5cf",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(233, 245, 207, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(233, 245, 207, 0.12)";
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
