import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import WhyDeeptech from "./components/WhyDeeptech";
import Ecosystem from "./components/Ecosystem";
import FocusAreas from "./components/FocusAreas";
import Mentors from "./components/Mentors";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutUs />
      <WhyDeeptech />
      <Ecosystem />
      <FocusAreas />
      <Mentors />
      <Footer />
    </main>
  );
}
