import RegistrationForm from "@/app/components/auth/RegistrationForm";
import { GoogleIcon } from "@/app/components/Icons/Icon";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <section>
      <div className="flex items-center justify-center h-[calc(100vh-160px)]">
        <div className="bg-white rounded-xl shadow-2xl w-96 p-6 shadow-black/50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Register to Hotel Booking
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Welcome! Let&apos;s get you signed up.
            </p>
          </div>

          <div className="space-y-4 mb-4">
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-3 hover:bg-gray-50 transition">
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <RegistrationForm />
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegisterPage;
