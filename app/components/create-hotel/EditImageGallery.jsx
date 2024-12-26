import Image from "next/image";

const EditImageGallery = () => {
  return (
    <>
      <div className="col-span-2 row-span-2 relative">
        <Image
          src="https://placehold.co/600x400"
          alt="Main Room"
          className="w-full h-full object-cover rounded-lg"
          width={600}
          height={400}
        />
        <input
          type="text"
          placeholder="https://placehold.co/600x400"
          className="w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
        />
      </div>
      <div className="relative">
        <Image
          src="https://placehold.co/600x400"
          alt="Room 1"
          className="w-full h-full object-cover rounded-lg"
          width={600}
          height={400}
        />
        <input
          type="text"
          placeholder="https://placehold.co/600x400"
          className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
        />
      </div>
      <div className="relative">
        <Image
          src="https://placehold.co/600x400"
          alt="Room 2"
          className="w-full h-full object-cover rounded-lg"
          width={600}
          height={400}
        />
        <input
          type="text"
          placeholder="https://placehold.co/600x400"
          className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
        />
      </div>
      <div className="relative">
        <Image
          src="https://placehold.co/600x400"
          alt="Room 3"
          className="w-full h-full object-cover rounded-lg"
          width={600}
          height={400}
        />
        <input
          type="text"
          placeholder="https://placehold.co/600x400"
          className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
        />
      </div>
      <div className="relative">
        <Image
          src="https://placehold.co/600x400"
          alt="Room 4"
          className="w-full h-full object-cover rounded-lg"
          width={600}
          height={400}
        />
        <input
          type="text"
          placeholder="https://placehold.co/600x400"
          className="text-sm w-11/12 p-2 border border-primary rounded-lg mt-2 absolute left-1/2 -translate-x-1/2 bottom-2 bg-white"
        />
      </div>
    </>
  );
};
export default EditImageGallery;
