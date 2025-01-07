"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AlertInfoIcon } from "../Icons/Icon";

const EditImageGallery = ({ thumbnail, gallery, onSave }) => {
  const [tempThumbnail, setTempThumbnail] = useState(thumbnail);
  const [tempGallery, setTempGallery] = useState(gallery);

  // Validate and return a valid image URL
  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return url.startsWith("http://") || url.startsWith("https://");
    } catch {
      return false;
    }
  };

  const getValidImageUrl = (url) => {
    return isValidUrl(url) ? url : "https://placehold.co/600x400";
  };

  // Check if all inputs are filled and are valid URLs
  const isFormValid = () => {
    const thumbnailValid = isValidUrl(tempThumbnail);
    const galleryValid = tempGallery.every(isValidUrl);
    return thumbnailValid && galleryValid;
  };

  // Update local state when props change
  useEffect(() => {
    setTempThumbnail(thumbnail || "");
    setTempGallery(gallery || []);
  }, [thumbnail, gallery]);

  const handleSave = () => {
    if (isFormValid()) {
      onSave({
        thumbNailUrl: tempThumbnail,
        gallery: tempGallery,
      });
    }
  };

  // Updating the gallery images
  const handleAddGallery = (e, index) => {
    const newGallery = [...tempGallery];
    newGallery[index] = e.target.value;
    setTempGallery(newGallery);
  };

  return (
    <>
      <div className="col-span-2 row-span-2 relative">
        <Image
          src={getValidImageUrl(tempThumbnail)}
          alt="Main Room"
          className="w-full h-full object-cover rounded-lg"
          width={600}
          height={400}
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={tempThumbnail}
          onChange={(e) => setTempThumbnail(e.target.value)}
          className="w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
        />
      </div>
      {tempGallery.map((url, index) => (
        <div key={index} className="relative">
          <Image
            src={getValidImageUrl(url)}
            alt={`Room ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
            width={600}
            height={400}
          />
          <input
            type="text"
            placeholder={`Gallery image ${index + 1} URL`}
            value={url}
            onChange={(e) => handleAddGallery(e, index)}
            className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
          />
        </div>
      ))}

      <div className="col-span-4 flex justify-start flex-col gap-4">
        <div className="bg-red-50 p-3 rounded-lg text-sm text-gray-600 flex  gap-2 items-center max-w-3xl">
          <AlertInfoIcon />
          <p>
            You must give a valid URL for each image. The first image will be
            used as the thumbnail image.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={!isFormValid()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed w-56"
        >
          Save All Images
        </button>
      </div>
    </>
  );
};
export default EditImageGallery;
