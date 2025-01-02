import { getReviewsByHotelId } from "@/db/queries";
import { getAvgRating } from "@/utils/getAvgRating";
import Image from "next/image";
import PaymentSummary from "./PaymentSummary";

const SuccessDetails = async ({
  hotelDetails,
  checkin,
  checkout,
  guests,
  bookingId,
}) => {
  const hotelReviews = await getReviewsByHotelId(hotelDetails.id);
  const avgRating = getAvgRating(hotelReviews);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-start gap-6 mb-6 pb-6 border-b">
        <Image
          src={hotelDetails.thumbNailUrl}
          alt="Property"
          className="rounded-lg object-cover"
          width={128}
          height={128}
        />
        <div>
          <h2 className="text-2xl font-semibold mb-2">{hotelDetails.name}</h2>
          <div className="flex items-center mb-2">
            <i className="fas fa-star text-sm mr-1"></i>
            <span className="text-sm">
              {avgRating.toFixed(1) || 0} ({hotelReviews.length || 0} reviews)
            </span>
          </div>
          <p className="text-zinc-600">
            {hotelDetails?.description?.slice(0, 55) + " ..."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Reservation Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-600 text-sm">Check-in</span>
              <span className="text-zinc-500 text-sm">
                {new Date(checkin).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 text-sm">Check-out</span>
              <span className="text-zinc-500 text-sm">
                {new Date(checkout).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 text-sm">Guests</span>
              <span className="text-zinc-500 text-sm">{guests} guest</span>
            </div>
          </div>
        </div>

        <PaymentSummary bookingId={bookingId} />
      </div>
    </div>
  );
};
export default SuccessDetails;
