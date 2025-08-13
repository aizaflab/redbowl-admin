/* eslint-disable react/prop-types */
import { useState } from "react";
import ReportBlogData from "./ReportBlogData";
import ModalLayout from "../../modal/ModalLayout";
import ClearReport from "../../modal/report/ClearReport";
import AcceptReport from "../../modal/report/AcceptReport";
import { MdOutlineLayersClear, MdOutlineReportGmailerrorred } from "react-icons/md";
import { useBanReportedBlogMutation, useDeleteReportMutation } from "../../../features/blogFeatures/blog/blogApiSlice";


export default function BlogReportTable({ data }) {

    // For modal
    const [acceptModal, setAcceptModal] = useState(false);
    const [clearModal, setClearModal] = useState(false);


    // report report accept
    const [acceptData, setAcceptData] = useState(null);
    const [banReportedBlog] = useBanReportedBlogMutation();

    const handleAccept = (reportId) => {
        setAcceptModal(true);
        setAcceptData(reportId);
    }

    const handleReportAccept = async () => {
        if (!acceptData) return;
        const res = await banReportedBlog(acceptData);
        if (res?.error) {
            return console.log(res);
        }
        setAcceptData(null);
        setAcceptModal(false);
    }


    // handle clear report part
    const [clearData, setClearData] = useState(null);
    const [deleteReport] = useDeleteReportMutation();

    const handleClear = (reportId) => {
        setClearModal(true);
        setClearData(reportId);
    }

    const handleReportClear = async () => {
        if (!clearData) return;
        const res = await deleteReport(clearData);
        if (res?.error) {
            return console.log(res);
        }
        setClearData(null);
        setClearModal(false);
    }


    return (
        <div className="overflow-x-auto shadow rounded-lg no-scrollbar mt-5">
            <table className="w-full min-w-[500px] text-left rtl:text-right text-sm">
                <thead className="bg-emerald-100">
                    <tr className="flex w-full gap-2 justify-between">
                        {["#", "Repoter name", "Repoter number", "Report category", "Report description", "View blog", "Status", "Investigation"].map((title, i) => (
                            <th key={i} scope="col" className={`flex items-center justify-center py-3 font-medium  w-${i === 0 ? '14' : i === 1 ? '48' : i === 2 ? '40' : i === 3 ? '40' : i === 4 ? '60' : i === 5 ? '28' : i === 6 ? '32' : '52'}`}>
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((reportedBlog, i) => <ReportBlogData key={reportedBlog?._id} {...reportedBlog} index={i} handleAccept={handleAccept} handleClear={handleClear} />)}
                </tbody>
            </table>

            <ModalLayout openModal={acceptModal} setOpenModal={setAcceptModal} icon={<MdOutlineReportGmailerrorred />} title='Accept Report' setModalData={setAcceptData}>
                <AcceptReport setOpenModal={setAcceptModal} setAcceptData={setAcceptData} handelDelete={handleReportAccept}/>
            </ModalLayout>
            <ModalLayout openModal={clearModal} setOpenModal={setClearModal} icon={<MdOutlineLayersClear />} title='Clear Report' setModalData={setClearData}>
                <ClearReport setOpenModal={setClearModal} setClearData={setClearData} handelDelete={handleReportClear} />
            </ModalLayout>
        </div>
    )
}