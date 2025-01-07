"use client";

import { useEffect, useState } from "react";

const EditHotelPrice = ({ price, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempPrice, setTempPrice] = useState(price);

  const handleSave = () => {
    onSave({ pricePerNight: tempPrice });
    setIsEditing(false);
  };

  // Update local state when props change
  useEffect(() => {
    setTempPrice(price || "");
  }, [price]);

  return (
    <>
      {isEditing ? (
        <div className="space-y-4 mb-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Price per night (USD)
            </label>
            <input
              type="number"
              value={tempPrice}
              onChange={(e) => setTempPrice(e.target.value)}
              className="max-w-2xl p-2 border rounded-lg"
              min="0"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={!tempPrice}
            className="px-4 py-1 bg-primary text-white rounded-lg hover:brightness-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      ) : (
        <div
          className="mb-4 cursor-pointer group"
          onClick={() => setIsEditing(true)}
        >
          <span className="text-xl font-bold mr-1">
            {price ? `$${price}` : "Price(USD)"}
          </span>
          <span className="text-gray-600 ml-1">per night</span>
          <i className="fas fa-pencil-alt text-gray-400 ml-2 opacity-0 group-hover:opacity-100 text-sm hover:scale-110 transition-all"></i>
        </div>
      )}
    </>
  );
};
export default EditHotelPrice;
