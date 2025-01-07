import { getUserById } from "@/db/queries";
import Image from "next/image";
import DeleteBtn from "./DeleteBtn";

const ReviewCard = async ({ review, authUserId }) => {
  const {
    review: reviewText,
    ratings,
    reviewDate,
    userId: reviewUserId,
    id: reviewId,
  } = review;

  // Check if the review belongs to the current user
  const isMyReview = reviewUserId?.toString() === authUserId?.toString();

  // Get user images
  const { name: reviewUserName, image: reviewUserImage } =
    await getUserById(reviewUserId);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow relative group">
      <div className="space-y-4">
        {/* User Info and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 rounded-full overflow-hidden">
              <Image
                src={reviewUserImage}
                alt="User avatar"
                className="object-cover"
                width={40}
                height={40}
              />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{reviewUserName}</h4>
              <p className="text-gray-500 text-sm">
                {new Date(reviewDate).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Delete Button - Only visible for review owner */}
          {isMyReview && <DeleteBtn reviewId={reviewId} />}
        </div>

        {/* Rating Stars */}
        <div className="flex items-center">
          {Array(ratings)
            .fill(null)
            .map((_, index) => (
              <i key={index} className="fas fa-star text-yellow-500 mr-1" />
            ))}
          {Array(5 - ratings)
            .fill(null)
            .map((_, index) => (
              <i key={index} className="far fa-star text-yellow-500 mr-1" />
            ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-600 leading-relaxed">{reviewText}</p>
      </div>

      {/* Divider line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gray-100"></div>
    </div>
  );
};
export default ReviewCard;
