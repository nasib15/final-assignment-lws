import { findBookingId } from "@/app/actions/booking";
import DownloadButton from "@/app/components/payment/DownloadButton";
import NextSteps from "@/app/components/payment/NextSteps";
import SuccessDetails from "@/app/components/payment/SuccessDetails";
import SuccessMessage from "@/app/components/payment/SuccessMessage";
import { auth } from "@/auth";
import { getHotelById, getUserByEmail } from "@/db/queries";
import { notFound } from "next/navigation";

const SuccessPage = async ({ params: { id }, searchParams }) => {
  const hotelDetails = await getHotelById(id);
  const { checkin, checkout, guests } = searchParams;

  const { user: authUser } = await auth();
  const authUserId = await getUserByEmail(authUser.email);

  const bookingId = await findBookingId(id, authUserId, checkin, checkout);

  if (!hotelDetails) {
    notFound();
  }

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

        <DownloadButton />

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
