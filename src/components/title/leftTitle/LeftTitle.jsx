/* eslint-disable react/prop-types */
import ViewMoreBtn from "../../ui/button/ViewMoreBtn";

export default function LeftTitle({ path, title }) {
    return (
        <div className="flex items-center justify-between py-3 bg-[#F9FAFB] rounded pr-3">
            <div className="flex items-center gap-3">
                <div className=" h-10 w-2 bg-emerald-200"></div>
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <ViewMoreBtn path={path} />
        </div>
    )
}
