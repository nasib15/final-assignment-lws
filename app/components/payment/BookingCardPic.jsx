import { getBlurDataURL } from "@/utils/base64";
import Image from "next/image";

const BookingCardPic = ({ name, thumbNailUrl, totalReviews, avgRating }) => {
  const thumbNailBlur = getBlurDataURL(96, 96);

  return (
    <div className="flex items-start gap-4 mb-6">
      <Image
        src={thumbNailUrl}
        alt={name}
        className="w-20 h-20 rounded-lg object-cover"
        width={80}
        height={80}
        placeholder="blur"
        blurDataURL={thumbNailBlur}
      />
      <div>
        <p className="text-sm">{name}</p>
        <div className="flex items-center">
          <i className="fas fa-star text-sm mr-1"></i>
          <span className="text-xs mt-1 text-zinc-500">
            {avgRating.toFixed(1)} ({totalReviews} Reviews)
          </span>
        </div>
      </div>
    </div>
  );
};
export default BookingCardPic;
