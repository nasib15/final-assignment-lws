import Image from "next/image";

const HotelGallery = ({ thumbNailUrl, gallery }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
      <div className="col-span-2 row-span-2">
        <Image
          src={thumbNailUrl}
          alt="Main Room"
          className="w-full h-full object-cover rounded-lg"
          width={608}
          height={500}
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
          />
        </div>
      ))}
    </div>
  );
};
export default HotelGallery;
