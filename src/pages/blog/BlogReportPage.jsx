import TableLayout from '../../components/table/TableLayout'
import Breadcrumb from '../../components/ui/breadcrumb/Breadcrumb'
import BlogReportTable from '../../components/table/blogReportTable/BlogReportTable'
import { useState } from 'react';
import { useGetBlogReportsQuery } from '../../features/blogFeatures/blog/blogApiSlice';

const SEARCH_OPTIONS = [
    { value: "", label: "Search By" },
    { value: "username", label: "User Name" },
    { value: "number", label: "Phone Number" },
    { value: "reportType", label: "Report Type" }
];

const FILTER_OPTIONS = [
    { value: "", label: "Filter By" },
    { value: "pending", label: "pending" },
    { value: "accept", label: "accept" }
];

export default function BlogReportPage() {

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [searchParams, setSearchParams] = useState({});
    const { data, refetch } = useGetBlogReportsQuery({ page: currentPage, limit, ...searchParams }, { refetchOnMountOrArgChange: true });
    const reports = data?.data?.reports;
    const totalCount = data?.data?.totalReport;

    return (
        <div>
            <Breadcrumb items={[{ path: '/', label: 'Home' }, { path: '/blogreport', label: 'Blog report' }]} />
            <TableLayout data={{ isCSV: false, setSearchParams, page: currentPage, setPage: setCurrentPage, totalCount, limit, SEARCH_OPTIONS, FILTER_OPTIONS, refetch }}>
                <BlogReportTable data={reports} />
            </TableLayout>
        </div>
    )
}
