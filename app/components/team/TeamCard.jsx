import { Linkedin } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";

export default function TeamCard({ member }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="flex flex-col cursor-pointer group relative"
      style={{ background: "transparent", transition: "transform 0.35s ease" }}
      onMouseEnter={() =>
        gsap.to(cardRef.current, {
          y: -10,
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
        })
      }
      onMouseLeave={() =>
        gsap.to(cardRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
        })
      }
    >
      {/* ── Image container — top overflows, sides+bottom clipped ── */}
      <div
        className="w-full relative z-10 rounded-xl"
        style={{
          height: "250px",
          clipPath: "inset(-90px 0 0 0 round  20px)", // ✅ top open 70px, rest clipped
        }}
      >
        {/* Green glow border frame */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none z-0"
          style={{
            border: "1.5px solid rgba(34,197,94,0.7)",
            boxShadow:
              "0 0 0 3px rgba(34,197,94,0.12), " +
              "0 0 20px rgba(34,197,94,0.25), " +
              "inset 0 0 16px rgba(34,197,94,0.06)",
          }}
        />

        {/* Bottom fade — blends image into green content box */}
        <div
          className="absolute -bottom-5 left-0 right-0 z-20 pointer-events-none rounded-b-xl"
          style={{
            height: "80px",
            background: "linear-gradient(to bottom, transparent, #052e0f)",
          }}
        />

        {/* Image — 60px taller than container, overflows top only */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.img}
          alt={member.name}
          className="absolute left-0 right-0 w-full object-cover object-top rounded-xl
                     transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            height: "350px",
            top: "-80px",
            maxHeight: "calc(250px + 80px)",
          }}
        />
      </div>

      {/* ── Green content box ── */}
      <div
        className="relative rounded-xl flex flex-col gap-2.5"
        style={{
          background:
            "linear-gradient(160deg, #052e0f 0%, #07491a 50%, #086020 100%)",
          paddingTop: "44px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingBottom: "18px",
          marginTop: "-24px",
          border: "1.5px solid rgba(34,197,94,0.7)",
          borderTop: "none",
          borderRadius: "0 0 14px 14px",
          boxShadow:
            "0 0 0 3px rgba(34,197,94,0.12), " +
            "0 12px 40px rgba(8,96,32,0.45)",
        }}
      >
        {/* Name + LinkedIn */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p
              className="text-white font-bold leading-tight"
              style={{ fontSize: "0.875rem", letterSpacing: "0.01em" }}
            >
              {member.name}
            </p>
            {member.role && (
              <p
                className="text-green-300 mt-0.5 leading-tight"
                style={{ fontSize: "0.7rem" }}
              >
                {member.role}
              </p>
            )}
          </div>

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={14} strokeWidth={2} />
            </a>
          )}
        </div>

        {/* Green gradient divider */}
        {member.desc && (
          <div
            className="w-full h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)",
            }}
          />
        )}

        {/* Description */}
        {member.desc && (
          <p
            className="leading-relaxed line-clamp-4"
            style={{ color: "rgba(187,247,208,0.85)", fontSize: "0.72rem" }}
          >
            {member.desc}
          </p>
        )}
      </div>
    </div>
  );
}
