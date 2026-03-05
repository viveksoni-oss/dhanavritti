"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

export default function Hero() {
  const leftRef    = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.set(leftRef.current,   { autoAlpha: 0, x: -50 });
    gsap.set(contentRef.current, { autoAlpha: 0, x: 60 }); // ← starts from right

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });
      tl
        .to(leftRef.current,    { autoAlpha: 1, x: 0, duration: 0.9 }, 0)
        .to(contentRef.current, { autoAlpha: 1, x: 0, duration: 0.8 }, 0.25);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden w-full"
      style={{ height: "calc(100svh - var(--navbar-height, 64px))" }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-20" style={{ background: "#f0f4f0" }} />
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/Hero/hero-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />

      <div className="flex h-full">

        {/* ── LEFT: plain image ── */}
        <div
          ref={leftRef}
          className="relative hidden lg:block w-[38%] flex-shrink-0 h-full"
        >
          <img
            src="/Hero Image .png"
            alt="Dhanavritti Ventures"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ── RIGHT: content ── */}
        <div className="flex-1 flex flex-col justify-center items-center h-full">
          <div
            ref={contentRef}
            className="flex flex-col items-center gap-4 w-full px-10 xl:px-16"
          >

            {/* Logo — centered, dominant */}
            <img
              src="/Logo/Dhanavritti-Venture-Transparent-Logo.png"
              alt="Dhanavritti Logo"
              className="w-120 h-120 object-contain -my-25 drop-shadow-sm"
            />

            {/* Heading — centered under logo */}
            <h1
              className="text-2xl sm:text-3xl font-semibold text-center leading-snug"
              style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
            >
              Backing India&apos;s{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #086020 0%, #22c55e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Deep-Tech
              </span>{" "}
              Future
            </h1>

            {/* Description */}
            <p className="text-sm leading-relaxed text-center max-w-sm" style={{ color: "#4B5563" }}>
              Enabling IP-driven startups to translate breakthrough research into
              globally scalable enterprises.
            </p>

            {/* CTA */}
            <Button href="#mentors" variant="primary" size="lg">
              Apply Here
            </Button>

          </div>
        </div>

      </div>
    </section>
  );
}
