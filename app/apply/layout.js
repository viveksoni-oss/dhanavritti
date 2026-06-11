export const metadata = {
  title: "Apply for Deep-Tech Funding",
  description:
    "Submit your pitch deck to Dhanavritti Ventures for deep-tech startup funding and IIT Kanpur ecosystem access.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title: "Apply for Deep-Tech Funding | Dhanavritti",
    description:
      "Apply for deep-tech startup funding, IIT Kanpur ecosystem access, and venture support.",
    url: "/apply",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Deep-Tech Funding | Dhanavritti",
    description:
      "Submit your pitch deck to an IIT Kanpur anchored deep-tech investment platform.",
    images: ["/og-image.png"],
  },
};

export default function ApplyLayout({ children }) {
  return children;
}
