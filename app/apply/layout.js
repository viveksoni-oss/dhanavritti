export const metadata = {
  title: "Apply for Deep-Tech Startup Funding",
  description:
    "Submit your pitch deck to Dhanavritti Ventures, an IIT Kanpur anchored investment platform backing IP-driven deep-tech startups in India.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title: "Apply for Deep-Tech Startup Funding | Dhanavritti Ventures",
    description:
      "Apply to Dhanavritti Ventures for deep-tech startup funding, IIT Kanpur ecosystem access, and science-led venture support.",
    url: "/apply",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Deep-Tech Startup Funding | Dhanavritti Ventures",
    description:
      "Submit your pitch deck to an IIT Kanpur anchored deep-tech investment platform.",
    images: ["/og-image.png"],
  },
};

export default function ApplyLayout({ children }) {
  return children;
}
