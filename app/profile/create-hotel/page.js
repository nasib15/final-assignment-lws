import EditHotelDescription from "@/app/components/create-hotel/EditHotelDescription";
import EditHotelFeature from "@/app/components/create-hotel/EditHotelFeature";
import EditHotelPrice from "@/app/components/create-hotel/EditHotelPrice";
import EditHotelTitle from "@/app/components/create-hotel/EditHotelTitle";
import EditImageGallery from "@/app/components/create-hotel/EditImageGallery";
import HotelFeatures from "@/app/components/create-hotel/HotelFeatures";

const CreateHotelPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 relative">
      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 absolute top-4 right-4">
        <i className="fas fa-save mr-2"></i>
        Publish
      </button>
      <EditHotelTitle />

      <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]">
        <EditImageGallery />
      </div>

      <EditHotelPrice />

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="border-b pb-6 mb-6">
            <div className="grid grid-cols-1 gap-4 text-gray-600">
              <EditHotelFeature />
            </div>
          </div>

          <EditHotelDescription />

          <HotelFeatures />
        </div>
      </div>
    </div>
  );
};
export default CreateHotelPage;
