import { getHotelById } from "@/db/queries";
import Image from "next/image";
import Link from "next/link";

const PendingBookingCard = async ({ booking }) => {
  const {
    hotelId,
    checkin,
    checkout,
    guests,
    bookedAt,
    bookingPrice,
    id: bookingId,
  } = booking;
  const hotelDetails = await getHotelById(hotelId);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Status Banner */}
      <div className="bg-yellow-500 text-white px-4 py-2 text-sm font-medium flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fas fa-clock"></i>
          <span>Pending Confirmation</span>
        </div>
        <span className="text-xs">
          Booked on{" "}
          {new Date(Number(bookedAt)).toLocaleDateString("en-UK", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="p-6">
        <div className="flex gap-6">
          {/* Hotel Image */}
          <div className="w-32 h-32 flex-shrink-0">
            <Image
              src={hotelDetails.thumbNailUrl}
              alt={hotelDetails.name}
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Booking Details */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {hotelDetails.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {hotelDetails.location}
                </p>
              </div>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                #{bookingId.toUpperCase()}
              </span>
            </div>

            {/* Stay Details */}
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium">Check-in</p>
                <p>
                  {new Date(checkin).toLocaleDateString("en-UK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="font-medium">Check-out</p>
                <p>
                  {new Date(checkout).toLocaleDateString("en-UK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="font-medium">Guests</p>
                <p>{guests} guests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <Link
            href={`/hotels/${hotelId}`}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            View Hotel Details
          </Link>
          <Link
            href={`/hotels/checkout/${hotelId}?checkin=${checkin}&checkout=${checkout}&guests=${guests}&totalPrice=${Number(
              bookingPrice
            )}&bookedAt=${bookedAt}`}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:brightness-90 transition-all duration-300"
          >
            Complete Payment
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <i className="fas fa-info-circle text-blue-500 mt-1"></i>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Booking Status</p>
              <p>
                Your booking is pending confirmation. Please complete the
                payment to secure your reservation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingBookingCard;
