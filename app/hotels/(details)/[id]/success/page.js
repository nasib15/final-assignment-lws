import { findBookingId } from "@/app/actions/booking";
import DownloadButton from "@/app/components/payment/DownloadButton";
import NextSteps from "@/app/components/payment/NextSteps";
import SuccessDetails from "@/app/components/payment/SuccessDetails";
import SuccessMessage from "@/app/components/payment/SuccessMessage";
import { auth } from "@/auth";
import {
  getHotelById,
  getPaymentDetails,
  getUserIdByEmail,
} from "@/db/queries";
import differenceInDays from "@/utils/getDifferenceInDays";
import { notFound } from "next/navigation";

const SuccessPage = async ({ params: { id }, searchParams }) => {
  const hotelDetails = await getHotelById(id);
  const { checkin, checkout, guests, bookedAt } = searchParams;

  const { user: authUser } = await auth();
  const authUserId = await getUserIdByEmail(authUser.email);

  const bookingId = await findBookingId(id, authUserId, bookedAt);

  const paymentDetails = (await getPaymentDetails(bookingId)) || {};

  if (!hotelDetails) {
    notFound();
  }

  const bookingData = {
    guestName: authUser?.name,
    guestEmail: authUser?.email,
    hotelName: hotelDetails?.name,
    hotelLocation: hotelDetails?.location,
    hotelAddress: `${hotelDetails?.location}, 42028`,
    hotelPhone: "+1 234 567 8900",
    hotelEmail: `contact@${hotelDetails?.name
      .split(" ")
      .join("_")
      .toLowerCase()}.com`,
    checkin,
    checkout,
    nights: differenceInDays(new Date(checkout), new Date(checkin)),
    guests: Number(guests),
    pricePerNight: Number(hotelDetails?.pricePerNight),
    totalPrice: Number(searchParams?.totalPrice),
    bookingId,
    billingAddress: {
      streetAddress: paymentDetails?.streetAddress,
      aptNumber: paymentDetails?.aptNumber,
      city: paymentDetails?.city,
      state: paymentDetails?.state,
      zipCode: paymentDetails?.zipCode,
    },
  };

  return (
    <section className="bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <SuccessMessage />

        <SuccessDetails
          hotelDetails={hotelDetails}
          checkin={checkin}
          checkout={checkout}
          guests={guests}
          bookingId={bookingId}
        />

        <NextSteps />

        <DownloadButton bookingData={bookingData} />

        <div className="mt-12 text-center">
          <p className="text-zinc-600">Need help with your booking?</p>
          <a href="#" className="text-primary hover:underline">
            Visit our Help Center
          </a>
        </div>
      </div>
    </section>
  );
};
export default SuccessPage;

// generate metadata

export async function generateMetadata({ params: { id } }) {
  const hotelDetails = await getHotelById(id);

  return {
    title: `Success | ${hotelDetails.name}`,
    description: `Hotel Booking App. This is a payment page. You can book your hotel now!`,
  };
}
