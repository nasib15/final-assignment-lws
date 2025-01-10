import BookingCard from "@/app/components/bookings/BookingCard";
import NoBookingsFound from "@/app/components/bookings/NoBookingsFound";
import PendingBookingCard from "@/app/components/bookings/PendingBookingCard";
import { auth } from "@/auth";
import {
  getConfirmedBookings,
  getPendingBookings,
  getUserIdByEmail,
} from "@/db/queries";

const MyBookingsPage = async () => {
  const { user: authUser } = await auth();
  const authUserId = await getUserIdByEmail(authUser?.email);
  const pendingBookings = await getPendingBookings(authUserId);
  const confirmedBookings = await getConfirmedBookings(authUserId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold mb-6">Pending Bookings</h1>

      <div className="space-y-4">
        {pendingBookings.length > 0 ? (
          pendingBookings?.map((booking) => (
            <PendingBookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <NoBookingsFound confirmed={false} />
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6 mt-12">Confirmed Bookings</h1>

      <div className="space-y-4">
        {confirmedBookings.length > 0 ? (
          confirmedBookings?.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <NoBookingsFound confirmed={true} />
        )}
      </div>
    </div>
  );
};
export default MyBookingsPage;

// generate metadata
export const metadata = {
  title: "My Bookings",
  description: "View and manage your bookings",
};
