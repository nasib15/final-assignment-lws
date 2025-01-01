const PropertyDescription = ({
  name,
  owner,
  descripiton,
  totalBeds,
  totalGuests,
  totalRooms,
  amenities,
}) => {
  const amenityIcons = {
    "Beach access": "fa-solid fa-umbrella-beach",
    "Free Wi-Fi": "fa-solid fa-wifi",
    "Free Parking": "fa-solid fa-square-parking",
    "Fitness Center": "fa-solid fa-dumbbell",
    "Private pool": "fa-solid fa-person-swimming",
    Kitchen: "fa-solid fa-sink",
  };

  return (
    <div className="col-span-2">
      <div className="border-b pb-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          {name} by {owner}
        </h2>
        <div className="grid grid-cols-3 gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <i className="fas fa-person"></i>
            <span>{totalGuests} guests</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-door-open"></i>
            <span>{totalRooms} bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-bed"></i>
            <span>{totalBeds} beds</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">About this place</h3>
        <p className="text-gray-700 leading-relaxed">{descripiton}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <div className="flex items-center gap-2" key={amenity}>
              <i className={amenityIcons[amenity]}></i>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PropertyDescription;
