"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export const DownloadBtn = ({ bookingData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!bookingData) {
      toast.error("Booking data is missing");
      return;
    }

    try {
      setIsGenerating(true);

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
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <i className="fas fa-download mr-2"></i>
      {isGenerating ? "Generating PDF..." : "Download Receipt"}
    </button>
  );
};

export default DownloadBtn;
