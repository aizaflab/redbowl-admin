import Breadcrumb from '../../components/ui/breadcrumb/Breadcrumb'
import TableLayout from '../../components/table/TableLayout'
import BlogAuthorTable from '../../components/table/blogAuthorTable/BlogAuthorTable'
import { useState } from 'react';
import { useGetBlogAuthorsQuery } from '../../features/blogFeatures/blog/blogApiSlice';

const SEARCH_OPTIONS = [
    { value: "", label: "Search By" },
    { value: "username", label: "Author Name" },
    { value: "number", label: "Phone Number" }
];

const FILTER_OPTIONS = [
    { value: "", label: "Filter By" },
    { value: "active", label: "Active" },
    { value: "banned", label: "Banned" }
];

export default function BlogAuthorPage() {

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [searchParams, setSearchParams] = useState({});
    const { data, refetch } = useGetBlogAuthorsQuery({ page: currentPage, limit, ...searchParams }, { refetchOnMountOrArgChange: true });
    const authors = data?.data?.authors;
    const totalCount = data?.data?.totalAuthor;

    return (
        <div>
            <Breadcrumb items={[{ path: '/', label: 'Home' }, { path: '/blogauthor', label: 'Blog Author' }]} />
            <TableLayout data={{ isCSV: false, setSearchParams, page: currentPage, setPage: setCurrentPage, totalCount, limit, SEARCH_OPTIONS, FILTER_OPTIONS, refetch }}>
                <BlogAuthorTable data={authors} />
            </TableLayout>
        </div>
    )
}
