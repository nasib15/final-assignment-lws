"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegistrationForm = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const name = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
      const cpassword = formData.get("cpassword");

      if (password !== cpassword) {
        setError("Passwords do not match");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      // Handle registration logic
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          image:
            "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg?w=1060",
        }),
      });

      if (response.status === 201) {
        setError(null);
        router.push("/login");
      } else {
        const data = await response.json();
        if (response.status === 400) {
          setError(data.message || "Email already exists");
        } else {
          setError(response.statusText);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User Name"
        name="username"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
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
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          name="cpassword"
          className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
        >
          {showConfirmPassword ? (
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
        className="w-full bg-primary text-white rounded-full py-3 hover:brightness-90 transition"
      >
        Continue
      </button>
    </form>
  );
};
export default RegistrationForm;
