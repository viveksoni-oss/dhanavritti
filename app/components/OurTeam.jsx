"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { ourTeamMembers } from "./team/ourTeamData";

const BAND_TEXTURE = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>` +
    `<g fill='none' stroke-linejoin='round' stroke-linecap='round' stroke-width='1.5'>` +
    `<path d='M0 96 L28 64 L56 84 L84 48 L112 72 L140 96' stroke='rgba(255,255,255,0.075)'/>` +
    `<path d='M0 131 L28 99 L56 119 L84 83 L112 107 L140 131' stroke='rgba(8,96,32,0.2)'/>` +
    `</g></svg>`,
);

const BG_STYLE = {
  backgroundImage: `url("data:image/svg+xml,${BAND_TEXTURE}"), linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), radial-gradient(ellipse at 12% 0%, rgba(255,255,255,0.16) 0%, transparent 48%), linear-gradient(105deg, var(--green-primary) 0%, #1f9a3a 46%, var(--green-dark) 100%)`,
  backgroundSize: "140px 140px, 35px 35px, 35px 35px, 100% 100%, 100% 100%",
};

const SHADOW =
  "drop-shadow(0 20px 14px rgba(26,26,26,0.3)) drop-shadow(0 6px 8px rgba(8,96,32,0.18))";

