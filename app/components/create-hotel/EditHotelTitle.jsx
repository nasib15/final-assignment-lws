const EditHotelTitle = () => {
  return (
    <div className="mb-6">
      <h1
        className="text-3xl font-bold mb-2 text-zinc-400 edit"
        id="propertyName"
      >
        Property Name
        <i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
      </h1>
      <div className="flex items-center text-gray-600">
        <span className="edit text-gray-600">
          Property location
          <i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
        </span>
      </div>
    </div>
  );
};
export default EditHotelTitle;
