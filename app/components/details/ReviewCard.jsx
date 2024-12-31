import Image from "next/image";

const ReviewCard = ({ review, user }) => {
  const { review: reviewText, ratings, reviewDate } = review;
  const { name, image } = user;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="bg-gray-200 rounded-full overflow-hidden">
          <Image
            src={image}
            alt="User avatar"
            className="object-cover"
            width={40}
            height={40}
          />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-gray-500 text-sm">
            {new Date(reviewDate).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        {Array(ratings)
          .fill(null)
          .map((_, index) => (
            <i key={index} className="fas fa-star text-yellow-500 mr-1"></i>
          ))}
      </div>
      <p className="text-gray-600 leading-relaxed">{reviewText}</p>
    </div>
  );
};
export default ReviewCard;