function Nameplate({ member, isReverse, mobile = false }) {
  return (
    <div
      className={mobile ? "px-3 py-2.5" : `px-4 py-3 ${isReverse ? "text-right" : "text-left"}`}
      style={{
        background: mobile
          ? "linear-gradient(90deg, rgba(245,245,240,0.96) 0%, rgba(245,245,240,0.82) 68%, rgba(245,245,240,0.18) 100%)"
          : isReverse
          ? "linear-gradient(270deg, rgba(245,245,240,0.94) 0%, rgba(245,245,240,0.74) 58%, rgba(245,245,240,0) 100%)"
          : "linear-gradient(90deg, rgba(245,245,240,0.94) 0%, rgba(245,245,240,0.74) 58%, rgba(245,245,240,0) 100%)",
      }}
    >
      <h3
        className="whitespace-nowrap font-extrabold uppercase leading-none"
        style={{
          color: "var(--charcoal)",
          fontSize: mobile ? "0.82rem" : "clamp(0.54rem, 1.28vw, 1rem)",
          letterSpacing: "0.03em",
        }}
      >
        {member.name}
      </h3>
      <div className={`mt-1 flex items-center gap-2 ${isReverse && !mobile ? "justify-end" : ""}`}>
        <span
          className="whitespace-nowrap"
          style={{
            color: "#41544b",
            fontSize: mobile ? "0.75rem" : "clamp(0.5rem, 1.3vw, 0.92rem)",
            lineHeight: 1,
          }}
        >
          {member.role}
        </span>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="relative z-50 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[3px] bg-[#0A66C2] text-white"
          >
            <Linkedin className="h-[70%] w-[70%]" strokeWidth={2.4} />
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Mobile card: photo left (full-figure contained) + name+bullets right ── */
function MobileCard({ member, index }) {
  const isReverse = index % 2 === 1;
  const clipPath = isReverse
    ? "polygon(0 18px, 100% 0, 100% calc(100% - 18px), 0 100%)"
    : "polygon(0 0, 100% 18px, 100% 100%, 0 calc(100% - 18px))";

  const photoSide = (
    <div className="relative overflow-hidden">
      <Image
        src={member.img}
        alt={member.name}
        fill
        sizes="148px"
        priority={index === 0}
        className="object-contain object-bottom"
      />
    </div>
  );

  const contentSide = (
    <div className="flex min-w-0 flex-col justify-center gap-2.5 py-4 pl-2 pr-4" style={{ overflow: "hidden" }}>
      {/* Name block */}
      <div>
        <h3
          className="whitespace-nowrap font-extrabold uppercase leading-tight"
          style={{ color: "var(--charcoal)", fontSize: "0.68rem", letterSpacing: "0.02em" }}
        >
          {member.name}
        </h3>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="whitespace-nowrap" style={{ color: "#41544b", fontSize: "0.62rem", lineHeight: 1 }}>
            {member.role}
          </span>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="relative z-50 inline-flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-[2px] bg-[#0A66C2] text-white"
            >
              <Linkedin className="h-[70%] w-[70%]" strokeWidth={2.4} />
            </a>
          )}
        </div>
      </div>
      {/* Bullets */}
      <ul
        className="flex flex-col gap-1.5 text-white"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.28))", fontSize: "0.69rem", lineHeight: 1.38 }}
      >
        {member.points.map((pt) => (
          <li key={pt} style={{ display: "grid", gridTemplateColumns: "8px 1fr", gap: "6px", alignItems: "start" }}>
            <span className="mt-[0.55em] h-1 w-1 rounded-full bg-white opacity-90" style={{ justifySelf: "center" }} />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const gridCols = isReverse
    ? "1fr 38%"
    : "38% 1fr";

  return (
    <article className="relative my-1.5 w-full" style={{ filter: SHADOW }}>
      <div
        className="relative overflow-hidden"
        style={{
          clipPath,
          minHeight: 160,
          display: "grid",
          gridTemplateColumns: gridCols,
          ...BG_STYLE,
        }}
      >
        {isReverse ? <>{contentSide}{photoSide}</> : <>{photoSide}{contentSide}</>}
      </div>
    </article>
  );
}

/* ── Desktop card: side-by-side ── */
function DesktopCard({ member, index, spacious = false }) {
  const isReverse = index % 2 === 1;
  const desktopClipPath = isReverse
    ? "polygon(0 calc(50% - 70px), 100% 0, 100% 265px, 0 calc(50% + 70px))"
    : "polygon(0 0, 100% calc(50% - 70px), 100% calc(50% + 70px), 0 265px)";

  const photoCol = (
    <div className="relative min-h-[245px] lg:min-h-[265px]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="(max-width: 1024px) 220px, 260px"
          priority={index === 0}
          className={`object-contain ${isReverse ? "object-right-bottom" : "object-left-bottom"}`}
        />
      </div>
      {/* Nameplate over photo bottom */}
      <div
        className={`absolute bottom-0 z-40 ${
          isReverse ? "right-0 text-right" : "left-0"
        }`}
        style={{ width: "265px" }}
      >
        <Nameplate member={member} isReverse={isReverse} />
      </div>
    </div>
  );

  const contentCol = (
    <div className="flex min-w-0 items-center px-8 py-10 lg:px-12">
      <ul
        className="flex flex-col gap-2.5 text-white"
        style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.32))", fontSize: "clamp(0.72rem, 1.6vw, 1.1rem)", lineHeight: 1.3 }}
      >
        {member.points.map((pt) => (
          <li key={pt} className="flex items-start gap-3">
            <span className="mt-[0.55em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white opacity-90" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <article className={`relative w-full ${spacious ? "my-0" : "-my-5"}`} style={{ filter: SHADOW, zIndex: spacious ? undefined : 20 - index }}>
      <div
        className={`team-banner-card relative grid min-h-[245px] overflow-hidden lg:min-h-[265px] ${
          isReverse
            ? "grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px]"
            : "grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]"
        }`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ...BG_STYLE,
          "--desktop-clip-path": desktopClipPath,
        }}
      >
        {isReverse ? <>{contentCol}{photoCol}</> : <>{photoCol}{contentCol}</>}
      </div>
    </article>
  );
}

function TeamMemberCard({ member, index }) {
  return (
    <>
      {/* mobile + sm: mobile card */}
      <div className="md:hidden">
        <MobileCard member={member} index={index} />
      </div>
      {/* md only: zoomed + spacious (heading is at top instead of aside) */}
      <div className="hidden md:block lg:hidden" style={{ zoom: "72%" }}>
        <DesktopCard member={member} index={index} spacious />
      </div>
      {/* lg+: full-size, original overlap layout */}
      <div className="hidden lg:block">
        <DesktopCard member={member} index={index} />
      </div>
    </>
  );
}

export default function OurTeam() {
  return (
    <section
      id="our-team"
      className="w-full px-3 py-12 md:px-4 md:py-16 md:pt-1"
      style={{ background: "var(--off-white)" }}
    >
      {/* Section heading — md range only (below lg, replaces the vertical TEAM aside) */}
      <div className="hidden md:flex lg:hidden flex-col items-center text-center mb-10">
        <span
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
          style={{ background: "rgba(8,96,32,0.08)", color: "#086020", border: "1px solid rgba(8,96,32,0.2)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
          The People Behind DV
        </span>
        <h2
          className="text-4xl sm:text-5xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
        >
          Our{" "}
          <span
            className="italic pr-1"
            style={{
              background: "linear-gradient(135deg,#086020 0%,#22c55e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Team
          </span>
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-stretch gap-3 md:gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-0 md:gap-5 lg:gap-0">
          {ourTeamMembers.map((member, index) => (
            <TeamMemberCard
              key={`${member.name}-${index}`}
              member={member}
              index={index}
            />
          ))}
        </div>

        {/* Vertical TEAM letters — lg+ only */}
        <aside className="hidden lg:flex flex-none items-center justify-center">
          <div
            className="flex flex-col items-center justify-center"
            style={{ gap: "clamp(0.45rem, 1.25vw, 1.1rem)" }}
            aria-label="Team"
          >
            {["T", "E", "A", "M"].map((letter) => (
              <span
                key={letter}
                className="font-bold leading-none"
                style={{
                  color: "var(--green-dark)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 4.7vw, 4.4rem)",
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
