import BookingCard from "@/app/components/bookings/BookingCard";
import NoBookingsFound from "@/app/components/bookings/NoBookingsFound";
import { auth } from "@/auth";
import { getUserBookings, getUserByEmail } from "@/db/queries";

const MyBookingsPage = async () => {
  const { user: authUser } = await auth();
  const authUserId = await getUserByEmail(authUser?.email);
  const userBookings = await getUserBookings(authUserId);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="space-y-4">
        {userBookings?.length > 0 ? (
          userBookings?.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <NoBookingsFound />
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
