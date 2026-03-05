export default function EcoCard({ quadrant, cardRef, position = "top" }) {
  const { title, Icon, logoSrc, points, mirror } = quadrant;
  const isBottom = position === "bottom";

  const BulletList = () => (
    <ul className="flex-1 flex flex-col justify-center gap-4 relative z-10 px-6 py-6">
      {points.map((p, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-snug" style={{ color: "#374151" }}>
          <span
            className="mt-[5px] w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: "#086020" }}
          />
          <span className="font-medium">{p}</span>
        </li>
      ))}
    </ul>
  );

  const SubCard = () => (
    <div
      className="relative flex-shrink-0 w-48 overflow-hidden flex flex-col items-center justify-center gap-4 rounded-2xl p-6 shadow-xl z-10 m-4"
      style={{
        background: "white",
        minHeight: "180px",
      }}
    >
      {/*
        Green circle accent:
        - top cards   → top corner (toward outside edge)
        - bottom cards → bottom corner (toward outside edge)
        - mirror=false → left side | mirror=true → right side
      */}
      <div
        className="absolute w-20 h-20 rounded-full"
        style={{
          background: "linear-gradient(135deg, #86efac, #22c55e)",
          ...(isBottom
            ? {
                bottom: "-36px",
                ...(mirror ? { right: "-36px" } : { left: "-36px" }),
              }
            : {
                top: "-36px",
                ...(mirror ? { right: "-36px" } : { left: "-36px" }),
              }),
        }}
      />

      <p
        className="text-[10px] font-bold text-center uppercase tracking-widest leading-tight relative z-10"
        style={{ color: "#4B5563" }}
      >
        {title}
      </p>

      {logoSrc ? (
        <img src={logoSrc} alt={title} className="w-20 h-20 object-contain relative z-10" />
      ) : (
        Icon && (
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
            style={{ background: "rgba(8,96,32,0.07)", border: "1px solid rgba(8,96,32,0.1)" }}
          >
            <Icon size={28} strokeWidth={1.5} color="#086020" />
          </div>
        )
      )}
    </div>
  );

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden flex items-center rounded-3xl"
      style={{
        background: "linear-gradient(135deg, #ddf0b8 0%, #cce8a0 100%)",
        minHeight: "200px",
        border: "1.5px solid rgba(134,239,172,0.6)",
      }}
    >
      {/* Small partial circle — outer corner (away from center) */}
      <div
        className="absolute w-20 h-20 rounded-full"
        style={{
          border: "3px solid rgba(134,239,172,0.9)",
          ...(mirror
            ? { top: "-40px", right: "-40px" }
            : { top: "-40px", left: "-40px" }),
        }}
      />

      {/* Large partial circle — inner corner (toward grid center) */}
      <div
        className="absolute w-52 h-52 rounded-full"
        style={{
          border: "3px solid rgba(34,197,94,0.25)",
          ...(mirror
            ? { bottom: "-104px", left: "-104px" }
            : { bottom: "-104px", right: "-104px" }),
        }}
      />

      {mirror ? (
        <>
          <SubCard />
          <BulletList />
        </>
      ) : (
        <>
          <BulletList />
          <SubCard />
        </>
      )}
    </div>
  );
}
