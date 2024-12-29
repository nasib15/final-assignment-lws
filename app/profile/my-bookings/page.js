import BookingCard from "@/app/components/bookings/BookingCard";

const MyBookingsPage = async () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="space-y-4">
        <BookingCard />
        <BookingCard />
        <BookingCard />
      </div>

      {/* No booking card */}
      {/* <div id="empty-state" className="hidden text-center py-12">
        <Image
          src="./no-bookings-icon.svg"
          alt="No Bookings"
          className="mx-auto mb-4 w-32 h-32"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No Bookings Yet
        </h2>
        <p className="text-zinc-500 text-sm">
          You haven't made any bookings. Start exploring amazing stays!
        </p>
      </div> */}
    </div>
  );
};
export default MyBookingsPage;

// generate metadata
export const metadata = {
  title: "My Bookings",
  description: "View and manage your bookings",
};
