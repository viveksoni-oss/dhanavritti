"use client";

import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import WhyDeeptech from "./WhyDeeptech";
import Ecosystem from "./Ecosystem";
import FocusAreas from "./FocusAreas";
import Footer from "./Footer";
import OurTeam from "./OurTeam";

const HOME_ASSETS = [
  "/Hero_image.webp",
  "/Hero/hero-background.jpg",
  "/Logo/Dhanavritti-Venture-Logo.png",
  "/Logo/Dhanavritti-Venture-Transparent-Logo.png",
  "/About us/image.png",
  "/blob.png",
  "/india_map.png",
  "/ecosystem/image.png",
  "/Focus Area/Semiconductor.png",
  "/Focus Area/AIML.png",
  "/Focus Area/Battery.png",
  "/Focus Area/Cybersecurity.png",
  "/Focus Area/Advanced Material.png",
  "/Focus Area/Aerospace.png",
  "/Focus Area/Medtech.png",
  "/Focus Area/Robotics.png",
  "/ourTeam/team.png",
];

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

function HomeContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutUs />
      <WhyDeeptech />
      <Ecosystem />
      <FocusAreas />
      <OurTeam />
      <Footer />
    </main>
  );
}

function HomeLoader({ exiting }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div
        className={`home-loader-panel home-loader-panel-left absolute inset-y-0 left-0 w-1/2 ${
          exiting ? "home-loader-panel-left-exit" : ""
        }`}
      />
      <div
        className={`home-loader-panel home-loader-panel-right absolute inset-y-0 right-0 w-1/2 ${
          exiting ? "home-loader-panel-right-exit" : ""
        }`}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-200/35 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/15" />
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center px-6 transition-opacity duration-300 ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="rounded-lg bg-white/95 p-3 shadow-2xl shadow-black/25 home-loader-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Logo/Dhanavritti-Venture-Logo.png"
            alt="Dhanavritti Ventures"
            className="w-32"
          />
        </div>
      </div>
      <style>{`
        .home-loader-panel {
          background: #ffffff;
          transition:
            transform 780ms cubic-bezier(0.76, 0, 0.24, 1),
            opacity 360ms ease;
        }

        .home-loader-panel-left {
          box-shadow: inset -1px 0 0 rgba(26, 26, 26, 0.08);
        }

        .home-loader-panel-right {
          box-shadow: inset 1px 0 0 rgba(26, 26, 26, 0.08);
        }

        .home-loader-panel-left-exit {
          transform: translateX(-102%);
        }

        .home-loader-panel-right-exit {
          transform: translateX(102%);
        }

        .home-loader-logo {
          animation: homeLogoPulse 1.25s ease-in-out infinite;
        }

        @keyframes homeLogoPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }

          50% {
            transform: scale(1.045);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default function HomeClient() {
  const [showLoader, setShowLoader] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadHome = async () => {
      const startedAt = performance.now();
      const fontReady = document.fonts?.ready ?? Promise.resolve();

      await Promise.allSettled([
        fontReady,
        ...HOME_ASSETS.map((src) => preloadImage(src)),
      ]);

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, 650 - elapsed);

      window.setTimeout(() => {
        if (cancelled) return;

        setIsExiting(true);

        window.setTimeout(() => {
          if (!cancelled) setShowLoader(false);
        }, 860);
      }, remaining);
    };

    loadHome();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <HomeContent />
      {showLoader ? <HomeLoader exiting={isExiting} /> : null}
    </>
  );
}
