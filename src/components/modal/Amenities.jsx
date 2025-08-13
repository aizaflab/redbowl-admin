import { RxCross1 } from "react-icons/rx";
import { amenitiesHelper } from "../../utils/helper";

export default function AmenitiesModal({ title, amenities, setAmenities }) {

    const addAmenity = (newAmenity) => {
        // Check if the amenity is already in the selected list
        const isAlreadySelected = amenitiesHelper.find(item => item.id === newAmenity.id);
        if (isAlreadySelected) {
            const checkAddData = amenities?.data?.some(item => item.id === newAmenity.id);
            if (!checkAddData) {
                const updatedAmenities = [...amenities.data, isAlreadySelected];
                setAmenities({ data: updatedAmenities, open: amenities.open });
            }
        }
    };

    const removeAmenity = (id) => {
        // Remove the amenity by filtering out the selected amenity
        const updatedAmenities = amenities.data.filter(item => item.id !== id);
        setAmenities({ data: updatedAmenities, open: amenities.open });
    };

    const isAmenitySelected = (id) => {
        return amenities.data.some(item => item.id == id);
    };

    return (
        <div className="w-full mx-auto flex items-center justify-center !z-[1000] relative">
            <div
                onClick={() => { setAmenities({ data: amenities?.data, open: !amenities?.open }) }}
                className={`fixed flex justify-center items-center z-[100]  
                ${amenities?.open ? 'visible opacity-1 p-10' : 'invisible opacity-0'} 
                inset-0 w-full h-[100vh] backdrop-blur-sm bg-black/20 duration-100`}>
                <div onClick={(e_) => e_.stopPropagation()} className={`lg:w-[90%] h-[95vh] absolute bg-white border border-white drop-shadow-2xl rounded`}>
                    <div className="flex items-center justify-between mb-4 border-b pb-2 p-2">
                        <div className='flex items-center gap-2 '>
                            <p className='text-lg font-medium text-gray-800 '>{title}</p>
                        </div>
                        <RxCross1 onClick={() => { setAmenities({ data: amenities?.data, open: !amenities?.open }) }} className="hover:rotate-90 transition-all duration-200 ease-in-out text-gray-600 cursor-pointer hover:text-red-500" />
                    </div>
                    <div className="md:grid grid-cols-3">
                        <div className="col-span-2  p-2  border-r">
                            <div className="flex flex-wrap gap-1">
                                {
                                    amenitiesHelper?.map((data) => {
                                        const selected = isAmenitySelected(data.id);
                                        return (
                                            <div
                                                onClick={() => addAmenity(data)}
                                                className={`w-fit text-[13.5px] flex cursor-pointer justify-center items-center gap-2 border rounded-2xl px-2 py-1 ${selected ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                                key={data?.id}>
                                                {data?.name}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-span-1 pl-2">
                            <div className="flex flex-wrap gap-1">
                                {
                                    amenities?.data?.map((data) =>
                                        <div className="w-fit cursor-pointer flex justify-center items-center gap-2 border rounded-2xl px-2 py-1" key={data?.id}>
                                            {data?.name}
                                            <RxCross1 size={10} onClick={() => removeAmenity(data.id)} className="text-red-500 cursor-pointer hover:text-red-700" />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
