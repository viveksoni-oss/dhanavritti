"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.set(".footer-col", { autoAlpha: 0, y: 24 });
    const ctx = gsap.context(() => {
      gsap.to(".footer-col", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 92%" },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        // ✅ top-left lighter green → bottom-right near black
        background:
          "linear-gradient(135deg, #0f5c28 0%, #083d1a 45%, #031508 100%)",
      }}
    >
      {/* Top accent line — transparent → bright green center → transparent */}
      <div
        className="h-[1.5px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(74,222,128,0.2) 20%, rgba(134,239,172,0.75) 50%, rgba(74,222,128,0.2) 80%, transparent 100%)",
        }}
      />

      {/* Faint top-left glow to reinforce lighter corner */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "50%",
          height: "200px",
          background:
            "radial-gradient(ellipse at top left, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* ── Brand ── */}
          <div className="footer-col flex flex-col gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo/Dhanavritti-Venture-Transparent-Logo.png"
              alt="Dhanavritti Logo"
              className="w-80 -mt-2"
            />
          </div>

          {/* ── About Us ── */}
          <div className="footer-col">
            <h4
              className="text-sm font-semibold mb-5"
              style={{ color: "#a7f3c0" }} // ✅ slightly brighter heading on lighter bg
            >
              About Us
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Why Dhanavritti", href: "#why-deeptech" },
                { label: "DTLTT", href: "/dtltt" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(209,255,209,0.65)" }} // ✅ slightly brighter link text
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company Info ── */}
          <div className="footer-col">
            <h4
              className="text-sm font-semibold mb-5"
              style={{ color: "#a7f3c0" }}
            >
              Company Info
            </h4>
            <div className="flex flex-col gap-4">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(209,255,209,0.65)" }}
              >
                Dhanavritti Ventures <br />
                <span className="italic text-[13px]">
                  Disciplined capital for frontier innovation
                </span>
              </p>
              <div
                className="flex flex-col gap-2.5 text-sm"
                style={{ color: "rgba(209,255,209,0.65)" }}
              >
                <a
                  href="mailto:contact@dhanavritti.com"
                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-white"
                >
                  <Mail
                    size={14}
                    className="flex-shrink-0"
                    style={{ color: "#6ee7a0" }}
                  />
                  contact@dhanavritti.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-12 mb-6 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(134,239,172,0.18), rgba(134,239,172,0.06), transparent)",
            // ✅ slightly more visible on left (lighter side) fades to transparent right
          }}
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-center">
          <p className="text-xs" style={{ color: "rgba(209,255,209,0.38)" }}>
            © 2026 Dhanavritti Ventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
