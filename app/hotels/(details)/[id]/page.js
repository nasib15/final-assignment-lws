import BookingForm from "@/app/components/details/BookingCard";
import HotelGallery from "@/app/components/details/HotelGallery";
import HotelTitle from "@/app/components/details/HotelTitle";
import PropertyDescription from "@/app/components/details/PropertyDescription";
import ReviewCard from "@/app/components/details/ReviewCard";
import ReviewHeader from "@/app/components/details/ReviewHeader";
import { getHotelById } from "@/db/queries";

const HotelDetailsPage = async ({ params: { id } }) => {
  const hotelDetails = await getHotelById(id);

  const {
    name,
    location,
    descripiton,
    owner,
    pricePerNight,
    totalGuests,
    totalBeds,
    totalRooms,
    thumbNailUrl,
    gallery,
    amenities,
  } = hotelDetails;

  return (
    <>
      {/* Hotel details */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <HotelTitle name={name} location={location} />
        <HotelGallery thumbNailUrl={thumbNailUrl} gallery={gallery} />

        {/* Property details */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left column */}
          <PropertyDescription
            name={name}
            amenities={amenities}
            owner={owner}
            descripiton={descripiton}
            totalBeds={totalBeds}
            totalGuests={totalGuests}
            totalRooms={totalRooms}
          />
          {/* Right column */}
          <BookingForm pricePerNight={pricePerNight} />
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
