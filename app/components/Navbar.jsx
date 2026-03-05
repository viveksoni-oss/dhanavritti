"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import Button from "@/app/components/ui/Button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Why Deep-Tech", href: "#why-deeptech" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Focus Areas", href: "#focus-areas" },
  { label: "Mentors", href: "#mentors" },
  { label: "Our Team", href: "/our-team", external: true },
];

export default function Navbar() {
  const navRef        = useRef(null);
  const mobileMenuRef = useRef(null);
  const linkRefs      = useRef([]);

  const [mobileOpen, setMobileOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // ── Scroll: background + active section ─────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    navLinks.forEach(({ href, external }) => {
      if (external || !href.startsWith("#")) return; // skip page links — not valid selectors
      const el = document.querySelector(href);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(href); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Entrance animation ───────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -60, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.1 });
      gsap.from(linkRefs.current.filter(Boolean), {
        y: -10, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.4,
      });
    });
    return () => ctx.revert();
  }, []);

  // ── Mobile menu animation ────────────────────────────────
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    gsap.killTweensOf(menu);
    if (mobileOpen) {
      gsap.set(menu, { display: "block" });
      gsap.fromTo(menu, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(menu, {
        height: 0, opacity: 0, duration: 0.25, ease: "power2.inOut",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [mobileOpen]);

  // ── Smooth scroll with nav offset ───────────────────────
  const handleClick = useCallback((e, href, isExternal) => {
    if (isExternal) return; // let <a> navigate normally
    e.preventDefault();
    setMobileOpen(false);
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.querySelector(href);
    if (!el) return;
    const offset = (navRef.current?.offsetHeight ?? 64) + 8;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Spacer so content never hides behind fixed nav */}
      <div style={{ height: "var(--navbar-height, 64px)" }} aria-hidden />

      <nav
        ref={(el) => {
          navRef.current = el;
          if (el) document.documentElement.style.setProperty("--navbar-height", `${el.offsetHeight}px`);
        }}
        className="fixed top-0 left-0 right-0 z-50 py-3"
        style={{
          background: scrolled ? "rgba(245,245,240,0.92)" : "rgba(245,245,240,0.5)",
          backdropFilter: "blur(16px) saturate(150%)",
          WebkitBackdropFilter: "blur(16px) saturate(150%)",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
          transition: "background 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">

          {/* Logo */}
          <a href="#" onClick={(e) => handleClick(e, "#")} className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src="/Dhanavritti logo.png"
              alt="Dhanavritti Logo"
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "var(--font-display)", color: "#086020" }}>
                DHANAVRITTI
              </span>
              <span className="text-[10px] tracking-[0.22em] font-semibold uppercase text-gray-400">
                Ventures
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  onClick={(e) => handleClick(e, link.href, link.external)}
                  className="relative text-sm font-medium whitespace-nowrap group"
                  style={{ color: isActive ? "#086020" : "#1A1A1A" }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[1.5px] bg-green-700 rounded-full transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }}
                  />
                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] bg-green-700 rounded-full w-0 group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </a>
              );
            })}
            <Button href="#mentors" onClick={(e) => handleClick(e, "#mentors")} size="sm">
              Get Started
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] w-9 h-9 justify-center items-center rounded-md hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-[2px] bg-neutral-800 rounded-full transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span className="block w-5 h-[2px] bg-neutral-800 rounded-full transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "scaleX(0)" : "scaleX(1)" }} />
            <span className="block w-5 h-[2px] bg-neutral-800 rounded-full transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden border-t border-black/5"
          style={{ height: 0, opacity: 0, display: "none", background: "rgba(245,245,240,0.98)" }}
        >
          <div className="px-5 py-2 flex flex-col">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-sm font-medium py-3 border-b border-gray-100 flex items-center justify-between transition-colors duration-200 ${
                    isActive ? "text-green-700" : "text-neutral-800 hover:text-green-700"
                  }`}
                >
                  {link.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                </a>
              );
            })}
            <Button href="#mentors" onClick={(e) => handleClick(e, "#mentors")} className="w-full mt-4" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
