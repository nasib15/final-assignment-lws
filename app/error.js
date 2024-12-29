"use client";

import { ErrorIcon, TryAgainIcon } from "./components/Icons/Icon";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <ErrorIcon />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error?.message || "An unexpected error occurred"}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={() => reset()}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ease-in-out"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <TryAgainIcon />
            </span>
            Try Again
          </button>
        </div>

        {/* Additional Help Text */}
        <p className="mt-2 text-center text-sm text-gray-600">
          If the problem persists, please refresh the page or contact support.
        </p>
      </div>
    </div>
  );
}
