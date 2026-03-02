"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })
        .from(
          badgeRef.current,
          {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          headingRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          descRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          btnRef.current,
          {
            y: 20,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );

      // Floating animation for decoration
      gsap.to(".hero-float", {
        y: -15,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="paper-texture min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div
        className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10 hero-float"
        style={{
          background:
            "radial-gradient(circle, #098327 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-32 left-10 w-40 h-40 rounded-full opacity-8 hero-float"
        style={{
          background:
            "radial-gradient(circle, #e9f5cf 0%, transparent 70%)",
          animationDelay: "1.5s",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32 pb-20">
        {/* Left - Image */}
        <div ref={imageRef} className="relative w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square lg:aspect-[4/5] w-full max-h-[700px]">
            <img 
              src="/Hero Image .png" 
              alt="Hero Image" 
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/4"
              style={{
                background:
                  "linear-gradient(0deg, rgba(8, 96, 32, 0.4) 0%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex flex-col gap-8">
          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-6xl lg:text-8xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
          >
            Dhanavritti{" "}
            <span className="gradient-text">Ventures</span>
            <span className="block text-4xl lg:text-5xl font-medium mt-3 italic" style={{ color: "#086020" }}>
              (DV)
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-2xl lg:text-3xl font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "#098327" }}
          >
            Backing India&apos;s <span className="bg-green-light px-2 rounded-md">Science-Led</span> Deep-Tech Future
          </p>

          {/* Description */}
          <p
            ref={descRef}
            className="text-xl lg:text-2xl leading-relaxed max-w-xl font-medium"
            style={{ color: "#4B5563" }}
          >
            Enabling IP-driven startups to translate breakthrough research into
            globally scalable enterprises. We combine technical diligence with
            commercial insight.
          </p>

          {/* CTA */}
          <div ref={btnRef} className="flex items-center gap-6 mt-4">
            <a href="#about" className="btn-glow text-lg !py-4 !px-10">
              Explore More
            </a>
            <a
              href="#focus-areas"
              className="text-green-primary text-xl font-bold flex items-center gap-3 group"
            >
              Focus Areas
              <svg
                className="w-6 h-6 group-hover:translate-x-2 transition-transform"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs tracking-widest uppercase text-gray-muted">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-green-primary flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-green-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}
