"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [leftRef.current, logoRef.current, headingRef.current,
         subtitleRef.current, descRef.current, btnRef.current],
        { visibility: "visible" }
      );

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power3.out" } });

      tl.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 }
      )
      .fromTo(logoRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(headingRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.35"
      )
      .fromTo(descRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(btnRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.25"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden w-full"
      style={{
        marginTop: "72px",                   /* push section below fixed navbar */
        height: "calc(100svh - 72px)",       /* fill remaining viewport height */
      }}
    >
      <div className="flex h-full">

        {/* ─── LEFT: Full-height image ─────────────────────── */}
        <div
          ref={leftRef}
          className="relative hidden lg:block w-[48%] flex-shrink-0 h-full"
          style={{ visibility: "hidden" }}
        >
          <img
            src="/Hero Image .png"
            alt="Dhanavritti Ventures"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none"
            style={{
              background: "linear-gradient(0deg, rgba(8,96,32,0.55) 0%, transparent 100%)",
            }}
          />
          <div className="absolute bottom-8 left-6 right-6 flex items-center gap-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md">
              <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Focus</p>
              <p className="text-sm font-bold text-green-800 leading-tight">IP-Driven Startups</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md">
              <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Stage</p>
              <p className="text-sm font-bold text-green-800 leading-tight">Early-to-Growth</p>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Content ──────────────────────────────── */}
        <div
          ref={rightRef}
          className="flex-1 paper-texture flex flex-col justify-center relative overflow-hidden"
          style={{ paddingBottom: "48px" }}      /* no paddingTop needed anymore */
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
            style={{
              background: "radial-gradient(circle, #098327 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />

          <div className="px-10 xl:px-16 flex flex-col gap-7 relative z-10 max-w-2xl">

            {/* LOGO */}
            <div
              ref={logoRef}
              className="flex flex-col items-center text-center mb-2"
              style={{ visibility: "hidden" }}
            >
              <img
                src="/Dhanavritti logo.png"
                alt="Dhanavritti Logo"
                className="w-24 h-24 object-contain mb-3"
              />
              <span
                className="text-lg font-bold tracking-[0.18em] uppercase"
                style={{ color: "#086020", fontFamily: "var(--font-display)" }}
              >
                Dhanavritti Ventures
              </span>
              <span className="text-sm text-gray-400 mt-1 tracking-wide">
                An IIT Kanpur – Anchored Technology Investment Platform
              </span>
            </div>

            <div className="w-16 h-[2px] rounded-full bg-green-200 mx-auto" />

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl font-bold leading-[1.1] text-center lg:text-left"
              style={{ fontFamily: "var(--font-display)", color: "#1A1A1A", visibility: "hidden" }}
            >
              Backing India&apos;s{" "}
              <span className="gradient-text">Deep-Tech</span>{" "}
              Future
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base lg:text-lg font-semibold text-center lg:text-left"
              style={{ color: "#098327", visibility: "hidden" }}
            >
              Science-Led • IP-Driven • Globally Scalable
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-sm lg:text-base leading-relaxed text-center lg:text-left"
              style={{ color: "#4B5563", visibility: "hidden" }}
            >
              Enabling breakthrough research to become globally scalable enterprises.
              We combine deep technical diligence with commercial insight to back
              founders building what tomorrow demands.
            </p>

            {/* CTA */}
            <div
              ref={btnRef}
              className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mt-1"
              style={{ visibility: "hidden" }}
            >
              <a href="#about" className="btn-glow text-sm !py-3 !px-8">
                Explore More
              </a>
              <a
                href="#focus-areas"
                className="text-green-primary text-sm font-bold flex items-center gap-2 group"
              >
                Focus Areas
                <svg
                  className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

          </div>

          {/* Mobile image */}
          <div className="lg:hidden mt-10 mx-6 rounded-2xl overflow-hidden shadow-xl aspect-video">
            <img src="/Hero Image .png" alt="Hero" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
}
