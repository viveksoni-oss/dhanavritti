"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

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
      className="relative overflow-hidden w-full"
      style={{ height: "calc(100svh - var(--navbar-height, 64px))" }}
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

      <div className="flex h-full">
        {/* ── LEFT: image ── */}
        <div
          ref={leftRef}
          className="relative hidden lg:block w-[42%] flex-shrink-0 h-full"
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
            className="flex flex-col items-center gap-5 w-full px-8 xl:px-12"
          >
            {/* Logo — bigger + more negative margin */}
            <img
              src="/Logo/Dhanavritti-Venture-Transparent-Logo.png"
              alt="Dhanavritti Logo"
              className="object-contain drop-shadow-sm"
              style={{
                width: "420px",
                height: "420px",
                marginTop: "-120px",
                marginBottom: "-120px",
              }}
            />

            {/* Heading — much bigger */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
            >
              Backing India&apos;s{" "}
              <span
              className="pr-2"
                style={{
                  background:
                    "linear-gradient(135deg, #086020 0%, #22c55e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}
              >
                Deep-Tech
              </span>{" "}
              Future
            </h1>

            {/* Description — slightly bigger */}
            <p
              className="text-base sm:text-lg leading-relaxed text-center max-w-xl"
              style={{ color: "#4B5563" }}
            >
              Disciplined capital for frontier innovation
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
