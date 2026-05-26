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
        background: "#f0fdf4",
        borderTop: "2px solid transparent",
        borderImage:
          "linear-gradient(90deg, transparent, #086020, #22c55e, #086020, transparent) 1",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* ── Brand ── */}
          <div className="footer-col flex flex-col gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Logo/Dhanavritti-Venture-Logo.png"
              alt="Dhanavritti Logo"
              className="w-36 -mt-2"
            />
          </div>

          {/* ── About Us ── */}
          <div className="footer-col">
            <h4 className="text-sm font-semibold mb-5 text-green-900">
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
                    className="text-sm text-green-800 transition-colors duration-200 hover:text-green-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company Info ── */}
          <div className="footer-col">
            <h4 className="text-sm font-semibold mb-5 text-green-900">
              Company Info
            </h4>
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-green-800">
                Dhanavritti Ventures <br />
                <span className="italic text-[13px] text-green-700">
                  Disciplined capital for frontier innovation
                </span>
              </p>
              <div className="flex flex-col gap-2.5 text-sm text-green-800">
                <a
                  href="mailto:contact@dhanavritti.com"
                  className="flex items-center gap-2.5 transition-colors duration-200 hover:text-green-600"
                >
                  <Mail size={14} className="flex-shrink-0 text-green-600" />
                  contact@dhanavritti.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-6 h-px w-full bg-green-200" />

        {/* Bottom bar */}
        <div className="flex items-center justify-center">
          <p className="text-xs text-green-700">
            © 2026 Dhanavritti Ventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
