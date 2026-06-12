"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  UploadCloud,
  CheckCircle2,
  Navigation,
  ArrowRight,
  FileText,
} from "lucide-react";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = new Set(["pdf", "ppt", "pptx", "doc", "docx"]);
const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

const INITIAL_FORM_VALUES = {
  companyName: "",
  founderName: "",
  contactEmail: "",
  contactPhone: "",
};

const INITIAL_FORM_ERRORS = {
  companyName: "",
  founderName: "",
  contactEmail: "",
  contactPhone: "",
};

function getFileExtension(fileName) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function isAllowedFile(file) {
  const extension = getFileExtension(file.name);
  return ALLOWED_FILE_EXTENSIONS.has(extension) && (!file.type || ALLOWED_FILE_TYPES.has(file.type));
}

function getPhoneDigits(value) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
}

function validateField(name, value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "This field is required.";
  }

  if (/[<>]/.test(trimmed)) {
    return "Please remove invalid characters.";
  }

  if (name === "founderName" && !/^[A-Za-z][A-Za-z .'-]{1,79}$/.test(trimmed)) {
    return "Please enter a valid founder name.";
  }

  if (name === "companyName" && trimmed.length < 2) {
    return "Please enter a valid company name.";
  }

  if (name === "contactEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Please enter a valid email address.";
  }

  if (name === "contactPhone") {
    const digits = getPhoneDigits(trimmed);

    if (!/^[+\d\s()-]+$/.test(trimmed)) {
      return "Please use only numbers, spaces, +, -, or brackets.";
    }

    if (digits.length > 10) {
      return "Phone number cannot be more than 10 digits.";
    }

    if (digits.length < 10) {
      return "Phone number must be 10 digits.";
    }
  }

  return "";
}

export default function ApplyPageClient({ isSuccess }) {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState("");
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [formErrors, setFormErrors] = useState(INITIAL_FORM_ERRORS);
  const [submitError, setSubmitError] = useState("");
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Load Cloudflare Turnstile script once
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || document.getElementById("cf-turnstile-script")) return;

    const script = document.createElement("script");
    script.id = "cf-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFileError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setFile(null);
      e.target.value = "";
      setFileError(`File must be ${MAX_FILE_SIZE_MB}MB or smaller.`);
      return;
    }

    if (!isAllowedFile(selectedFile)) {
      setFile(null);
      e.target.value = "";
      setFileError("Only PDF, PPT, PPTX, DOC, and DOCX files are supported.");
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (field) => (e) => {
    const { value } = e.target;
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({
      ...current,
      [field]: value ? validateField(field, value) : "",
    }));
  };

  const handleInputBlur = (field) => (e) => {
    setFormErrors((current) => ({
      ...current,
      [field]: validateField(field, e.target.value),
    }));
  };

  const validateForm = () => {
    const nextErrors = Object.fromEntries(
      Object.entries(formValues).map(([field, value]) => [
        field,
        validateField(field, value),
      ]),
    );

    setFormErrors(nextErrors);

    return Object.values(nextErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    if (!file) {
      setFileError("Please upload your pitch deck or document.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File must be ${MAX_FILE_SIZE_MB}MB or smaller.`);
      return;
    }

    if (!isAllowedFile(file)) {
      setFileError("Only PDF, PPT, PPTX, DOC, and DOCX files are supported.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: new FormData(e.currentTarget),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit application.");
      }

      window.location.href = "/apply?success=1";
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit application.",
      );
      // Reset Turnstile so user can retry
      if (window.turnstile && widgetIdRef.current != null) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setIsSubmitting(false);
    }
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
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
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
                    value={formValues.companyName}
                    onChange={handleInputChange("companyName")}
                    onBlur={handleInputBlur("companyName")}
                    placeholder="E.g. Quantum Dynamics"
                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-shadow bg-gray-50/50 focus:ring-2 ${
                      formErrors.companyName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                  {formErrors.companyName ? (
                    <p className="text-sm text-red-600">{formErrors.companyName}</p>
                  ) : null}
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
                    value={formValues.founderName}
                    onChange={handleInputChange("founderName")}
                    onBlur={handleInputBlur("founderName")}
                    placeholder="E.g. Jane Doe"
                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-shadow bg-gray-50/50 focus:ring-2 ${
                      formErrors.founderName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                  {formErrors.founderName ? (
                    <p className="text-sm text-red-600">{formErrors.founderName}</p>
                  ) : null}
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
                    value={formValues.contactEmail}
                    onChange={handleInputChange("contactEmail")}
                    onBlur={handleInputBlur("contactEmail")}
                    placeholder="founder@company.com"
                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-shadow bg-gray-50/50 focus:ring-2 ${
                      formErrors.contactEmail
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                  {formErrors.contactEmail ? (
                    <p className="text-sm text-red-600">{formErrors.contactEmail}</p>
                  ) : null}
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
                    value={formValues.contactPhone}
                    onChange={handleInputChange("contactPhone")}
                    onBlur={handleInputBlur("contactPhone")}
                    placeholder="+91 98765 43210"
                    inputMode="tel"
                    maxLength={18}
                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-shadow bg-gray-50/50 focus:ring-2 ${
                      formErrors.contactPhone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                  {formErrors.contactPhone ? (
                    <p className="text-sm text-red-600">{formErrors.contactPhone}</p>
                  ) : null}
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

                {submitError ? (
                  <p className="text-sm text-red-600">{submitError}</p>
                ) : null}

                {/* Cloudflare Turnstile CAPTCHA */}
                {TURNSTILE_SITE_KEY && (
                  <div ref={turnstileRef} className="flex justify-center" />
                )}

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
