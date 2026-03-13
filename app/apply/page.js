"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  UploadCloud,
  CheckCircle2,
  Navigation,
  ArrowRight,
  FileText,
} from "lucide-react";

/* =========================
   CONFIGURE THESE VARIABLES
   ========================= */
const FORM_ENDPOINT_EMAIL = "pradeepk@iitkfirst.com"; // remove extra trailing space
const SECOND_ADMIN_EMAIL = "";
const SITE_URL = "https://dhanavritti.com";
const MAX_FILE_SIZE_MB = 5;

const ADMIN_EMAIL_SUBJECT =
  "NEW APPLICATION | Dhanavritti | Funding Deck Submission";

const AUTO_RESPONSE_MESSAGE = `
Dear Applicant,

Thank you for submitting your deck to Dhanavritti.

We have successfully received your application and our team will review it shortly. If your submission matches our current investment focus, we will get in touch with you.

Warm regards,
Dhanavritti Team
https://dhanavritti.com
`.trim();

export default function ApplyPage() {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsSuccess(params.get("success") === "1");
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFileError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (selectedFile.size > maxBytes) {
      setFile(null);
      e.target.value = "";
      setFileError(`File must be ${MAX_FILE_SIZE_MB}MB or smaller.`);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    if (!file) {
      e.preventDefault();
      setFileError("Please upload your pitch deck or document.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      e.preventDefault();
      setFileError(`File must be ${MAX_FILE_SIZE_MB}MB or smaller.`);
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9f3]">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 py-8 md:py-12 gap-8 lg:gap-16">
        <div className="w-full md:w-5/12 flex flex-col">
          <h1
            className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)", color: "#086020" }}
          >
            Fund your Deep-Tech Innovation
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
            We are looking for bold, visionary founders building IP-driven
            startups. Submit your pitch deck and join India&apos;s foremost
            science-led investment platform supported by IIT Kanpur.
          </p>

          <div className="space-y-4">
            {[
              "Expedited review process by deep-tech experts",
              "Access to IIT Kanpur infrastructure",
              "Strategic mentorship and guidance",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                <span className="text-gray-700 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-7/12 flex items-center">
          <div className="bg-white w-full rounded-2xl shadow-xl shadow-green-900/5 p-8 sm:p-10 border border-green-100">
            {isSuccess ? (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Navigation className="w-10 h-10 text-green-600" />
                </div>

                <h2
                  className="text-3xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#086020",
                  }}
                >
                  Deck Submitted Successfully
                </h2>

                <p className="text-gray-600 mb-3 max-w-md leading-relaxed">
                  Thank you for submitting your application to Dhanavritti.
                </p>

                <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                  We have successfully received your pitch deck and details. Our
                  team will review your submission and contact you if there is a
                  fit.
                </p>

                <a
                  href="/apply"
                  className="px-8 py-3 text-white font-medium rounded-xl transition-colors"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #086020)",
                  }}
                >
                  Submit Another Application
                </a>
              </div>
            ) : (
              <form
                action={`https://formsubmit.co/${FORM_ENDPOINT_EMAIL}`}
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value={ADMIN_EMAIL_SUBJECT}
                />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_next"
                  value={`${SITE_URL}/apply?success=1`}
                />
                <input type="hidden" name="_captcha" value="true" />
                <input
                  type="hidden"
                  name="_autoresponse"
                  value={AUTO_RESPONSE_MESSAGE}
                />

                {SECOND_ADMIN_EMAIL ? (
                  <input type="hidden" name="_cc" value={SECOND_ADMIN_EMAIL} />
                ) : null}

                <input
                  type="hidden"
                  name="form_name"
                  value="Dhanavritti Funding Application"
                />

                <div className="space-y-2">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="company_name"
                    required
                    placeholder="E.g. Quantum Dynamics"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow bg-gray-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="founderName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Founder Name
                  </label>
                  <input
                    type="text"
                    id="founderName"
                    name="founder_name"
                    required
                    placeholder="E.g. Jane Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow bg-gray-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    required
                    placeholder="founder@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow bg-gray-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contactPhone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contact_phone"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow bg-gray-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Pitch Deck / Document Upload
                  </label>

                  <div className="mt-2 flex justify-center rounded-xl border border-dashed border-green-300 px-6 py-10 bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer relative">
                    <div className="text-center">
                      {file ? (
                        <div className="flex flex-col items-center">
                          <FileText
                            className="mx-auto h-12 w-12 text-green-500"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                            <span className="font-semibold text-green-600">
                              {file.name}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Click to change file
                          </p>
                        </div>
                      ) : (
                        <>
                          <UploadCloud
                            className="mx-auto h-12 w-12 text-green-400"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-transparent font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                            >
                              <span>Upload a file</span>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-500 mt-2">
                            PDF, PPT, PPTX, DOC, DOCX up to {MAX_FILE_SIZE_MB}MB
                          </p>
                        </>
                      )}
                    </div>

                    <input
                      id="file-upload"
                      name="attachment"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept=".pdf,.ppt,.pptx,.doc,.docx"
                      required
                    />
                  </div>

                  {fileError ? (
                    <p className="text-sm text-red-600">{fileError}</p>
                  ) : null}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-md shadow-green-600/20 disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #22c55e, #086020)",
                    }}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Submitting...</span>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
