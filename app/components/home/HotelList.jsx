import { getAllHotels } from "@/db/queries";
import FallbackUIHotelList from "./FallbackUIHotelList";
import HotelCard from "./HotelCard";
import Pagination from "./Pagination";

const HotelList = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const { hotels, totalPages, currentPage } = await getAllHotels(page, query);

  return (
    <>
      <section className="px-6">
        {/* Search Results Count */}
        {query && (
          <div className="max-w-7xl mx-auto mb-6">
            <p className="text-gray-600">
              {hotels.length === 0
                ? "No results found"
                : `${hotels.length} ${
                    hotels.length === 1 ? "hotel" : "hotels"
                  } found`}{" "}
              for &quot;{query}&quot;
            </p>
          </div>
        )}

        {hotels.length > 0 ? (
          <>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </>
        ) : (
          <FallbackUIHotelList query={query} />
        )}
      </section>
    </>
  );
};
export default HotelList;
