"use client";

import { generateBookingPDF } from "@/utils/generatePDF";
import { useState } from "react";

const DownloadButton = ({ bookingData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!bookingData) {
      alert("Booking data is missing");
      return;
    }

    try {
      setIsGenerating(true);

      const pdfBlob = await generateBookingPDF(bookingData);

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
      alert("Failed to generate PDF. Please try again.");
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
