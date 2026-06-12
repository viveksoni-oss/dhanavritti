const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageBreak, LevelFormat,
} = require("docx");

// ---- Brand palette (from app/globals.css) ----
const GREEN = "086020";        // green-dark  (headings)
const GREEN_PRIMARY = "098327"; // green-primary
const CHARCOAL = "1A1A1A";
const MUTED = "55624F";
const LIGHT = "F0F9F3";        // callout / header fill
const PALE = "F7FBF4";         // alt cell fill
const BORDER = "CFE3CB";       // soft green border
const ACCENT_BG = "EAF6EE";

const CONTENT_W = 9026;        // A4, 1" margins

const thin = { style: BorderStyle.SINGLE, size: 4, color: BORDER };
const cellBorders = { top: thin, bottom: thin, left: thin, right: thin };
const cellMargins = { top: 90, bottom: 90, left: 130, right: 130 };

// ---- helpers ----
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 140 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BORDER, space: 4 } },
    children: [new TextRun({ text, bold: true, color: GREEN, size: 30, font: "Georgia" })],
  });
}

function para(runs, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: 276 },
    alignment: opts.align,
    children: runs.map(
      (r) => new TextRun({ text: r.t, bold: !!r.b, color: r.c ?? CHARCOAL, size: r.s ?? 21, italics: !!r.i, font: "Arial" })
    ),
  });
}

function bullet(runs) {
  return new Paragraph({
    numbering: { reference: "bul", level: 0 },
    spacing: { after: 90, line: 268 },
    children: runs.map((r) => new TextRun({ text: r.t, bold: !!r.b, color: r.c ?? CHARCOAL, size: 21, font: "Arial" })),
  });
}

function callout(title, body, fill = LIGHT) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
      left: { style: BorderStyle.SINGLE, size: 18, color: GREEN_PRIMARY },
      right: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            shading: { fill, type: ShadingType.CLEAR },
            margins: { top: 150, bottom: 150, left: 200, right: 200 },
            children: [
              new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: title, bold: true, color: GREEN, size: 23, font: "Arial" })] }),
              new Paragraph({ spacing: { after: 0, line: 272 }, children: [new TextRun({ text: body, color: MUTED, size: 20, font: "Arial" })] }),
            ],
          }),
        ],
      }),
    ],
  });
}

function headerRow(labels, widths) {
  return new TableRow({
    tableHeader: true,
    children: labels.map((l, i) =>
      new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        borders: cellBorders,
        margins: cellMargins,
        shading: { fill: GREEN, type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text: l, bold: true, color: "FFFFFF", size: 20, font: "Arial" })] })],
      })
    ),
  });
}

function bodyRow(cells, widths, firstBold = true) {
  return new TableRow({
    children: cells.map((val, i) =>
      new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        borders: cellBorders,
        margins: cellMargins,
        shading: { fill: i === 0 ? PALE : "FFFFFF", type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ spacing: { line: 264 }, children: [new TextRun({ text: val, bold: i === 0 && firstBold, color: i === 0 ? GREEN : CHARCOAL, size: 19.5, font: "Arial" })] })],
      })
    ),
  });
}

function table(headers, rows, widths, firstBold = true) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow(headers, widths), ...rows.map((r) => bodyRow(r, widths, firstBold))],
  });
}

// ---- Flowchart: vertical boxes joined by arrows ----
const BOX_W = 6600;
function flowBox(label, text, fill) {
  return new Table({
    alignment: AlignmentType.CENTER,
    width: { size: BOX_W, type: WidthType.DXA },
    columnWidths: [BOX_W],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: GREEN_PRIMARY },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: GREEN_PRIMARY },
      left: { style: BorderStyle.SINGLE, size: 8, color: GREEN_PRIMARY },
      right: { style: BorderStyle.SINGLE, size: 8, color: GREEN_PRIMARY },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: BOX_W, type: WidthType.DXA },
            shading: { fill: fill ?? ACCENT_BG, type: ShadingType.CLEAR },
            margins: { top: 110, bottom: 110, left: 150, right: 150 },
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 30 }, children: [new TextRun({ text: label, bold: true, color: GREEN, size: 19, font: "Arial" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0, line: 256 }, children: [new TextRun({ text, color: CHARCOAL, size: 19, font: "Arial" })] }),
            ],
          }),
        ],
      }),
    ],
  });
}
function arrow() {
  return new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 30, after: 30 }, children: [new TextRun({ text: "▼", color: GREEN_PRIMARY, size: 22, font: "Arial" })] });
}
function flowchart(steps) {
  const out = [];
  steps.forEach((s, i) => {
    out.push(flowBox(s[0], s[1], s[2]));
    if (i < steps.length - 1) out.push(arrow());
  });
  return out;
}

