"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const leftRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.set(leftRef.current, { autoAlpha: 0, x: -50 });
    gsap.set(contentRef.current, { autoAlpha: 0, x: 60 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: "power3.out" },
      });
      tl.to(leftRef.current, { autoAlpha: 1, x: 0, duration: 0.9 }, 0).to(
        contentRef.current,
        { autoAlpha: 1, x: 0, duration: 0.8 },
        0.25,
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-x-hidden w-full"
      style={{ minHeight: "calc(100svh - var(--navbar-height, 64px))" }}
      // ✅ overflow-x-hidden only — vertical can grow freely
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-20"
        style={{ background: "#f0f4f0" }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/Hero/hero-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />

      <div className="flex min-h-[inherit]">
        {/* ── LEFT: image ── */}
        <div
          ref={leftRef}
          className="relative hidden lg:flex w-[42%] flex-shrink-0"
          style={{ minHeight: "calc(100svh - var(--navbar-height, 64px))" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Hero Image .png"
            alt="Dhanavritti Ventures"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ── RIGHT: content ── */}
        <div className="flex-1 flex flex-col justify-center items-center py-12 px-8 xl:px-12">
          {/* ✅ No overflow-y-scroll, no fixed h-full
            py-12 gives top/bottom breathing room on short viewports */}
          <div
            ref={contentRef}
            className="flex flex-col items-center gap-5 w-full"
          >
            {/* Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo/Dhanavritti-Venture-Transparent-Logo.png"
              alt="Dhanavritti Logo"
              className="md:scale-75 2xl:scale-100 object-contain drop-shadow-sm"
              style={{
                width: "420px",
                height: "420px",
                marginTop: "-120px",
                marginBottom: "-120px",
              }}
            />

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl font-bold text-center leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
            >
              Backing India&apos;s{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #086020 0%, #22c55e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                  paddingRight: "4px",
                  display: "inline-block",
                }}
              >
                Deep-Tech
              </span>{" "}
              Future
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg leading-relaxed text-center max-w-xl"
              style={{ color: "#4B5563" }}
            >
              Disciplined capital for frontier innovation
            </p>

            {/* Faded sub-line */}
            <p
              className="text-center max-w-xs leading-snug"
              style={{
                fontSize: "0.8rem",
                color: "rgba(75,85,99,0.55)",
                letterSpacing: "0.01em",
              }}
            >
              Are you a deep-tech startup ready to fuel your next stage of
              growth?
            </p>

            {/* CTA */}
            <Link
              href="/apply"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                       text-white font-semibold transition-all duration-300
                       shadow-md shadow-green-600/20 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #22c55e, #086020)",
              }}
            >
              Apply Here
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
