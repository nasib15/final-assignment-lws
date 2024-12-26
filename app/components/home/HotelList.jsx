import HotelCard from "./HotelCard";
import Pagination from "./Pagination";

const HotelList = () => {
  return (
    <>
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
        </div>
      </section>

      <Pagination />
    </>
  );
};
export default HotelList;
