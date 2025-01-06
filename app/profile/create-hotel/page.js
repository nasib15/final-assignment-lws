"use client";

import EditHotelDescription from "@/app/components/create-hotel/EditHotelDescription";
import EditHotelFeature from "@/app/components/create-hotel/EditHotelFeature";
import EditHotelPrice from "@/app/components/create-hotel/EditHotelPrice";
import EditHotelTitle from "@/app/components/create-hotel/EditHotelTitle";
import EditImageGallery from "@/app/components/create-hotel/EditImageGallery";
import HotelFeatures from "@/app/components/create-hotel/HotelFeatures";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateHotelPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    owner: session?.user?.name || "",
    pricePerNight: "",
    totalGuests: "",
    totalBeds: "",
    totalRooms: "",
    availableRooms: "",
    thumbNailUrl: "",
    gallery: ["", "", "", ""],
    amenities: [],
  });

  // Handle save for different sections
  const handleSave = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Handle amenity operations
  const handleAddAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, amenity],
    }));
  };

  const handleRemoveAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.name &&
      formData.location &&
      formData.description &&
      formData.owner &&
      formData.pricePerNight &&
      formData.totalGuests &&
      formData.totalBeds &&
      formData.totalRooms &&
      formData.availableRooms &&
      formData.thumbNailUrl &&
      formData.gallery.every((url) => url)
    );
  };

  const handlePublish = async () => {
    try {
      const response = await fetch("/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/hotels/${data.hotelId}`);
      }
    } catch (error) {
      console.error("Failed to create hotel:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 relative w-full">
      <button
        onClick={handlePublish}
        disabled={!isFormValid()}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 absolute top-4 right-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i className="fas fa-save mr-2"></i>
        Publish
      </button>
      <EditHotelTitle
        title={formData.name}
        location={formData.location}
        onSave={handleSave}
      />

      <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
        <EditImageGallery
          thumbnail={formData.thumbNailUrl}
          gallery={formData.gallery}
          onSave={handleSave}
        />
      </div>

      <EditHotelPrice price={formData.pricePerNight} onSave={handleSave} />

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="border-b pb-6 mb-6">
            <div className="grid grid-cols-1 gap-4 text-gray-600">
              <EditHotelFeature
                features={{
                  totalGuests: formData.totalGuests,
                  totalRooms: formData.totalRooms,
                  totalBeds: formData.totalBeds,
                  availableRooms: formData.availableRooms,
                }}
                onSave={handleSave}
              />
            </div>
          </div>

          <EditHotelDescription
            description={formData.description}
            onSave={handleSave}
          />

          <HotelFeatures
            amenities={formData.amenities}
            onAdd={handleAddAmenity}
            onRemove={handleRemoveAmenity}
          />
        </div>
      </div>
    </div>
  );
};
export default CreateHotelPage;
