import BillingForm from "@/app/components/payment/BillingForm";
import BookingCardPic from "@/app/components/payment/BookingCardPic";
import BookingDetails from "@/app/components/payment/BookingDetails";
import Button from "@/app/components/payment/Button";
import PaymentForm from "@/app/components/payment/PaymentForm";
import PriceDetails from "@/app/components/payment/PriceDetails";
import { getHotelById } from "@/db/queries";
import Link from "next/link";
import { notFound } from "next/navigation";

const PaymentPage = async ({ params: { id }, searchParams }) => {
  const hotelDetails = await getHotelById(id);

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
            checkin={checkin}
            checkout={checkout}
            guests={guests}
          />

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Pay with American Express
            </h2>
            <PaymentForm />
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Billing address</h2>
            <BillingForm />
          </section>

          <Link
            href={`/hotels/${id}/success`}
            className="w-full block text-center bg-primary text-white py-3 rounded-lg mt-6 hover:brightness-90"
          >
            Request to book
          </Link>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 sticky top-0">
            <BookingCardPic name={name} thumbNailUrl={thumbNailUrl} />

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
