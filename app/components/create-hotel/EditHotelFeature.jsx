"use client";

import { useEffect, useState } from "react";

const EditHotelFeature = ({ features, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempFeatures, setTempFeatures] = useState(features);
  const [error, setError] = useState("");

  // Update local state when props change
  useEffect(() => {
    setTempFeatures(
      features || {
        totalGuests: "",
        totalRooms: "",
        totalBeds: "",
        availableRooms: "",
      }
    );
  }, [features]);

  const handleSave = () => {
    // Check if available rooms is greater than total rooms
    if (Number(tempFeatures.availableRooms) > Number(tempFeatures.totalRooms)) {
      setError("Available rooms cannot be greater than total rooms");
      return;
    }

    // Check if any field is empty
    if (
      !tempFeatures.totalGuests ||
      !tempFeatures.totalRooms ||
      !tempFeatures.totalBeds ||
      !tempFeatures.availableRooms
    ) {
      setError("All fields are required");
      return;
    }

    setError("");
    onSave(tempFeatures);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setTempFeatures((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  return (
    <>
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Total Guests
              </label>
              <input
                type="number"
                value={tempFeatures.totalGuests}
                onChange={(e) => handleChange("totalGuests", e.target.value)}
                className="w-full p-2 border rounded-lg"
                min="1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Total Rooms
              </label>
              <input
                type="number"
                value={tempFeatures.totalRooms}
                onChange={(e) => handleChange("totalRooms", e.target.value)}
                className="w-full p-2 border rounded-lg"
                min="1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Total Beds
              </label>
              <input
                type="number"
                value={tempFeatures.totalBeds}
                onChange={(e) => handleChange("totalBeds", e.target.value)}
                className="w-full p-2 border rounded-lg"
                min="1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Available Rooms
              </label>
              <input
                type="number"
                value={tempFeatures.availableRooms}
                onChange={(e) => handleChange("availableRooms", e.target.value)}
                className={`w-full p-2 border rounded-lg ${
                  Number(tempFeatures.availableRooms) >
                  Number(tempFeatures.totalRooms)
                    ? "border-red-500"
                    : ""
                }`}
                min="0"
                max={tempFeatures.totalRooms}
              />
              {Number(tempFeatures.availableRooms) >
                Number(tempFeatures.totalRooms) && (
                <p className="text-red-500 text-sm mt-1">
                  Cannot exceed total rooms
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setTempFeatures(tempFeatures);
                setError("");
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                !tempFeatures.totalGuests ||
                !tempFeatures.totalBeds ||
                !tempFeatures.totalRooms ||
                !tempFeatures.availableRooms ||
                Number(tempFeatures.availableRooms) >
                  Number(tempFeatures.totalRooms)
              }
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsEditing(true)}
          >
            <i className="fas fa-person"></i>
            <span>
              {features.totalGuests
                ? `${features.totalGuests} Guests`
                : "How many guests can stay?"}
              <i className="fas fa-pencil-alt text-gray-400 ml-2 opacity-0 group-hover:opacity-100 text-sm hover:scale-110 transition-all"></i>
            </span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsEditing(true)}
          >
            <i className="fas fa-door-open"></i>
            <span>
              {features.totalRooms
                ? `${features.totalRooms} Rooms`
                : "How many rooms?"}
              <i className="fas fa-pencil-alt text-gray-400 ml-2 opacity-0 group-hover:opacity-100 text-sm hover:scale-110 transition-all"></i>
            </span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsEditing(true)}
          >
            <i className="fas fa-bed"></i>
            <span>
              {features.totalBeds
                ? `${features.totalBeds} Beds`
                : "How many beds?"}
              <i className="fas fa-pencil-alt text-gray-400 ml-2 opacity-0 group-hover:opacity-100 text-sm hover:scale-110 transition-all"></i>
            </span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsEditing(true)}
          >
            <i className="fas fa-key"></i>
            <span>
              {features.availableRooms
                ? `${features.availableRooms} Available`
                : "How many rooms are available?"}
              <i className="fas fa-pencil-alt text-gray-400 ml-2 opacity-0 group-hover:opacity-100 text-sm hover:scale-110 transition-all"></i>
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default EditHotelFeature;
