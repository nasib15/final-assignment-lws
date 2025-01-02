"use client";

import differenceInDays from "@/utils/getDifferenceInDays";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const BookingDetails = ({ hotelId, pricePerNight, totalGuests }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCheckin = searchParams.get("checkin");
  const initialCheckout = searchParams.get("checkout");
  const initialGuests = searchParams.get("guests");

  const [isEditingDates, setIsEditingDates] = useState(false);
  const [isEditingGuests, setIsEditingGuests] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(initialCheckin),
      endDate: new Date(initialCheckout),
      key: "selection",
    },
  ]);
  const [guestCount, setGuestCount] = useState(Number(initialGuests));

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
    updateURL(item.selection.startDate, item.selection.endDate, guestCount);
  };

  const handleGuestChange = (newCount) => {
    setGuestCount(newCount);
    updateURL(dateRange[0].startDate, dateRange[0].endDate, newCount);
  };

  const updateURL = (checkin, checkout, guests) => {
    const nights = differenceInDays(new Date(checkout), new Date(checkin));
    const newTotalPrice = Number(pricePerNight) * Number(nights);

    const params = new URLSearchParams(searchParams);
    params.set("checkin", checkin.toISOString());
    params.set("checkout", checkout.toISOString());
    params.set("guests", guests);
    params.set("totalPrice", newTotalPrice);

    router.replace(`/hotels/checkout/${hotelId}?${params.toString()}`);
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your trip</h2>

      <div className="space-y-4">
        {/* Dates Section */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Dates</h3>
            {!isEditingDates ? (
              <p className="text-zinc-600 text-sm">
                {new Date(dateRange[0].startDate).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(dateRange[0].endDate).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                (
                {differenceInDays(dateRange[0].endDate, dateRange[0].startDate)}{" "}
                nights)
              </p>
            ) : (
              <div className="mt-2">
                <DateRange
                  ranges={dateRange}
                  onChange={handleDateChange}
                  months={1}
                  direction="horizontal"
                  minDate={new Date()}
                  className="border rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
          <button
            onClick={() => setIsEditingDates(!isEditingDates)}
            className="text-zinc-800 underline text-sm"
          >
            {isEditingDates ? "Done" : "Edit"}
          </button>
        </div>

        {/* Guests Section */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Guests</h3>
            {!isEditingGuests ? (
              <p className="text-zinc-600 text-sm">{guestCount} guest(s)</p>
            ) : (
              <div className="mt-2 flex items-center gap-4">
                <button
                  onClick={() => handleGuestChange(Math.max(1, guestCount - 1))}
                  className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={guestCount === 1}
                >
                  -
                </button>
                <span>{guestCount}</span>
                <button
                  onClick={() => handleGuestChange(guestCount + 1)}
                  className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={guestCount === totalGuests}
                >
                  +
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsEditingGuests(!isEditingGuests)}
            className="text-zinc-800 underline text-sm"
          >
            {isEditingGuests ? "Done" : "Edit"}
          </button>
        </div>
      </div>
    </section>
  );
};
export default BookingDetails;
