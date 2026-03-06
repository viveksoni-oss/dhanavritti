import Image from "next/image";

export default function OurTeam() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <h2
        className="text-center text-4xl sm:text-5xl font-bold mb-14"
        style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
      >
        Our Team
      </h2>
      <div className="max-w-4xl mx-auto">
        <Image
          src="/ourTeam/team.png"
          alt="Our Team"
          className="w-full h-auto rounded-2xl shadow-lg"
          width={1000}
          height={1000}
        />
      </div>
    </section>
  );
}
