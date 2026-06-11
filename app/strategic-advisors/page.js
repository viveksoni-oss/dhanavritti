import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OurTeamSection from "../components/OurTeamSection";

export const metadata = {
  title: "Strategic Advisors and Deep-Tech Leadership",
  description:
    "Meet the Deep Tech Leadership Think Tank (DTLTT), the visionaries, scientists, and strategists backing India's deep-tech future with Dhanavritti Ventures.",
  alternates: {
    canonical: "/strategic-advisors",
  },
  openGraph: {
    title: "Strategic Advisors and Deep-Tech Leadership | Dhanavritti Ventures",
    description:
      "Meet the scientific, strategic, and venture leaders supporting Dhanavritti Ventures' deep-tech investment platform.",
    url: "/strategic-advisors",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic Advisors | Dhanavritti Ventures",
    description:
      "Scientific and strategic advisors supporting India's deep-tech startup ecosystem.",
    images: ["/og-image.png"],
  },
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
