"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const imageWrapRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [imageWrapRef.current, badgeRef.current, headingRef.current,
         subtitleRef.current, descRef.current, btnRef.current],
        { visibility: "visible" }
      );

      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageWrapRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 }
      )
        .fromTo(
          badgeRef.current,
          { y: -16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          headingRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          btnRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="paper-texture relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Subtle background blobs — no animation */}
      <div
        className="absolute top-24 right-16 w-72 h-72 rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #098327 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-24 left-8 w-52 h-52 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, rgba(233,245,207,0.9) 0%, transparent 70%)" }}
      />

      {/* Grid — paddingTop = navbar height, no extra whitespace */}
      <div
        className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        style={{ minHeight: "100svh", paddingTop: "80px", paddingBottom: "60px" }}
      >
        {/* LEFT — Image */}
        <div
          ref={imageWrapRef}
          className="relative w-full flex justify-center lg:justify-start"
          style={{ visibility: "hidden" }}
        >
          {/* Logo badge */}
          <div
            ref={badgeRef}
            className="absolute -top-4 left-4 z-10 bg-white shadow-lg rounded-2xl px-4 py-3 flex items-center gap-3 border border-green-100"
            style={{ visibility: "hidden" }}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white flex items-center justify-center">
              <img
                src="/Dhanavritti logo.png"
                alt="Dhanavritti Ventures"
                className="w-9 h-9 object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-[11px] font-bold tracking-wider uppercase"
                style={{ color: "#086020" }}
              >
                Dhanavritti Ventures
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5 tracking-wide">
                IIT Kanpur – Anchored
              </span>
            </div>
          </div>

          {/* Image */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm lg:max-w-none aspect-[4/5]"
            style={{ maxHeight: "560px" }}
          >
            <img
              src="/Hero Image .png"
              alt="Hero"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
              style={{
                background: "linear-gradient(0deg, rgba(8,96,32,0.4) 0%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Focus</p>
                <p className="text-sm font-bold text-green-800 leading-tight">IP-Driven Startups</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Stage</p>
                <p className="text-sm font-bold text-green-800 leading-tight">Early-to-Growth</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Content */}
        <div className="flex flex-col gap-6">
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A", visibility: "hidden" }}
          >
            Dhanavritti{" "}
            <span className="gradient-text">Ventures</span>
            <span
              className="block text-xl lg:text-2xl font-medium mt-2 italic"
              style={{ color: "#086020" }}
            >
              An IIT Kanpur – Anchored Technology Investment Platform
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg lg:text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "#098327", visibility: "hidden" }}
          >
            Backing India&apos;s{" "}
            <span className="bg-green-light px-2 rounded-md">Science-Led</span>{" "}
            Deep-Tech Future
          </p>

          <p
            ref={descRef}
            className="text-base lg:text-lg leading-relaxed max-w-lg font-medium"
            style={{ color: "#4B5563", visibility: "hidden" }}
          >
            Enabling IP-driven startups to translate breakthrough research into
            globally scalable enterprises. We combine technical diligence with
            commercial insight to build what tomorrow demands.
          </p>

          <div
            ref={btnRef}
            className="flex flex-wrap items-center gap-5 mt-2"
            style={{ visibility: "hidden" }}
          >
            <a href="#about" className="btn-glow text-base !py-3.5 !px-9">
              Explore More
            </a>
            <a
              href="#focus-areas"
              className="text-green-primary text-base font-bold flex items-center gap-2.5 group"
            >
              Focus Areas
              <svg
                className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
