/* eslint-disable react/prop-types */
import userImage from "../../../assets/user.png";
import { formatAndTruncateCell, showTooltip } from "../../../utils/utils";

export default function BlogAuthorData({ picture, username, totalBlog, number, index }) {
    return (
        <tr className="bg-white border-b  hover:bg-gray-50 flex gap-2 justify-between">
            <td className="px-6  font-medium text-gray-900 flex items-center w-14">
                {(index + 1) < 10 ? `0${index + 1}` : index + 1}
            </td>

            <td className="px-2 flex items-center justify-center w-48 py-2.5 "> <img src={picture ? picture : userImage} alt="userAvator" className='h-9 w-9 rounded-full' /></td>

            <td title={showTooltip(username, 15)} className="px-2 flex items-center justify-center w-48 " > {formatAndTruncateCell(username, 15)}</td>

            <td className="px-2 flex items-center justify-center w-52 ">{number}</td>

            <td className="px-2 flex items-center justify-center w-52 "> {totalBlog}</td>
        </tr>
    )
}

