// components/ecosystem/EcosystemGrid.jsx
import EcosystemCard from "./EcosystemCard";

const cards = [
  {
    title: "Research Infrastructure",
    icon: "🔬",
    mirror: false,
    points: [
      "25+ advanced research centres",
      "National Cybersecurity Hub (C3iHub)",
      "National Drone Hub",
    ],
  },
  {
    title: "Dhanavritti",
    icon: "₹",
    mirror: true,
    points: [
      "India-focused fund",
      "Cat I AIF registered with SEBI",
      "For Deeptech ventures",
    ],
  },
  {
    title: "Mentors & Alumni Network",
    icon: "🤝",
    mirror: false,
    points: [
      "45K+ global alumni network",
      "Access to professors & PhDs",
      "IITK unicorn founders (~20%)",
    ],
  },
  {
    title: "Incubator",
    icon: "💡",
    mirror: true,
    points: [
      "500+ startups nurtured",
      "Grant support available",
      "MOUs with DRDO, BEL, HAL",
    ],
  },
];

export default function EcosystemGrid() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">

      {/* 2x2 grid */}
      <div className="grid grid-cols-2">
        {cards.map((card, i) => (
          <EcosystemCard key={i} {...card} />
        ))}
      </div>

      {/* ── IITK Logo — absolute center ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center z-20 border-4 border-green-600"
      >
        <img
          src="/iitk-logo.png"
          alt="IIT Kanpur"
          className="w-28 h-28 object-contain"
        />
      </div>

    </div>
  );
}
