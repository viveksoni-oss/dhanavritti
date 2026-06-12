"use client";

import EcoCard from "./ecosystem/EcoCard";
import { quadrants } from "./ecosystem/ecosystemData";

export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden py-24 px-6"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Heading ── */}
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(8,96,32,0.08)",
              color: "#086020",
              border: "1px solid rgba(8,96,32,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            India's #1 Technical Institution
          </span>

          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
          >
            IIT Kanpur{" "}
            <span
              className="italic pr-2"
              style={{
                background: "linear-gradient(135deg,#086020 0%,#22c55e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ecosystem
            </span>
          </h2>
        </div>

        {/* ── 2×2 grid with absolute center logo ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3">

          {quadrants.map((q, i) => (
            <EcoCard key={q.id} quadrant={q} isBottom={i >= 2} />
          ))}

          {/* IITK logo pinned to the center of the grid (visible on md+) */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2
                       hidden md:flex items-center justify-center
                       w-32 h-32 rounded-full bg-white shadow-2xl drop-shadow-olive-500"
            style={{
              top: "50%",
              left: "50%",
              border: "3px solid #add480",
              // boxShadow: "0 0 0 6px rgba(9,131,39,0.08), 0 8px 32px rgba(9,131,39,0.22), 0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Icons/IIT_Logo_green.png"
              alt="IIT Kanpur"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
