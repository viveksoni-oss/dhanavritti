"use client";

import { useRef, useState, useEffect } from "react";

const ORIG_W = 1035;
const ORIG_H = 726;
const LINKEDIN_URL = "https://www.linkedin.com/";

// Rectangles are based on the original 1035 x 726 team image.
const areas = [
  {
    coords: [0, 20, 250, 276],
    href: "https://www.linkedin.com/in/anurag-singh-8a1101",
    label: "Anurag Singh LinkedIn",
  },
  {
    coords: [658, 258, 1000, 484],
    href: LINKEDIN_URL,
    label: "Mousum Pal Choudhury LinkedIn",
  },
  {
    coords: [0, 466, 362, 720],
    href: LINKEDIN_URL,
    label: "Arindam Mukhopadhyay LinkedIn",
  },
];

export default function OurTeam() {
  const imgRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (!imgRef.current) return;

      setImgSize({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    if (imgRef.current) observer.observe(imgRef.current);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const scaleCoords = (coords) => {
    const sx = imgSize.width / ORIG_W;
    const sy = imgSize.height / ORIG_H;
    return coords
      .map((v, i) => Math.round(i % 2 === 0 ? v * sx : v * sy))
      .join(",");
  };

  return (
    <section id="our-team" className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex items-stretch gap-8">
        <div className="relative flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/ourTeam/team.png"
            alt="Our Team"
            useMap="#team-map"
            className="w-full h-full object-cover rounded-2xl"
            style={{ display: "block" }}
            onLoad={() => {
              if (!imgRef.current) return;
              setImgSize({
                width: imgRef.current.offsetWidth,
                height: imgRef.current.offsetHeight,
              });
            }}
          />

          <map name="team-map">
            {imgSize.width > 0 &&
              areas.map((area) => (
                <area
                  key={area.label}
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

        <div className="flex flex-col items-center justify-between py-2 select-none">
          {["T", "E", "A", "M"].map((letter, i) => (
            <span
              key={letter}
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
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
