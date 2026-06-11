import { sql } from "@vercel/postgres";

export const runtime = "nodejs";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

const AUTO_RESPONSE_MESSAGE = `
Dear Applicant,

Thank you for submitting your deck to Dhanavritti.

We have successfully received your application and our team will review it shortly. If your submission matches our current investment focus, we will get in touch with you.

Warm regards,
Dhanavritti Team
${process.env.SITE_URL?.replace(/\/$/, "") || "https://dhanavritti.vercel.app"}
`.trim();

function getRequiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseRecipients(value) {
  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function assertString(value, label) {
  const normalized = String(value || "").trim();
  if (!normalized) {
    throw new Error(`${label} is required.`);
  }
  return normalized;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatFileSize(bytes) {
  if (!bytes) return "0 KB";
  return `${Math.round(bytes / 1024)} KB`;
}

function emailShell({ eyebrow, title, intro, children }) {
  return `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#F5F5F0;font-family:Inter,Arial,sans-serif;color:#1A1A1A;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F0;padding:28px 14px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #d9ead3;border-radius:16px;overflow:hidden;box-shadow:0 18px 48px rgba(8,96,32,0.12);">
                <tr>
                  <td style="background:linear-gradient(160deg,#052e0f 0%,#07491a 52%,#086020 100%);padding:34px 30px;">
                    <div style="display:inline-block;margin-bottom:18px;padding:6px 11px;border:1px solid rgba(193,255,114,0.35);border-radius:999px;color:#c1ff72;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">
                      ${eyebrow}
                    </div>
                    <h1 style="margin:0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.1;font-weight:700;">
                      ${title}
                    </h1>
                    <p style="margin:14px 0 0;color:rgba(255,255,255,0.78);font-size:15px;line-height:1.6;">
                      ${intro}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;">
                    ${children}
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 30px;background:#f0f9f3;border-top:1px solid #d9ead3;">
                    <p style="margin:0;color:#086020;font-size:12px;line-height:1.6;">
                      Dhanavritti Ventures<br />
                      <span style="color:#5f7f68;">Disciplined capital for frontier innovation</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function detailRow(label, value) {
  return `
    <tr>
      <td style="padding:14px 16px;border-bottom:1px solid #e5efe1;color:#086020;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;width:34%;">
        ${label}
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #e5efe1;color:#1A1A1A;font-size:14px;line-height:1.5;">
        ${value}
      </td>
    </tr>
  `;
}

function buildAdminEmailHtml({
  companyName,
  founderName,
  contactEmail,
  contactPhone,
  fileName,
  fileSize,
}) {
  return emailShell({
    eyebrow: "New Application",
    title: "Funding deck submitted",
    intro:
      "A new founder has submitted their details and pitch deck through the Dhanavritti apply form.",
    children: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d9ead3;border-radius:12px;overflow:hidden;background:#ffffff;">
        ${detailRow("Company", companyName)}
        ${detailRow("Founder", founderName)}
        ${detailRow(
          "Email",
          `<a href="mailto:${contactEmail}" style="color:#086020;text-decoration:none;font-weight:700;">${contactEmail}</a>`,
        )}
        ${detailRow("Phone", contactPhone)}
        ${detailRow("Attachment", `${fileName} (${fileSize})`)}
      </table>
      <div style="margin-top:22px;padding:16px 18px;border-left:4px solid #22c55e;background:#f0f9f3;border-radius:10px;">
        <p style="margin:0;color:#385340;font-size:14px;line-height:1.6;">
          The uploaded deck is attached to this email. Reply directly to this email to contact the applicant.
        </p>
      </div>
    `,
  });
}

function buildApplicantEmailHtml({ founderName }) {
  return emailShell({
    eyebrow: "Application Received",
    title: "Thank you for submitting your deck",
    intro:
      "Your application has reached the Dhanavritti team and will be reviewed shortly.",
    children: `
      <p style="margin:0 0 16px;color:#1A1A1A;font-size:15px;line-height:1.7;">
        Dear ${founderName},
      </p>
      <p style="margin:0 0 16px;color:#385340;font-size:15px;line-height:1.7;">
        We have successfully received your application and pitch deck. Our team will review your submission, and if it matches our current investment focus, we will get in touch with you.
      </p>
      <div style="margin:24px 0;padding:18px 20px;background:linear-gradient(135deg,#e9f5cf 0%,#f0f9f3 100%);border:1px solid #d9ead3;border-radius:12px;">
        <p style="margin:0;color:#086020;font-size:14px;line-height:1.6;font-weight:700;">
          Blending deep-tech expertise, policy insight, and commercialization access.
        </p>
      </div>
      <p style="margin:0;color:#385340;font-size:15px;line-height:1.7;">
        Warm regards,<br />
        <strong style="color:#086020;">Dhanavritti Team</strong>
      </p>
    `,
  });
}

