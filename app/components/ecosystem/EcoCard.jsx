"use client";

/* ── Desktop icon rectangle (sm+) ───────────────────────────────────────── */
function IconRect({ title, imgSrc, logoSrc, circleCorner, innerGradient, isBottom }) {
  const circleStyle = {
    width: 112, height: 112, borderRadius: "50%",
    background: innerGradient, opacity: 0.55, position: "absolute",
    [circleCorner.h]: -61, [circleCorner.v]: -61,
  };
  const rectH = circleCorner.h === "right" ? "left" : "right";
  const rectV = circleCorner.v === "bottom" ? "top" : "bottom";
  const rectStyle = {
    width: 100, height: 100, borderRadius: 30,
    background: innerGradient, opacity: 0.48, position: "absolute",
    [rectH]: -62, [rectV]: -62,
  };
  const src = logoSrc || imgSrc;

  return (
    <div
      className="relative overflow-hidden flex-shrink-0 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3 z-10"
      style={{ width: "clamp(120px, 17vw, 176px)", minHeight: "clamp(130px, 18vw, 180px)", margin: "clamp(6px, 1.2vw, 12px)" }}
    >
      <div style={circleStyle} />
      <div style={rectStyle} />
      {isBottom ? (
        <>
          {src && <img src={src} alt={title} className="relative z-10 object-contain" style={{ width: "clamp(48px, 8vw, 76px)", height: "clamp(48px, 8vw, 76px)" }} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <p className="relative z-10 text-[10px] font-bold text-center uppercase tracking-widest leading-tight px-3" style={{ color: "#4B5563" }}>{title}</p>
        </>
      ) : (
        <>
          <p className="relative z-10 text-[10px] font-bold text-center uppercase tracking-widest leading-tight px-3" style={{ color: "#4B5563" }}>{title}</p>
          {src && <img src={src} alt={title} className="relative z-10 object-contain" style={{ width: "clamp(48px, 8vw, 76px)", height: "clamp(48px, 8vw, 76px)" }} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
        </>
      )}
    </div>
  );
}

function BulletList({ points, mobile = false }) {
  return (
    <ul className={`flex flex-col gap-2.5 relative z-10 ${mobile ? "w-full px-5 pt-3 pb-5" : "flex-1 justify-center px-5 py-5"}`}>
      {points.map((p, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-snug">
          <span className="mt-[5px] w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#086020" }} />
          <span className="font-semibold" style={{ color: "#1a3320" }}>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export default function EcoCard({ quadrant, isBottom = false }) {
  const { title, imgSrc, logoSrc, points, mirror, cardBg, innerGradient, circleCorner } = quadrant;
  const src = logoSrc || imgSrc;

  const outerSmall = {
    position: "absolute", width: 64, height: 64, borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.5)", top: -32,
    ...(mirror ? { right: -32 } : { left: -32 }),
  };

  // Mobile accent — pushed far enough into corners so they don't touch the icon
  const mobileCircle = {
    width: 80, height: 80, borderRadius: "50%",
    background: innerGradient, opacity: 0.2, position: "absolute",
    right: -44, top: -44,
  };
  const mobileRect = {
    width: 70, height: 70, borderRadius: 16,
    background: innerGradient, opacity: 0.14, position: "absolute",
    left: -44, bottom: -44,
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      style={{ background: cardBg, border: "1.5px solid rgba(255,255,255,0.35)" }}
    >
      <div style={outerSmall} />

      {/* ── Mobile layout (< sm): icon header row + full-width bullets ── */}
      <div className="sm:hidden flex flex-col">
        <div className="relative overflow-hidden flex items-center gap-3 bg-white/60 px-4 py-2 mx-3 mt-3 rounded-xl">
          <div style={mobileCircle} />
          <div style={mobileRect} />
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={title} className="relative z-10 w-10 h-10 object-contain flex-shrink-0" />
          )}
          <p className="relative z-10 text-[15px] font-extrabold tracking-wide leading-tight" style={{ color: "#086020", fontFamily: "var(--font-display)" }}>
            {title}
          </p>
        </div>
        <BulletList points={points} mobile />
      </div>

      {/* ── Desktop layout (sm+): mirror side-by-side ── */}
      <div className="hidden sm:flex items-center" style={{ minHeight: 200 }}>
        {mirror ? (
          <>
            <IconRect title={title} imgSrc={imgSrc} logoSrc={logoSrc} circleCorner={circleCorner} innerGradient={innerGradient} isBottom={isBottom} />
            <BulletList points={points} />
          </>
        ) : (
          <>
            <BulletList points={points} />
            <IconRect title={title} imgSrc={imgSrc} logoSrc={logoSrc} circleCorner={circleCorner} innerGradient={innerGradient} isBottom={isBottom} />
          </>
        )}
      </div>
    </div>
  );
}