function spacer(after = 120) {
  return new Paragraph({ spacing: { after }, children: [] });
}

// ============================================================
const children = [];

// Title block
children.push(
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: "DHANAVRITTI VENTURES", bold: true, color: GREEN, size: 22, font: "Arial", characterSpacing: 60 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new TextRun({ text: "Website Proposal & Value Brief", color: CHARCOAL, size: 44, font: "Georgia", bold: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: "Custom Next.js Platform  •  Technical SEO  •  Secure Application Intake", color: MUTED, size: 20, font: "Arial" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 220 }, children: [new TextRun({ text: "Prepared for the Dhanavritti Ventures team  ·  June 2026", color: MUTED, size: 18, italics: true, font: "Arial" })] }),
);

children.push(
  callout(
    "Executive Summary",
    "This is not a basic WordPress CMS site. It is a custom-built Next.js web application engineered for credibility, speed, investor confidence, and structured application handling — with a premium branded interface, secure form processing, branded transactional emails, bot protection, and a complete technical-SEO foundation already in place.",
  ),
  spacer(160),
);

// Section 1 — strengths
children.push(h1("1.  What Makes This Website Strong"));
[
  [{ t: "Custom modern stack: ", b: true }, { t: "Built on Next.js, React, Tailwind CSS and Vercel — not a heavy WordPress theme + plugin stack." }],
  [{ t: "Premium brand experience: ", b: true }, { t: "Bespoke visual design, refined spacing, brand colours and a polished investment-platform feel." }],
  [{ t: "Fast, smooth UX: ", b: true }, { t: "No page-builder bloat or plugin overhead — faster loading and a cleaner browsing experience." }],
  [{ t: "Controlled animation layer: ", b: true }, { t: "Smooth GSAP-driven motion that feels premium without slowing the site down." }],
  [{ t: "Secure application handling: ", b: true }, { t: "Server-side validation, file-type and file-size checks, CAPTCHA and rate limiting protect against spam and misuse." }],
  [{ t: "Professional email workflow: ", b: true }, { t: "Branded HTML emails to the internal team plus confirmation emails to applicants." }],
  [{ t: "Strong deliverability foundation: ", b: true }, { t: "Resend-ready with verified domain records (SPF, DKIM, DMARC) to reduce spam risk." }],
  [{ t: "Deploy pipeline ready: ", b: true }, { t: "Updates ship quickly through the configured Vercel pipeline instead of manual CMS edits." }],
  [{ t: "Future-ready architecture: ", b: true }, { t: "Can later support database storage, Google Sheets sync, dashboards, analytics and CRM-style lead tracking." }],
].forEach((b) => children.push(bullet(b)));

// Section 2 — vs WordPress
children.push(h1("2.  Why This Is Better Than a WordPress CMS Site"));
children.push(spacer(40));
children.push(
  table(
    ["Area", "Typical WordPress CMS", "This Custom Website"],
    [
      ["Performance", "Slowed by themes, plugins & page builders.", "Lightweight custom frontend, faster pages."],
      ["Design", "Template-based, hard to differentiate.", "Premium custom look built around the brand."],
      ["Security", "Plugin/admin vulnerabilities to patch constantly.", "Smaller attack surface, controlled custom code."],
      ["Forms", "Dependent on third-party form plugins.", "Custom API with validation, file checks, CAPTCHA, rate limiting."],
      ["Email", "Relies on hosting mail / SMTP plugins.", "Branded transactional emails via Resend-ready setup."],
      ["SEO", "Plugin-driven, often partial or bloated.", "Hand-built technical SEO + structured data (see §3)."],
      ["Scalability", "Gets messy as plugins pile up.", "Cleanly extensible to DB, Sheets sync, dashboard, CRM."],
    ],
    [1700, 3663, 3663],
  ),
);
children.push(spacer(160));

