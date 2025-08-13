/* eslint-disable react/prop-types */
import BlogAuthorData from "./BlogAuthorData";


export default function BlogAuthorTable({ data }) {
    return (
        <div className="overflow-x-auto shadow rounded-lg no-scrollbar mt-5">
            <table className="w-full min-w-[500px] text-left rtl:text-right text-sm">
                <thead className="bg-emerald-100">
                    <tr className="flex w-full gap-2 justify-between">
                        {["#", "Picture", "Author name", "Author number", "Total blog"].map((title, i) => (
                            <th key={i} scope="col" className={`flex items-center justify-center py-3 font-medium w-${i === 0 ? '14' : i === 1 ? '48' : i === 2 ? '52' : '52'}`}>
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((author, i) => <BlogAuthorData key={author?._id} {...author} index={i} />)}
                </tbody>
            </table>
        </div >
    )
}