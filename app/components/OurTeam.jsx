"use client";

import { useRef, useState, useEffect } from "react";

// ✅ Found LinkedIn profiles:
// Anurag Singh (CIO, IITK FIRST): https://www.linkedin.com/in/anurag-singh-8a1101
// Mousum Pal Choudhury (Partner):  https://www.linkedin.com/in/mousum-pal-choudhury-07a8b25
// Vipin Pathak (Partner):          https://www.linkedin.com/in/vipin-pathak

const ORIG_W = 1224; // ← actual width of your team.png in pixels
const ORIG_H = 800; // ← actual height of your team.png in pixels

// Coords from image-map.net at original resolution
const areas = [
  {
    coords: [26, 33, 327, 328],
    href: "https://www.linkedin.com/in/anurag-singh-8a1101",
    label: "Anurag Singh LinkedIn",
  },
  {
    coords: [840, 294, 1148, 547],
    href: "https://www.linkedin.com/in/mousum-pal-choudhury-07a8b25",
    label: "Mousum Pal Choudhury LinkedIn",
  },
  {
    coords: [28, 527, 304, 799],
    href: "https://www.linkedin.com/in/vipin-pathak",
    label: "Vipin Pathak LinkedIn",
  },
];

export default function OurTeam() {
  const imgRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (imgRef.current) {
        setImgSize({
          width: imgRef.current.offsetWidth,
          height: imgRef.current.offsetHeight,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Scale original coords → rendered image size
  const scaleCoords = (coords) => {
    const sx = imgSize.width / ORIG_W;
    const sy = imgSize.height / ORIG_H;
    return coords
      .map((v, i) => Math.round(i % 2 === 0 ? v * sx : v * sy))
      .join(",");
  };

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex items-stretch gap-8">
        {/* ── Image with clickable LinkedIn zones ── */}
        <div className="relative flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/ourTeam/team.png"
            alt="Our Team"
            useMap="#team-map"
            className="w-full h-full object-cover rounded-2xl "
            style={{ display: "block" }}
          />

          <map name="team-map">
            {imgSize.width > 0 &&
              areas.map((area, i) => (
                <area
                  key={i}
                  shape="rect"
                  coords={scaleCoords(area.coords)}
                  href={area.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  alt={area.label}
                  title={area.label}
                />
              ))}
          </map>
        </div>

        {/* ── Vertical TEAM heading ── */}
        <div className="flex flex-col items-center justify-between py-2 select-none">
          {["T", "E", "A", "M"].map((letter, i) => (
            <span
              key={i}
              className="font-bold leading-none"
              style={{
                fontSize: "clamp(3rem, 6vw, 6rem)",
                color: "#1A1A1A",
                fontFamily: "var(--font-display)",
                animation: "fadeSlideIn 0.5s ease forwards",
                animationDelay: `${i * 0.12}s`,
                opacity: 0,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