// Section 3 — SEO done
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1("3.  SEO Already Completed (Included in the Build)"));
children.push(para([{ t: "A full technical-SEO foundation is already implemented in the codebase — not bolted on with a plugin. This is what search engines and social platforms now see:", c: MUTED }], { after: 140 }));
[
  [{ t: "Rich page metadata: ", b: true }, { t: "title templates and keyword-led descriptions across pages." }],
  [{ t: "Targeted keyword set: ", b: true }, { t: "deep-tech / IIT-Kanpur investment terms plus brand-variant spellings (Dhanvriti, Dhanvriddi, etc.) to capture mistyped searches." }],
  [{ t: "Open Graph + Twitter Cards: ", b: true }, { t: "branded link previews when the site is shared on WhatsApp, LinkedIn, X and more." }],
  [{ t: "JSON-LD structured data: ", b: true }, { t: "Organization + WebSite schema so Google understands the brand entity (logo, areas served, expertise)." }],
  [{ t: "Canonical URLs: ", b: true }, { t: "per page, preventing duplicate-content dilution." }],
  [{ t: "Robots directives: ", b: true }, { t: "index/follow rules with Googlebot-specific image & snippet settings." }],
  [{ t: "Dynamic XML sitemap: ", b: true }, { t: "auto-generated /sitemap.xml listing all key pages with priorities." }],
  [{ t: "robots.txt: ", b: true }, { t: "generated and linked to the sitemap for clean crawling." }],
  [{ t: "metadataBase + locale: ", b: true }, { t: "absolute URLs and en-IN locale for correct regional signals." }],
  [{ t: "Optimised font loading: ", b: true }, { t: "next/font with display swap for better Core Web Vitals." }],
  [{ t: "Per-page metadata: ", b: true }, { t: "dedicated tags for Home, Apply and Strategic Advisors pages." }],
  [{ t: "Crawlable semantic HTML: ", b: true }, { t: "clean server-rendered structure that search engines parse easily." }],
].forEach((b) => children.push(bullet(b)));
children.push(spacer(40));
children.push(callout("In short", "The site ships search-ready: indexable, shareable with branded previews, and understandable to Google as a real organisation — most WordPress builds need several paid plugins to reach this baseline.", PALE));

// Section 4 — Application flowchart
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1("4.  How the Application Intake Works (Flowchart)"));
children.push(para([{ t: "Every founder application flows through a secure, automated pipeline:", c: MUTED }], { after: 160 }));
children.push(
  ...flowchart([
    ["FOUNDER", "Visits the Apply page and submits company, founder, email, phone and pitch-deck details.", "EAF6EE"],
    ["BOT PROTECTION", "Cloudflare Turnstile CAPTCHA + server-side checks block spam and bots.", ACCENT_BG],
    ["FILE VALIDATION", "Uploaded pitch deck is checked for allowed type and size before processing.", ACCENT_BG],
    ["TEAM NOTIFIED", "Dhanavritti team receives a branded email with applicant details + attached deck.", ACCENT_BG],
    ["APPLICANT CONFIRMED", "Founder gets a branded confirmation email acknowledging the application.", ACCENT_BG],
    ["OPTIONAL STORAGE", "If enabled, application data is also saved to the backend database.", "EAF6EE"],
  ]),
);
children.push(spacer(160));

// Section 5 — future enhancement flow
children.push(h1("5.  Recommended Future Lead-Management Flow"));
children.push(para([{ t: "For structured lead tracking beyond email, the platform can be extended with " }, { t: "Google Sheet sync, secure deck links and database storage", b: true }, { t: " — delivered as a separate paid enhancement phase (see §7)." }], { after: 60 }));
children.push(
  table(
    ["Step", "What happens"],
    [
      ["Step 1", "Founder submits the application and uploads the pitch deck."],
      ["Step 2", "Deck is saved to secure storage; a private shareable link is generated."],
      ["Step 3", "Application is written to the backend database for long-term tracking."],
      ["Step 4", "A Google Sheet auto-updates with company, founder, contact, timestamp, status & deck link."],
      ["Step 5", "Team receives a branded notification with key details + deck access."],
      ["Step 6", "Team can later search, filter, export and build review workflows from stored data."],
    ],
    [1300, 7726],
  ),
);
children.push(spacer(160));

