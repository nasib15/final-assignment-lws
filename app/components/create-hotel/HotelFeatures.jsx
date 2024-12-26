const HotelFeatures = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
      <div className="grid grid-cols-2 gap-4" id="amenities">
        <div className="flex items-center gap-2 cursor-pointer">
          <i className="fa-solid fa-umbrella-beach"></i>
          <span>Beach access</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <i className="fa-solid fa-person-swimming"></i>
          <span>Private pool</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <i className="fa-solid fa-wifi"></i>
          <span>Free Wi-Fi</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <i className="fa-solid fa-sink"></i>
          <span>Kitchen</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <i className="fa-solid fa-square-parking"></i>
          <span>Free Parking</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <i className="fa-solid fa-dumbbell"></i>
          <span>Fitness Center</span>
        </div>
      </div>
    </div>
  );
};
export default HotelFeatures;
