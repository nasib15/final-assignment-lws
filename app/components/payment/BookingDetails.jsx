import { differenceInDays } from "date-fns";

const BookingDetails = ({ checkin, checkout, guests }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your trip</h2>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">Dates</h3>
          <p className="text-zinc-600 text-sm">
            {new Date(checkin).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(checkout).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            ({differenceInDays(new Date(checkout), new Date(checkin))} nights)
          </p>
        </div>
        <button className="text-zinc-800 underline text-sm">Edit</button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Guests</h3>
          <p className="text-zinc-600 text-sm">{guests} guest(s)</p>
        </div>
        <button className="text-zinc-800 underline text-sm">Edit</button>
      </div>
    </section>
  );
};
export default BookingDetails;
