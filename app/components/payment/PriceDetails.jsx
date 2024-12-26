const PriceDetails = () => {
  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-4">Price details</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>$59.08 x 5 nights</span>
          <span>$295.39</span>
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
          <span>$364.20</span>
        </div>
      </div>
    </div>
  );
};
export default PriceDetails;
