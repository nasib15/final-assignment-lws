const EditHotelDescription = () => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4">About this place</h3>
      <p className="text-gray-700 leading-relaxed edit">
        Write a short description about this place
        <i className="fas fa-pencil-alt text-gray-400 ml-2 cursor-pointer text-sm hover:scale-110 transition-all"></i>
      </p>
    </div>
  );
};
export default EditHotelDescription;
