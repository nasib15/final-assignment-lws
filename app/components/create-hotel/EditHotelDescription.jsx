"use client";

import { useEffect, useState } from "react";

const EditHotelDescription = ({ description, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);
  const [error, setError] = useState(null);

  // Update local state when props change
  useEffect(() => {
    setTempDescription(description || "");
  }, [description]);

  const handleSave = () => {
    if (!tempDescription.trim()) {
      setError("Description cannot be empty");
      return;
    }

    setError("");
    onSave("description", { description: tempDescription });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTempDescription(e.target.value);
    setError("");
  };

  // check if description is valid
  const isValid = tempDescription.trim().length > 0;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4">About this place</h3>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <textarea
              value={tempDescription}
              onChange={handleChange}
              placeholder="Write a description about this place"
              className={`w-full p-3 border rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <p className="text-gray-500 text-sm mt-1">
              Characters: {tempDescription.length}
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setTempDescription(description);
                setError("");
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div
          className="text-gray-700 leading-relaxed cursor-pointer group"
          onClick={() => setIsEditing(true)}
        >
          <p className="group-hover:bg-gray-50 p-3 rounded-lg transition-colors">
            {description || "Write a short description about this place"}
            <i className="fas fa-pencil-alt text-gray-400 ml-2 opacity-0 group-hover:opacity-100 text-sm hover:scale-110 transition-all"></i>
          </p>
        </div>
      )}
    </div>
  );
};

export default EditHotelDescription;
