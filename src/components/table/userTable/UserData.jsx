/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaUserSlash } from "react-icons/fa6"
import { FaUserEdit } from "react-icons/fa";
import userImage from "../../../assets/user.png"
import { formatAndTruncateCell, showTooltip } from "../../../utils/utils";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../../features/user/userApiSlice";

export default function UserData({ _id, username, personal, phone, role, status, index, currentPage }) {

	const { profilePicture } = personal;
	const { number } = phone;
	const [updateData, setUpdateData] = useState("");
	const [updateUser] = useUpdateUserMutation();

	useEffect(() => {
		setUpdateData("");
	}, [currentPage]);

	const handleUserStatus = async (userId, status) => {
		if (!status) return;
		const res = await updateUser({ userId, data: { status } });
		if (res?.error) {
			return console.log(res);
		}
	}

	return (
		<tr className="bg-white border-b  hover:bg-gray-50 flex gap-2 justify-between">
			<td className="px-2 font-medium text-gray-900 flex items-center justify-center w-14">
				{(index + 1) < 10 ? `0${index + 1}` : index + 1}
			</td>

			<td className="px-2 flex items-center justify-center w-28 py-2.5"> <img src={profilePicture ? profilePicture : userImage} alt="userAvator" className='h-9 w-9 rounded-full' /></td>

			<td title={showTooltip(username, 15)} className="px-2 flex items-center justify-center w-52" > {formatAndTruncateCell(username, 15)}</td>

			<td title={showTooltip(number, 20)} className="px-2 flex items-center justify-center w-48">{formatAndTruncateCell(number, 20)}</td>

			<td className="px-2 flex items-center justify-center w-32">{role}</td>

			<td className="px-2 flex items-center justify-center w-40">
				<button className={`w-[5.7rem] ${status === 'active' ? 'bg-emerald-100 border-emerald-100 hover:border-emerald-500 text-emerald-500 hover:bg-transparent ' : 'bg-red-100 border-red-100 text-red-500 hover:bg-transparent'} py-1.5 font-medium rounded border capitalize`}
				> {status}
				</button>
			</td>

			<td className="px-2 flex items-center justify-center w-32">
				<select value={updateData} onChange={(e) => { handleUserStatus(_id, e.target.value), setUpdateData(e.target.value) }} className="cursor-pointer bg-emerald-100 px-2 py-1.5 rounded-sm focus:outline-none" >
					<option value="" className="cursor-pointer">Status</option>
					<option value="active" className="cursor-pointer">Active</option>
					<option value="banned" className="cursor-pointer">Banned</option>
				</select>
			</td>
		</tr>
	)
}
