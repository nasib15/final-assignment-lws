const BookingDetails = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your trip</h2>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">Dates</h3>
          <p className="text-zinc-600 text-sm">Jan 3 - 8, 2025</p>
        </div>
        <button className="text-zinc-800 underline text-sm">Edit</button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Guests</h3>
          <p className="text-zinc-600 text-sm">1 guest</p>
        </div>
        <button className="text-zinc-800 underline text-sm">Edit</button>
      </div>
    </section>
  );
};
export default BookingDetails;
