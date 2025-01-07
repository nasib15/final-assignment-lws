import ManageHotelCard from "@/app/components/manage-hotels/ManageHotelCard";
import NoHotelsFound from "@/app/components/manage-hotels/NoHotelsFound";
import { auth } from "@/auth";
import { getUserHotels } from "@/db/queries";
import Link from "next/link";

const ManageHotelsPage = async () => {
  const { user: authUser } = await auth();
  const authUserName = authUser?.name;

  const userHotels = await getUserHotels(authUserName);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-800">Manage Hotels</h1>
        {userHotels.length > 0 && (
          <Link
            href="/profile/create-hotel"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:brightness-90 transition-colors"
          >
            + Create Hotel
          </Link>
        )}
      </div>

      {userHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userHotels.map((hotel) => (
            <ManageHotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <NoHotelsFound />
      )}
    </div>
  );
};
export default ManageHotelsPage;

// generate metadata
export const metadata = {
  title: "Manage Hotels",
  description: "View and manage your hotels",
};
