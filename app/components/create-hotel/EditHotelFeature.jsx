const EditHotelFeature = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <i className="fas fa-person"></i>
        <span className="edit">
          How many Guest can Stay?
          <i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <i className="fas fa-door-open"></i>
        <span className="edit">
          How many Bedrooms ?
          <i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <i className="fas fa-bed"></i>
        <span className="edit">
          How many beds available ?
          <i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
        </span>
      </div>
    </>
  );
};
export default EditHotelFeature;
