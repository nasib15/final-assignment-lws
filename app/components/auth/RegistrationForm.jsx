"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    // Trim all form values
    const trimmedValues = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key].trim();
      return acc;
    }, {});

    if (!trimmedValues.username) {
      setError("Username is required");
      return false;
    }
    if (!trimmedValues.email) {
      setError("Email is required");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedValues.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password strength validation
    if (trimmedValues.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    // Password match validation
    if (trimmedValues.password !== trimmedValues.cpassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Handle registration logic
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          image:
            "https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg?w=1060",
        }),
      });

      if (response.status === 201) {
        setError(null);
        router.push("/login");
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User Name"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className={`w-full border ${error && !formData.username.trim() ? "border-red-500" : "border-gray-300"} rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary`}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
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
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          name="cpassword"
          value={formData.cpassword}
          onChange={handleChange}
          className={`w-full border ${error && !formData.cpassword.trim() ? "border-red-500" : "border-gray-300"} rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary`}
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
