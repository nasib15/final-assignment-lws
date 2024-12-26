const EditHotelPrice = () => {
  return (
    <>
      <div className="mb-4">
        <span className="text-xl font-bold edit">
          Price in USD
          <i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
        </span>
        <span className="text-gray-600 ml-1">per night</span>
      </div>

      <div className="mb-4">
        <span className="edit">
          Available X rooms
          <i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
        </span>
      </div>
    </>
  );
};
export default EditHotelPrice;
