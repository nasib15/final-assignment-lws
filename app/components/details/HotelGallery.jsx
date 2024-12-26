import Image from "next/image";

const HotelGallery = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
      <div className="col-span-2 row-span-2">
        <Image
          src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Main Room"
          className="w-full h-full object-cover rounded-lg"
          width={608}
          height={500}
        />
      </div>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Room 1"
          className="w-full h-full object-cover rounded-lg"
          width={296}
          height={242}
        />
      </div>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Room 2"
          className="w-full h-full object-cover rounded-lg"
          width={296}
          height={242}
        />
      </div>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Room 3"
          className="w-full h-full object-cover rounded-lg"
          width={296}
          height={242}
        />
      </div>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Room 4"
          className="w-full h-full object-cover rounded-lg"
          width={296}
          height={242}
        />
      </div>
    </div>
  );
};
export default HotelGallery;
