"use client";

import { useState } from "react";

const amenitiesArray = [
  {
    name: "Beach access",
    icon: "fa-umbrella-beach",
  },
  {
    name: "Private pool",
    icon: "fa-person-swimming",
  },
  {
    name: "Free Wi-Fi",
    icon: "fa-wifi",
  },
  {
    name: "Kitchen",
    icon: "fa-sink",
  },
  {
    name: "Free Parking",
    icon: "fa-square-parking",
  },
  {
    name: "Fitness Center",
    icon: "fa-dumbbell",
  },
];

const HotelFeatures = ({ amenities, onSave }) => {
  const [selectedAmenities, setSelectedAmenities] = useState(amenities || []);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSave = () => {
    onSave("amenities", { amenities: selectedAmenities });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">What this place offers</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary hover:text-primary/80"
          >
            <i className="fas fa-pencil-alt mr-2"></i>
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {amenitiesArray.map((amenity) => (
              <label
                key={amenity.name}
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity.name)}
                  onChange={() => handleToggleAmenity(amenity.name)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <div className="flex items-center gap-2">
                  <i className={`fa-solid ${amenity.icon} text-gray-600`}></i>
                  <span>{amenity.name}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setSelectedAmenities(amenities);
                setIsEditing(false);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {amenities.length > 0 ? (
            amenities.map((amenity) => {
              const amenityData = amenitiesArray.find(
                (a) => a.name === amenity,
              );
              return (
                <div
                  key={amenity}
                  className="flex items-center gap-2 p-2 border rounded-lg"
                >
                  <i
                    className={`fa-solid ${amenityData?.icon} text-gray-600`}
                  ></i>
                  <span>{amenity}</span>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-2">
              No amenities selected. Click edit to add amenities.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HotelFeatures;
