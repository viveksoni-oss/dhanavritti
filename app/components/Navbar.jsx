"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Why Deep-Tech", href: "#why-deeptech" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Focus Areas", href: "#focus-areas" },
  { label: "Mentors", href: "#mentors" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-6 shadow-lg"
          : "py-8"
      }`}
      style={{
        background: scrolled
          ? "rgba(245, 245, 240, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-4 group">
          <div className="w-12 h-12 relative">
            <img 
              src="/Dhanavritti logo.png" 
              alt="Dhanavritti Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span
              className="font-bold text-xl tracking-tight leading-none"
              style={{ fontFamily: "var(--font-display)", color: "#086020" }}
            >
              DHANAVRITTI
            </span>
            <span className="text-[12px] tracking-[0.2em] font-semibold uppercase text-gray-muted mt-1">
              Ventures
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-medium transition-colors duration-300 hover:text-green-primary"
              style={{ color: "#1A1A1A" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#mentors"
            onClick={(e) => handleClick(e, "#mentors")}
            className="btn-glow text-sm !py-2.5 !px-6"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "rgba(245, 245, 240, 0.95)" }}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-base font-medium py-2 border-b border-gray-200 transition-colors hover:text-green-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#mentors"
            onClick={(e) => handleClick(e, "#mentors")}
            className="btn-glow text-center text-sm mt-2"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
