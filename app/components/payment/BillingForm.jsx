const BillingForm = () => {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Street address"
        className="w-full p-3 border rounded-lg"
        name="streetAddress"
        required
      />
      <input
        type="text"
        placeholder="Apt or suite number"
        className="w-full p-3 border rounded-lg"
        name="aptNumber"
        required
      />
      <input
        type="text"
        placeholder="City"
        className="w-full p-3 border rounded-lg"
        name="city"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="State"
          className="p-3 border rounded-lg"
          name="state"
          required
        />
        <input
          type="text"
          placeholder="ZIP code"
          className="p-3 border rounded-lg"
          name="zipCode"
          required
        />
      </div>
    </form>
  );
};
export default BillingForm;
