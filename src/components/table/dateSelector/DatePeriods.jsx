/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TbCloudDownload } from "react-icons/tb";

export default function DatePeriods({ setSearchParams, handleCSVDownload }) {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isDateValid, setIsDateValid] = useState(null);

    const handleDateChange = (event, isStart) => {
        const inputDate = event.target.value;
        const newDateObj = new Date(inputDate);

        if (isStart) {
            setStartDate(inputDate);
            if (endDate) {
                const existingEndDateObj = new Date(endDate);
                setIsDateValid(newDateObj > existingEndDateObj);
            }
            setSearchParams({ value: 'custom', startDate: inputDate, endDate });
        } else {
            setEndDate(inputDate);
            if (startDate) {
                const existingStartDateObj = new Date(startDate);
                setIsDateValid(newDateObj < existingStartDateObj);
            }
            setSearchParams({ value: 'custom', startDate, endDate: inputDate });
        }
    };

    return (
        <div className="adminDate gap-4 relative sm:flex-row flex-col flex items-center">
            <div className="flex items-center gap-4">
                <input
                    className="focus:outline-none cursor-pointer invalid-date" type="date" name="date" placeholder="From" value={startDate} onChange={(event) => handleDateChange(event, true)} required
                />
                <p className="font-medium">to</p>
                <input className="focus:outline-none cursor-pointer invalid-date" type="date" name="date" placeholder="To" value={endDate} onChange={(event) => handleDateChange(event, false)} required
                />
            </div>

            <button onClick={handleCSVDownload} className="py-2 px-4 bg-black text-sm text-white font-medium border border-black rounded-sm hover:bg-transparent hover:text-black cursor-pointer flex items-center gap-2">
                <TbCloudDownload />  Download CSV
            </button>

            {isDateValid && (
                <div className="absolute top-10 -left-2">
                    <span className="text-red-500 text-sm ml-2">Invalid dates: Start date must be earlier than end date.</span>
                </div>
            )}
        </div>
    );
}