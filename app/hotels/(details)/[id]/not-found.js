import Link from "next/link";

export default function HotelNotFound() {
  return (
    <section>
      <div className="flex items-center justify-center h-[calc(100vh-160px)]">
        <div className="bg-white rounded-xl shadow-2xl w-96 p-6 relative shadow-black/50">
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
              <i className="fas fa-hotel text-4xl text-primary"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Hotel Not Found
            </h2>
            <p className="text-gray-600 text-sm">
              Sorry, the hotel you&lsquo;re looking for doesn&lsquo;t exist or
              has been removed.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="w-full bg-primary text-white rounded-full py-3 hover:brightness-90 transition flex items-center justify-center"
            >
              <i className="fas fa-search mr-2"></i>
              Browse More Hotels
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
