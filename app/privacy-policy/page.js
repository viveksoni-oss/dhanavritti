import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy | Dhanavritti Ventures",
  description:
    "Privacy Policy for Dhanavritti Ventures, including how we collect, use, protect, and retain information shared through our website.",
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect information that you choose to share with us through forms, email, pitch submissions, or other website interactions. This can include your name, email address, phone number, company name, role, website, pitch materials, and business details.",
      "We may also collect limited technical information such as browser type, device information, pages visited, referral source, and approximate usage activity to help us improve the website.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use submitted information to review applications, respond to enquiries, evaluate investment fit, communicate with founders and partners, and improve our website and internal workflows.",
      "We do not sell personal information. We may share information with advisors, service providers, or relevant team members when needed for review, communication, diligence, compliance, or operational support.",
    ],
  },
  {
    title: "Pitch Decks And Business Materials",
    body: [
      "Materials submitted to Dhanavritti Ventures may be reviewed by our team and relevant advisors for evaluation purposes. Please avoid submitting information that you are not authorized to share.",
      "While we take reasonable steps to protect submitted materials, no website or email transmission can be guaranteed to be fully secure.",
    ],
  },
  {
    title: "Cookies And Analytics",
    body: [
      "Our website may use cookies or similar technologies to understand site performance, improve user experience, and maintain basic website functionality.",
      "You can control cookies through your browser settings, although some parts of the website may not function as intended if cookies are disabled.",
    ],
  },
  {
    title: "Data Security And Retention",
    body: [
      "We use reasonable administrative, technical, and organizational safeguards to protect information in our possession.",
      "We retain information for as long as needed for the purposes described in this policy, including application review, relationship management, legal, accounting, or compliance needs.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may contact us to request access, correction, or deletion of personal information that you have shared with us, subject to applicable legal and business requirements.",
      "You may also ask us to stop sending non-essential communications.",
    ],
  },
  {
    title: "Updates To This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The latest version will be posted on this page with the effective date below.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ background: "var(--off-white)" }}>
      <Navbar />

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 12% 8%, rgba(9,131,39,0.1), transparent 28%), radial-gradient(circle at 88% 18%, rgba(8,96,32,0.08), transparent 30%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl">
          <div
            className="mb-10 border-l-4 px-5 py-5"
            style={{
              borderColor: "var(--green-primary)",
              background:
                "linear-gradient(90deg, rgba(233,245,207,0.75), rgba(245,245,240,0))",
            }}
          >
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--green-dark)" }}
            >
              Dhanavritti Ventures
            </p>
            <h1
              className="text-4xl font-bold leading-tight sm:text-5xl"
              style={{
                color: "var(--charcoal)",
                fontFamily: "var(--font-display)",
              }}
            >
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700">
              This policy explains how we handle information shared through the
              Dhanavritti Ventures website and related communications.
            </p>
            <p className="mt-3 text-sm text-gray-600">
              Effective date: June 10, 2026
            </p>
          </div>

          <div className="space-y-5">
            {sections.map((section) => (
              <article
                key={section.title}
                className="border border-green-900/10 bg-white/70 p-6 shadow-sm"
                style={{ borderRadius: "8px" }}
              >
                <h2
                  className="text-xl font-bold"
                  style={{
                    color: "var(--green-dark)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-gray-700 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div
            className="mt-8 p-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(9,131,39,0.1), rgba(233,245,207,0.65))",
              border: "1px solid rgba(8,96,32,0.16)",
              borderRadius: "8px",
            }}
          >
            <h2
              className="text-xl font-bold"
              style={{
                color: "var(--green-dark)",
                fontFamily: "var(--font-display)",
              }}
            >
              Contact
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
              For privacy questions or requests, contact us at{" "}
              <a
                href="mailto:contact@dhanavritti.com"
                className="font-semibold underline decoration-green-700/30 underline-offset-4"
                style={{ color: "var(--green-dark)" }}
              >
                contact@dhanavritti.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
