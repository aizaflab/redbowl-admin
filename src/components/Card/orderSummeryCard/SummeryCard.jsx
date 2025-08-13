import { Link } from "react-router-dom"
import { HiArrowNarrowRight, HiDotsHorizontal } from "react-icons/hi";

export default function SummeryCard() {
    const orderData = [
        {
            id: 1,
            name: 'Total Users',
            amount: `1500`,
        },
        {
            id: 2,
            name: 'Total Agency',
            amount: `250`,
        },
        {
            id: 3,
            name: 'Active Service',
            amount: `138`,
        },
        {
            id: 4,
            name: 'Total Revenue',
            amount: `4879`,
        }
    ]
    return (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 p-5 bg-[#F9FAFB] rounded mt-7">
            {
                orderData?.map(data => <div key={data?.id} className="bg-white hover:bg-[#F6FAFF] rounded-lg">
                    <div className=" px-5 pt-5 pb-12 text-[#001B36]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium">{data?.name}</h2>
                            <HiDotsHorizontal />
                        </div>
                        <h1 className="text-4xl font-semibold mt-5">{data?.amount}</h1>
                    </div>
                    <div className="border-t border-b flex items-center justify-between px-5 py-3 rounded-b-lg">
                        <Link to={'/'} className="text-sm font-medium text-gray-700">View Report</Link>
                        <HiArrowNarrowRight />
                    </div>
                </div>)
            }
        </div>
    )
}
