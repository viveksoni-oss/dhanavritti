"use client";

export default function PillarCard({ pillar, cardRef, isLast }) {
  const Icon = pillar.icon;

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col gap-4 rounded-2xl p-6 group transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.12)" }}
      >
        <Icon size={22} color="white" strokeWidth={1.5} />
      </div>

      {/* Stat */}
      <div>
        <p className="text-3xl font-bold leading-none" style={{ color: "#c1ff72" }}>
          {pillar.stat}
        </p>
        <p className="text-xs mt-1 uppercase tracking-wider font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
          {pillar.statLabel}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.1)" }} />

      {/* Text */}
      <div>
        <p className="text-base font-semibold text-white mb-1.5">{pillar.title}</p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          {pillar.desc}
        </p>
      </div>

      {/* Hover glow from top */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(193,255,114,0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
