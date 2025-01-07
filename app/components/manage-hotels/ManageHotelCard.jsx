import Image from "next/image";
import Link from "next/link";
import { DeleteBtn } from "./DeleteBtn";

const ManageHotelCard = ({ hotel }) => {
  const { id, name, location, pricePerNight, availableRooms, thumbNailUrl } =
    hotel;

  return (
    <div className="overflow-hidden cursor-pointer">
      <div className="relative">
        <Image
          src={thumbNailUrl}
          alt={name}
          className="w-full h-48 object-cover rounded-md transition-all hover:scale-105"
          width={400}
          height={192}
        />
        <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold">
          <i className="fas fa-star text-yellow-500 mr-1"></i>4.8
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">{name}</h2>
        <div className="flex justify-between items-center">
          <span className="text-zinc-600">
            {availableRooms} Rooms Available
          </span>
          <span className="text-rose-600 font-semibold">
            ${pricePerNight}/night
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-500">Location: {location}</span>
          <div className="space-x-2">
            <Link
              href="/profile/create-hotel"
              className="text-blue-500 hover:text-blue-600"
            >
              <i className="fas fa-edit"></i>
            </Link>
            <DeleteBtn hotelId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageHotelCard;
