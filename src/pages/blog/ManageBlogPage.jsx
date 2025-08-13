/* eslint-disable no-unused-vars */
import { useState } from "react";
import TableLayout from "../../components/table/TableLayout";
import ManageBlogTable from "../../components/table/manageBlogTable/ManageBlogTable";
import { useGetBlogsQuery } from "../../features/blogFeatures/blog/blogApiSlice";
import { Link } from "react-router-dom";

const SEARCH_OPTIONS = [
  { value: "", label: "Search By" },
  { value: "title", label: "Blog Title" },
  { value: "username", label: "Author Name" },
];

const FILTER_OPTIONS = [
  { value: "", label: "Filter By" },
  { value: "active", label: "Active" },
  { value: "banned", label: "Banned" },
];

export default function ManageBlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [searchParams, setSearchParams] = useState({});
  const [search, setSearch] = useState("");
  const pathname = `?page=${currentPage}&limit=${limit}&searchTerm=${search}`;
  const { data, isLoading, error, refetch } = useGetBlogsQuery(pathname);
  const blogs = data?.data?.bolgs;
  const totalCount = data?.data?.totalItems;
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setCurrentPage(1);
  };
  return (
    <div>
      <div className="flex items-center justify-between py-2 mt-7 rounded px-3 bg-[#0B1315]/10 border border-[#0B1315] text-gray-0">
        <div className="flex justify-start items-center gap-10 ">
          <input
            className="rounded-md border border-[#1b2d32] outline-none bg-transparent text-[15px] px-2 py-2 xl:w-[20vw] "
            type="search"
            placeholder="Search..."
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
        <Link
          to={"/add-blog"}
          className="center px-4 py-2   bg-[#1a2c31] dark:border-[#1a2c31] text-gray-0 border  text-[13px] font-medium rounded cursor-pointe   hover:bg-transparent hover:text-gray-0 "
        >
          Add Blog
        </Link>
      </div>

      {isLoading && (
        <div className="center h-[40vh] w-full bg-[#1a2c31]/10 mt-5">
          <div className="loader "></div>
        </div>
      )}
      {error && (
        <div className="center h-[40vh] w-full bg-[#1a2c31]/10 mt-5 text-center text-mainLight">
          Failed to load categories. Please try again later.
        </div>
      )}

      {blogs?.length > 0 ? (
        <TableLayout
          data={{
            isCSV: false,
            setSearchParams,
            page: currentPage,
            setPage: setCurrentPage,
            totalCount,
            limit,
            SEARCH_OPTIONS,
            FILTER_OPTIONS,
            refetch,
          }}
        >
          <ManageBlogTable data={blogs} currentPage={currentPage} />
        </TableLayout>
      ) : (
        !isLoading &&
        !error && (
          <div className="center h-[40vh] w-full bg-[#1a2c31]/10 mt-5 text-center text-mainLight">
            No Product Found!
          </div>
        )
      )}
    </div>
  );
}
