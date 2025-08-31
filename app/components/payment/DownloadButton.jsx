"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const DownloadButton = ({ bookingData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!bookingData) {
      toast.error("Booking data is missing");
      return;
    }

    try {
      setIsGenerating(true);

      // Generate PDF on server via Puppeteer
      const resp = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (!resp.ok) throw new Error("PDF generation failed");
      const pdfBlob = await resp.blob();

      // Create URL and trigger download
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `booking-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i className="fas fa-download mr-2"></i>
        {isGenerating ? "Generating PDF..." : "Download Receipt"}
      </button>
    </div>
  );
};

export default DownloadButton;
