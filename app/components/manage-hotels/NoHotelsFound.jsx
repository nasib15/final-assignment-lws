import Link from "next/link";

const NoHotelsFound = () => {
  return (
    <div className="text-center py-16 px-4">
      {/* Icon */}
      <div className="mb-6">
        <i className="fas fa-building text-6xl text-gray-300"></i>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        No Hotels Listed Yet
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        You haven&apos;t created any hotels yet. Start by adding your first
        property to begin managing your listings.
      </p>

      {/* Action Button */}
      <Link
        href="/profile/create-hotel"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:brightness-95 transition-all"
      >
        <i className="fas fa-plus-circle mr-2"></i>
        Create Your First Hotel
      </Link>
    </div>
  );
};

export default NoHotelsFound;
