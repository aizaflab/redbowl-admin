/* eslint-disable react/prop-types */
import { HiArrowLongRight } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"


export default function ViewMoreBtn({ path }) {
    const navigate = useNavigate()
    return <button onClick={() => navigate(path)} className="font-medium flex items-center gap-2 hover:text-emerald-600">View more <HiArrowLongRight className="text-xl mt-0.5" /></button>
}
