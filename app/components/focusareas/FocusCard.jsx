import * as LucideIcons from "lucide-react";

export default function FocusCard({ area, isCenter }) {
  const Icon = LucideIcons[area.icon] ?? LucideIcons.Star;

  return (
    <div
      className="relative rounded-3xl overflow-hidden flex-shrink-0 group transition-all duration-500 ease-out"
      style={{
        width: isCenter ? "280px" : "220px",
        height: isCenter ? "380px" : "300px",
        alignSelf: "center",
        background: isCenter
          ? "linear-gradient(160deg, #ffffff 0%, #dcfce7 30%, #86efac 70%, #16a34a 100%)"
          : "linear-gradient(160deg, #ffffff 0%, #f0fdf4 40%, #bbf7d0 100%)",
        border: isCenter
          ? "2px solid rgba(22,163,74,0.4)"
          : "1.5px solid rgba(22,163,74,0.2)",
        boxShadow: isCenter
          ? "0 24px 60px rgba(22,163,74,0.3), 0 4px 20px rgba(22,163,74,0.15)"
          : "0 4px 24px rgba(22,163,74,0.1)",
      }}
    >
      {/* Top shine */}
      <div
        className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-between p-6 text-center">
        {/* Icon bubble */}
        <div
          className="flex items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
          style={{
            width: isCenter ? "84px" : "68px",
            height: isCenter ? "84px" : "68px",
            marginTop: isCenter ? "20px" : "14px",
            background: isCenter
              ? "linear-gradient(135deg, #16a34a, #22c55e)"
              : "linear-gradient(135deg, #22c55e, #86efac)",
            boxShadow: isCenter
              ? "0 8px 24px rgba(22,163,74,0.4)"
              : "0 4px 12px rgba(34,197,94,0.25)",
          }}
        >
          <Icon size={isCenter ? 38 : 30} color="white" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2 pb-2">
          <h3
            className="font-bold leading-tight"
            style={{
              fontSize: isCenter ? "1.05rem" : "0.9rem",
              color: "#1a1a1a",
            }}
          >
            {area.title}
          </h3>
          <p
            className="leading-relaxed"
            style={{
              fontSize: isCenter ? "0.85rem" : "0.78rem",
              color: isCenter ? "#374151" : "#6b7280",
            }}
          >
            {area.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
