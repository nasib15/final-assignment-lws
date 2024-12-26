import Link from "next/link";

const BookingForm = () => {
  return (
    <div>
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xl font-bold">$450</span>
            <span className="text-gray-600 ml-1">per night</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-star text-yellow-500 mr-1"></i>
            <span>5</span>
          </div>
        </div>

        <div className="border rounded-lg mb-4">
          <div className="grid grid-cols-2 border-b">
            <input
              type="text"
              placeholder="Check in"
              className="p-3 border-r"
            />
            <input type="text" placeholder="Check out" className="p-3" />
          </div>
          <input type="number" placeholder="Guests" className="w-full p-3" />
        </div>

        <Link
          href="/checkout/3"
          className="w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
        >
          Reserve
        </Link>

        <div className="text-center mt-4 text-gray-600">
          <p>You won&apos;t be charged yet</p>
        </div>
      </div>
    </div>
  );
};
export default BookingForm;
