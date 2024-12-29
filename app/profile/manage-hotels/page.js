import ManageHotelCard from "@/app/components/manage-hotels/ManageHotelCard";

const ManageHotelsPage = async () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-800">Manage Hotels</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:brightness-90 transition-colors">
          + Create Hotel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ManageHotelCard />
        <ManageHotelCard />
        <ManageHotelCard />
      </div>
    </div>
  );
};
export default ManageHotelsPage;

// generate metadata
export const metadata = {
  title: "Manage Hotels",
  description: "View and manage your hotels",
};
