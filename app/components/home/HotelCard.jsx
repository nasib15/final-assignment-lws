import { getBlurDataURL } from "@/utils/base64";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "../Icons/Icon";

const HotelCard = ({ hotel }) => {
  const { id, name, location, pricePerNight, availableRooms, thumbNailUrl } =
    hotel;

  const thumbNailBlur = getBlurDataURL(302, 256);
  return (
    <Link href={`/hotels/${id}`} className="block group">
      <div>
        <div className="relative">
          <Image
            src={thumbNailUrl}
            alt="Maldives Paradise"
            className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
            width={302}
            height={256}
            placeholder="blur"
            blurDataURL={thumbNailBlur}
          />
          <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
            <i className="ph-bed inline-block mr-1"></i>
            {availableRooms} Rooms Left
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex items-center">
              <StarIcon />
              <span className="ml-1 text-zinc-600">4.9</span>
            </div>
          </div>
          <p className="text-zinc-500 text-sm mt-1">{location}</p>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <span className="font-bold">${pricePerNight} </span>
              <span className="text-zinc-500 text-sm">per night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default HotelCard;
