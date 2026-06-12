"use client";

function IconRect({ title, imgSrc, logoSrc, circleCorner, innerGradient, isBottom }) {
  // Quarter-circle at the INWARD corner (toward IIT logo center)
  const circleStyle = {
    width: 112,
    height: 112,
    borderRadius: "50%",
    background: innerGradient,
    opacity: 0.55,
    position: "absolute",
    [circleCorner.h]: -61,
    [circleCorner.v]: -61,
  };

  // Rounded-rect at the OUTWARD corner (opposite of circle)
  const rectH = circleCorner.h === "right" ? "left" : "right";
  const rectV = circleCorner.v === "bottom" ? "top" : "bottom";
  const rectStyle = {
    width: 100,
    height: 100,
    borderRadius: 30,
    background: innerGradient,
    opacity: 0.48,
    position: "absolute",
    [rectH]: -62,
    [rectV]: -62,
  };

  const src = logoSrc || imgSrc;

  return (
    <div
      className="relative overflow-hidden flex-shrink-0 bg-white rounded-xl md:rounded-2xl shadow-sm flex flex-col items-center justify-center gap-2 md:gap-3 z-10"
      style={{ width: "clamp(96px, 17vw, 176px)", minHeight: "clamp(110px, 18vw, 180px)", margin: "clamp(5px, 1.2vw, 12px)" }}
    >
      <div style={circleStyle} />
      <div style={rectStyle} />

      {/* Bottom-row cards: icon first, title below. Top-row: title first, icon below. */}
      {isBottom ? (
        <>
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={title} className="relative z-10 object-contain" style={{ width: "clamp(38px, 8vw, 76px)", height: "clamp(38px, 8vw, 76px)" }} />
          )}
          <p className="relative z-10 text-[8px] md:text-[10px] font-bold text-center uppercase tracking-widest leading-tight px-2 md:px-3" style={{ color: "#4B5563" }}>
            {title}
          </p>
        </>
      ) : (
        <>
          <p className="relative z-10 text-[8px] md:text-[10px] font-bold text-center uppercase tracking-widest leading-tight px-2 md:px-3" style={{ color: "#4B5563" }}>
            {title}
          </p>
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={title} className="relative z-10 object-contain" style={{ width: "clamp(38px, 8vw, 76px)", height: "clamp(38px, 8vw, 76px)" }} />
          )}
        </>
      )}
    </div>
  );
}

function BulletList({ points }) {
  return (
    <ul className="flex-1 flex flex-col justify-center gap-3 px-5 py-5 relative z-10">
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

  const outerSmall = {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.5)",
    top: -32,
    ...(mirror ? { right: -32 } : { left: -32 }),
  };

  return (
    <div
      className="relative overflow-hidden flex items-center rounded-3xl"
      style={{
        background: cardBg,
        border: "1.5px solid rgba(255,255,255,0.35)",
        minHeight: 200,
      }}
    >
      <div style={outerSmall} />

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
  );
}
