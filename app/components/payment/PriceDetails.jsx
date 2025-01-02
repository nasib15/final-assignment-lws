import differenceInDays from "@/utils/getDifferenceInDays";

const PriceDetails = ({ checkin, checkout, totalPrice }) => {
  const nights = differenceInDays(new Date(checkout), new Date(checkin));
  const pricePerNight = Number(totalPrice) / Number(nights);
  const calculatedTotalPrice = 51.31 + 17.5 + Number(totalPrice);

  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-4">Price details</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>
            ${pricePerNight || 0} x {nights} nights
          </span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Cleaning fee</span>
          <span>$17.50</span>
        </div>
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>$51.31</span>
        </div>
        <div className="flex justify-between font-semibold pt-3 border-t">
          <span>Total (USD)</span>
          <span>${calculatedTotalPrice}</span>
        </div>
      </div>
    </div>
  );
};
export default PriceDetails;
