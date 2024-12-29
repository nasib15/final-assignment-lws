import { getAllHotels } from "@/db/queries";
import HotelCard from "./HotelCard";
import Pagination from "./Pagination";

const HotelList = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1;
  const { hotels, totalPages, currentPage } = await getAllHotels(page);

  return (
    <>
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
};
export default HotelList;
