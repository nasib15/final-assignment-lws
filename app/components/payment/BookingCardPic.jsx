import Image from "next/image";

const BookingCardPic = () => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <Image
        src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Property"
        className="w-20 h-20 rounded-lg object-cover"
        width={80}
        height={80}
      />
      <div>
        <p className="text-sm">
          One room and one living room with a straight sea view, 1.8m queen...
        </p>
        <div className="flex items-center">
          <i className="fas fa-star text-sm mr-1"></i>
          <span className="text-xs mt-1 text-zinc-500">5.00 (3 Reviews)</span>
        </div>
      </div>
    </div>
  );
};
export default BookingCardPic;
