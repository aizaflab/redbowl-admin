/* eslint-disable react/prop-types */
import UserData from './UserData'

export default function UserTable({ data, currentPage }) {

	return (
		<div className="overflow-x-auto shadow rounded-lg noScrollbar mt-5">
			<table className="w-full min-w-[500px] text-left rtl:text-right text-sm">
				<thead className="bg-emerald-100">
					<tr className="flex w-full gap-2 justify-between">
						{["#", "Picture", "User Name", "Phone Number", "Role", "Status", "Action"].map((title, i) => (
							<th key={i} scope="col" className={`flex items-center justify-center py-3 font-medium w-${i === 0 ? '14' : i === 1 ? '28' : i === 2 ? '52' : i === 3 ? '48' : i === 4 ? '32' : i === 5 ? '40' : '32'}`}>
								{title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data?.map((user, i) => <UserData key={user.id} {...user} index={i} currentPage={currentPage} />)}
				</tbody>
			</table>
		</div>
	)
}
