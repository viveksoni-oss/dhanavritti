import Image from "next/image";

export default function MentorCard({
  mentor,
  priority = false,
  filter = "grayscale(100%) brightness(0.75)",
}) {
  return (
    <div
      className="relative w-full flex-none overflow-hidden"
      style={{
        aspectRatio: "210 / 380",
        background:
          "linear-gradient(135deg, rgba(26,26,26,0.2), rgba(107,114,128,0.34))",
      }}
    >
      <Image
        src={mentor.img}
        alt={mentor.name}
        width={210}
        height={380}
        priority={priority}
        sizes="(max-width: 768px) calc((100vw - 64px) / 6), 210px"
        unoptimized
        className="h-full w-full object-cover object-top"
        style={{ filter }}
      />

      {/* Green gradient detail strip */}
      
    </div>
  );
}
