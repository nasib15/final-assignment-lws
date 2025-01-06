import { auth } from "@/auth";
import { getHotelById, getPaymentDetails } from "@/db/queries";
import differenceInDays from "@/utils/getDifferenceInDays";
import Image from "next/image";
import Link from "next/link";
import DownloadBtn from "./DownloadBtn";

const BookingCard = async ({ booking }) => {
  const { hotelId } = booking;
  const hotelDetails = await getHotelById(hotelId.toString());
  const { user: authUser } = await auth();

  // booking details
  const { id, checkin, checkout, guests, bookedAt } = booking;

  // payment form data
  const paymentDetails = await getPaymentDetails(id);

  // booking data
  const bookingData = {
    guestName: authUser.name,
    guestEmail: authUser.email,
    hotelName: hotelDetails.name,
    hotelLocation: hotelDetails.location,
    hotelAddress: `${hotelDetails.location}, 42028`,
    hotelPhone: "+1 234 567 8900",
    hotelEmail: `contact@${hotelDetails.name
      .split(" ")
      .join("_")
      .toLowerCase()}.com`,
    checkin,
    checkout,
    nights: differenceInDays(new Date(checkout), new Date(checkin)),
    guests: Number(guests),
    pricePerNight: Number(hotelDetails.pricePerNight),
    totalPrice: Number(paymentDetails.totalPrice),
    bookingId: id,
    billingAddress: {
      streetAddress: paymentDetails.streetAddress,
      aptNumber: paymentDetails.aptNumber,
      city: paymentDetails.city,
      state: paymentDetails.state,
      zipCode: paymentDetails.zipCode,
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow gap-6">
      <div className="flex items-center space-x-4">
        <Image
          src={hotelDetails.thumbNailUrl}
          alt="Property Thumbnail"
          className="w-24 h-24 object-cover rounded-md"
          width={96}
          height={96}
        />
        <div>
          <h2 className="text-lg text-zinc-800 font-semibold">
            {hotelDetails.name}
          </h2>
          <p className="text-zinc-500 text-sm">
            Booking Date:{" "}
            {new Date(bookedAt).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-zinc-500 text-sm">
            Booking Code: #{id.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={`/hotels/${hotelId}/success?checkin=${checkin}&checkout=${checkout}&guests=${guests}&totalPrice=${Number(paymentDetails.totalPrice)}`}
          className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:brightness-90"
        >
          View Trip Details
        </Link>
        <DownloadBtn bookingData={bookingData} />
      </div>
    </div>
  );
};
export default BookingCard;
