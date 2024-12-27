import { getBlurDataURL } from "@/utils/base64";
import Image from "next/image";

const HotelGallery = ({ thumbNailUrl, gallery }) => {
  const thumbNailBlur = getBlurDataURL(608, 500);

  const galleryBlur = getBlurDataURL(296, 242);
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
      <div className="col-span-2 row-span-2">
        <Image
          src={thumbNailUrl}
          alt="Main Room"
          className="w-full h-full object-cover rounded-lg"
          width={608}
          height={500}
          placeholder="blur"
          blurDataURL={thumbNailBlur}
        />
      </div>
      {gallery.map((image, index) => (
        <div key={index}>
          <Image
            src={image}
            alt={`Room ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
            width={296}
            height={242}
            placeholder="blur"
            blurDataURL={galleryBlur}
          />
        </div>
      ))}
    </div>
  );
};
export default HotelGallery;
