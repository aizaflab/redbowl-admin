/* eslint-disable react/prop-types */
import { RiUser6Fill } from "react-icons/ri";
import { formatAndTruncateCell, showTooltip } from '../../../utils/utils'
import { useState } from "react";
import ModalLayout from "../../modal/ModalLayout";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function CountryChangeData({ index, profilePic, name, currentCountry, requestCountry, description }) {
    const [open, setOpen] = useState(false)
    const [updateData, setUpdateData] = useState("");
    return (
        <>
            <tr className="bg-white border-b  hover:bg-gray-50 flex gap-2 justify-between py-0.5">
                <td className="px-6  font-medium text-gray-900 flex items-center w-14">
                    {(index + 1) < 10 ? `0${index + 1}` : index + 1}
                </td>

                <td className="px-2 flex items-center justify-center w-32 py-2.5 ">
                    {
                        !profilePic ? <img src={profilePic} alt="userAvator" className='h-10 w-10 rounded-full' /> :
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                                <RiUser6Fill />
                            </div>
                    }
                </td>
                <td title={showTooltip(name, 15)} className="px-2 flex items-center justify-center w-48" > {name}</td>
                <td className="px-2 flex items-center justify-center w-48" > {currentCountry}</td>
                <td className="px-2 flex items-center justify-center w-48" > {requestCountry}</td>

                <td onClick={() => setOpen(true)} className="px-2 flex items-center justify-center w-80 cursor-pointer hover:text-blue-500">
                    {formatAndTruncateCell(description, 35)}
                </td>

                <td className="px-2 flex items-center justify-center w-32" >

                    <select value={updateData} onChange={(e) => setUpdateData(e.target.value)} className="cursor-pointer bg-emerald-100 px-2 py-1.5 rounded-sm focus:outline-none" >
                        <option value="" className="cursor-pointer">Status</option>
                        <option value="accept" className="cursor-pointer">Accept</option>
                        <option value="delete" className="cursor-pointer">Delete</option>
                    </select>

                </td>
            </tr>

            <ModalLayout setOpenModal={setOpen} openModal={open} title='Report description' icon={<HiOutlineDocumentText />}>
                {description}
            </ModalLayout></>
    )
}
