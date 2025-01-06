"use client";
import { useState } from "react";

const EditHotelTitle = ({ title, location, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempLocation, setTempLocation] = useState(location);

  const handleSave = () => {
    onSave("basic", {
      name: tempTitle,
      location: tempLocation,
    });
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      {isEditing ? (
        <div className="space-y-4 flex flex-col">
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            placeholder="Hotel name"
            className="max-w-xl p-2 border rounded-lg text-2xl font-bold"
          />
          <input
            type="text"
            value={tempLocation}
            onChange={(e) => setTempLocation(e.target.value)}
            placeholder="Location"
            className="max-w-xs p-2 border rounded-lg text-lg font-light"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-lg w-24 hover:brightness-90 transition-all "
          >
            Save
          </button>
        </div>
      ) : (
        <div
          className="cursor-pointer group"
          onClick={() => setIsEditing(true)}
        >
          <h1 className="text-3xl font-bold mb-2 text-zinc-800">
            {title || "Hotel Name"}
            <i className="fas fa-pencil-alt text-gray-400 ml-2 opacity-0 group-hover:opacity-100 text-sm hover:scale-110 transition-all" />
          </h1>
          <div className="text-gray-600">
            {location || "Hotel location"}
            <i className="fas fa-pencil-alt text-gray-400 ml-2 opacity-0 group-hover:opacity-100 text-sm hover:scale-110 transition-all" />
          </div>
        </div>
      )}
    </div>
  );
};
export default EditHotelTitle;
