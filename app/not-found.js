import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="flex items-center justify-center h-[calc(100vh-160px)]">
        <div className="bg-white rounded-xl shadow-2xl w-96 p-6 relative shadow-black/50">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-primary mb-4">404</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-sm">
              Oops! The page you&lsquo;re looking for doesn&apos;t exist or has
              been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="w-full bg-primary text-white rounded-full py-3 hover:brightness-90 transition flex items-center justify-center"
            >
              <i className="fas fa-home mr-2"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
