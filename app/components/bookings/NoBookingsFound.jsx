import Link from "next/link";

const NoBookingsFound = () => {
  return (
    <div className="text-center py-16 px-4">
      {/* Icon */}
      <div className="mb-6">
        <i className="fas fa-calendar-xmark text-6xl text-gray-300"></i>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        No Bookings Yet
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        You haven&apos;t made any bookings yet. Start exploring amazing stays
        and plan your next adventure!
      </p>

      {/* Action Button */}
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:brightness-95 transition-all"
      >
        <i className="fas fa-search mr-2"></i>
        Browse Hotels
      </Link>

      {/* Tips Section */}
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4">Looking for inspiration?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
            <div>
              <h4 className="font-medium mb-1">Popular Destinations</h4>
              <p className="text-sm text-gray-600">
                Explore top-rated hotels in trending locations
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <i className="fas fa-tag mt-1 text-primary"></i>
            <div>
              <h4 className="font-medium mb-1">Great Deals</h4>
              <p className="text-sm text-gray-600">
                Find special offers and discounted rates
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <i className="fas fa-calendar-check mt-1 text-primary"></i>
            <div>
              <h4 className="font-medium mb-1">Flexible Bookings</h4>
              <p className="text-sm text-gray-600">
                Book now with free cancellation options
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <i className="fas fa-heart mt-1 text-primary"></i>
            <div>
              <h4 className="font-medium mb-1">Personalized Stays</h4>
              <p className="text-sm text-gray-600">
                Find accommodations that match your style
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoBookingsFound;
