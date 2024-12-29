import LoginForm from "@/app/components/auth/LoginForm";
import SocialBtn from "@/app/components/auth/SocialBtn";
import Link from "next/link";

const LoginPage = () => {
  return (
    <section>
      <div className="flex items-center justify-center h-[calc(100vh-160px)]">
        <div className="bg-white rounded-xl shadow-2xl w-96 p-6 shadow-black/50">
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
