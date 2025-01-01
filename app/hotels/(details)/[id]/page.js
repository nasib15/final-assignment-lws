import BookingForm from "@/app/components/details/BookingForm";
import HotelGallery from "@/app/components/details/HotelGallery";
import HotelTitle from "@/app/components/details/HotelTitle";
import PropertyDescription from "@/app/components/details/PropertyDescription";
import ReviewCard from "@/app/components/details/ReviewCard";
import ReviewHeader from "@/app/components/details/ReviewHeader";
import { auth } from "@/auth";
import {
  getHotelById,
  getReviewsByHotelId,
  getUserByEmail,
  getUserReview,
} from "@/db/queries";
import { notFound } from "next/navigation";

const HotelDetailsPage = async ({ params: { id } }) => {
  const hotelDetails = await getHotelById(id);

  // get authenticated user details
  const { user: authUser } = await auth();
  const authUserId = await getUserByEmail(authUser.email);

  // get review details
  const reviewDetails = await getReviewsByHotelId(id);

  // get review user
  const userReview = await getUserReview(id, authUserId);

  // check if the user is the owner of the hotel
  const isOwner =
    authUser?.name?.toLowerCase()?.trim() ===
    hotelDetails?.owner?.toLowerCase()?.trim();

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
        <HotelTitle
          reviewDetails={reviewDetails}
          name={name}
          location={location}
        />
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
            reviewDetails={reviewDetails}
          />
        </div>
      </div>

      {/* Ratings */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t">
        <ReviewHeader
          reviewDetails={reviewDetails}
          hotelId={hotelId}
          authUserId={authUserId}
          userReview={userReview}
          isOwner={isOwner}
        />

        {/* Review grid */}
        <div className="grid grid-cols-2 gap-8">
          {reviewDetails.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              authUserId={authUserId}
            />
          ))}
        </div>

        {/* Show more btn */}
        {/* <button className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100 mt-8">
          Show More
        </button> */}
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
