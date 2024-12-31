import BookingForm from "@/app/components/details/BookingForm";
import HotelGallery from "@/app/components/details/HotelGallery";
import HotelTitle from "@/app/components/details/HotelTitle";
import PropertyDescription from "@/app/components/details/PropertyDescription";
import ReviewCard from "@/app/components/details/ReviewCard";
import ReviewHeader from "@/app/components/details/ReviewHeader";
import { getHotelById } from "@/db/queries";
import { notFound } from "next/navigation";

const HotelDetailsPage = async ({ params: { id } }) => {
  const hotelDetails = await getHotelById(id);

  if (!hotelDetails) {
    notFound();
  }

  const {
    id: hotelId,
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
          <BookingForm
            hotelId={hotelId}
            pricePerNight={pricePerNight}
            totalGuests={totalGuests}
          />
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

// generate metadata

export async function generateMetadata({ params: { id } }) {
  const hotelDetails = await getHotelById(id);

  return {
    title: hotelDetails.name,
    description: hotelDetails.descripiton,

    openGraph: {
      title: hotelDetails.name,
      description: hotelDetails.descripiton,
      type: "website",
      url: `https://final-assignment-lws-hotelbooking.vercel.app/hotels/${id}`,
      images: [
        {
          url: hotelDetails.thumbNailUrl,
          width: 800,
          height: 600,
          alt: hotelDetails.name,
        },
      ],
    },
  };
}
