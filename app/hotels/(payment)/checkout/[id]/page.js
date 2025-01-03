import BookingCardPic from "@/app/components/payment/BookingCardPic";
import BookingDetails from "@/app/components/payment/BookingDetails";
import Button from "@/app/components/payment/Button";
import PaymentFormWrapper from "@/app/components/payment/PaymentFormWrapper";
import PriceDetails from "@/app/components/payment/PriceDetails";
import { auth } from "@/auth";
import {
  getHotelById,
  getReviewsByHotelId,
  getUserByEmail,
} from "@/db/queries";
import { getAvgRating } from "@/utils/getAvgRating";
import { notFound } from "next/navigation";

const PaymentPage = async ({ params: { id }, searchParams }) => {
  const hotelDetails = await getHotelById(id);
  const { user: authUser } = await auth();
  const authUserId = await getUserByEmail(authUser.email);

  const hotelReviews = await getReviewsByHotelId(id);
  const totalReviews = hotelReviews?.length;
  const avgRating = getAvgRating(hotelReviews);

  if (!hotelDetails) {
    notFound();
  }

  const { name, thumbNailUrl } = hotelDetails;
  const { checkin, checkout, guests, totalPrice } = searchParams;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <Button />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <BookingDetails
            hotelId={id}
            pricePerNight={hotelDetails.pricePerNight}
            totalGuests={hotelDetails.totalGuests}
          />

          <PaymentFormWrapper
            hotelId={id}
            authUserId={authUserId}
            checkin={checkin}
            checkout={checkout}
            guests={guests}
            totalPrice={totalPrice}
            authUser={authUser}
            hotelDetails={hotelDetails}
          />
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 sticky top-0">
            <BookingCardPic
              name={name}
              thumbNailUrl={thumbNailUrl}
              totalReviews={totalReviews}
              avgRating={avgRating}
            />

            <PriceDetails
              checkin={checkin}
              checkout={checkout}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;

// generate dynamic metadata
export async function generateMetadata({ params: { id } }) {
  const hotelDetails = await getHotelById(id);

  return {
    title: `Checkout | ${hotelDetails.name}`,
    description: `Hotel Booking App. This is a payment page. You can book your hotel now!`,
  };
}
