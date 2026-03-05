import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Dhanavritti Ventures | IIT Kanpur Deep-Tech Investment Platform",
  description:
    "Backing India's Science-Led Deep-Tech Future. Enabling IP-driven startups to translate breakthrough research into globally scalable enterprises.",
  keywords: "deep-tech, IIT Kanpur, venture, investment, startups, science, IP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
