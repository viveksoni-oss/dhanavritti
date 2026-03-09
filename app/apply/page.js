"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UploadCloud, CheckCircle2, Navigation, ArrowRight, FileText } from "lucide-react";

export default function ApplyPage() {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9f3]">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-28 md:pt-36"></div>

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 py-12 gap-12 lg:gap-20">
        
        {/* Left Side: Content */}
        <div className="w-full md:w-5/12 flex flex-col justify-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-100 border border-green-200">
            <span className="text-sm font-semibold tracking-wide text-green-800 uppercase">
              Application Portal
            </span>
          </div>
          
          <h1 
            className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)", color: "#086020" }}
          >
            Fund your Deep-Tech Innovation
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
            We are looking for bold, visionary founders building IP-driven startups. 
            Submit your pitch deck and join India's foremost science-led investment 
            platform supported by IIT Kanpur.
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

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 flex items-center">
          <div className="bg-white w-full rounded-2xl shadow-xl shadow-green-900/5 p-8 sm:p-10 border border-green-100">
            {isSuccess ? (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Navigation className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Application Received!
                </h2>
                <p className="text-gray-600 mb-8 max-w-md">
                  Thank you for submitting your details. Our team will review your pitch deck and get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Startup Name */}
                <div className="space-y-2">
                  <label htmlFor="startupName" className="block text-sm font-medium text-gray-700">
                    Startup Name
                  </label>
                  <input
                    type="text"
                    id="startupName"
                    required
                    placeholder="E.g. Quantum Dynamics"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow bg-gray-50/50"
                  />
                </div>

                {/* Startup Founder */}
                <div className="space-y-2">
                  <label htmlFor="startupFounder" className="block text-sm font-medium text-gray-700">
                    Startup Founder
                  </label>
                  <input
                    type="text"
                    id="startupFounder"
                    required
                    placeholder="E.g. Jane Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow bg-gray-50/50"
                  />
                </div>

                {/* Document Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Pitch Deck / Document Upload
                  </label>
                  
                  <div className="mt-2 flex justify-center rounded-xl border border-dashed border-green-300 px-6 py-10 bg-green-50/50 hover:bg-green-50 transition-colors cursor-pointer relative">
                    <div className="text-center">
                      {file ? (
                        <div className="flex flex-col items-center">
                          <FileText className="mx-auto h-12 w-12 text-green-500" aria-hidden="true" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                            <span className="font-semibold text-green-600">{file.name}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Click to change file
                          </p>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="mx-auto h-12 w-12 text-green-400" aria-hidden="true" />
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
                            PDF, PPTX, or DOCX up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                    {/* Invisible file input covering the entire dropzone area */}
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept=".pdf,.ppt,.pptx,.doc,.docx"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-md shadow-green-600/20 disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #22c55e, #086020)"
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
