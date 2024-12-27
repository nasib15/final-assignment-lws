const HotelTitle = ({ name, location }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <div className="flex items-center text-gray-600">
        <i className="fas fa-star text-yellow-500 mr-1"></i>
        <span>5 · </span>
        <span className="ml-2">2 reviews</span>
        <span className="mx-2">·</span>
        <span className="">{location}</span>
      </div>
    </div>
  );
};
export default HotelTitle;
