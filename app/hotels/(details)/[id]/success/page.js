import DownloadButton from "@/app/components/payment/DownloadButton";
import NextSteps from "@/app/components/payment/NextSteps";
import SuccessDetails from "@/app/components/payment/SuccessDetails";
import SuccessMessage from "@/app/components/payment/SuccessMessage";
import { getHotelById } from "@/db/queries";

const SuccessPage = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <SuccessMessage />

        <SuccessDetails />

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
