"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
  const mobileMenuRef = useRef(null);
  const linkRefs = useRef([]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Scroll: glassmorphism + hide/show on direction
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 50);

          if (navRef.current) {
            if (currentY > lastScrollY.current && currentY > 120) {
              gsap.to(navRef.current, {
                y: "-100%",
                duration: 0.4,
                ease: "power2.inOut",
              });
            } else {
              gsap.to(navRef.current, {
                y: "0%",
                duration: 0.4,
                ease: "power2.out",
              });
            }
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        linkRefs.current.filter(Boolean),
        {
          y: -12,
          opacity: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
        },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    const observers = [];

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(href);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Mobile menu open/close animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (mobileOpen) {
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" }
      );

      const links = menu.querySelectorAll("a");
      gsap.fromTo(
        links,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power2.out", delay: 0.1 }
      );
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [mobileOpen]);

  const handleClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,box-shadow,border-color] duration-500 ${
        scrolled
          ? "py-3 shadow-md border-b border-white/20"
          : "py-6 border-b border-transparent"
      }`}
      style={{
        background: scrolled ? "rgba(245, 245, 240, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={(e) => handleClick(e, "#")} className="flex items-center gap-3 group">
          <div className="w-11 h-11 relative overflow-hidden rounded-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src="/Dhanavritti logo.png"
              alt="Dhanavritti Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="font-bold text-xl tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "#086020" }}
            >
              DHANAVRITTI
            </span>
            <span className="text-[10px] tracking-[0.25em] font-semibold uppercase text-gray-400 mt-0.5">
              Ventures
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => { linkRefs.current[i] = el; }}
                onClick={(e) => handleClick(e, link.href)}
                className="relative text-sm font-medium transition-colors duration-300 group"
                style={{ color: isActive ? "#086020" : "#1A1A1A" }}
              >
                {link.label}
                {/* Active underline */}
                <span
                  className="absolute -bottom-0.5 left-0 h-[1.5px] bg-green-700 transition-all duration-300 rounded-full"
                  style={{ width: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }}
                />
                {/* Hover underline */}
                <span className="absolute -bottom-0.5 left-0 h-[1.5px] bg-green-700 rounded-full w-0 group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </a>
            );
          })}

          <a
            href="#mentors"
            onClick={(e) => handleClick(e, "#mentors")}
            className="btn-glow text-sm !py-2.5 !px-6 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] w-9 h-9 justify-center items-center rounded-md hover:bg-black/5 transition-colors duration-200"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-5 h-[2px] bg-neutral-800 rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-neutral-800 rounded-full transition-all duration-300 ${
              mobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-neutral-800 rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden h-0 opacity-0"
        style={{ background: "rgba(245, 245, 240, 0.97)" }}
      >
        <div className="px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`text-base font-medium py-3 border-b border-gray-100 transition-colors duration-200 ${
                  isActive ? "text-green-700" : "text-neutral-800 hover:text-green-700"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#mentors"
            onClick={(e) => handleClick(e, "#mentors")}
            className="btn-glow text-center text-sm mt-4"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
