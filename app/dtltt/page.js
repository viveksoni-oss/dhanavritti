import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OurTeamSection from "../components/OurTeamSection";

export const metadata = {
  title: "Our Team | Dhanavritti Ventures",
  description:
    "Meet the Deep Tech Leadership Think Tank (DTLTT) — the visionaries, scientists, and strategists backing India's deep-tech future.",
};

export default function OurTeamPage() {
  return (
    <main>
      <Navbar />
      <OurTeamSection />
      <Footer />
    </main>
  );
}
