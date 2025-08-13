/* eslint-disable react/prop-types */
import { useState } from "react"
import ModalLayout from "../../modal/ModalLayout"
import { HiOutlineDocumentText } from "react-icons/hi"
import { formatAndTruncateCell, showTooltip } from "../../../utils/utils";


export default function ReportBlogData({ _id, user, blog, reportType, reportBody, index, handleAccept, handleClear, status }) {

	const [open, setOpen] = useState(false)

	const handleBlogNavigate = (slugTitle) => {
		const clientSideUrl = import.meta.env.VITE_APP_GYPSYADVISOR_CLIENT_URL
		const blogTab = window.open(`${clientSideUrl}/blog/${slugTitle}`, '_blank');
		blogTab.focus();
	}

	return (
		<>
			<tr className="bg-white border-b  hover:bg-gray-50 flex gap-2 justify-between py-2">
				<td className="px-6  font-medium text-gray-900 flex items-center w-14">
					{(index + 1) < 10 ? `0${index + 1}` : index + 1}
				</td>

				<td title={showTooltip(user?.username, 15)} className="px-2 flex items-center justify-center w-48" > {formatAndTruncateCell(user?.username, 15)}</td>

				<td title={showTooltip(user?.number, 20)} className="px-2 flex items-center justify-center w-40">{formatAndTruncateCell(user?.number, 20)}</td>

				<td className="px-2 flex items-center justify-center w-40">{reportType}</td>

				<td onClick={() => setOpen(true)} className="px-2 flex items-center justify-center w-60 cursor-pointer hover:text-blue-500">
					{formatAndTruncateCell(reportBody, 30)}
				</td>

				<td className="px-2 flex items-center justify-center w-28">
					<button onClick={() => handleBlogNavigate(blog?.slugTitle)} className="font-medium hover:text-blue-500">view</button>
				</td>

				<td className="px-2 flex items-center justify-center w-32">
					<button className={`w-[5.7rem] ${status === 'accept' ? 'bg-emerald-100 border-emerald-100 hover:border-emerald-500 text-emerald-500 hover:bg-transparent ' : 'bg-yellow-100 border-yellow-100 text-yellow-500 hover:bg-transparent'} py-1.5 font-medium rounded border capitalize`}
					> {status}
					</button>
				</td>

				<td className="px-2 flex items-center justify-center w-52 gap-3">
					{status !== 'accept' && <button onClick={() => handleAccept(_id)} className="px-5 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded hover:bg-red-100">Accept</button>}
					<button onClick={() => handleClear(_id)} className="px-5 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded hover:bg-blue-100">{status === "pending" ? "Decline" : "Clear"}</button>
				</td>
			</tr>
			<ModalLayout setOpenModal={setOpen} openModal={open} title='Report description' icon={<HiOutlineDocumentText />}>
				{reportBody}
			</ModalLayout>
		</>
	)
}
