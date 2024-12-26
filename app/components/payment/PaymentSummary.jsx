const PaymentSummary = () => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Payment Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-zinc-600">Total amount paid</span>
          <span className="font-semibold">$364.20</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600 text-sm">Booking ID</span>
          <span>BOOK123456</span>
        </div>
      </div>
    </div>
  );
};
export default PaymentSummary;
