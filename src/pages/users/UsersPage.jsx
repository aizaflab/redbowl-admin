import { useState } from "react";
import TableLayout from "../../components/table/TableLayout";
import UserTable from "../../components/table/userTable/UserTable";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";
import { useGetUsersQuery } from "../../features/user/userApiSlice";
import { useUserCSVFileMutation } from "../../features/csv/csvApiSlice";

const SEARCH_OPTIONS = [
	{ value: "", label: "Search By" },
	{ value: "username", label: "User Name" },
	{ value: "email", label: "Email" },
	{ value: "number", label: "Phone Number" }
];

const FILTER_OPTIONS = [
	{ value: "", label: "Filter By" },
	{ value: "active", label: "Active" },
	{ value: "banned", label: "Banned" },
];

export default function UsersPage() {

	const [currentPage, setCurrentPage] = useState(1);
	const limit = 10;
	const [searchParams, setSearchParams] = useState({});
	const { data, refetch } = useGetUsersQuery({ page: currentPage, limit, ...searchParams }, { refetchOnMountOrArgChange: true });
	const users = data?.data?.data;
	const totalCount = data?.data?.totalUser;
	const [userCSVFile] = useUserCSVFileMutation();

	return (
		<div>
			<Breadcrumb items={[{ path: '/', label: 'Home' }, { path: '/users', label: 'Users' }]} />
			<TableLayout data={{ isCSV: true, setSearchParams, page: currentPage, setPage: setCurrentPage, totalCount, limit, SEARCH_OPTIONS, FILTER_OPTIONS, refetch, csvFileDownload: userCSVFile }}>
				<UserTable data={users} currentPage={currentPage} />
			</TableLayout>
		</div>
	)
}