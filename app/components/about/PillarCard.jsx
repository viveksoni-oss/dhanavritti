import { FlaskConical, Network, University, TrendingUp } from "lucide-react";

const iconMap = {
  science: FlaskConical,
  ecosystem: Network,
  iitk: University,
  scale: TrendingUp,
};

export default function PillarCard({ pillar, cardRef, arrowRef, isLast }) {
  const Icon = iconMap[pillar.icon];

  return (
    <div className="relative flex items-stretch">
      <div
        ref={cardRef}
        className="flex-1 flex flex-col items-center text-center gap-4 p-6 rounded-2xl hover:shadow-xl transition-shadow duration-300"
        style={{
          background: "rgba(255,255,255,0.92)",
          border: "2px solid rgba(8,96,32,0.15)",
        }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: "rgba(8,96,32,0.06)",
            border: "1.5px solid rgba(8,96,32,0.15)",
          }}
        >
          {Icon && <Icon size={36} color="#086020" strokeWidth={1.5} />}
        </div>

        <h3 className="font-semibold text-base" style={{ color: "#1A1A1A" }}>
          {pillar.title}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
          {pillar.desc}
        </p>
      </div>

      {!isLast && (
        <div
          ref={arrowRef}
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 z-10 items-center"
          style={{ transformOrigin: "left center" }}
        >
          <div className="w-full h-[2px] rounded-full" style={{ background: "rgba(8,96,32,0.35)" }} />
          <div
            className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] flex-shrink-0"
            style={{ borderLeftColor: "rgba(8,96,32,0.45)" }}
          />
        </div>
      )}
    </div>
  );
}