// Section 6 — pricing
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1("6.  Investment — Website Build"));
children.push(callout("One-time build cost", "₹35,000  (one-time)  —  complete custom website, secure application system, and the full technical-SEO foundation described in this document.", LIGHT));
children.push(spacer(80));
children.push(para([{ t: "What the ₹35,000 includes:", b: true, c: GREEN, s: 22 }], { after: 100 }));
children.push(
  table(
    ["Deliverable", "Included"],
    [
      ["Custom design + development", "Next.js + React + Tailwind, fully responsive across devices"],
      ["Premium animation layer", "GSAP-driven motion, polished section transitions"],
      ["Secure application system", "File upload, type/size validation, CAPTCHA, rate limiting"],
      ["Branded email workflow", "Team notification + applicant confirmation emails"],
      ["Technical SEO foundation", "All items listed in §3 — metadata, schema, sitemap, robots"],
      ["Legal & core pages", "Home, Apply, Strategic Advisors, Privacy Policy"],
      ["Deployment", "Vercel pipeline setup + go-live"],
    ],
    [3100, 5926],
  ),
);
children.push(spacer(120));
children.push(para([{ t: "Note: ", b: true }, { t: "The build price is one-time. Hosting on Vercel can run on a free tier to start; a custom domain and email service (e.g. Resend) are billed by those providers directly.", c: MUTED }]));
children.push(spacer(120));

// Section 7 — paid add-ons
children.push(h1("7.  Optional Add-On Phases (Charged Separately)"));
children.push(para([{ t: "These extend the platform beyond the core build and are quoted per scope:", c: MUTED }], { after: 120 }));
[
  [{ t: "Backend database + admin dashboard ", b: true }, { t: "— store, search and manage every application." }],
  [{ t: "Google Sheets sync ", b: true }, { t: "— live lead tracking for the whole team." }],
  [{ t: "Secure pitch-deck storage & shareable links ", b: true }, { t: "— controlled deck access." }],
  [{ t: "Email domain authentication ", b: true }, { t: "— SPF / DKIM / DMARC setup with Resend for top deliverability." }],
  [{ t: "CRM-style review workflows ", b: true }, { t: "— statuses, filters, exports and pipeline stages." }],
].forEach((b) => children.push(bullet(b)));
children.push(spacer(140));

// Section 8 — Extra SEO (list only)
children.push(h1("8.  Additional SEO Services (Billed Separately)"));
children.push(
  callout(
    "Important",
    "The technical-SEO foundation in §3 is included in the build. Ongoing and growth-focused SEO below is specialised, recurring work and is charged separately — priced on request once scope is agreed.",
    PALE,
  ),
);
children.push(spacer(80));
[
  [{ t: "Google Search Console ", b: true }, { t: "setup, verification & sitemap submission." }],
  [{ t: "Google Analytics (GA4) ", b: true }, { t: "+ event / conversion tracking." }],
  [{ t: "Keyword research & content strategy ", b: true }, { t: "for target audiences." }],
  [{ t: "Blog / content writing ", b: true }, { t: "with on-page optimisation." }],
  [{ t: "Ongoing monthly SEO ", b: true }, { t: "— audits, ranking tracking and tuning." }],
  [{ t: "Backlink / off-page SEO ", b: true }, { t: "— authority building." }],
  [{ t: "Local SEO ", b: true }, { t: "— Google Business Profile & local signals." }],
  [{ t: "Core Web Vitals & performance ", b: true }, { t: "deep optimisation." }],
  [{ t: "Extended schema ", b: true }, { t: "— FAQ, Breadcrumb, Article and rich-result markup." }],
  [{ t: "Per-page OG image design ", b: true }, { t: "for sharper social sharing." }],
  [{ t: "Multilingual / hreflang SEO ", b: true }, { t: "if regional/language expansion is needed." }],
  [{ t: "Monthly reporting ", b: true }, { t: "— rankings, traffic and progress dashboards." }],
].forEach((b) => children.push(bullet(b)));
children.push(spacer(160));

// Closing positioning
children.push(h1("9.  Positioning Statement"));
children.push(
  callout(
    "In one line",
    "This is a modern digital platform for Dhanavritti Ventures — not just an informational site. It carries brand credibility, a premium first impression, secure application intake, professional communication and a foundation ready for future business-process automation.",
    LIGHT,
  ),
);

// ---- assemble ----
const doc = new Document({
  numbering: {
    config: [
      { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { run: { color: GREEN_PRIMARY }, paragraph: { indent: { left: 460, hanging: 260 } } } }] },
    ],
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 21, color: CHARCOAL } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 30, bold: true, color: GREEN, font: "Georgia" }, paragraph: { spacing: { before: 320, after: 140 }, outlineLevel: 0 } },
    ],
  },
  sections: [
    {
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("D:/Dev/Work/dhanavritti/tools/Dhanavritti_Website_Proposal.docx", buf);
  console.log("WROTE docx", buf.length, "bytes");
});
