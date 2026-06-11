import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OurTeamSection from "../components/OurTeamSection";

export const metadata = {
  title: "Strategic Advisors",
  description:
    "Meet the scientific, strategic, and venture leaders supporting Dhanavritti Ventures' deep-tech investment platform.",
  alternates: {
    canonical: "/strategic-advisors",
  },
  openGraph: {
    title: "Strategic Advisors | Dhanavritti Ventures",
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
