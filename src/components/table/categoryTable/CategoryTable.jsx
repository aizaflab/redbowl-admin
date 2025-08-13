/* eslint-disable react/prop-types */
import CategoryTableData from "./CategoryTableData";

export default function CategoryTable({ data, currentPage }) {
  return (
    <div className="overflow-x-auto shadow rounded no-scrollbar mt-8">
      <table className="w-full min-w-[500px] text-left rtl:text-right text-sm">
        <thead className="bg-[#1a2c31] text-gray-0">
          <tr className="flex w-full gap-2 justify-between">
            {["#", "Title", "Slug", "Action"].map((title, i) => (
              <th
                key={i}
                scope="col"
                className={`flex items-center justify-center py-3 font-medium  ${
                  i === 2 && "!justify-start px-2"
                } ${i === 1 && "!justify-start px-2"} w-${
                  i === 0 ? "14" : i === 2 ? "60 " : "60"
                }`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((category, i) => (
            <CategoryTableData
              key={category?._id}
              {...category}
              index={i}
              currentPage={currentPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
