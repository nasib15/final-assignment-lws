import BookingForm from "@/app/components/details/BookingCard";
import HotelGallery from "@/app/components/details/HotelGallery";
import HotelTitle from "@/app/components/details/HotelTitle";
import PropertyDescription from "@/app/components/details/PropertyDescription";
import ReviewCard from "@/app/components/details/ReviewCard";
import ReviewHeader from "@/app/components/details/ReviewHeader";

const HotelDetailsPage = () => {
  return (
    <>
      {/* Hotel details */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <HotelTitle />
        <HotelGallery />

        {/* Property details */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left column */}
          <PropertyDescription />
          {/* Right column */}
          <BookingForm />
        </div>
      </div>

      {/* Ratings */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t">
        <ReviewHeader />

        {/* Review grid */}
        <div className="grid grid-cols-2 gap-8">
          <ReviewCard />
          <ReviewCard />
        </div>

        {/* <ReviewModal /> */}

        {/* Show more btn */}
        <button className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100 mt-8">
          Show More
        </button>
      </div>
    </>
  );
};
export default HotelDetailsPage;
