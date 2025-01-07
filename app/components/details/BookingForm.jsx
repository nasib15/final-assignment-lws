"use client";

import { addBooking } from "@/app/actions/booking";
import addDays from "@/utils/addDays";
import { getAvgRating } from "@/utils/getAvgRating";
import differenceInDays from "@/utils/getDifferenceInDays";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import toast from "react-hot-toast";

const BookingForm = ({
  hotelId,
  pricePerNight,
  totalGuests,
  reviewDetails,
  authUserId,
}) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const [isAvailable, setIsAvailable] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(pricePerNight);
  const calendarRef = useRef(null);
  const router = useRouter();
  const avgRating = getAvgRating(reviewDetails);

  // Check availability on date change
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const response = await fetch("/api/hotels/check-availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotelId,
            checkin: dateRange[0].startDate.toISOString(),
            checkout: dateRange[0].endDate.toISOString(),
          }),
        });

        const data = await response.json();
        setIsAvailable(data.available);
      } catch (error) {
        setIsAvailable(false);
        throw new Error(error);
      }
    };

    checkAvailability();
  }, [dateRange, hotelId]);

  // Calculate total price whenever dates or guests change
  useEffect(() => {
    const nights = differenceInDays(
      dateRange[0].endDate,
      dateRange[0].startDate
    );
    const calculatedPrice = nights * pricePerNight;
    setTotalPrice(calculatedPrice);
  }, [dateRange, pricePerNight]);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleReserve = async () => {
    const bookingData = {
      hotelId,
      userId: authUserId,
      checkin: new Date(dateRange[0].startDate).toISOString(),
      checkout: new Date(dateRange[0].endDate).toISOString(),
      guests,
      bookingPrice: totalPrice,
    };

    const response = await addBooking(bookingData);

    if (response.success) {
      toast.success("Booking added successfully");
      router.push(
        `/hotels/checkout/${hotelId}?checkin=${bookingData.checkin}&checkout=${bookingData.checkout}&guests=${bookingData.guests}&totalPrice=${bookingData.bookingPrice}`
      );
    }
  };

  return (
    <div className="sticky top-24">
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xl font-bold">${pricePerNight}</span>
            <span className="text-gray-600 ml-1">per night</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-star text-yellow-500 mr-1"></i>
            <span>{avgRating.toFixed(1)}</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Date Selection */}
          <div className="relative" ref={calendarRef}>
            <div
              className="border rounded-lg p-3 cursor-pointer"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <div className="font-semibold mb-1">CHECK-IN - CHECKOUT</div>
                  <div>
                    {new Date(dateRange[0].startDate).toLocaleDateString(
                      "en-UK",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}{" "}
                    -{" "}
                    {new Date(dateRange[0].endDate).toLocaleDateString(
                      "en-UK",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
                <i className="fas fa-calendar"></i>
              </div>
            </div>

            {showCalendar && (
              <div className="absolute z-50 mt-2">
                <DateRange
                  ranges={dateRange}
                  onChange={(item) => setDateRange([item.selection])}
                  months={1}
                  direction="horizontal"
                  minDate={new Date()}
                  className="border rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>

          {/* Availability Message */}
          {!isAvailable ? (
            <div className="text-red-500 text-sm mt-2">
              These dates are not available. Please select different dates.
            </div>
          ) : (
            <div className="text-green-500 text-sm mt-2">
              Dates are available!
            </div>
          )}

          {/* Guests Selection */}
          <div className="border rounded-lg p-3">
            <div className="font-semibold mb-1 text-sm">GUESTS</div>
            <div className="flex justify-between items-center">
              <span>{guests} guest(s)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                  disabled={guests === 1}
                  className="p-1 px-3 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span>{guests}</span>
                <button
                  onClick={() => setGuests((prev) => prev + 1)}
                  disabled={guests === totalGuests}
                  className="p-1 px-3 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>
                ${pricePerNight} x{" "}
                {differenceInDays(dateRange[0].endDate, dateRange[0].startDate)}{" "}
                nights
              </span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>

          {/* Reserve Button */}
          <button
            onClick={handleReserve}
            disabled={!isAvailable}
            className={`w-full block text-center ${
              !isAvailable
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:brightness-90"
            } text-white py-3 rounded-lg mt-6 transition-all`}
          >
            {isAvailable ? "Reserve" : "Dates Not Available"}
          </button>

          <div className="text-center text-sm text-gray-500">
            You won&lsquo;t be charged yet
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingForm;
