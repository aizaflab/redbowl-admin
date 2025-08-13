import { useState } from "react";
import TableLayout from "../../components/table/TableLayout";
import NewsLetterTable from "../../components/table/newsLetterTable/NewsLetterTable";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";
import { useGetSubscribesQuery } from "../../features/subscribe/subscribeApiSlice";
import { useSubscribeCSVFileMutation } from "../../features/csv/csvApiSlice";

const SEARCH_OPTIONS = [
    { value: "", label: "Search By" },
    { value: "email", label: "Email" }
];

const FILTER_OPTIONS = [
    { value: "", label: "Filter By" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" }
];

export default function NewsLetterPage() {

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [searchParams, setSearchParams] = useState({});
    const { data, refetch } = useGetSubscribesQuery({ page: currentPage, limit, ...searchParams }, { refetchOnMountOrArgChange: true });
    const subscribes = data?.data?.subscribes;
    const totalCount = data?.data?.totalSubscribe;
    const [subscribeCSVFile] = useSubscribeCSVFileMutation();

    return (
        <div>
            <Breadcrumb items={[{ path: '/', label: 'Home' }, { path: '/manageblog', label: 'Manage Blog' }]} />
            <TableLayout data={{ isCSV: true, setSearchParams, page: currentPage, setPage: setCurrentPage, totalCount, limit, SEARCH_OPTIONS, FILTER_OPTIONS, refetch, csvFileDownload: subscribeCSVFile }}>
                <NewsLetterTable data={subscribes} currentPage={currentPage} />
            </TableLayout>
        </div>
    )
}
