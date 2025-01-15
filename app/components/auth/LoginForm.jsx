"use client";

import { login } from "@/app/actions/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await login({ email, password });

      if (response) {
        setError("Invalid email or password");
      } else {
        await update();
        router.push("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
        >
          {showPassword ? (
            <i className="fas fa-eye-slash"></i>
          ) : (
            <i className="fas fa-eye"></i>
          )}
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded">
          <i className="fas fa-exclamation-circle mr-2"></i>
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-primary text-white rounded-full py-3 hover:bg-primary transition"
      >
        Continue
      </button>
    </form>
  );
};
export default LoginForm;
