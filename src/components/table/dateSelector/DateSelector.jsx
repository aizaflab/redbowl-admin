/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState } from "react";
import TimePeriods from "./TimePeriods";
import DatePeriods from "./DatePeriods";


export default function DateSelector({ csvFileDownload }) {

    const [searchParams, setSearchParams] = useState({ id: 1, label: "ToDay", value: "today" });

    const handleCSVDownload = async () => {
        let { value, startDate, endDate } = searchParams || {};
        if (value === 'custom' && (!startDate || !endDate || (new Date(startDate) > new Date(endDate)))) return;

        const apiQuery = value === 'custom' ? { dateRange: value, startDate, endDate } : { dateRange: value }

        await csvFileDownload(apiQuery);
    }

    return (
        <div className="mt-5 lg:flex items-center justify-between">
            <TimePeriods searchParams={searchParams} setSearchParams={setSearchParams} />
            <DatePeriods setSearchParams={setSearchParams} handleCSVDownload={handleCSVDownload} />
        </div>
    )
}
