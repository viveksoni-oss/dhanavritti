"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin } from "lucide-react";

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
      style={{ background: "#0b3d1f" }}
    >
      {/* Top accent line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #22c55e, #86efac, #22c55e, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* ── Brand ── */}
          <div className="footer-col flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img
                src="/Logo/OnlyLogo.png"
                alt="Dhanavritti Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold text-lg tracking-tight text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  DHANAVRITTI
                </span>
                <span
                  className="text-[10px] tracking-[0.22em] uppercase mt-0.5"
                  style={{ color: "#86efac" }}
                >
                  Ventures
                </span>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(193,255,180,0.65)" }}
            >
              Conviction Capital for Fundamental Innovation.
              <br />
              An IIT Kanpur–Anchored Technology Investment Platform.
            </p>

            {/* Socials */}
            <div className="flex gap-2.5">
              {[
                {
                  label: "LinkedIn",
                  href: "#",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  href: "mailto:contact@dhanavritti.com",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-3.5 h-3.5"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13 2 4" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-250 hover:text-white"
                  style={{
                    color: "#86efac",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(134,239,172,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#166534";
                    e.currentTarget.style.borderColor = "#22c55e";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.borderColor = "rgba(134,239,172,0.2)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── About Us links ── */}
          <div className="footer-col">
            <h4
              className="text-sm font-semibold mb-5"
              style={{ color: "#86efac" }}
            >
              About Us
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Why Dhanavritti", href: "#why-deeptech" },
                { label: "Our Team", href: "#mentors" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(193,255,180,0.6)" }}
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
              style={{ color: "#86efac" }}
            >
              Company Info
            </h4>

            <div className="flex flex-col gap-4">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(193,255,180,0.6)" }}
              >
                Dhanavritti Ventures – Conviction Capital for Fundamental
                Innovation.
              </p>

              <a
                href="mailto:contact@dhanavritti.com"
                className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(193,255,180,0.6)" }}
              >
                <Mail
                  size={14}
                  className="flex-shrink-0"
                  style={{ color: "#4ade80" }}
                />
                contact@dhanavritti.com
              </a>

              <div
                className="flex items-start gap-2.5 text-sm"
                style={{ color: "rgba(193,255,180,0.6)" }}
              >
                <MapPin
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#4ade80" }}
                />
                <span className="leading-relaxed">
                  IIT Kanpur Outreach Center, C Block, Phase 2 Industrial Area,
                  Sector 62, Noida, Ghaziabad, Uttar Pradesh 201309
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-12 mb-6 h-px w-full"
          style={{ background: "rgba(134,239,172,0.12)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(193,255,180,0.4)" }}>
            © 2026 Dhanavritti Ventures. All rights reserved.
          </p>
          <div
            className="flex gap-5 text-xs"
            style={{ color: "rgba(193,255,180,0.4)" }}
          >
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
