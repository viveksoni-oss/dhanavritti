import { Linkedin } from "lucide-react";

export default function MentorCard({ mentor, priority = false }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden w-full"
      style={{ aspectRatio: "210 / 380" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mentor.img}
        alt={mentor.name}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="w-full flex-1 object-cover object-top"
        style={{ filter: "grayscale(100%) brightness(0.75)" }}
      />

      {/* Green gradient detail strip */}
      
    </div>
  );
}
