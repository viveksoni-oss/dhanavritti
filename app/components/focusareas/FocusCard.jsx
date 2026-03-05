export default function FocusCard({ area, isCenter }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden w-full transition-all duration-500"
      style={{
        aspectRatio: "2/3",
        boxShadow: isCenter
          ? "0 32px 64px rgba(0,0,0,0.22)"
          : "0 6px 20px rgba(0,0,0,0.08)",
        background: "#e8f0e8",
      }}
    >
      {/* Full bleed image */}
      <img
        src={area.img}
        alt={area.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isCenter
            ? "linear-gradient(to bottom, transparent 45%, rgba(8,96,32,0.82) 100%)"
            : "linear-gradient(to bottom, transparent 50%, rgba(8,40,16,0.7) 100%)",
        }}
      />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className="font-semibold leading-snug whitespace-pre-line text-center text-white"
          style={{ fontSize: isCenter ? "1rem" : "0.8rem" }}
        >
          {area.title}
        </h3>
      </div>
    </div>
  );
}
