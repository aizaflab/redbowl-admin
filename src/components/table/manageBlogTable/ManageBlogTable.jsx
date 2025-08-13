/* eslint-disable react/prop-types */
import ManageBlogData from "./ManageBlogData";

export default function ManageBlogTable({ data, currentPage }) {
  return (
    <div className="overflow-x-auto shadow rounded no-scrollbar mt-8">
      <table className="w-full min-w-[500px] text-left rtl:text-right text-sm">
        <thead className="bg-[#1a2c31] text-gray-0">
          <tr className="flex w-full gap-2 justify-between">
            {[
              "#",
              "Picture",
              "Title",
              "Category Name",
              "View blog",
              "Status",
              "Action",
            ].map((title, i) => (
              <th
                key={i}
                scope="col"
                className={`flex items-center  py-4 font-medium  ${
                  i === 2 || i === 3 ? "justify-start pl-4" : "justify-center"
                }  w-${
                  i === 0
                    ? "14"
                    : i === 1
                    ? "28"
                    : i === 2
                    ? "60"
                    : i === 3
                    ? "48"
                    : i === 4
                    ? "40"
                    : i === 5
                    ? "28"
                    : i === 6
                    ? "32"
                    : "32"
                }`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((blog, i) => (
            <ManageBlogData
              key={blog?._id}
              {...blog}
              index={i}
              currentPage={currentPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
