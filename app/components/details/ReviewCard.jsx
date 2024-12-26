import logo from "@/public/logo.svg";
import Image from "next/image";

const ReviewCard = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
          <Image
            src={logo}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">John Smith</h4>
          <p className="text-gray-500 text-sm">December 2024</p>
        </div>
      </div>
      <div className="flex items-center">
        <i className="fas fa-star text-yellow-500"></i>
        <i className="fas fa-star text-yellow-500"></i>
        <i className="fas fa-star text-yellow-500"></i>
        <i className="fas fa-star text-yellow-500"></i>
        <i className="fas fa-star text-yellow-500"></i>
      </div>
      <p className="text-gray-600 leading-relaxed">
        Amazing stay! The villa exceeded our expectations. The private pool and
        beach access were highlights of our trip. Sarah was an excellent host,
        always responsive and helpful.
      </p>
    </div>
  );
};
export default ReviewCard;
