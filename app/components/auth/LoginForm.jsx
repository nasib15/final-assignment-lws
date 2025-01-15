"use client";

import { login } from "@/app/actions/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState(null);

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
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

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
