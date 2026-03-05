// components/ecosystem/EcosystemCard.jsx
export default function EcosystemCard({
  title,
  icon,
  points,
  // flips circle corners + sub-card side for mirrored cards
  mirror = false,
}) {
  return (
    <div className="relative overflow-hidden bg-[#e8f0de] flex items-center gap-6 p-8">

      {/* ── Small partial circle (outer top corner) ── */}
      <div
        className="absolute w-50 h-50 rounded-full border-[3px] border-green-800"
        style={{
          top:   mirror ? "auto" : "-28px",
          left:  mirror ? "auto" : "-28px",
          bottom: mirror ? "-28px" : "auto",
          right:  mirror ? "-28px" : "auto",
        }}
      />

      {/* ── Large partial circle (inner corner = same radius as IITK center) ── */}
      <div
        className="absolute w-400 h-400 rounded-full border-[3px] border-green-600/40"
        style={{
          bottom: mirror ? "auto" : "-80px",
          right:  mirror ? "auto" : "-80px",
          top:    mirror ? "-80px" : "auto",
          left:   mirror ? "-80px" : "auto",
        }}
      />

      {/* ── Content side (bullet points) ── */}
      {!mirror && (
        <ul className="flex-1 space-y-3 text-sm text-gray-700 relative z-10">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}

      {/* ── Sub-card ── */}
      <div className="relative w-44 h-48 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center gap-4 p-4 flex-shrink-0 z-10">
        {/* Green leaf corner accent */}
        <div
          className="absolute w-8 h-8 bg-green-400 rounded-full"
          style={{
            top:   mirror ? "auto" : "-12px",
            left:  mirror ? "auto" : "auto",
            right: mirror ? "auto" : "-12px",
            // inner top corner toward center
            ...(mirror
              ? { bottom: "-12px", left: "-12px" }
              : { top: "-12px", right: "-12px" }),
          }}
        />
        <p className="text-[11px] font-bold text-center text-gray-600 uppercase tracking-widest leading-tight">
          {title}
        </p>
        <div className="text-5xl">{icon}</div>
      </div>

      {/* ── Content side (mirrored cards) ── */}
      {mirror && (
        <ul className="flex-1 space-y-3 text-sm text-gray-700 relative z-10">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
