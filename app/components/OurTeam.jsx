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

function TeamMemberCard({ member, index }) {
  const isReverse = index % 2 === 1;
  const clipPath = isReverse
    ? "polygon(0 calc(50% - 70px), 100% 0, 100% 265px, 0 calc(50% + 70px))"
    : "polygon(0 0, 100% calc(50% - 70px), 100% calc(50% + 70px), 0 265px)";

  const photo = (
    <div className="relative min-h-[220px] overflow-visible sm:min-h-[245px] lg:min-h-[265px] ">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 220px, 260px"
          priority={index === 0}
          className={`object-contain ${
            isReverse ? "object-right-bottom" : "object-left-bottom"
          }`}
        />
      </div>

      <div
        className={`absolute bottom-0 z-10 px-3 py-3 sm:px-4 ${
          isReverse ? "right-0 text-right" : "left-0 text-left"
        }`}
        style={{
          width: "fit-content",
          minWidth: "250px",
          maxWidth: "min(220%, 460px)",
          background: isReverse
            ? "linear-gradient(270deg, rgba(245,245,240,0.94) 0%, rgba(245,245,240,0.74) 58%, rgba(245,245,240,0.24) 82%, rgba(245,245,240,0) 100%)"
            : "linear-gradient(90deg, rgba(245,245,240,0.94) 0%, rgba(245,245,240,0.74) 58%, rgba(245,245,240,0.24) 82%, rgba(245,245,240,0) 100%)",
        }}
      >
        <h3
          className="whitespace-nowrap font-extrabold uppercase leading-none"
          style={{
            color: "var(--charcoal)",
            fontSize: "clamp(0.72rem, 1.6vw, 1.2rem)",
            letterSpacing: "0.02em",
          }}
        >
          {member.name}
        </h3>
        <div
          className={`mt-1.5 flex items-center gap-2 ${
            isReverse ? "justify-end" : ""
          }`}
        >
          <span
            className="whitespace-nowrap leading-none"
            style={{
              color: "#41544b",
              fontSize: "clamp(0.64rem, 1.15vw, 0.95rem)",
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
              className="inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[3px] bg-[#0A66C2] text-white sm:h-5 sm:w-5"
            >
              <Linkedin className="h-[70%] w-[70%]" strokeWidth={2.4} />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const content = (
    <div className="flex min-w-0 items-center px-5 py-10 sm:px-8 lg:px-12">
      <ul
        className="flex flex-col gap-2 text-white"
        style={{
          filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.32))",
          fontSize: "clamp(0.78rem, 1.55vw, 1.18rem)",
          lineHeight: 1.35,
        }}
      >
        {member.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span className="mt-[0.55em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white opacity-90" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <article
      className="relative w-full -my-5"
      style={{
        filter:
          "drop-shadow(0 24px 16px rgba(26,26,26,0.34)) drop-shadow(0 8px 8px rgba(8,96,32,0.2))",
      }}
    >
      <div
        className={`relative grid min-h-[220px] overflow-hidden sm:min-h-[245px] lg:min-h-[265px] ${
          isReverse
            ? "grid-cols-[1fr_150px] sm:grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px]"
            : "grid-cols-[150px_1fr] sm:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]"
        }`}
        style={{
          clipPath,
          backgroundImage: `url("data:image/svg+xml,${BAND_TEXTURE}"), linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px), radial-gradient(ellipse at 12% 0%, rgba(255,255,255,0.16) 0%, transparent 48%), linear-gradient(105deg, var(--green-primary) 0%, #1f9a3a 46%, var(--green-dark) 100%)`,
          backgroundSize:
            "140px 140px, 35px 35px, 35px 35px, 100% 100%, 100% 100%",
        }}
      >
        {isReverse ? (
          <>
            {content}
            {photo}
          </>
        ) : (
          <>
            {photo}
            {content}
          </>
        )}
      </div>
    </article>
  );
}

export default function OurTeam() {
  return (
    <section
      id="our-team"
      className="w-full overflow-hidden px-3 py-12 sm:px-4 sm:py-16"
      style={{ background: "var(--off-white)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-stretch gap-3 sm:gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-0">
          {ourTeamMembers.map((member, index) => (
            <TeamMemberCard
              key={`${member.name}-${index}`}
              member={member}
              index={index}
            />
          ))}
        </div>

        <aside className="hidden flex-none items-center justify-center sm:flex">
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
