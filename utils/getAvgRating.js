export const getAvgRating = (reviews) => {
  const totalRating =
    reviews?.reduce((acc, curr) => acc + curr.ratings, 0) / reviews?.length ||
    0;
  return totalRating;
};
