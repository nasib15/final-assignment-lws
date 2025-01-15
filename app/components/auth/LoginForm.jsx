"use client";

import { login } from "@/app/actions/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { update } = useSession();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();

    if (!trimmedEmail) {
      setError("Email is required");
      return false;
    }
    if (!trimmedPassword) {
      setError("Password is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className={`w-full border ${error && !formData.email.trim() ? "border-red-500" : "border-gray-300"} rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary`}
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full border ${error && !formData.password.trim() ? "border-red-500" : "border-gray-300"} rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary`}
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
