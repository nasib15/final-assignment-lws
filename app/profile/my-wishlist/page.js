import HotelCard from "@/app/components/home/HotelCard";
import { auth } from "@/auth";
import {
  getHotelById,
  getUserIdByEmail,
  getUserWishlist,
  isHotelInWishlist,
} from "@/db/queries";

const WishlistPage = async () => {
  const session = await auth();
  const authUser = session?.user;
  const authUserId = await getUserIdByEmail(authUser?.email);

  const wishlist = await getUserWishlist(authUserId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlist?.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <i className="fas fa-heart text-6xl text-gray-300"></i>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Start adding hotels to your wishlist by clicking the heart icon on
            any hotel card.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(async (item) => {
            const isWishlisted = await isHotelInWishlist(
              authUserId,
              item.hotelId,
            );

            const hotelDetails = await getHotelById(item.hotelId);

            return (
              <HotelCard
                key={item.id}
                hotel={hotelDetails}
                authUserId={authUserId}
                isWishlisted={isWishlisted}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

// Generate metadata
export const metadata = {
  title: "My Wishlist",
  description: "View and manage your favorite hotels",
};
