import Image from "next/image";
import PaymentSummary from "./PaymentSummary";

const SuccessDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-start gap-6 mb-6 pb-6 border-b">
        <Image
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Property"
          className="w-32 h-32 rounded-lg object-cover"
          width={128}
          height={128}
        />
        <div>
          <h2 className="text-2xl font-semibold mb-2">Sea View Room</h2>
          <div className="flex items-center mb-2">
            <i className="fas fa-star text-sm mr-1"></i>
            <span className="text-sm">4.6 (500+ reviews)</span>
          </div>
          <p className="text-zinc-600">
            One room and one living room with a straight sea view....
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Reservation Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-600 text-sm">Check-in</span>
              <span className="text-zinc-500 text-sm">Jan 3, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 text-sm">Check-out</span>
              <span className="text-zinc-500 text-sm">Jan 8, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 text-sm">Guests</span>
              <span className="text-zinc-500 text-sm">1 guest</span>
            </div>
          </div>
        </div>

        <PaymentSummary/>
      </div>
    </div>
  );
};
export default SuccessDetails;
