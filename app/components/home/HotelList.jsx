import { auth } from "@/auth";
import {
  getAllHotels,
  getPendingBookings,
  getUserIdByEmail,
  isHotelInWishlist,
} from "@/db/queries";
import Link from "next/link";
import { Suspense } from "react";
import FallbackUIHotelList from "./FallbackUIHotelList";
import HotelCard from "./HotelCard";
import Pagination from "./Pagination";
import SortingDropdown from "./SortingDropdown";

const HotelList = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";

  const { hotels, totalPages, currentPage } = await getAllHotels(
    page,
    query,
    sort,
  );

  const session = await auth();
  const authUser = session?.user;
  const authUserId = await getUserIdByEmail(authUser?.email);
  const pendingBookings = await getPendingBookings(authUserId);

  return (
    <>
      <section className="px-6">
        {/* Search Results Count and Sorting */}
        <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
          <div className="flex justify-between items-center">
            {query && (
              <p className="text-gray-600">
                {hotels.length === 0
                  ? "No results found"
                  : `${hotels.length} ${
                      hotels.length === 1 ? "hotel" : "hotels"
                    } found`}{" "}
                for &quot;{query}&quot;
              </p>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <SortingDropdown />
          </div>
        </div>

        {pendingBookings.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 max-w-4xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <i className="fas fa-exclamation-triangle text-yellow-400"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You have pending bookings. Please complete them before
                  searching for a new hotel. Click{" "}
                  <Link href={`/profile/my-bookings`} className="underline">
                    here
                  </Link>{" "}
                  to view your bookings.
                </p>
              </div>
            </div>
          </div>
        )}

        {hotels.length > 0 ? (
          <>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {hotels.map(async (hotel) => {
                const isWishlisted = await isHotelInWishlist(
                  authUserId,
                  hotel.id,
                );

                return (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    authUserId={authUserId}
                    isWishlisted={isWishlisted}
                  />
                );
              })}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            </Suspense>
          </>
        ) : (
          <FallbackUIHotelList query={query} />
        )}
      </section>
    </>
  );
};
export default HotelList;
