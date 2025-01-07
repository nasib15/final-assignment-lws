"use client";

import EditHotelDescription from "@/app/components/create-hotel/EditHotelDescription";
import EditHotelFeature from "@/app/components/create-hotel/EditHotelFeature";
import EditHotelPrice from "@/app/components/create-hotel/EditHotelPrice";
import EditHotelTitle from "@/app/components/create-hotel/EditHotelTitle";
import EditImageGallery from "@/app/components/create-hotel/EditImageGallery";
import HotelFeatures from "@/app/components/create-hotel/HotelFeatures";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreateHotelPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editHotelId = searchParams.get("edit");
  const isEditMode = Boolean(editHotelId);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    owner: session?.user?.name,
    pricePerNight: "",
    totalGuests: "",
    totalBeds: "",
    totalRooms: "",
    availableRooms: "",
    thumbNailUrl: "",
    gallery: ["", "", "", ""],
    amenities: [],
  });

  // Fetch hotel data if it is an edit mode
  useEffect(() => {
    const fetchHotelData = async () => {
      if (isEditMode) {
        try {
          const response = await fetch(`/api/hotels/${editHotelId}`);
          const hotelData = await response.json();
          setFormData(hotelData);
        } catch (error) {
          throw new Error(error.message);
        }
      }
    };

    fetchHotelData();
  }, [editHotelId, isEditMode]);

  // Update owner
  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      setFormData((prev) => ({
        ...prev,
        owner: session.user.name,
      }));
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router]);

  // Handle save for different sections
  const handleSave = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
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
      const url = isEditMode ? `/api/hotels/${editHotelId}` : "/api/hotels";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/profile/manage-hotels");
        router.refresh();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 relative w-full">
      {!formData.owner && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4  max-w-4xl">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-yellow-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                There was a problem loading your profile. Please try refreshing
                the page.
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handlePublish}
        disabled={!isFormValid()}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 absolute top-4 right-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i className="fas fa-save mr-2"></i>
        {isEditMode ? "Update" : "Publish"}
      </button>

      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit Hotel" : "Create New Hotel"}
      </h1>

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

          <HotelFeatures amenities={formData.amenities} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
};
export default CreateHotelPage;
