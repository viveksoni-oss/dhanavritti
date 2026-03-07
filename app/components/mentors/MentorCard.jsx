import { Linkedin } from "lucide-react";

export default function MentorCard({ mentor }) {
  return (
    // ✅ NO marginTop here — positioning is handled by the parent wrapper
    <div
      className="relative flex-shrink-0 flex flex-col overflow-hidden"
      style={{
        width: "210px",
        height: "380px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mentor.img}
        alt={mentor.name}
        className="w-full flex-1 object-cover object-top"
        style={{ filter: "grayscale(100%) brightness(0.75)" }}
      />

      {/* Green gradient detail strip */}
      
    </div>
  );
}
