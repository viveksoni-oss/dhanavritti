export default function MentorCard({ mentor }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden group cursor-pointer"
      style={{ width: "200px", height: "340px" }} // taller, no rounded corners
    >
      {/* Image */}
      <img
        src={mentor.img}
        alt={mentor.name}
        className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
        style={{ filter: "grayscale(100%) brightness(0.65)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.filter = "grayscale(0%) brightness(0.85)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.filter = "grayscale(100%) brightness(0.65)")
        }
      />

      {/* Permanent dark overlay so heading text is always visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 50%, rgba(8,40,16,0.75) 100%)",
        }}
      />

      {/* Name — slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0"
        style={{ transition: "transform 0.4s ease" }}
      >
        <p className="text-white font-bold text-sm leading-tight">
          {mentor.name}
        </p>
        <p className="text-green-200 text-xs mt-0.5">{mentor.role}</p>
        <p className="text-green-300 text-[10px] mt-0.5 opacity-80">
          {mentor.org}
        </p>
      </div>

      {/* Hover green border */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ border: "2px solid rgba(34,197,94,0.6)" }}
      />
    </div>
  );
}
