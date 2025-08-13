/* eslint-disable react/prop-types */

const timePeriods = [
    { id: 1, label: "ToDay", value: "today" },
    { id: 2, label: "Weekly", value: "weekly" },
    { id: 3, label: "Monthly", value: "monthly" },
    { id: 4, label: "Yearly", value: "year" }
];

// eslint-disable-next-line react/prop-types
export default function TimePeriods({ searchParams, setSearchParams }) {

    return (
        <div className="flex sm:justify-normal justify-center mb-5 lg:mb-0">
            {timePeriods.map((period) => (
                <div
                    key={period.id}
                    onClick={() => setSearchParams(period)}
                    className={`text-sm font-medium py-2 px-4 h-fit cursor-pointer ${searchParams?.id === period.id ? "bg-black text-white" : "bg-[#F0F3F8] text-[#001B36]"}`}
                >
                    <p className="mt-0.5">{period.label}</p>
                </div>
            ))}
        </div>
    )
}
