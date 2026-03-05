import * as LucideIcons from "lucide-react";

export default function EcoCard({ quadrant, cardRef }) {
  const Icon = LucideIcons[quadrant.icon] ?? LucideIcons.Star;

  return (
    <div
      ref={cardRef}
      className="eco-card relative rounded-3xl p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300"
      style={{
        background: "rgba(255,255,255,0.85)",
        border: `1.5px solid rgba(8,96,32,0.15)`,
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(8,96,32,0.08)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full transition-all duration-300 group-hover:left-4 group-hover:right-4"
        style={{ background: `linear-gradient(90deg, ${quadrant.accent}, #4ade80)` }}
      />

      {/* Icon + Title */}
      <div className="flex items-center gap-3 mt-2">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${quadrant.accent}18, ${quadrant.accent}30)`,
            border: `1.5px solid ${quadrant.accent}30`,
          }}
        >
          <Icon size={22} color={quadrant.accent} strokeWidth={1.8} />
        </div>
        <h3
          className="font-bold text-sm uppercase tracking-wider leading-tight"
          style={{ color: quadrant.accent }}
        >
          {quadrant.title}
        </h3>
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-2.5">
        {quadrant.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${quadrant.accent}15` }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: quadrant.accent }}
              />
            </div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
