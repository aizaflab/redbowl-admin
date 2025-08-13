import CountryChangeData from "./CountryChangeData"


export default function CountryChangeTable() {
    const countryData = [
        {
            profilePic: "https://example.com/images/profile1.jpg",
            name: "John Doe",
            currentCountry: "USA",
            requestCountry: "Canada",
            description: "John is a software engineer looking to move to Canada for better job opportunities and a change of environment."
        },
        {
            profilePic: "https://example.com/images/profile2.jpg",
            name: "Jane Smith",
            currentCountry: "UK",
            requestCountry: "Australia",
            description: "Jane is a graphic designer who wants to experience the Australian lifestyle and work in the booming creative industry there."
        },
        {
            profilePic: "https://example.com/images/profile3.jpg",
            name: "Ahmed Khan",
            currentCountry: "India",
            requestCountry: "Germany",
            description: "Ahmed is an automotive engineer seeking to move to Germany to work with leading car manufacturers and advance his career."
        },
    ]
    return (
        <div className="overflow-x-auto shadow rounded-lg no-scrollbar mt-5">
            <table className="w-full min-w-[500px] text-left rtl:text-right text-sm">
                <thead className="bg-emerald-100">
                    <tr className="flex w-full gap-2 justify-between">
                        {["#", "Image", "Name", "Currect country", "Requested country", "Description", "Action"].map((title, i) => (
                            <th key={i} scope="col" className={`flex items-center justify-center py-3 font-medium   w-${i === 0 ? '14' : i === 1 ? '32' : i === 2 ? '48' : i === 3 ? '48' : i === 4 ? '48' : i === 5 ? '80' : i === 6 ? '32' : '32'}`}>
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {countryData?.map((data, i) => <CountryChangeData key={i} {...data} index={i} />)}
                </tbody>
            </table>
        </div>
    )
}
