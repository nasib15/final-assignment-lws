import { getPaymentDetails } from "@/db/queries";

const PaymentSummary = async ({ bookingId }) => {
  const paymentDetails = await getPaymentDetails(bookingId);

  return (
    <div>
      <h3 className="font-semibold mb-4">Payment Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-zinc-600">Total amount paid</span>
          <span className="font-semibold">${paymentDetails?.totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600 text-sm">Booking ID</span>
          <span>{bookingId.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
export default PaymentSummary;
