const ReviewHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <div className="flex items-center">
          <i className="fas fa-star text-yellow-500 mr-2"></i>
          <span className="text-xl font-semibold">4.9</span>
          <span className="mx-2">·</span>
          <span className="text-gray-600">2 reviews</span>
        </div>
      </div>

      <button className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100">
        Write a Review
      </button>
    </div>
  );
};
export default ReviewHeader;
