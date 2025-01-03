import Link from "next/link";

const FallbackUIHotelList = ({ query }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-16 px-4">
        <div className="mb-6">
          <i className="fas fa-hotel text-6xl text-gray-300"></i>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          {query
            ? "No hotels match your search criteria"
            : "No hotels available"}
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {query ? (
            <>
              We couldn&apos;t find any hotels matching &quot;{query}
              &quot;. Try adjusting your search or explore our available
              properties.
            </>
          ) : (
            "There are currently no hotels listed. Please check back later."
          )}
        </p>

        {query && (
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:brightness-95 transition-all"
          >
            <i className="fas fa-search mr-2"></i>
            View All Hotels
          </Link>
        )}
      </div>

      {/* Suggested Actions */}
      {query && (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-4">Suggestions:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Check if there are any spelling mistakes</li>
            <li>Try using more general terms</li>
            <li>Remove filters or search criteria to broaden your search</li>
            <li>Try searching for a different location</li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default FallbackUIHotelList;
