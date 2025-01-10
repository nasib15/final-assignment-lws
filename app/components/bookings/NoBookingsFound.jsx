import Link from "next/link";

const NoBookingsFound = ({ confirmed }) => {
  return (
    <div className="text-center py-16 px-4">
      {/* Icon */}
      <div className="mb-6">
        <i className="fas fa-calendar-xmark text-6xl text-gray-300"></i>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        No {confirmed ? "confirmed" : "pending"} bookings yet
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        You haven&apos;t {confirmed ? "confirmed" : "made"} any bookings yet.
        Start exploring amazing stays and plan your next adventure!
      </p>

      {/* Action Button */}
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:brightness-95 transition-all"
      >
        <i className="fas fa-search mr-2"></i>
        Browse Hotels
      </Link>
    </div>
  );
};

export default NoBookingsFound;
