import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "../Icons/Icon";

const HotelCard = () => {
  return (
    <Link href="/hotels/1" className="block group">
      <div>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Maldives Paradise"
            className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform"
            width={302}
            height={256}
          />
          <div className="absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold">
            <i className="ph-bed inline-block mr-1"></i>3 Rooms Left
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Maldives Paradise</h3>
            <div className="flex items-center">
              <StarIcon />
              <span className="ml-1 text-zinc-600">4.9</span>
            </div>
          </div>
          <p className="text-zinc-500 text-sm mt-1">Himmafushi, Maldives</p>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <span className="font-bold">$450 </span>
              <span className="text-zinc-500 text-sm">per night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default HotelCard;
