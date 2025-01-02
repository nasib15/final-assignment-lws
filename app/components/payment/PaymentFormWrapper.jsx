"use client";

import { addPayment } from "@/app/actions/payment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InfoIcon } from "../Icons/Icon";
import Input from "../shared/Input";

const PaymentFormWrapper = ({
  hotelId,
  authUserId,
  checkin,
  checkout,
  guests,
  totalPrice,
}) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
    streetAddress: "",
    aptNumber: "",
    city: "",
    state: "",
    zipCode: "",
    totalPrice: Number(totalPrice) + 51.31 + 17.5,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredFields = [
      "cardNumber",
      "expiration",
      "cvv",
      "streetAddress",
      "city",
      "state",
      "zipCode",
    ];

    // Validate required fields
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log(formData);
      const response = await addPayment(authUserId, hotelId, formData);

      if (response.success) {
        alert(response.message);
        setFormData({
          cardNumber: "",
          expiration: "",
          cvv: "",
          streetAddress: "",
          aptNumber: "",
          city: "",
          state: "",
          zipCode: "",
        });
        setErrors({});
        setIsSubmitting(false);

        router.push(
          `/hotels/${hotelId}/success?checkin=${checkin}&checkout=${checkout}&guests=${guests}&totalPrice=${totalPrice}`
        );
      }
    } catch (error) {
      setErrors({ submit: "Payment failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Payment Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pay with Credit Card</h2>
        <div className="space-y-4">
          <Input
            name="cardNumber"
            placeholder="Card number"
            value={formData.cardNumber}
            onChange={handleChange}
            error={errors.cardNumber}
            type="number"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="expiration"
              placeholder="MM/YY"
              value={formData.expiration}
              onChange={handleChange}
              error={errors.expiration}
              type="date"
            />
            <Input
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              error={errors.cvv}
              type="number"
            />
          </div>
        </div>
      </section>

      {/* Billing Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
        <div className="space-y-4">
          <Input
            name="streetAddress"
            placeholder="Street address"
            value={formData.streetAddress}
            onChange={handleChange}
            error={errors.streetAddress}
            type="text"
          />

          <Input
            name="aptNumber"
            placeholder="Apt or suite number (optional)"
            value={formData.aptNumber}
            onChange={handleChange}
            type="number"
          />

          <Input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            type="text"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              type="text"
            />
            <Input
              name="zipCode"
              placeholder="ZIP code"
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode}
              type="number"
            />
          </div>
        </div>
      </section>

      {/* Info Message */}
      <div className="mt-4 flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <InfoIcon />
        <p>
          Our payment system is currently in development. This is a
          demonstration form. Please proceed with the booking process as normal.
        </p>
      </div>

      {/* Submit Error Message */}
      {errors.submit && (
        <div className="text-red-500 text-sm text-center">{errors.submit}</div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full block text-center bg-primary text-white py-3 rounded-lg mt-6 hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Processing..." : "Request to book"}
      </button>
    </form>
  );
};

export default PaymentFormWrapper;
