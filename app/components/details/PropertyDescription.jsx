const PropertyDescription = () => {
  return (
    <div className="col-span-2">
      <div className="border-b pb-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Entire villa hosted by Sarah
        </h2>
        <div className="grid grid-cols-3 gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <i className="fas fa-person"></i>
            <span>6 guests</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-door-open"></i>
            <span>3 bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-bed"></i>
            <span>4 beds</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">About this place</h3>
        <p className="text-gray-700 leading-relaxed">
          Experience luxury in this stunning beachfront villa nestled in the
          heart of the Maldives. Our spacious 3-bedroom villa offers
          breathtaking ocean views, private pool, and direct beach access. Enjoy
          modern amenities, traditional Maldivian architecture, and unparalleled
          comfort in this tropical paradise.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-umbrella-beach"></i>
            <span>Beach access</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-person-swimming"></i>
            <span>Private pool</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-wifi"></i>
            <span>Free Wi-Fi</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-sink"></i>
            <span>Kitchen</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyDescription;
