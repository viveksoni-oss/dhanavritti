export default function MentorCard({ mentor }) {
  return (
    <div
      className={`relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer ${mentor.offset}`}
      style={{ width: "220px", height: "300px" }}
    >
      {/* Grayscale image — color on hover */}
      <img
        src={mentor.img}
        alt={mentor.name}
        className="w-full h-full object-cover object-top transition-all duration-700 ease-out"
        style={{
          filter: "grayscale(100%) brightness(0.75)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = "grayscale(0%) brightness(1)";
          e.currentTarget.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = "grayscale(100%) brightness(0.75)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      />

      {/* Bottom name overlay — slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out"
        style={{
          background: "linear-gradient(0deg, rgba(8,96,32,0.92) 0%, rgba(8,96,32,0.6) 70%, transparent 100%)",
          transition: "transform 0.4s ease",
        }}
      >
        <p className="text-white font-bold text-sm leading-tight">{mentor.name}</p>
        <p className="text-green-200 text-xs mt-0.5">{mentor.role}</p>
        <p className="text-green-300 text-[10px] mt-0.5 opacity-80">{mentor.org}</p>
      </div>

      {/* Subtle border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ border: "2px solid rgba(34,197,94,0.5)" }}
      />
    </div>
  );
}
