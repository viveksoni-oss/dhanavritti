"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Why Deep Tech", href: "#why-deeptech" },
  { label: "IIT Kanpur Ecosystem", href: "#ecosystem" },
  { label: "Focus Areas", href: "#focus-areas" },
  { label: "Team", href: "#our-team" },
  { label: "DTLTT", href: "/dtltt", external: true },
];

export default function Navbar() {
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linkRefs = useRef([]);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // ── Scroll: background ──────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section via IntersectionObserver ─────────────
  useEffect(() => {
    if (!isHomePage) return;
    const observers = [];
    navLinks.forEach(({ href, external }) => {
      if (external || !href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveSection(href);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHomePage]);

  // ── Entrance animation ───────────────────────────────────
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // ✅ Set start state synchronously before any paint — no flash
    gsap.set(nav, { y: -60, autoAlpha: 0 });
    gsap.set(linkRefs.current.filter(Boolean), { y: -10, autoAlpha: 0 });

    const ctx = gsap.context(() => {
      gsap.to(nav, {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.to(linkRefs.current.filter(Boolean), {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.4,
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
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" },
      );
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [mobileOpen]);

  // ── Click handler ────────────────────────────────────────
  const handleClick = useCallback(
    (e, href, isExternal) => {
      if (isExternal) return;
      e.preventDefault();
      setMobileOpen(false);

      if (href === "#") {
        if (!isHomePage) {
          window.location.href = "/";
          return;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (!isHomePage) {
        window.location.href = `/${href}`;
        return;
      }

      const el = document.querySelector(href);
      if (!el) return;
      const offset = (navRef.current?.offsetHeight ?? 64) + 8;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    },
    [isHomePage],
  );

  return (
    <>
      {/* Spacer */}
      <div style={{ height: "var(--navbar-height, 64px)" }} aria-hidden />

      {/* ✅ Outer wrapper — fixed, full width, holds nav + mobile menu */}
      <div
        ref={wrapperRef}
        className="fixed top-0 left-0 z-50"
        style={{ width: "100vw" }}
      >
        {/* ── Nav bar ── */}
        <nav
          ref={(el) => {
            navRef.current = el;
            if (el)
              document.documentElement.style.setProperty(
                "--navbar-height",
                `${el.offsetHeight}px`,
              );
          }}
          className="w-full py-3"
          style={{
            // ✅ Hidden via CSS before GSAP kicks in — zero flash
            visibility: "hidden",
            background: scrolled
              ? "rgba(245,245,240,0.92)"
              : "rgba(245,245,240,0.5)",
            backdropFilter: "blur(16px) saturate(150%)",
            WebkitBackdropFilter: "blur(16px) saturate(150%)",
            boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
            transition: "background 0.35s ease, box-shadow 0.35s ease",
            borderBottom: "2px solid transparent",
            borderImage:
              "linear-gradient(90deg, transparent, #086020, #22c55e, #086020, transparent) 1",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
            {/* ── Logo ── */}
            <a
              href="/"
              onClick={(e) => handleClick(e, "#")}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Logo/Dhanavritti-Venture-Logo.png"
                alt="Dhanavritti Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain
                           transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
              />
            </a>

            {/* ── Desktop links ── */}
            <div className="hidden md:flex items-center gap-4 lg:gap-7">
              {navLinks.map((link, i) => {
                const isActive = isHomePage && activeSection === link.href;
                const isCurrentPage = pathname === link.href;

                // ✅ DTLTT — special green pill
                if (link.external) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      ref={(el) => {
                        linkRefs.current[i] = el;
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm
                                 font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{
                        background: "linear-gradient(135deg, #22c55e, #086020)",
                        color: "white",
                        boxShadow: "0 2px 12px rgba(34,197,94,0.35)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 4px 18px rgba(34,197,94,0.55)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 2px 12px rgba(34,197,94,0.35)";
                      }}
                    >
                      {link.label}
                      <ArrowUpRight size={13} strokeWidth={2.5} />
                    </a>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    onClick={(e) => handleClick(e, link.href, link.external)}
                    className="relative text-sm font-medium whitespace-nowrap group"
                    style={{
                      color: isActive || isCurrentPage ? "#086020" : "#1A1A1A",
                    }}
                  >
                    {link.label}
                    {/* active underline */}
                    <span
                      className="absolute -bottom-0.5 left-0 h-[1.5px] bg-green-700 rounded-full transition-all duration-300"
                      style={{
                        width: isActive || isCurrentPage ? "100%" : "0%",
                        opacity: isActive || isCurrentPage ? 1 : 0,
                      }}
                    />
                    {/* hover underline */}
                    <span
                      className="absolute -bottom-0.5 left-0 h-[1.5px] bg-green-700 rounded-full
                                     w-0 group-hover:w-full transition-all duration-300
                                     opacity-0 group-hover:opacity-100"
                    />
                  </a>
                );
              })}
            </div>

            {/* ── Hamburger ── */}
            <button
              className="md:hidden flex flex-col gap-[5px] w-9 h-9 justify-center items-center
                         rounded-md hover:bg-black/5 transition-colors flex-shrink-0"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-[2px] bg-neutral-800 rounded-full transition-all duration-300 origin-center"
                style={{
                  transform: mobileOpen
                    ? "rotate(45deg) translateY(7px)"
                    : "none",
                }}
              />
              <span
                className="block w-5 h-[2px] bg-neutral-800 rounded-full transition-all duration-300"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="block w-5 h-[2px] bg-neutral-800 rounded-full transition-all duration-300 origin-center"
                style={{
                  transform: mobileOpen
                    ? "rotate(-45deg) translateY(-7px)"
                    : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* ── Mobile menu — OUTSIDE <nav> so it never causes nav reflow ── */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden border-t border-black/5 w-full"
          style={{
            height: 0,
            opacity: 0,
            display: "none",
            background: "rgba(245,245,240,0.98)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col">
            {navLinks.map((link) => {
              const isActive = isHomePage && activeSection === link.href;
              const isCurrentPage = pathname === link.href;

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="py-3 border-b border-gray-100 flex items-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span
                      className="flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #22c55e, #086020)",
                        color: "white",
                        boxShadow: "0 2px 10px rgba(34,197,94,0.3)",
                      }}
                    >
                      {link.label}
                    </span>
                  </a>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href, link.external)}
                  className={`text-sm font-medium py-3 border-b border-gray-100 flex items-center
                              justify-between transition-colors duration-200 ${
                                isActive || isCurrentPage
                                  ? "text-green-700"
                                  : "text-neutral-800 hover:text-green-700"
                              }`}
                >
                  {link.label}
                  {(isActive || isCurrentPage) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
