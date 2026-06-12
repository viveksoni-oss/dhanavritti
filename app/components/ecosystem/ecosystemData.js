// circleCorner: quarter-circle sits at the INWARD corner (toward IITK logo)
// the rounded-rect accent sits at the OUTWARD corner (computed as inverse in EcoCard)

export const quadrants = [
  {
    id: "top-left",
    title: "Research Infrastructure",
    imgSrc: "/ecosystem/research.svg",
    logoSrc: null,
    points: [
      "25+ advanced research centres",
      "National Cybersecurity Hub (C3iHub)",
      "National Drone Hub",
      "Gangwal School of Medical Sciences",
    ],
    mirror: false,
    cardBg: "linear-gradient(135deg,#e9f5cf 0%,#cde89a 100%)",
    innerGradient: "linear-gradient(135deg,#16a34a 0%,#065f24 100%)",
    circleCorner: { h: "right", v: "bottom" },
  },
  {
    id: "top-right",
    title: "Dhanavritti",
    imgSrc: null,
    logoSrc: "/ecosystem/Dhanavritti-Venture-Logo.png",
    points: [
      "India-focused fund",
      "Cat I AIF registered with SEBI",
      "Direct IITK innovation access",
      "Deeptech leadership think tank",
    ],
    mirror: true,
    cardBg: "linear-gradient(135deg,#e9f5cf 0%,#cde89a 100%)",
    innerGradient: "linear-gradient(135deg,#22c55e 0%,#086020 100%)",
    circleCorner: { h: "left", v: "bottom" },
  },
  {
    id: "bottom-left",
    title: "Mentors & Alumni Network",
    imgSrc: "/ecosystem/mentorAlumni.svg",
    logoSrc: null,
    points: [
      "45K+ global alumni network",
      "Access to professors & PhDs",
      "IITK unicorn founders (~20%)",
      "External industry experts",
    ],
    mirror: false,
    cardBg: "linear-gradient(135deg,#e9f5cf 0%,#cde89a 100%)",
    innerGradient: "linear-gradient(135deg,#13a538 0%,#07571f 100%)",
    circleCorner: { h: "right", v: "top" },
  },
  {
    id: "bottom-right",
    title: "Incubator",
    imgSrc: "/ecosystem/incubator.svg",
    logoSrc: null,
    points: [
      "500+ startups nurtured",
      "Grant support available",
      "MOUs with DRDO, BEL, HAL",
      "4 Centres of Excellence",
    ],
    mirror: true,
    cardBg: "linear-gradient(135deg,#e9f5cf 0%,#cde89a 100%)",
    innerGradient: "linear-gradient(135deg,#28b446 0%,#064f1d 100%)",
    circleCorner: { h: "left", v: "top" },
  },
];