async function sendResendEmail(payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getRequiredEnv("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend email failed: ${errorBody}`);
  }

  return response.json();
}

async function maybeSaveApplication({
  companyName,
  founderName,
  contactEmail,
  contactPhone,
  fileName,
  fileType,
  fileSize,
}) {
  if (!process.env.POSTGRES_URL) {
    return;
  }

  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      company_name TEXT NOT NULL,
      founder_name TEXT NOT NULL,
      contact_email TEXT NOT NULL,
      contact_phone TEXT NOT NULL,
      file_name TEXT,
      file_type TEXT,
      file_size INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO applications (
      company_name,
      founder_name,
      contact_email,
      contact_phone,
      file_name,
      file_type,
      file_size
    )
    VALUES (
      ${companyName},
      ${founderName},
      ${contactEmail},
      ${contactPhone},
      ${fileName},
      ${fileType},
      ${fileSize}
    )
  `;
}

async function verifyTurnstile(token, ip) {
  // Skip verification in development if no secret is set
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    }
  );
  const data = await res.json();
  if (!data.success) {
    throw new Error("CAPTCHA verification failed. Please try again.");
  }
}

function getIP(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Verify Turnstile CAPTCHA before processing anything
    const turnstileToken = formData.get("cf-turnstile-response");
    await verifyTurnstile(turnstileToken, getIP(request));

    const companyName = assertString(
      formData.get("company_name"),
      "Company name",
    );
    const founderName = assertString(
      formData.get("founder_name"),
      "Founder name",
    );
    const contactEmail = assertString(formData.get("email"), "Contact email");
    const contactPhone = assertString(
      formData.get("contact_phone"),
      "Contact phone",
    );
    const attachment = formData.get("attachment");

    if (!(attachment instanceof File) || attachment.size === 0) {
      return Response.json(
        { error: "Please upload your pitch deck or document." },
        { status: 400 },
      );
    }

    if (attachment.size > MAX_FILE_SIZE_BYTES) {
      return Response.json(
        { error: `File must be ${MAX_FILE_SIZE_MB}MB or smaller.` },
        { status: 400 },
      );
    }

    if (attachment.type && !ALLOWED_MIME_TYPES.has(attachment.type)) {
      return Response.json(
        { error: "Only PDF, PPT, PPTX, DOC, and DOCX files are supported." },
        { status: 400 },
      );
    }

    const recipients = parseRecipients(
      getRequiredEnv("APPLICATION_RECIPIENTS"),
    );

    if (recipients.length === 0) {
      throw new Error("APPLICATION_RECIPIENTS must contain at least one email.");
    }

    const attachmentBase64 = Buffer.from(
      await attachment.arrayBuffer(),
    ).toString("base64");
    const from = getRequiredEnv("RESEND_FROM");

    await maybeSaveApplication({
      companyName,
      founderName,
      contactEmail,
      contactPhone,
      fileName: attachment.name,
      fileType: attachment.type,
      fileSize: attachment.size,
    });

    const safeCompanyName = escapeHtml(companyName);
    const safeFounderName = escapeHtml(founderName);
    const safeContactEmail = escapeHtml(contactEmail);
    const safeContactPhone = escapeHtml(contactPhone);
    const safeFileName = escapeHtml(attachment.name);
    const safeFileSize = escapeHtml(formatFileSize(attachment.size));

    await sendResendEmail({
      from,
      to: recipients,
      reply_to: contactEmail,
      subject: "NEW APPLICATION | Dhanavritti | Funding Deck Submission",
      text: [
        "New Dhanavritti funding application received.",
        "",
        `Company Name: ${companyName}`,
        `Founder Name: ${founderName}`,
        `Contact Email: ${contactEmail}`,
        `Contact Phone: ${contactPhone}`,
        `Attachment: ${attachment.name}`,
      ].join("\n"),
      html: buildAdminEmailHtml({
        companyName: safeCompanyName,
        founderName: safeFounderName,
        contactEmail: safeContactEmail,
        contactPhone: safeContactPhone,
        fileName: safeFileName,
        fileSize: safeFileSize,
      }),
      attachments: [
        {
          filename: attachment.name,
          content: attachmentBase64,
        },
      ],
    });

    await sendResendEmail({
      from,
      to: contactEmail,
      subject: "Dhanavritti | Application Received",
      text: AUTO_RESPONSE_MESSAGE,
      html: buildApplicantEmailHtml({ founderName: safeFounderName }),
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Apply form submission failed:", error);

    return Response.json(
      {
        error:
          error instanceof Error && error.message.includes("domain is not verified")
            ? "Email is not configured yet. Please verify your sending domain in Resend or use a verified Resend sender."
            : error instanceof Error
              ? error.message
            : "Unable to submit application.",
      },
      { status: 500 },
    );
  }
}
