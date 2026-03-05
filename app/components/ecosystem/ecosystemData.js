import { Search, Network, Users, Lightbulb } from "lucide-react";

export const quadrants = [
  {
    id: "top-left",
    title: "Research Infrastructure",
    Icon: Search,
    points: [
      "25+ advanced research centres",
      "National Cybersecurity Hub (C3iHub)",
      "National Drone Hub",
    ],
    // sub-card on RIGHT, small circle top-left, large circle bottom-right
    mirror: false,
  },
  {
    id: "top-right",
    title: "Dhanavritti",
    Icon: null,         // uses logo image instead
    logoSrc: "/Logo/Dhanavritti-Venture-Transparent-Logo.png",
    points: [
      "India-focused fund",
      "Cat I AIF registered with SEBI",
      "For Deeptech ventures",
    ],
    // sub-card on LEFT, small circle top-right, large circle bottom-left
    mirror: true,
  },
  {
    id: "bottom-left",
    title: "Mentors & Alumni Network",
    Icon: Users,
    points: [
      "45K+ global alumni network",
      "Access to professors & PhDs",
      "IITK unicorn founders (~20%)",
    ],
    mirror: false,
  },
  {
    id: "bottom-right",
    title: "Incubator",
    Icon: Lightbulb,
    points: [
      "500+ startups nurtured",
      "Grant support available",
      "MOUs with DRDO, BEL, HAL",
    ],
    mirror: true,
  },
];
