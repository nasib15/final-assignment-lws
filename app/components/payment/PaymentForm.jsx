const PaymentForm = () => {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Card number"
        className="w-full p-3 border rounded-lg"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Expiration"
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="CVV"
          className="p-3 border rounded-lg"
        />
      </div>
    </form>
  );
};
export default PaymentForm;
