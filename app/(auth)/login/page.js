import LoginForm from "@/app/components/auth/LoginForm";
import SocialBtn from "@/app/components/auth/SocialBtn";
import Link from "next/link";

const LoginPage = () => {
  return (
    <section className="bg-gray-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl w-96 p-6 relative shadow-black/50">
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Log in to Hotel Booking
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Welcome back! Let&apos;s get you signed in.
            </p>
          </div>

          <div className="space-y-4 mb-4">
            <SocialBtn />

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <LoginForm />
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginPage;
