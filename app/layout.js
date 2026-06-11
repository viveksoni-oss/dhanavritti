import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const siteUrl = "https://dhanavritti.com";

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

const title = "Dhanavritti Ventures | IIT Kanpur Deep-Tech Investment Platform";
const description =
  "Dhanavritti Ventures is an IIT Kanpur anchored deep-tech investment platform backing IP-driven startups in India across AI, semiconductors, robotics, medtech, aerospace, cybersecurity, advanced materials, and frontier science.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Dhanavritti Ventures",
  title: {
    default: title,
    template: "%s | Dhanavritti Ventures",
  },
  description,
  keywords: [
    "Dhanavritti Ventures",
    "Dhanavritti",
    "Dhanvriti",
    "Dhanvriddi",
    "Dhanvridhi",
    "Dhanavriti",
    "IIT Kanpur startup investment",
    "IIT deep tech investment",
    "deep tech startup funding India",
    "startup investment India",
    "best startup investment",
    "science led venture capital India",
    "IP driven startup investment",
    "frontier technology investment India",
    "semiconductor startup funding India",
    "robotics startup investors India",
    "medtech startup funding India",
    "AI ML deep tech funding India",
    "aerospace startup investment India",
    "cybersecurity startup funding India",
  ],
  authors: [{ name: "Dhanavritti Ventures", url: siteUrl }],
  creator: "Dhanavritti Ventures",
  publisher: "Dhanavritti Ventures",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Dhanavritti Ventures",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dhanavritti Ventures - IIT Kanpur Deep-Tech Investment Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dhanavritti Ventures",
  alternateName: [
    "Dhanavritti",
    "Dhanvriti",
    "Dhanvriddi",
    "Dhanvridhi",
    "Dhanavriti",
  ],
  url: siteUrl,
  logo: `${siteUrl}/Logo/Dhanavritti-Venture-Logo.png`,
  email: "contact@dhanavritti.com",
  description,
  areaServed: "India",
  knowsAbout: [
    "Deep-tech investment",
    "IIT Kanpur startup ecosystem",
    "IP-driven startups",
    "Science-led venture capital",
    "Semiconductors",
    "Robotics",
    "Medtech",
    "Aerospace",
    "Cybersecurity",
    "Advanced materials",
    "AI and machine learning",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dhanavritti Ventures",
  alternateName: organizationJsonLd.alternateName,
  url: siteUrl,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
